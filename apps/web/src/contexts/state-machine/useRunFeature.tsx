import { useState } from "react";
import { FeatureConfig } from "../../features/types";
import { createStepperMachine, StepDefinition } from "./StepperMachine";
import { Box, Modal } from "@mui/material";
import { Page } from "../app-context/Page";

export function useRunFeature<Store extends Record<string, any>, Steps extends readonly any[]>(
  config: FeatureConfig<Store, Steps>
) {
  const [isOpen, setOpen] = useState(false);
  const {
    StepperMachineProvider,
    StepperMachine,        // UI genérica MUI + render de paso
  } = createStepperMachine<Store, readonly StepDefinition<Store, keyof Store>[]>();

  const run = () => setOpen(true);
  const stop = () => setOpen(false);

  const FeatureRenderer = () => {
    if (!isOpen) return null;

    const stepper = (
      <StepperMachineProvider {...config}>
        <StepperMachine />
      </StepperMachineProvider >
    );

    if (config.mode === "modal") {
      return (
        <Modal open onClose={stop}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            {stepper}
          </Box>
        </Modal>
      );
    }

    // default = page
    <Page title={config.title ?? "Feature"}>
      {stepper}
    </Page>
  };

  return {
    run,       // disparar la feature desde onClick
    stop,      // cerrar manualmente si es modal
    FeatureRenderer, // componente tipado que renderiza el flow
  };
}
