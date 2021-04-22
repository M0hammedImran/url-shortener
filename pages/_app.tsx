import { QueryClient, QueryClientProvider } from 'react-query';
import 'tailwindcss/tailwind.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: any) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    );
}

export default MyApp;
