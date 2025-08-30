import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import { store } from "@/lib/store";
import { Toaster } from "@/components/ui/toaster";

function providers({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [queryClient] = useState(() => new QueryClient({}));

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </Provider>
  );
}

export default providers;
