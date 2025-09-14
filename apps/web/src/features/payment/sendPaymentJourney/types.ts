import { StepComponentProps } from "../../../contexts/state-machine/StepperMachine";

export const PaymentSteps = {
  source: 'source',
  destination: 'destination',
  review: 'review',
  confirmation: 'confirmation',
} as const;

export type Steps = keyof typeof PaymentSteps;

export type SendPaymentStore = Partial<Readonly<{
  [PaymentSteps.source]: {
    sender: string;
    amount: {
      token: string;
      quantity: number;
    };
  },
  [PaymentSteps.destination]: {
    account?: string;
  };
  [PaymentSteps.review]: {
    acknowledged: boolean;
  };
  [PaymentSteps.review]: {
    acknowledged: boolean;
  };
  [PaymentSteps.confirmation]: {
    transactionHash: string;
  };
}>>;

// export type PaymentStepProps = { id: Steps };

export type PaymentStepProps<K extends Steps> = StepComponentProps<SendPaymentStore, K>;