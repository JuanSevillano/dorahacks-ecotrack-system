import { Button, Typography } from '@mui/material';
import { Page } from '../contexts/app-context/Page';
import { useSendPaymentFlow } from '../features/payment/operatives';
import { useOperative } from '../contexts/operative-context';

export const Home = () => {
  const { onLaunchOperative } = useOperative();
  const operative = useSendPaymentFlow({ customerWallet: '0x1234567890abcdef1234567890abcdef12345678' });;

  return (
    <Page title='Home'>
      <Typography variant='h1'>
        HOME PAGE
      </Typography>
      <Button onClick={() => onLaunchOperative(operative)}>
        <Typography >
          Launch Send Payment Flow
        </Typography>
      </Button>
    </Page>
  );
};
