import { Box, Container } from "@mui/material";

// TODO: here we can make a layout Page main screen so all Pages goes by the same structure
export const Page = ({ children }: { title: string; children: React.ReactNode }) => (
    <Container fixed>
        <Box
            paddingTop={80}
            alignContent='start'
            justifyContent='stretch'>
            <div>
                {children}
            </div>
        </Box>
    </Container >
);
