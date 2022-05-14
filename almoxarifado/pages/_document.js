import { ServerStyleSheets } from '@material-ui/core/styles';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

// Código pronto para arrumar a rendenização do Materials UI , essa é a unica finalidade desse arquivo _documents.js
export default class Mydocuments extends Document {
  render() {
    return (
      <Html lang="pt">
        <Head>
          <link
            rel="stylesheet"
            //Fonte Padrão
            href="https://fonts.googleapis.com/css?family=Robot:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

Mydocuments.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const OriginalRenderPage = ctx.renderPage;
  ctx.renderPage = () => {
    return OriginalRenderPage({
      //App como parametro -> props como parametro
      enhanceApp: (App) => (props) => sheets.collect(<app {...props} />),
    });
  };
  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
