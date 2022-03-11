import { Router } from "./Router"
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

export const Root = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router />
        </QueryClientProvider>
    )
}