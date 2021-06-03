import { ChakraProvider } from "@chakra-ui/react"

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <style>{`
        @font-face {
          font-family: 'martinhand';
          src: url('martinhand-webfont.woff2') format('woff2'),
               url('martinhand-webfont.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }
        body, html, #__next { width: 100%; height: 100%; background-color: rgba(0,0,0,0); }
        body { font-family: martinhand; }
        * { image-rendering: optimizequality; image-rendering: high-quality; }
      `}</style>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
