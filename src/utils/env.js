/**
 * Environment variables utility
 *
 * This module provides a simple interface to access environment variables
 * with default values and type conversion.
 */

/**
 * Get an environment variable with a default value
 * @param {string} envValue - The environment variable value
 * @param {any} defaultValue - Default value if the environment variable is not set
 * @returns {string|boolean|number} The environment variable value
 */
export const getEnv = (envValue, defaultValue = "") => {
	// Check if the environment variable exists
	if (envValue === undefined || envValue === null || envValue === "") {
		console.warn(`Environment variable not found or empty, using default value: ${defaultValue}`);
		return defaultValue;
	}

	// Handle string boolean values
	if (envValue.toLowerCase() === "true") {
		return true;
	}
  
	if (envValue.toLowerCase() === "false") {
		return false;
	}

	// Handle numeric values
	if (!isNaN(envValue) && envValue !== "") {
		return Number(envValue);
	}

	return envValue;
};

/**
 * Environment variable constants
 */
export const ENV = {
	// API Configuration
	BEEP_API_URL: getEnv(process.env.REACT_APP_BEEP_API_URL, "http://localhost:8000"),

	// Application Settings
	APP_NAME: getEnv(process.env.REACT_APP_APP_NAME, "Beep Mini App"),
	VERSION: getEnv(process.env.REACT_APP_VERSION, "1.0.0"),
	DEBUG_MODE: getEnv(process.env.REACT_APP_DEBUG_MODE, false),

	ENVIRONMENT: getEnv(process.env.REACT_APP_ENVIRONMENT, "development"),

	IS_DEVELOPMENT: getEnv(process.env.REACT_APP_ENVIRONMENT, "development") === "development",
	IS_PRODUCTION: getEnv(process.env.REACT_APP_ENVIRONMENT, "development") === "production",
	IS_STAGING: getEnv(process.env.REACT_APP_ENVIRONMENT, "development") === "staging",
};

export default ENV;
