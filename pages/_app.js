import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Roboto:wght@400;500;600;700&display=swap');
 body {
  background-color: #cbd5e1;
  padding: 0;
  margin: 0;
  font-family: 'Poppins', sans-serif;
 }
 hr {
  display: block;
  border: 0;
  border-top: 1px solid #cbd5e1;
 }
`;
