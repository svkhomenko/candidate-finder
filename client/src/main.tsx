import { StrictMode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './styles/theme';
import '@fontsource/inter';
import { BrowserRouter } from 'react-router-dom';
import Loader from './components/Loader';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
