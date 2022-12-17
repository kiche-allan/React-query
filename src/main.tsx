import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </QueryClientProvider>
  </BrowserRouter>
);
