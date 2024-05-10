import App from "app";
import React from "react";
import "./View/css/common.css";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import store from "./View/Common/reducer";
import { getCookie } from "View/utils/cookie/cookie";
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const userInfo = getCookie("accessToken");
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  }),
});

root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <Provider store={store}>
        <App userInfo={userInfo} />
      </Provider>
    </RecoilRoot>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
