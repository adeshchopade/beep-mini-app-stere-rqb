import { useState, useEffect } from "react";
import { beepSDK } from "../utils/beepSDKWrapper";
import { quoteService } from "../services/quoteService";
import ENV from "../utils/env";

export const useCheckout = (pageParams, navigateTo) => {
  const [submissionData, setSubmissionData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set app bar title
    beepSDK.appBarTitle({
      title: "Beep Protect",
    });

    if (pageParams && pageParams.submissionData) {
      setSubmissionData(pageParams.submissionData);
    }

    if (pageParams && pageParams.formData) {
      setFormData(pageParams.formData);
    }

    setLoading(false);
  }, [pageParams]);

  const formatCurrency = (amount) => {
    return `PHP ${amount.toFixed(2)}`;
  };
  
  const handleNavigateBack = () => {
    // Navigate back to application form
    // State is already preserved in context
    navigateTo("application-form");
  };

  const handleContinuePayment = async () => {
    setIsProcessing(true);
    setError(null);

    // Extract the quote and total amount
    const quote = submissionData.quotes && submissionData.quotes.length > 0 ? submissionData.quotes[0] : null;
    if (!quote || quote.status !== "generated") {
      setError("Quote information is not available. Please try again.");
      setIsProcessing(false);
      return;
    }

    const totalAmount = quote.premium.total_premium;

    try {
      // Step 1: Request reference number
      requestPaymentReference(quote.id, totalAmount);
    } catch (err) {
      console.error("Payment error:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  const requestPaymentReference = (quoteId, amount) => {
    beepSDK.requestReferenceNumber({
      merchantCode: ENV.BEEP_MERCHANT_CODE,
      product: "beep™ Protect Quote - " + quoteId,
      amount: amount,
      notifyUrl: "",
      onSuccess: (referenceResponse) => {
        console.log("Reference number obtained:", referenceResponse);
        // Step 2: Request payment with the reference number
        processPayment(quoteId, amount, referenceResponse);
      },
      onFail: (error) => {
        console.error("Failed to get reference number:", error);
        setError(error.errorMessage || "Failed to generate payment reference. Please try again.");
        setIsProcessing(false);
      }
    });
  };

  const processPayment = (quoteId, amount, referenceData) => {
    beepSDK.requestPayment({
      amount: amount,
      processingFee: referenceData.processingFee,
      referenceNumber: referenceData.referenceNumber,
      onSuccess: (paymentResult) => {
        console.log("Payment processed:", paymentResult);
        
        if (paymentResult.status === "success") {
          // Now mark the quote as paid and bind it
          processQuoteAfterPayment(quoteId, amount, referenceData, paymentResult);
        } else {
          // Payment failed
          setError("Payment was not successful. Please try again.");
          setIsProcessing(false);
        }
      },
      onFail: (error) => {
        console.error("Payment failed:", error);
        setError(error.message || "Payment processing failed. Please try again.");
        setIsProcessing(false);
      }
    });
  };

  const processQuoteAfterPayment = (quoteId, amount, referenceData, paymentResult) => {
    // Step 3: Mark quote as paid
    const paymentData = {
      amount: amount,
      referenceNumber: referenceData.referenceNumber,
      reference_number: paymentResult.reference_number
    };

    quoteService.markQuoteAsPaid(quoteId, paymentData)
      .then(paymentResponse => {
        console.log("Quote marked as paid:", paymentResponse);
        
        if (paymentResponse.status === "paid") {
          // Step 4: Bind the quote
          return quoteService.bindQuote(quoteId);
        } else {
          throw new Error("Failed to mark quote as paid");
        }
      })
      .then(bindResponse => {
        console.log("Quote bound:", bindResponse);
        setIsProcessing(false);
        
        if (bindResponse.status === "bound") {
          // Navigate to success page
          navigateTo("payment-success", {
            paymentDetails: paymentResult,
            formData: formData
          });
        } else {
          throw new Error("Failed to bind quote");
        }
      })
      .catch(error => {
        console.error("Error processing quote after payment:", error);
        setError("Payment was successful, but there was an issue with policy activation. Please contact support.");
        setIsProcessing(false);
      });
  };

  // Extract quote data if available
  const quote = submissionData?.quotes?.length > 0 ? submissionData.quotes[0] : null;
  const beepCards = quote?.data?.beep_cards || [];
  const premium = quote?.premium;
  
  let totalAmount = "";
  let basePremium = "";
  let taxes = "";
  
  if (premium) {
    totalAmount = formatCurrency(premium.total_premium);
    basePremium = formatCurrency(premium.premium_breakdown.premium);
    taxes = formatCurrency(premium.tax);
  }

  return {
    loading,
    error,
    submissionData,
    formData,
    quote,
    beepCards,
    totalAmount,
    basePremium,
    taxes,
    isProcessing,
    handleNavigateBack,
    handleContinuePayment
  };
};