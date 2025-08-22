import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createContext, useState } from 'react';

type Context = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const DevToolsContext = createContext<Context | null>(null);

export const ReactQueryTools = ({ children }: { children: React.ReactNode }) => {
    const [value, setValue] = useState(false);

    return (
        <DevToolsContext.Provider value={{
            visible: value,
            setVisible: setValue
        }}>
            {value && <ReactQueryDevtools />}
            {children}
        </DevToolsContext.Provider>
    )
}