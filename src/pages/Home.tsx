import { Button, Typography } from '@mui/material';
import { Page } from '../contexts/app-context/Page';
import { useSendPaymentFlow } from '../features/payment/paymentJourneys';

export const Home = () => {
  const operative = useSendPaymentFlow({ customerWallet: '0x1234567890abcdef1234567890abcdef12345678' });
  console.log('Tenemos la operativa', operative);

  return (
    <Page title='Home'>
      <Typography variant='h1'>
        HOME PAGE
      </Typography>
      <Button>
        <Typography >
          Launch Send Payment Flow
        </Typography>
      </Button>
    </Page>
  );
};
