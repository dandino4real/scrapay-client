// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Auth0Provider } from '@auth0/auth0-react'; 
import App from './App';
import theme from './theme';
import { BooksProvider } from './context/BookContext';


const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
      >
          <BooksProvider>
          <App />
        </BooksProvider>
      </Auth0Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


