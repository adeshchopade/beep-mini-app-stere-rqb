import { useState, useEffect } from "react";
import { beepSDK } from "../utils/beepSDKWrapper";

export const useBeepCards = (initialState = {}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState(initialState.cards || []);
  const [selectedCards, setSelectedCards] = useState(initialState.selectedCards || {});
  const [formData, setFormData] = useState(initialState.formData || {});

  // Set loading to false immediately if we have initialState with cards
  useEffect(() => {
    if (initialState.cards && initialState.cards.length > 0) {
      setLoading(false);
    }
  }, []);

  const fetchUserAndCards = async () => {
    setLoading(true);
    setError(null);

    // Get user data
    beepSDK.getUser({
      onSuccess: (userData) => {
        // Get cards data
        beepSDK.getCards({
          onSuccess: (cardsData) => {
            if (cardsData && cardsData.cards && cardsData.cards.length > 0) {
              const cards = cardsData.cards;

              // Initialize selectedCards with first card checked by default
              const initialSelectedCards = {};
              initialSelectedCards[cards[0].can] = true;
              setSelectedCards(initialSelectedCards);

              // Initialize form data for each card
              const initialFormData = {};
              cards.forEach((card) => {
                initialFormData[card.can] = {
                  beep_card_number: card.can,
                  applicant_first_name: "",
                  applicant_last_name: "",
                  applicant_mobile: "",
                  applicant_email_address:"",
                  applicant_dob: "",
                };
              });

              // For the first card, set the first_name, last_name, mobile, email_address
              initialFormData[cards[0].can].applicant_first_name = userData.firstName || "";
              initialFormData[cards[0].can].applicant_last_name = userData.lastName || "";
              initialFormData[cards[0].can].applicant_mobile = userData.phoneNumber || "";
              initialFormData[cards[0].can].applicant_email_address = userData.email || "";

              setFormData(initialFormData);
              setCards(cards);
              setLoading(false);
            } else {
              setError("No beep cards found in your account");
              setLoading(false);
              setCards([]);
            }
          },
          onFail: (error) => {
            console.error("Failed to fetch cards:", error);
            setError("Failed to fetch your beep cards. Please try again.");
            setLoading(false);
          },
        });
      },
      onFail: (error) => {
        console.error("Failed to fetch user:", error);
        setError("Failed to fetch user data. Please try again.");
        setLoading(false);
      },
    });
  };

  const handleCardSelection = (cardNumber) => {
    setSelectedCards((prev) => ({
      ...prev,
      [cardNumber]: !prev[cardNumber],
    }));
  };

  const handleInputChange = (cardNumber, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [cardNumber]: {
        ...prev[cardNumber],
        [field]: value,
      },
    }));
  };

  const handleDateChange = (cardNumber) => {
    beepSDK.datePicker({
      format: "yyyy-MM-dd",
      minimumDate: "1930-01-01",
      maximumDate: new Date().toISOString().split("T")[0],
      onSuccess: (dateData) => {
        handleInputChange(cardNumber, "applicant_dob", dateData.date);
      },
      onFail: (error) => {
        console.error("Failed to select date:", error);
      },
    });
  };

  const getSelectedCardDetails = () => {
    // Prepare beep card details from selected cards
    const beepCardDetails = [];
    Object.keys(selectedCards).forEach((cardNumber) => {
      if (selectedCards[cardNumber]) {
        beepCardDetails.push(formData[cardNumber]);
      }
    });
    return beepCardDetails;
  };

  const getSelectedFormData = () => {
    // Collect all form data for selected cards
    const selectedFormData = {};
    Object.keys(selectedCards).forEach((cardNumber) => {
      if (selectedCards[cardNumber]) {
        selectedFormData[cardNumber] = formData[cardNumber];
      }
    });
    return selectedFormData;
  };

  const isFormValid = () => {
    // Check if at least one card is selected
    const hasSelectedCard = Object.values(selectedCards).some((selected) => selected);
    if (!hasSelectedCard) return false;

    // Check if all selected cards have complete form data
    let isValid = true;
    Object.keys(selectedCards).forEach((cardNumber) => {
      if (selectedCards[cardNumber]) {
        const cardData = formData[cardNumber];
        if (
          !cardData.applicant_first_name ||
          !cardData.applicant_last_name ||
          !cardData.applicant_mobile ||
          !cardData.applicant_email_address ||
          !cardData.applicant_dob
        ) {
          isValid = false;
        }
      }
    });

    return isValid;
  };

  return {
    loading,
    error,
    setError,
    cards,
    selectedCards,
    formData,
    fetchUserAndCards,
    handleCardSelection,
    handleInputChange,
    handleDateChange,
    getSelectedCardDetails,
    getSelectedFormData,
    isFormValid,
  };
}; 