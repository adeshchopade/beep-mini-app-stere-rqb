import ENV from "../utils/env";
import { beepSDK } from "../utils/beepSDKWrapper";

// Parse API URL once for reuse (reusing from stereService)
const getApiDetails = () => {
  const apiUrl = new URL(ENV.STERE_API_URL);
  return {
    baseUrl: apiUrl.origin.replace(/^https?:\/\//, ""), // Remove protocol
    basePath: apiUrl.pathname,
  };
};

export const quoteService = {
  markQuoteAsPaid: (quoteId, paymentData) => {
    return new Promise((resolve, reject) => {
      const { baseUrl, basePath } = getApiDetails();
      
      beepSDK.httpRequest({
        method: "POST",
        baseUrl: baseUrl,
        path: `${basePath}/quotes/${quoteId}/payments`,
        headers: {
          Authorization: "Bearer " + ENV.STERE_API_KEY,
          "Content-Type": "application/json",
        },
        requestBody: {
          amount: {
            currency: "PHP",
            value: paymentData.amount
          },
          status: "paid",
          provider: "beep",
          transaction_id: paymentData.reference_number,
          payment_mode: "monthly",
          payment_data: {
            referenceNumber: paymentData.referenceNumber,
            paymentReferenceNumber: paymentData.reference_number
          }
        },
        onSuccess: (response) => {
          const paymentResponse = JSON.parse(response.body);
          resolve(paymentResponse);
        },
        onFail: (error) => {
          reject(error);
        },
      });
    });
  },

  bindQuote: (quoteId) => {
    return new Promise((resolve, reject) => {
      const { baseUrl, basePath } = getApiDetails();
      
      beepSDK.httpRequest({
        method: "POST",
        baseUrl: baseUrl,
        path: `${basePath}/quotes/${quoteId}/bind`,
        headers: {
          Authorization: "Bearer " + ENV.STERE_API_KEY,
          "Content-Type": "application/json",
        },
        onSuccess: (response) => {
          const bindResponse = JSON.parse(response.body);
          resolve(bindResponse);
        },
        onFail: (error) => {
          reject(error);
        },
      });
    });
  }
};