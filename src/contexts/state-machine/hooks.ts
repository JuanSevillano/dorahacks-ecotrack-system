import { useReducer, useCallback } from "react";
import { StepDefinition } from "./types";

type StepperState<TStore> = {
    activeStep: number;
    store: TStore;
};

type StepperAction<TStore> =
    | { type: "NEXT"; payload?: Partial<TStore> }
    | { type: "BACK" }
    | { type: "RESET"; initialStore: TStore }
    | { type: "SET_STORE"; payload: Partial<TStore> }
    | { type: "GOTO"; stepIndex: number; payload?: Partial<TStore> };

export function useStepperMachine<
    TStore,
    TSteps extends readonly StepDefinition<TStore>[]
>(
    initialStore: TStore,
    steps: TSteps
) {
    const reducer = (state: StepperState<TStore>, action: StepperAction<TStore>): StepperState<TStore> => {
        switch (action.type) {
            case "NEXT":
                return {
                    ...state,
                    activeStep: Math.min(state.activeStep + 1, steps.length - 1),
                    store: { ...state.store, ...(action.payload ?? {}) },
                };
            case "BACK":
                return { ...state, activeStep: Math.max(state.activeStep - 1, 0) };
            case "RESET":
                return { activeStep: 0, store: action.initialStore };
            case "SET_STORE":
                return { ...state, store: { ...state.store, ...action.payload } };
            case "GOTO":
                return {
                    ...state,
                    activeStep: Math.max(0, Math.min(action.stepIndex, steps.length - 1)),
                    store: { ...state.store, ...(action.payload ?? {}) },
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, {
        activeStep: 0,
        store: initialStore,
    });

    const next = useCallback((payload?: Partial<TStore>) => dispatch({ type: "NEXT", payload }), []);
    const back = useCallback(() => dispatch({ type: "BACK" }), []);
    const reset = useCallback(() => dispatch({ type: "RESET", initialStore }), []);
    const setStore = useCallback((payload: Partial<TStore>) => dispatch({ type: "SET_STORE", payload }), []);
    const goToStep = useCallback((stepId: string, payload?: Partial<TStore>) => {
        const idx = steps.findIndex(s => s.id === stepId);
        if (idx >= 0) {
            dispatch({ type: "GOTO", stepIndex: idx, payload });
        }
    }, [steps]);

    const isLastStep = state.activeStep === steps.length - 1;

    return {
        activeStep: state.activeStep,
        activeStepDef: steps[state.activeStep],
        store: state.store,
        steps,
        next,
        back,
        reset,
        setStore,
        goToStep,
        isLastStep,
    };
}
