import { Box, Container, ImageList, ImageListItem, Typography } from "@mui/material";
import myImage from '../../assets/home/image.jpeg';
import headerImage from '../../assets/home/image.jpeg';

const itemData = [{
    img: myImage,
    title: 'Titulo diferente'
},
{
    img: myImage,
    title: 'Otro diferente'
},
{
    img: myImage,
    title: 'Este es diferente'
},
{
    img: myImage,
    title: 'Otra cosa es diferente'
},
{
    img: myImage,
    title: 'Asi pasaaa diferente'
},
{
    img: myImage,
    title: 'Asi pasaaa diferente'
},
{
    img: myImage,
    title: 'Asi pasaaa diferente'
},
{
    img: myImage,
    title: 'Asi pasaaa diferente'
},
{
    img: myImage,
    title: 'Asi pasaaa diferente'
}] as const;

const Header = () => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            padding='40px'
            style={{ borderBottom: '2px solid' }}
        >
            <img src={headerImage} width='70%' style={{ maxWidth: '600px' }} />
            <Typography variant='h3' marginTop={4}>
                Phillipine house
            </Typography>
            <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, sequi sint reprehenderit molestias dolores accusantium repudiandae quae sit
            </Typography>
        </Box>
    )
}

const ProjectDetail = () => {

    return (
        <Container sx={{ paddingBottom: '80px' }}>
            <Header />
            <ImageList cols={3} >
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    )
}

export default ProjectDetail;
