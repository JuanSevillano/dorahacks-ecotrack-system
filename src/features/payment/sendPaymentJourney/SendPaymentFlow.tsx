import React from 'react';
import { PaymentSteps, PaymentStore, Steps } from './types';
import { Address } from 'viem';

type Props = {
    customerWallet: Address;
};

const steps = [
    {
        id: PaymentSteps.source,
        component: () => <>SOURCE FORM</>
    },
    {
        id: 'payment',
        component: () => <>Payment form</>
    },
    {
        id: 'success',
        component: () => <>Success form</>
    },
    {
        id: 'error',
        component: () => <>Error form</>
    }
] satisfies React.ComponentProps<typeof StateMachineProvider<PaymentStore, Steps>>['steps'];

const SendPaymentFlow = ({ customerWallet, ...operative }: Props) => (
    <StateMachineProvider<PaymentStore, Steps>
        steps={steps}
        initialStore={{ source: { address: customerWallet, amount: 0 } }}
        {...operative}
    >
        <Wizard />
    </StateMachineProvider >
);

export default SendPaymentFlow;
