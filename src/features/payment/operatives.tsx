import { lazy } from "react";
import { ContextualQuickAction, QuickActionOperative } from "../../contexts/operative-context";
import { Address } from "viem";
import { FEATURES_ID } from "../../utils";
import { MoneyOffOutlined } from "@mui/icons-material";


const SendPaymentFlow = lazy(() => import('./sendPaymentJourney/SendPaymentFlow'));

export const useSendPaymentFlow = ({
    customerWallet,
}: {
    customerWallet: Address;
} & ContextualQuickAction): QuickActionOperative => {

    return {
        featureId: FEATURES_ID.PAYMENT_SEND_PAYMENT,
        title: 'PAGO WEB3',
        label: 'Enviar Pago',
        Icon: <MoneyOffOutlined />,
        disabled: !customerWallet,
        renderContent: params => <SendPaymentFlow
            customerWallet={customerWallet}
            {...params}
        />
    };
};