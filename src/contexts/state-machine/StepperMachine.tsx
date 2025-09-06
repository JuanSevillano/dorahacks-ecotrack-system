// core/stepperMachine.tsx
import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
} from "react";
import { Stepper, Step, StepLabel, Box, Button } from "@mui/material";

/** Helpers */
type Primitive = string | number | boolean | symbol | bigint | null | undefined;
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends Primitive
    ? T[K]
    : T[K] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : DeepPartial<T[K]>;
};

function isObj(v: unknown) {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}
function deepMerge<T>(base: T, patch: DeepPartial<T>): T {
    if (!isObj(base) || !isObj(patch)) return (patch as T) ?? base;
    const out: any = { ...base };
    for (const k in patch) {
        const pv = (patch as any)[k];
        const bv = (base as any)[k];
        out[k] = isObj(bv) && isObj(pv) ? deepMerge(bv, pv) : pv;
    }
    return out;
}

/** Tipos */
export type StepStatus = {
    isValid: boolean;
    isCompleted: boolean;
};

export type StepComponentProps<TStore, K extends keyof TStore> = {
    /** Identidad y UI */
    stepId: string;
    title: string;

    /** Datos */
    node: TStore[K];
    fullStore: Readonly<TStore>;

    /** Mutación limitada al nodo */
    setNode: (patch: DeepPartial<TStore[K]>) => void;

    /** Estado del paso */
    status: StepStatus;

    /** Acciones del paso */
    validate: (ok: boolean) => void;
    submit: () => Promise<void> | void;

    /** Navegación */
    next: () => void;
    back: () => void;
    goToStep: (stepId: string) => void;
};

export type StepDefinition<
    TStore,
    K extends keyof TStore = keyof TStore
> = {
    id: string;
    title: string;
    storeKey: K;
    required?: boolean;
    fullscreen?: boolean;
    /** (opcional) validación pura basada en store completa */
    validate?: (store: TStore) => boolean;
    /** (opcional) submit side-effects; se ejecuta solo si es válido */
    onSubmit?: (store: TStore) => Promise<void> | void;
    /** Componente del paso, tipado al nodo que puede mutar */
    component: React.ComponentType<StepComponentProps<TStore, K>>;
};

type MachineState<TStore> = {
    activeIndex: number;
    store: TStore;
    statuses: Record<string, StepStatus>;
};

type Action<TStore> =
    | { type: "NEXT" }
    | { type: "BACK" }
    | { type: "GOTO"; index: number }
    | { type: "RESET"; initial: TStore; steps: readonly StepDefinition<TStore, any>[] }
    | { type: "SET_NODE"; key: keyof TStore; patch: any }
    | { type: "VALIDATE"; id: string; ok: boolean }
    | { type: "COMPLETE"; id: string };

function buildInitialStatuses<TStore>(
    steps: readonly StepDefinition<TStore, any>[]
): Record<string, StepStatus> {
    const m: Record<string, StepStatus> = {};
    steps.forEach((s) => (m[s.id] = { isValid: false, isCompleted: false }));
    return m;
}

/** Fábrica: crea Provider, hooks y componente StepperMachine */
export function createStepperMachine<
    TStore extends Record<string, any>,
    TSteps extends readonly StepDefinition<TStore, keyof TStore>[]
