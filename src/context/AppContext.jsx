import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [page, setPage] = useState("dashboard");
	// Keep console enabled always but control visibility separately
	const [consoleEnabled] = useState(true);
	const [consoleVisible, setConsoleVisible] = useState(false);
	const [pageParams, setPageParams] = useState({});
	// Add application form state
	const [applicationFormState, setApplicationFormState] = useState({
		cards: [],
		selectedCards: {},
		formData: {},
		termsAccepted: false
	});

	const navigateTo = (pageName, params = {}) => {
		console.log(`Navigating to ${pageName}`, params);
		setPage(pageName);
		setPageParams(params);
	};

	const toggleConsoleVisibility = () => {
		setConsoleVisible((prev) => !prev);
	};

	const saveApplicationFormState = (state) => {
		console.log("Saving application form state:", state);
		setApplicationFormState(state);
	};

	return (
		<AppContext.Provider
			value={{
				page,
				navigateTo,
				consoleEnabled,
				consoleVisible,
				toggleConsoleVisibility,
				pageParams,
				applicationFormState,
				saveApplicationFormState
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useApp = () => useContext(AppContext);

export default AppContext;
