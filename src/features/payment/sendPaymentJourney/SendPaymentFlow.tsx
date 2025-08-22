import React from 'react';
import { StateMachineProvider } from '../../../contexts/state-machine/context/StateMachine';
import { PaymentSteps, PaymentStore, Steps } from './types';
import { OperativeContent } from '../../../contexts/operative-context';
import { Wizard } from '../../../components/stepper/StateMachineStepper';
import { Address } from 'viem';

type Props = {
    customerWallet: Address;
} & OperativeContent;

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
