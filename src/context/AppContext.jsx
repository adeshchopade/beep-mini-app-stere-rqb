import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [page, setPage] = useState("home");
	// Keep console enabled always but control visibility separately
	const [consoleEnabled] = useState(true);
	const [consoleVisible, setConsoleVisible] = useState(false);

	const navigateTo = (pageName) => {
		console.log(`Navigating to ${pageName}`);
		setPage(pageName);
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
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useApp = () => useContext(AppContext);

export default AppContext;
