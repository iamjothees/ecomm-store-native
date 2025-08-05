import { createContext, useContext, useState } from 'react';

const ScreenContext = createContext();

const defaultScreen = {
    screenTitle: "Ecomm Store Native",
    showHeader: true,
    showFooter: true,
    loading: false,
}

export function ScreenContextProvider({children}) {
    const [screen, setScreen] = useState(defaultScreen);

    return (
        <ScreenContext value={{ screen, setScreen, defaultScreen }} >
            {children}
        </ScreenContext>
    );
}

export default () => useContext(ScreenContext);
