import { Avatar, Button, IconButton, Tooltip } from '@mui/material'
import { useConnect, useDisconnect } from 'wagmi'
import { metaMask } from 'wagmi/connectors'
import { useCallback } from 'react'
import { useWallet } from '../api/hooks/useWallet';
import { useViewport } from '../contexts/layout-context/media-queries';
import { AccountBalanceWallet } from '@mui/icons-material';

export default function ConnectButton() {
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();
    const { isMobile } = useViewport();

    const { isConnected, address } = useWallet();

    const handleConnect = useCallback(() => connect({ connector: metaMask() }), [connect]);

    const handleDisconnect = useCallback(() => disconnect(), [disconnect]);
    if (isConnected) return (
        <Tooltip title={isConnected ? `Disconnect from ${address}` : 'Connect Wallet'}>
            <Avatar
                sx={{
                    border: '3px solid white'
                }}
                color='primary'
                component={IconButton}
                onClick={handleDisconnect}
            />
        </Tooltip>
    );

    return (
        <Button
            variant="contained"
            color='primary'
            sx={{ color: 'white' }}
            onClick={handleConnect}
        >
            {isMobile ? <AccountBalanceWallet /> : 'Connect Wallet'}
        </Button>
    )

}
