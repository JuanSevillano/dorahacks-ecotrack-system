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
import { useNFTMetadata } from "../../api/hooks/useNFTCollection";
import { useParams } from "react-router-dom";
import FullpageLoading from "../../components/FullpageLoading";
import { NFTBase } from '@ecotrack/types';


export default function NFTDetailView() {
  const params = useParams<{ tokenId: string }>();
  const { data: nftDetail } = useNFTMetadata(Number(params?.tokenId));

  if (!nftDetail) return <FullpageLoading />

  return (
    <Page title="Detalles del NFT">
      <Grid container spacing={4} sx={{ p: 4, bgcolor: "#0d0d0d", color: "white" }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "black", borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={nftDetail?.image}
              alt="NFT"
              sx={{ borderRadius: 2 }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {nftDetail.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>{nftDetail.description}</Typography>
            <Divider sx={{ my: 2, borderColor: "#222" }} />
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#2081E2", borderRadius: 2, px: 4 }}
              >
                Buy now
              </Button>
            </Box>

            <Typography variant="h6" gutterBottom>Atributos</Typography>
            <Grid container spacing={2}>
              {nftDetail.attributes.map((trait: NFTBase['attributes'][number]) => (
                <Grid item xs={6} key={trait.trait_type}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: "#1a1a1a",
                      borderRadius: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {trait.trait_type}
                    </Typography>
                    <Chip
                      label={typeof trait.value === 'number' ? Math.ceil(trait.value) : trait.value}
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
