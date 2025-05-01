import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [page, setPage] = useState("home");
	// Keep console enabled always but control visibility separately
	const [consoleEnabled] = useState(true);
	const [consoleVisible, setConsoleVisible] = useState(false);
	const [pageParams, setPageParams] = useState({});

	const navigateTo = (pageName, params = {}) => {
		console.log(`Navigating to ${pageName}`, params);
		setPage(pageName);
		setPageParams(params);
	};

	const toggleConsoleVisibility = () => {
		setConsoleVisible((prev) => !prev);
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
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useApp = () => useContext(AppContext);

export default AppContext;
