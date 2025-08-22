import { useStateMachine } from '../../../contexts/state-machine/hooks/useStateMachine';
import { useStateMachineStep } from '../../../contexts/state-machine/hooks/useStateMachineStep';

import type { PaymentStore, Steps } from './types';

export const usePaymentMachine = useStateMachine<PaymentStore, Steps>;

export const usePaymentMachineStep = useStateMachineStep<PaymentStore, Steps>;
