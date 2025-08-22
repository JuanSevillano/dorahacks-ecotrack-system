// import React, { useState, createContext, useContext } from "react";
// import { useBalance, useAccount, useConnect, injected, Connector, ConnectorEventMap, CreateConnectorFn, State, Transport } from "wagmi";
// import { Connection, PublicKey } from "@solana/web3.js";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
// import { Container, Typography, Button, Select, MenuItem, Paper } from "@mui/material";
// import { EventData } from "@wagmi/core/internal";
// import { EIP6963ProviderDetail } from "mipd";
// import { Chain, Client, EIP1193RequestFn } from "viem";

// const NetworkContext = createContext<Partial<{ network: string, setNetwork(net: string): void }>>({});

// export const useNetwork = () => useContext(NetworkContext);

// const NetworkProvider = ({ children }: { children: React.ReactNode }) => {
//     const [network, setNetwork] = useState("ethereum");
//     return (
//         <NetworkContext.Provider value={{ network, setNetwork }}>
//             {children}
//         </NetworkContext.Provider>
//     );
// };

// const WalletBalance = () => {
//     const { network } = useNetwork();
//     const { address, isConnected } = useAccount();
//     const esto = injected({})
//     const { connect } = useConnect({
//         config: {
//             chains: [{
//                 id: 0,
//                 name: "Ethereum Mainnet",
//                 nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
//                 rpcUrls: { default: { http: ["https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"] } }
//             }],
//             connectors: [],
//             storage: null,
//             state: {
//                 chainId: 0,
//                 connections: undefined,
//                 current: null,
//                 status: "connected"
//             },
//             setState: function <tchains extends readonly [Chain, ...Chain[]] = readonly [Chain, ...Chain[]]>(value: State<tchains> | ((state: State<tchains>) => State<tchains>)): void {
//                 throw new Error("Function not implemented.");
//             },
//             subscribe: function <state>(selector: (state: State<readonly [Chain, ...Chain[]]>) => state, listener: (state: state, previousState: state) => void, options?: { emitImmediately?: boolean | undefined; equalityFn?: ((a: state, b: state) => boolean) | undefined; } | undefined): () => void {
//                 throw new Error("Function not implemented.");
//             },
//             getClient: function <chainId extends number>(parameters?: { chainId?: number | chainId | undefined; } | undefined): Client<Record<number, Transport<string, Record<string, any>, EIP1193RequestFn>>[chainId], Extract<Chain, { id: chainId; }>> {
//                 throw new Error("Function not implemented.");
//             },
//             _internal: {
//                 mipd: undefined,
//                 store: [],
//                 ssr: false,
//                 syncConnectedChain: false,
//                 transports: undefined,
//                 chains: {
//                     setState: function (value: readonly [Chain, ...Chain[]] | ((state: readonly [Chain, ...Chain[]]) => readonly [Chain, ...Chain[]])): void {
//                         throw new Error("Function not implemented.");
//                     },
//                     subscribe: function (listener: (state: readonly [Chain, ...Chain[]], prevState: readonly [Chain, ...Chain[]]) => void): () => void {
//                         throw new Error("Function not implemented.");
//                     }
//                 },
//                 connectors: {
//                     providerDetailToConnector: function (providerDetail: EIP6963ProviderDetail): CreateConnectorFn {
//                         throw new Error("Function not implemented.");
//                     },
//                     setup: function <connectorFn extends CreateConnectorFn>(connectorFn: connectorFn): Connector<connectorFn> {
//                         throw new Error("Function not implemented.");
//                     },
//                     setState: function (value: Connector[] | ((state: Connector[]) => Connector[])): void {
//                         throw new Error("Function not implemented.");
//                     },
//                     subscribe: function (listener: (state: Connector[], prevState: Connector[]) => void): () => void {
//                         throw new Error("Function not implemented.");
//                     }
//                 },
//                 events: {
//                     change: function (data: EventData<ConnectorEventMap, "change">): void {
//                         throw new Error("Function not implemented.");
//                     },
//                     connect: function (data: EventData<ConnectorEventMap, "connect">): void {
//                         throw new Error("Function not implemented.");
//                     },
//                     disconnect: function (data: EventData<ConnectorEventMap, "disconnect">): void {
//                         throw new Error("Function not implemented.");
//                     }
//                 }
//             }
//         }
//     });
//     const [solanaAddress, setSolanaAddress] = useState("");
//     const [solanaBalance, setSolanaBalance] = useState(null);

//     const { data, isError, isLoading } = useBalance({
//         address: network === "ethereum" ? address : undefined,
//     });

//     const handleSolanaConnect = async () => {
//         try {
//             const provider = window.solana;
//             if (!provider) {
//                 throw new Error("Phantom Wallet not installed");
//             }
//             const resp = await provider.connect();
//             setSolanaAddress(resp.publicKey.toBase58());
//             const connection = new Connection("https://api.mainnet-beta.solana.com");
//             const balance = await connection.getBalance(new PublicKey(resp.publicKey));
//             setSolanaBalance(balance / 1e9); // Convert lamports to SOL
//         } catch (error) {
//             console.error("Solana connection error", error);
//         }
//     };

//     return (
//         <Container maxWidth="sm">
//             <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
//                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                     Retrieve Wallet Balance
//                 </Typography>
//                 <Select
//                     value={network}
//                     onChange={(e) => setNetwork(e.target.value)}
//                     fullWidth
//                     sx={{ mb: 2 }}
//                 >
//                     <MenuItem value="ethereum">Ethereum</MenuItem>
//                     <MenuItem value="solana">Solana</MenuItem>
//                 </Select>
//                 {network === "ethereum" ? (
//                     isConnected ? (
//                         <Typography sx={{ mb: 2 }}>Connected: {address}</Typography>
//                     ) : (
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             onClick={() => connect()}
//                         >
//                             Connect Ethereum Wallet
//                         </Button>
//                     )
//                 ) : (
//                     solanaAddress ? (
//                         <Typography sx={{ mb: 2 }}>
//                             Connected: {solanaAddress} | Balance: {solanaBalance} SOL
//                         </Typography>
//                     ) : (
//                         <Button
//                             variant="contained"
//                             color="success"
//                             fullWidth
//                             onClick={handleSolanaConnect}
//                         >
//                             Connect Solana Wallet
//                         </Button>
//                     )
//                 )}
//                 {isLoading && <Typography>Loading balance...</Typography>}
//                 {isError && <Typography color="error">Failed to fetch balance</Typography>}
//                 {data && network === "ethereum" && (
//                     <Typography>Balance: {data.formatted} {data.symbol}</Typography>
//                 )}
//             </Paper>
//         </Container>
//     );
// };

// const App = () => (
//     <NetworkProvider>
//         <WalletBalance />
//     </NetworkProvider>
// );

// export default App;
