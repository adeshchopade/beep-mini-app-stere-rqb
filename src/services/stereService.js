import ENV from "../utils/env";
import { beepSDK } from "../utils/beepSDKWrapper";

// Parse API URL once for reuse
const getApiDetails = () => {
  const apiUrl = new URL(ENV.STERE_API_URL);
  return {
    baseUrl: apiUrl.origin.replace(/^https?:\/\//, ""), // Remove protocol
    basePath: apiUrl.pathname,
  };
};

export const stereService = {
  createApplication: (userEmail) => {
    return new Promise((resolve, reject) => {
      const { baseUrl, basePath } = getApiDetails();
      
      beepSDK.httpRequest({
        method: "POST",
        baseUrl: baseUrl,
        path: `${basePath}/applications`,
        headers: {
          Authorization: "Bearer " + ENV.STERE_API_KEY,
          "content-type": "application/json",
        },
        requestBody: {
          country: "philippines",
          products: ["PA-AIG-BEEP"],
          external_id: userEmail,
        },
        onSuccess: (response) => {
          const applicationResponse = JSON.parse(response.body);
          resolve(applicationResponse);
        },
        onFail: (error) => {
          reject(error);
        },
      });
    });
  },

  updateApplication: (applicationId, beepCardDetails) => {
    return new Promise((resolve, reject) => {
      const { baseUrl, basePath } = getApiDetails();
      
      beepSDK.httpRequest({
        method: "PUT",
        baseUrl: baseUrl,
        path: `${basePath}/applications/${applicationId}`,
        headers: {
          Authorization: "Bearer " + ENV.STERE_API_KEY,
          "Content-Type": "application/json",
        },
        requestBody: {
          country: "philippines",
          products: ["PA-AIG-BEEP"],
          params: {
            products: ["PA-AIG-BEEP"],
            beep_card_details: beepCardDetails,
          },
        },
        onSuccess: (response) => {
          const updatedApplication = JSON.parse(response.body);
          resolve(updatedApplication);
        },
        onFail: (error) => {
          reject(error);
        },
      });
    });
  },

  createSubmission: (applicationId) => {
    return new Promise((resolve, reject) => {
      const { baseUrl, basePath } = getApiDetails();
      
      beepSDK.httpRequest({
        method: "POST",
        baseUrl: baseUrl,
        path: `${basePath}/submissions`,
        headers: {
          Authorization: "Bearer " + ENV.STERE_API_KEY,
          "Content-Type": "application/json",
        },
        requestBody: {
          application_id: applicationId,
        },
        onSuccess: (response) => {
          const submission = JSON.parse(response.body);
          resolve(submission);
        },
        onFail: (error) => {
          reject(error);
        },
      });
    });
  },

  generateQuotes: (submissionId) => {
    return new Promise((resolve, reject) => {
      const { baseUrl, basePath } = getApiDetails();
      
      beepSDK.httpRequest({
        method: "GET",
        baseUrl: baseUrl,
        path: `${basePath}/submissions/${submissionId}/generate-quotes`,
        headers: {
          Authorization: "Bearer " + ENV.STERE_API_KEY,
        },
        onSuccess: (response) => {
          const quotesResponse = JSON.parse(response.body);
          resolve(quotesResponse);
        },
        onFail: (error) => {
          reject(error);
        },
      });
    });
  },
}; 