import React from 'react';
import { useTokenData } from '../api/hooks/useTokenData';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

const TokenList: React.FC = () => {

  const { data, isLoading } = useTokenData();
  //  const formatter = new Intl.NumberFormat("es-Es", { style: "percent" });

  if (isLoading) return <p>Loading tokens...</p>;

  return (
    <List>
      <Typography variant='h1'>Tokens</Typography>
      {data?.map((token, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar src={token.image} />
          </ListItemAvatar>
          <ListItemText>
            <Typography variant='h6'>
              {token.symbol.toUpperCase()}
            </Typography>
            <Typography>
              {token.current_price + ' $'}
            </Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default TokenList;
