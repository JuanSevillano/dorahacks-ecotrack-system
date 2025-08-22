import { Address, Signature, Transaction } from "viem";

export const PaymentSteps = {
  source: 'source',
  payment: 'payment',
  error: 'error',
  success: 'success',
} as const;

export type Steps = keyof typeof PaymentSteps;

export type PaymentStore = Partial<Readonly<{
  [PaymentSteps.source]: {
    address: Address;
    amount: number;
    signature?: Signature;
  },
  [PaymentSteps.payment]: {
    transactionHash?: string;
  };
  [PaymentSteps.error]: {
    error: string;
  };
  [PaymentSteps.success]: {
    transactionHash: Transaction['hash'];
  };
}>>;

export type PaymentStepProps = { id: Steps };
