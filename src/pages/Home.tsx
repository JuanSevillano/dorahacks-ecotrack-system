import { Button, Typography } from '@mui/material';
import { Page } from '../contexts/app-context/Page';
import { useRunFeature } from '../contexts/state-machine/useRunFeature';
import { sendMoneyFeature } from '../features/payment/sendPaymentJourney/sendMonayFeature';

export const Home = () => {
  const {
    run: startSendMoneyFeature,
    FeatureRenderer: SendMoneyRenderFeature
  } = useRunFeature(sendMoneyFeature);

  return (
    <Page title='Home'>
      <Button onClick={startSendMoneyFeature}>
        <Typography >
          Launch Send Payment Flow
        </Typography>
      </Button>
      <SendMoneyRenderFeature key='MoneySendKey' />
    </Page>
  );
};
