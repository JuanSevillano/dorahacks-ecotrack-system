import { useContext } from "react";

export const getUseContext =
    <Context>(Context: React.Context<Context>) =>
    () => {
        const context = useContext(Context);
        if (!context) {
            throw new Error(`No ${Context.displayName ?? '<unknown context>'}`);
        }

        return context;
    };
