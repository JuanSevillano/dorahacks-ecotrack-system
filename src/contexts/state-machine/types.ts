import { ReactNode } from "react";
import { FeatureId } from "../../utils";

export type StepDefinition<TStore> = {
    id: FeatureId;
    label: string;
    component: ReactNode;
    fullscreen?: boolean;
    required?: boolean;
    // opcionalmente restringimos qué parte del store maneja este paso
    storeKeys?: (keyof TStore)[];
};
