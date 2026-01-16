import {
  Box,
  Typography,
  Button,
  Grid2 as Grid,
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
      <Grid container spacing={4} sx={{ color: "common.white" }}>
        <Grid
          container
          spacing={2}
          component='section'
          size={{ xs: 12, md: 12 }}
          sx={{
            top: '100px',
            alignSelf: 'start',
            position: { md: 'sticky' },
          }}>
          <Grid size={{ xs: 6 }}>
            <CardMedia
              component="img"
              image={nftDetail?.image}
              alt="NFT"
              loading="lazy"
              sx={{ borderRadius: 2, aspectRatio: '1/1' }}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h5" fontWeight="bold">
              {nftDetail.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>{nftDetail.description}</Typography>
            <Divider sx={{ my: 2, borderColor: "#222" }} />
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Button
                size='large'
                variant="contained"
                fullWidth
                sx={{ borderRadius: 2, color: 'common.gray' }}
              >
                Buy now
              </Button>
            </Box>
            <Grid size={{ xs: 12, md: 12 }} component='section'>
              <Box>
                <Typography variant="h6" gutterBottom>Atributos</Typography>
                <Grid container spacing={1}>
                  {nftDetail.attributes.map((trait: NFTBase['attributes'][number]) => (
                    <Grid size={{ xs: 6, md: 4 }} key={trait.trait_type} sx={{ display: 'flex' }}>
                      <Paper
                        sx={{
                          p: 2,
                          flex: 1,
                          bgcolor: "#1a1a1a",
                          borderRadius: 2,
                          textAlign: "center",
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'start'
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
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
