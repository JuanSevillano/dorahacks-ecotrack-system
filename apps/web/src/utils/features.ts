// In this way we can ensure that the features are defined in a single place
// and can be easily referenced throughout the application.
export const FEATURES_ID = {
    PAYMENT_SEND_PAYMENT: 'PAYMENT_SEND_PAYMENT',
    PAYMENT_CHARGE_PAYMENT: 'PAYMENT_CHARGE_PAYMENT',
} as const;

export type FeatureId = keyof typeof FEATURES_ID;