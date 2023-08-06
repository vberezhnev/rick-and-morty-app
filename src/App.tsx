import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Results } from "./components/Results";

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Results />
    </QueryClientProvider>
  );
};
