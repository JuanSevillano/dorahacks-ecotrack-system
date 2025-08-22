import { Avatar, IconButton, Tooltip } from '@mui/material'
import { useConnect, useDisconnect } from 'wagmi'
import { useWallet } from '../contexts/wallet/WalletContext'
import { metaMask } from 'wagmi/connectors'
import { useCallback } from 'react'


export default function ConnectButton() {
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();
    const { isConnected, address } = useWallet();

    const handleConnect = useCallback(() => connect({ connector: metaMask() }), [connect]);

    const handleDisconnect = useCallback(() => disconnect(), [disconnect]);

    return (
        <Tooltip title={isConnected ? `Disconnect from ${address}` : 'Connect Wallet'}>
            <Avatar
                component={IconButton}
                color={isConnected ? 'success' : 'error'}
                onClick={isConnected ? handleDisconnect : handleConnect}
            />
        </Tooltip>

    )
}