>() {
    type Steps = TSteps;

    type Ctx = {
        steps: Steps;
        state: MachineState<TStore>;
        next: () => void;
        back: () => void;
        goToStep: (id: string) => void;
        reset: () => void;
        setNode: <K extends keyof TStore>(key: K, patch: DeepPartial<TStore[K]>) => void;
        validate: (id: string, ok: boolean) => void;
        complete: (id: string) => Promise<void>;
    };

    const Ctx = createContext<Ctx | null>(null);

    function reducer(
        steps: Steps,
        state: MachineState<TStore>,
        action: Action<TStore>
    ): MachineState<TStore> {
        switch (action.type) {
            case "NEXT": {
                const current = steps[state.activeIndex];
                const st = state.statuses[current.id];
                if (current.required !== false && !st.isValid) return state; // bloquear
                return {
                    ...state,
                    activeIndex: Math.min(state.activeIndex + 1, steps.length - 1),
                };
            }
            case "BACK":
                return { ...state, activeIndex: Math.max(0, state.activeIndex - 1) };
            case "GOTO": {
                // Solo permitir ir a pasos previos que sean válidos si son required
                const target = action.index;
                if (target < 0 || target >= steps.length) return state;
                const allPrevOk = steps
                    .slice(0, target)
                    .every(
                        (s) => s.required === false || state.statuses[s.id].isValid
                    );
                if (!allPrevOk) return state;
                return { ...state, activeIndex: target };
            }
            case "RESET":
                return {
                    activeIndex: 0,
                    store: action.initial,
                    statuses: buildInitialStatuses(action.steps),
                };
            case "SET_NODE": {
                const key = action.key as keyof TStore;
                return {
                    ...state,
                    store: {
                        ...state.store,
                        [key]: deepMerge(state.store[key], action.patch),
                    },
                };
            }
            case "VALIDATE":
                return {
                    ...state,
                    statuses: {
                        ...state.statuses,
                        [action.id]: {
                            ...state.statuses[action.id],
                            isValid: action.ok,
                        },
                    },
                };
            case "COMPLETE":
                return {
                    ...state,
                    statuses: {
                        ...state.statuses,
                        [action.id]: { isValid: true, isCompleted: true },
                    },
                };
            default:
                return state;
        }
    }

    /** Provider de la máquina tipada */
    function StepperMachineProvider({
        initialStore,
        steps,
        children,
    }: {
        initialStore: TStore;
        steps: Steps;
        children?: React.ReactNode;
    }) {
        const [state, dispatchBase] = useReducer(
            (s: MachineState<TStore>, a: Action<TStore>) => reducer(steps, s, a),
            {
                activeIndex: 0,
                store: initialStore,
                statuses: buildInitialStatuses(steps),
            }
        );

        const next = useCallback(() => dispatchBase({ type: "NEXT" }), []);
        const back = useCallback(() => dispatchBase({ type: "BACK" }), []);
        const goToStep = useCallback(
            (id: string) => {
                const idx = steps.findIndex((s) => s.id === id);
                if (idx >= 0) dispatchBase({ type: "GOTO", index: idx });
            },
            [steps]
        );
        const reset = useCallback(
            () => dispatchBase({ type: "RESET", initial: initialStore, steps }),
            [initialStore, steps]
        );
        const setNode = useCallback(
            <K extends keyof TStore>(key: K, patch: DeepPartial<TStore[K]>) =>
                dispatchBase({ type: "SET_NODE", key, patch }),
            []
        );
        const validate = useCallback(
            (id: string, ok: boolean) => dispatchBase({ type: "VALIDATE", id, ok }),
            []
        );
        const complete = useCallback(
            async (id: string) => {
                const def = steps.find((s) => s.id === id);
                if (!def) return;
                // si hay validate() a nivel definición, respetarla
                if (def.validate && !def.validate(state.store)) return;
                if (def.onSubmit) await def.onSubmit(state.store);
                dispatchBase({ type: "COMPLETE", id });
            },
            [steps, state.store]
        );

        const value = useMemo<Ctx>(
            () => ({
                steps,
                state,
                next,
                back,
                goToStep,
                reset,
                setNode,
                validate,
                complete,
            }),
            [steps, state, next, back, goToStep, reset, setNode, validate, complete]
        );

        return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
    }

    /** Hook global */
    function useStepperMachine() {
        const ctx = useContext(Ctx);
        if (!ctx) throw new Error("useStepperMachine must be used inside provider");
        return ctx;
    }

    /** Hook por paso (agnóstico y tipado) */
    function useStepMachine() {
        const ctx = useStepperMachine();
        const def = ctx.steps[ctx.state.activeIndex];
        type K = typeof def.storeKey;
        const node = ctx.state.store[def.storeKey] as TStore[K];
        const status = ctx.state.statuses[def.id];

        const api: StepComponentProps<TStore, K> = {
            stepId: def.id,
            title: def.title,
            node,
            fullStore: ctx.state.store as Readonly<TStore>,
            setNode: (patch) => ctx.setNode(def.storeKey, patch),
            status,
            validate: (ok) => ctx.validate(def.id, ok),
            submit: () => ctx.complete(def.id),
            next: ctx.next,
            back: ctx.back,
            goToStep: ctx.goToStep,
        };
        return api;
    }

    /** Render tipado del componente del paso activo */
    function StepRenderer<K extends keyof TStore>({
        def,
    }: {
        def: StepDefinition<TStore, K>;
    }) {
        const ctx = useStepperMachine();
        const Comp = def.component;
        const node = ctx.state.store[def.storeKey] as TStore[K];
        const status = ctx.state.statuses[def.id];

        const props: StepComponentProps<TStore, K> = {
            stepId: def.id,
            title: def.title,
            node,
            fullStore: ctx.state.store as Readonly<TStore>,
            setNode: (patch) => ctx.setNode(def.storeKey, patch),
            status,
            validate: (ok) => ctx.validate(def.id, ok),
            submit: () => ctx.complete(def.id),
            next: ctx.next,
            back: ctx.back,
            goToStep: ctx.goToStep,
        };
        return <Comp {...props} />;
    }

    /** UI abstracta lista para usar (MUI Stepper + contenido) */
    function StepperMachine({
        showFooter = true,
    }: {
        showFooter?: boolean;
    }) {
        const { steps, state, goToStep, next, back } = useStepperMachine();
        const active = steps[state.activeIndex];
        const activeStatus = state.statuses[active.id];

        return (
            <Box sx={{ width: "100%" }}>
                <Stepper activeStep={state.activeIndex} alternativeLabel>
                    {steps.map((s) => (
                        <Step
                            key={s.id}
                            onClick={() => goToStep(s.id)}
                            completed={state.statuses[s.id].isCompleted}
                        >
                            <StepLabel>{s.title}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ mt: 4 }}>
                    <StepRenderer def={active as any} />
                </Box>

                {showFooter && (
                    <Box
                        sx={{
                            mt: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        <Button disabled={state.activeIndex === 0} onClick={back}>
                            Atrás
                        </Button>
                        <Button
                            variant="contained"
                            onClick={next}
                            disabled={active.required !== false && !activeStatus.isValid}
                        >
                            {state.activeIndex === steps.length - 1 ? "Finalizar" : "Continuar"}
                        </Button>
                    </Box>
                )}
            </Box>
        );
    }

    return {
        StepperMachineProvider,
        StepperMachine,
        useStepperMachine,
        useStepMachine,
    };
}
