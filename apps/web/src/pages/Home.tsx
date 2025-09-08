import { Button, LinearProgress, Typography } from '@mui/material';
import { Page } from '../contexts/app-context/Page';
import { useRunFeature } from '../contexts/state-machine/useRunFeature';
import { sendMoneyFeature } from '../features/payment/sendPaymentJourney/sendMonayFeature';
import { lazy, Suspense } from 'react';

const ProjectList = lazy(() => import('./projects/ProjectDetail'));

export const Home = () => {
  const {
    run: startSendMoneyFeature,
    FeatureRenderer: SendMoneyRenderFeature
  } = useRunFeature(sendMoneyFeature);

  return (
    <Page title='Home'>
      <Suspense fallback={<LinearProgress  />}>
        <ProjectList />
      </Suspense>
      <Button onClick={startSendMoneyFeature}>
        <Typography>
          Launch Send Payment Flow
        </Typography>
      </Button>
      <SendMoneyRenderFeature key='MoneySendKey' />
    </Page>
  );
};


