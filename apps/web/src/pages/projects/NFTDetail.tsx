import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  Divider,
  Chip,
  Paper,
} from "@mui/material";
import { Page } from "../../contexts/app-context/Page";

export default function NFTDetailView() {
  return (
    <Page title="">
      <Grid container spacing={4} sx={{ p: 4, bgcolor: "#0d0d0d", color: "white" }}>
        {/* Columna Izquierda - Imagen NFT */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "black", borderRadius: 2 }}>
            <CardMedia
              component="img"
              image="/nft-sample.png" // aquí pones la URL de tu NFT
              alt="NFT"
              sx={{ borderRadius: 2 }}
            />
          </Card>
        </Grid>

        {/* Columna Derecha - Detalles */}
        <Grid item xs={12} md={6}>
          <Box>
            {/* Header NFT */}
            <Typography variant="h5" fontWeight="bold">
              Hen #4047
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Hen House • Owned by 0x5bD9...839b
            </Typography>

            <Divider sx={{ my: 2, borderColor: "#222" }} />

            {/* Precio */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6">0.0135 ETH ($58.10)</Typography>
              <Button
                variant="contained"
                sx={{ bgcolor: "#2081E2", borderRadius: 2, px: 4 }}
              >
                Buy now
              </Button>
            </Box>

            {/* Traits */}
            <Typography variant="h6" gutterBottom>
              Traits
            </Typography>
            <Grid container spacing={2}>
              {[
                { label: "Eyes", value: "Alert", rarity: "12%" },
                { label: "Head", value: "Green Mohawk", rarity: "3%" },
                { label: "Skin", value: "White Quetzalcoatl", rarity: "9%" },
                { label: "Clothing", value: "Wind Breaker", rarity: "2%" },
                { label: "Mouth", value: "Brown", rarity: "8%" },
                { label: "Background", value: "Brown", rarity: "6%" },
              ].map((trait) => (
                <Grid item xs={6} key={trait.label}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: "#1a1a1a",
                      borderRadius: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {trait.label}
                    </Typography>
                    <Typography variant="subtitle1">{trait.value}</Typography>
                    <Chip
                      label={trait.rarity}
                      size="small"
                      sx={{
                        mt: 1,
                        bgcolor: "#2d2d2d",
                        color: "white",
                        fontSize: "0.75rem",
                      }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Secciones adicionales */}
            <Divider sx={{ my: 3, borderColor: "#222" }} />
            <Typography variant="h6">Price history</Typography>
            <Typography variant="h6">About</Typography>
            <Typography variant="h6">Blockchain details</Typography>
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
}
