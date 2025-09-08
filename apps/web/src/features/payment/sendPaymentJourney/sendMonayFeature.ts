import { FeatureConfig } from "../../types";
import { ConfirmStep, DestinationStep, SourceStep } from "./Steps";

type SendMoneyStore = {
    source: { sender: string; amount: { token: string; quantity: number } };
    destination: { account: string };
    confirmation: { txHash?: string };
};

const sendMoneySteps = [
    { id: "source", title: "Origen", component: SourceStep, fullscreen: false },
    { id: "destination", title: "Destino", component: DestinationStep, fullscreen: false },
    { id: "success", title: "PARA MARIA", component: ConfirmStep, fullscreen: true },
    { id: "confirmation", title: "Confirmar", component: ConfirmStep, fullscreen: true },
] as const;

const initialStore = {
    source: { sender: "", amount: { token: "USD", quantity: 0 } },
    destination: { account: "" },
    confirmation: {},
} as const;

export const sendMoneyFeature: FeatureConfig<SendMoneyStore, typeof sendMoneySteps> = {
    id: "sendMoney",
    title: "Enviar Dinero",
    steps: sendMoneySteps,
    initialStore,
    mode: "modal", // se ejecuta dentro de un modal
    onFinish: (store) => console.log("Flow terminado con:", store),
};
