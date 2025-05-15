import { useState, useEffect } from "react";
import { beepSDK } from "../utils/beepSDKWrapper";
import { policyService } from "../services/policyService";

export const useDashboard = (navigateTo) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [cards, setCards] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    // Set app bar title
    beepSDK.appBarTitle({
      title: "beep™ Protect",
    });

    // Fetch user data
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    beepSDK.getUser({
      onSuccess: (user) => {
        setUserData(user);
        // Once we have user email, fetch policies
        fetchPolicies(user.email);
      },
      onFail: (error) => {
        console.error("Failed to get user data:", error);
        setError("Failed to load user information. Please try again.");
        setLoading(false);
      }
    });
  };

  const fetchPolicies = (userEmail) => {
    policyService.getPolicies(userEmail)
      .then(response => {
        const policyData = response.data || [];
        processPoliciesToCards(policyData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch policies:", error);
        setError("Failed to load your policies. Please try again.");
        setLoading(false);
      });
  };

  const processPoliciesToCards = (policies) => {
    try {
      // Map to track cards and their COCs
      const cardsMap = new Map();

      // Process each policy
      policies.forEach(policy => {
        // Get beep cards from the quote data
        const beepCards = policy.quote_data?.data?.beep_cards || [];
        
        beepCards.forEach(card => {
          // Ensure beep_card_number is a string and handle null/undefined
          const cardNumber = String(card.beep_card_number || '');
          
          // Only process if we have a valid card number
          if (cardNumber.length > 0) {
            // Format card number with a space in the middle
            const formattedCardNumber = cardNumber.length > 6 
              ? `${cardNumber.substring(0, 6)} ${cardNumber.substring(6)}`
              : cardNumber;
            
            // Ensure names are strings
            const firstName = String(card.applicant_first_name || '');
            const lastName = String(card.applicant_last_name || '');
            const insuredName = `${firstName} ${lastName}`.trim();
            
            // Format dates
            const startDate = formatDate(policy.start_date);
            const endDate = formatDate(policy.end_date);
            const periodOfInsurance = `${startDate} - ${endDate}`;
            
            // Get download URL if available
            const downloadUrl = policy.documents && policy.documents.length > 0 
              ? policy.documents[0].download_url 
              : null;
            
            // COC details
            const cocDetails = {
              cocNumber: policy.policy_number,
              periodOfInsurance,
              downloadUrl,
              policyId: policy.id
            };
            
            // If this card already exists in our map, add this COC to it
            if (cardsMap.has(cardNumber)) {
              cardsMap.get(cardNumber).cocs.push(cocDetails);
            } else {
              // Otherwise create a new card entry
              cardsMap.set(cardNumber, {
                cardNumber: formattedCardNumber,
                rawCardNumber: cardNumber,
                insuredName,
                cocs: [cocDetails]
              });
            }
          }
        });
      });
      
      // Convert map to array for rendering
      setCards(Array.from(cardsMap.values()));
    } catch (err) {
      console.error("Error processing policy data:", err);
      setError("Error processing policy data. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      });
    } catch (err) {
      console.error("Error formatting date:", err);
      return dateString; // Return the original string if formatting fails
    }
  };

  const toggleCardExpansion = (cardNumber) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardNumber]: !prev[cardNumber]
    }));
  };

  return {
    loading,
    error,
    userData,
    cards,
    expandedCards,
    toggleCardExpansion,
    navigateTo
  };
}; 