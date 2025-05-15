import { beepSDK } from "../utils/beepSDKWrapper";
import { stereService } from "./stereService";

export const submissionService = {
  submit: async (beepCardDetails, onSuccess, onError) => {
    try {
      // Show loading indicator
      beepSDK.showLoading();
      
      // Step 1: Get user email
      await getUserEmail(async (userEmail) => {
        try {
          // Step 2: Create application
          const applicationResponse = await stereService.createApplication(userEmail);
          
          // Step 3: Update application with form data
          await stereService.updateApplication(applicationResponse.id, beepCardDetails);
          
          // Step 4: Create submission
          const submission = await stereService.createSubmission(applicationResponse.id);
          
          // Step 5: Generate quotes
          const quotesResponse = await stereService.generateQuotes(submission.id);
          
          // Hide loading and call success callback
          beepSDK.hideLoading();
          onSuccess(quotesResponse);
        } catch (error) {
          beepSDK.hideLoading();
          onError(error);
        }
      }, onError);
    } catch (error) {
      beepSDK.hideLoading();
      onError(error);
    }
  }
};

const getUserEmail = (callback, onError) => {
  return new Promise((resolve, reject) => {
    beepSDK.getUser({
      onSuccess: (userData) => {
        callback(userData.email);
        resolve();
      },
      onFail: (error) => {
        console.error("Failed to get user email:", error);
        onError("Failed to get user email. Please try again.");
        reject(error);
      },
    });
  });
}; 