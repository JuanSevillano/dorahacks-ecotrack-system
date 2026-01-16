import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Page } from "../../contexts/app-context/Page";
import { useCollectionMetadata } from "../../api/hooks/useNFTCollection";
import FullpageLoading from "../../components/FullpageLoading";
import { NFTBase } from "@ecotrack/types";
import { useAppTheme } from "../../contexts/theme-context";


const ProjectDetail = () => {
    const navigate = useNavigate();
    const { data } = useCollectionMetadata();
    const { mode } = useAppTheme();

    if (!data) return <FullpageLoading />;
    const { items, name, symbol, image, description } = data;

    return (
        <Page title="NFT Detail">
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                style={{ borderBottom: '2px solid' }}
            >
                <img
                    src={image}
                    width='70%'
                    loading='lazy'
                    style={{
                        maxWidth: '600px',
                        borderRadius: '16px',
                        aspectRatio: '1/1',
                        backgroundColor: mode === 'dark' ? '#1a1a1a' : '#fff',
                    }} />
                <Typography variant='h3' marginTop={4}>{name} - {symbol}</Typography>
                <Typography variant='body1' py={4}>{description}</Typography>
            </Box>
            <ImageList cols={3} gap={20} >
                {items.map((item: NFTBase, index: number) => (
                    <ImageListItem
                        key={item.name + index + 1}
                        sx={{ borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}
                        onClick={() => {
                            console.log('Estamos entrando aquí', item);
                            navigate(`./${index + 1}`)
                        }}>
                        <img
                            srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=22x`}
                            src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                            alt={item.name}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Page>
    )
}

export default ProjectDetail;
