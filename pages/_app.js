import "@/styles/globals.css";
import store from "@/store";
import { Provider } from "react-redux";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="author" content="Shamim Mahmud" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Video Management Web App</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
