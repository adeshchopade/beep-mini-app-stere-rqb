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

export const policyService = {
  getPolicies: (userEmail) => {
    return new Promise((resolve, reject) => {
      const { baseUrl, basePath } = getApiDetails();
      
      beepSDK.httpRequest({
        method: "GET",
        baseUrl: baseUrl,
        path: `${basePath}/policies`,
        headers: {
          Authorization: "Bearer " + ENV.STERE_API_KEY,
          "Content-Type": "application/json",
        },
        queryParameters: {
          external_id: userEmail
        },
        onSuccess: (response) => {
          const policiesResponse = JSON.parse(response.body);
          resolve(policiesResponse);
        },
        onFail: (error) => {
          reject(error);
        },
      });
    });
  }
}; 