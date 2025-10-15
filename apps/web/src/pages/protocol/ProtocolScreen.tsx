import {
    Typography,
    Box,
    Grid,
    useTheme,
} from "@mui/material";
import SectionContainer from "../../components/sections/SectionContainer";
import { Page } from "../../contexts/app-context/Page";
import { CardList } from "../../components/cards/CardList";
import { B3TRRewardsSection } from "./ProtocolScreenRewards";

export const VerdeCapProtocolPage = () => {
    const theme = useTheme();

    return (
        <Page title="protocolo">
            <Box textAlign="center" mb={8}>
                <Typography
                    variant="h2"
                    fontWeight={800}
                    gutterBottom
                    sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}
                >
                    VerdeCap Protocol
                </Typography>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    maxWidth="sm"
                    mx="auto"
                >
                    A transparent, secure, and efficient framework for creating and
                    managing carbon credits from bio-houses.
                </Typography>
            </Box>

            <SectionContainer
                title="Overview"
                content={`VerdeCap's protocol leverages blockchain technology to ensure transparency, security, and efficiency in the carbon credit lifecycle. It integrates environmental data with technical processes to accurately quantify and verify carbon reductions, creating a trustworthy ecosystem for sustainable investment.`}
            />

            <Grid container spacing={6} mt={4}>
                <Grid item xs={12} md={6}>
                    <SectionContainer
                        title="Environmental Component"
                        items={[
                            {
                                icon: "🏡",
                                title: "Bio-House Assessment",
                                description: "Initial assessment of the bio-house's design and materials to estimate potential carbon savings.",
                            },
                            {
                                icon: "📊",
                                title: "Data Monitoring",
                                description: "Continuous monitoring of energy consumption and other relevant environmental metrics.",
                            },
                            {
                                icon: "✅",
                                title: "Verification",
                                description: "Third-party verification of data accuracy and compliance with international environmental standards.",
                            },
                        ]}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <SectionContainer
                        title="Technical Component"
                        items={[
                            {
                                icon: "🎨",
                                title: "NFT Generation",
                                description: "Creation of unique, non-fungible tokens (NFTs) representing verified carbon credits.",
                            },
                            {
                                icon: "🔗",
                                title: "Blockchain Management",
                                description: "Secure storage and management of carbon credit NFTs on a decentralized blockchain.",
                            },
                            {
                                icon: "💱",
                                title: "Transaction Processing",
                                description: "Facilitation of peer-to-peer carbon credit transactions and ownership transfers.",
                            },
                        ]}
                    />
                </Grid>
            </Grid>

            <Grid mt={12}>
                <Typography
                    variant="h4"
                    textAlign="center"
                    fontWeight={700}
                    gutterBottom
                >
                    Protocol Process Flow
                </Typography>
                <CardList items={[
                    {
                        title: "Bio-House Registration",
                        description: "Owners register their bio-house, providing initial data for carbon reduction assessment.",
                    },
                    {
                        title: "Data Verification",
                        description: "Data is monitored and verified by independent auditors to ensure accuracy.",
                    },
                    {
                        title: "Biokey NFT Minting",
                        description: "Verified carbon reductions are minted as Biokey NFTs on the blockchain.",
                    },
                ]} />
            </Grid>
            <B3TRRewardsSection />
        </Page>
    );
}
