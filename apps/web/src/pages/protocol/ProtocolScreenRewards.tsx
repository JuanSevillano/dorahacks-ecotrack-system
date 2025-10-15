import React from "react";
import {
    Box,
    Grid,
    Typography,
    Paper,
    useTheme,
    SvgIcon,
} from "@mui/material";

export const B3TRRewardsSection: React.FC = () => {
    const theme = useTheme();

    return (
        <Box component="section" sx={{ mt: 16 }}>
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                    mb: 6,
                    color: theme.palette.mode === "dark" ? "common.white" : "grey.900",
                }}
            >
                B3TR Rewards System
            </Typography>

            <Typography
                sx={{
                    color: theme.palette.mode === "dark" ? "grey.400" : "grey.600",
                    lineHeight: 1.8,
                    mb: 8,
                    maxWidth: 900,
                }}
            >
                The B3TR rewards system is an integral part of the VerdeCap protocol,
                designed to incentivize and reward users for their contributions to
                carbon reduction. By participating in the ecosystem, users earn B3TR
                tokens, fostering a community-driven approach to sustainability.
            </Typography>

            <Grid container spacing={4}>
                {/* Card 1 */}
                <Grid item xs={12} md={6}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 4,
                            borderRadius: 2,
                            backgroundColor:
                                theme.palette.mode === "dark"
                                    ? "rgba(17, 24, 39, 0.4)"
                                    : "background.paper",
                            borderColor:
                                theme.palette.mode === "dark"
                                    ? "rgba(31, 41, 55, 0.5)"
                                    : "rgba(229, 231, 235, 0.5)",
                        }}
                    >
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor:
                                        theme.palette.mode === "dark"
                                            ? "primary.main"
                                            : "primary.light",
                                    color: "primary.main",
                                    opacity: 0.2,
                                    position: "relative",
                                }}
                            >
                                <SvgIcon
                                    sx={{
                                        color: theme.palette.primary.main,
                                        opacity: 1,
                                        position: "absolute",
                                    }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 10h.01M17 10h.01M7 14h.01M17 14h.01"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 18c-1.657 0-3-.895-3-2s1.343-2 3-2 3-.895 3-2-1.343-2-3-2m0 8v1m0-1c1.11 0 2.08-.402 2.599-1"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 10V7a5 5 0 017-3.873M19 14v3a5 5 0 01-7 3.873"
                                    />
                                </SvgIcon>
                            </Box>

                            <Typography
                                variant="h6"
                                fontWeight="600"
                                sx={{
                                    color:
                                        theme.palette.mode === "dark"
                                            ? "common.white"
                                            : "grey.900",
                                }}
                            >
                                Earning B3TR Tokens
                            </Typography>
                        </Box>

                        <Typography
                            sx={{
                                color:
                                    theme.palette.mode === "dark" ? "grey.400" : "grey.600",
                            }}
                        >
                            Users earn B3TR tokens by taking actions that contribute to the
                            VerdeCap ecosystem, such as registering a bio-house, providing
                            verified data, or participating in governance.
                        </Typography>
                    </Paper>
                </Grid>

                {/* Card 2 */}
                <Grid item xs={12} md={6}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 4,
                            borderRadius: 2,
                            backgroundColor:
                                theme.palette.mode === "dark"
                                    ? "rgba(17, 24, 39, 0.4)"
                                    : "background.paper",
                            borderColor:
                                theme.palette.mode === "dark"
                                    ? "rgba(31, 41, 55, 0.5)"
                                    : "rgba(229, 231, 235, 0.5)",
                        }}
                    >
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor:
                                        theme.palette.mode === "dark"
                                            ? "primary.main"
                                            : "primary.light",
                                    color: "primary.main",
                                    opacity: 0.2,
                                    position: "relative",
                                }}
                            >
                                <SvgIcon
                                    sx={{
                                        color: theme.palette.primary.main,
                                        opacity: 1,
                                        position: "absolute",
                                    }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                    />
                                </SvgIcon>
                            </Box>

                            <Typography
                                variant="h6"
                                fontWeight="600"
                                sx={{
                                    color:
                                        theme.palette.mode === "dark"
                                            ? "common.white"
                                            : "grey.900",
                                }}
                            >
                                Protocol Integration
                            </Typography>
                        </Box>

                        <Typography
                            sx={{
                                color:
                                    theme.palette.mode === "dark" ? "grey.400" : "grey.600",
                            }}
                        >
                            B3TR tokens are seamlessly integrated into the protocol, allowing
                            users to stake them for additional rewards, vote on proposals, and
                            access exclusive features within the marketplace.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};