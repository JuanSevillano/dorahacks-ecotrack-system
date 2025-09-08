import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import { TokenData } from '../../dts/token'

const fetchTokenList = async () => {
  // TODO: create get and post methods that can be used in the app
  // as typed functions, so we now which data we are getting or posting
  const { data } = await axios.get<ReadonlyArray<TokenData>>(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc", // Todo: add a dropdown to change this
        per_page: 50, // Number of tokens
        page: 1,
        sparkline: false,
      },
    }
  );
  return data;
};

// TODO: this should goes in Api folder instead of here
// so we have Types and Hooks inside Api folder
export const useTokenData = () => useQuery({ queryKey: ['tokens'], queryFn: fetchTokenList });

