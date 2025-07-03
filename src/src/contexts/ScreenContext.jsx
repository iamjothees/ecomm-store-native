import { createContext, useState } from 'react';

const ScreenContext = createContext();

const defaultScreen = {
    screenTitle: "",
    showHeader: true,
    showFooter: true
}

export function ScreenContextProvider({children}) {
    const [screen, setScreen] = useState(defaultScreen);

    return (
        <ScreenContext value={{ screen: screen, setScreen: (newScreen) => setScreen({ ...defaultScreen, ...newScreen }) }} >
            {children}
        </ScreenContext>
    )
}

export default ScreenContext