// features/sendMoney/steps.tsx
import { TextField, Box, Checkbox, FormControlLabel, Button, Typography } from "@mui/material";
import { PaymentStepProps, SendPaymentStore } from "./types";
import { StepComponentProps } from "../../../contexts/state-machine/StepperMachine";
import { isDefined } from "../../../utils";

type SourceStepProps = PaymentStepProps<'source'>;

export const SourceStep = ({ node, setNode, validate, status, fullStore }: SourceStepProps) => {
  const onChangeSender = (v: string) => {
    setNode({ sender: v });
    if (isDefined(node)) validate(v.trim().length > 0 && node.amount?.quantity > 0);
  };

  const onChangeQty = (q: number) => {
    if (!isDefined(node)) return;
    setNode({ amount: { ...node.amount, quantity: q } });
    validate(node.sender.trim().length > 0 && q > 0);
  };

  return (
    <Box>
      <TextField
        label="Cuenta Origen"
        value={node?.sender || ''}
        onChange={(e) => onChangeSender(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Cantidad"
        type="number"
        value={node?.amount?.quantity || ''}
        onChange={(e) => onChangeQty(Number(e.target.value))}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Token"
        value={node?.amount?.token || ''}
        onChange={(e) => setNode({ amount: { ...node?.amount, token: e.target.value } })}
        fullWidth
      />

      {/* ejemplo de lectura cruzada */}
      <Typography sx={{ mt: 2 }} variant="body2">
        Destino actual: {fullStore?.destination?.account || "—"}
      </Typography>

      <Button sx={{ mt: 2 }} variant="outlined" disabled={!status.isValid}>
        Guardar
      </Button>
    </Box>
  );
}

export function DestinationStep(
  { node, setNode, validate, status }: StepComponentProps<SendPaymentStore, "destination">
) {
  const onChangeAccount = (v: string) => {
    setNode({ account: v });
    validate(v.trim().length > 0);
  };


  return (
    <Box>
      <TextField
        label="Cuenta Destino"
        value={node?.account || ''}
        onChange={(e) => onChangeAccount(e.target.value)}
        fullWidth
      />
      <Button sx={{ mt: 2 }} variant="outlined" disabled={!status.isValid}>
        Guardar
      </Button>
    </Box>
  );
}

export function ReviewStep(
  { node, setNode, fullStore, validate, status }: StepComponentProps<SendPaymentStore, "review">
) {
  const ok =
    fullStore.source?.sender.trim() &&
    fullStore.source.amount.quantity > 0 &&
    fullStore.destination?.account?.trim();

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Resumen</Typography>
      <pre style={{ background: "#f6f6f6", padding: 12, borderRadius: 8 }}>
        {JSON.stringify(fullStore, null, 2)}
      </pre>
      <FormControlLabel
        control={
          <Checkbox
            checked={node?.acknowledged}
            onChange={(e) => {
              setNode({ acknowledged: e.target.checked });
              validate(!!ok && e.target.checked);
            }}
          />
        }
        label="Confirmo que he revisado los datos"
      />
      <Button sx={{ mt: 2 }} variant="outlined" disabled={!status.isValid}>
        Guardar
      </Button>
    </Box>
  );
}

export function ConfirmStep(
  { node, setNode, validate, submit, status }: StepComponentProps<SendPaymentStore, "confirmation">
) {
  return (
    <Box>
      <TextField
        label="Transaction Hash"
        value={node?.transactionHash ?? ""}
        onChange={(e) => {
          setNode({ transactionHash: e.target.value });
          validate(e.target.value.trim().length > 0);
        }}
        fullWidth
      />
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        disabled={!status.isValid}
        onClick={() => submit()}
      >
        Firmar y Enviar
      </Button>
    </Box>
  );
}
