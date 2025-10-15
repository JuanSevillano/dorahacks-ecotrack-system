import { Card, Grid, Typography } from "@mui/material";

type Item = {
    title: string;
    description: string;
}

export const CardList = ({ items }: { items: Array<Item> }) => <Grid container spacing={6} mt={2}>
    {items.map((step, i) => (
        <Grid item xs={12} md={4} key={i}>
            <Card
                variant="outlined"
                sx={{
                    p: 4,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    transition: 'box-shadow 0.3s, transform 0.3s',
                    height: '100%',

                    '&:hover': {
                        boxShadow: `0px 10px 20px rgba(134, 134, 134, 0.2)`,
                        transform: 'translateY(-5px)',
                    }
                }}
            >
                <Typography variant="h4" fontWeight='bold' gutterBottom>
                    {step.title}
                </Typography>
                <Typography variant='h6' color="text.secondary" mt={1}>
                    {step.description}
                </Typography>
            </Card>
        </Grid>
    ))}
</Grid>