import { useRef } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ONE_DAY, ONE_SECOND } from "../../utils/time";

export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    const client = useRef(new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 30 * ONE_SECOND,
                gcTime: ONE_DAY,
                refetchOnWindowFocus: false
            }
        }
    })).current;

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}