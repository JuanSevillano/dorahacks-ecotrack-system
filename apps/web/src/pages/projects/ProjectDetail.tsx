import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Page } from "../../contexts/app-context/Page";
import { useCollectionMetadata } from "../../api/hooks/useNFTCollection";
import FullpageLoading from "../../components/FullpageLoading";


const ProjectDetail = () => {
    const navigate = useNavigate();
    const { data } = useCollectionMetadata();

    if (!data) return <FullpageLoading />;
    const { items, name, symbol, image } = data;

    return (
        <Page title="NFT Detail">
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                style={{ borderBottom: '2px solid' }}
            >
                <img src={image} width='70%' style={{ maxWidth: '600px', borderRadius: '16px' }} />
                <Typography variant='h3' marginTop={4}>{name} - {symbol}</Typography>
            </Box>
            <ImageList cols={3} gap={20} >
                {items.map((item, index) => (
                    <ImageListItem
                        key={item.name + index + 1}
                        sx={{ borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}
                        onClick={() => navigate(`project/biokeys/${index + 1}`)}>
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
