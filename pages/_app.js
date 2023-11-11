import { createGlobalStyle } from "styled-components";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
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
`;
