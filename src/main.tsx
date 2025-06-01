import { registerSW } from 'virtual:pwa-register';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store } from "./store";
import ErrorBoundary from './Root/ErrorBoundary.tsx';
import { CartProvider } from './context/CartContext.tsx';

const updateSW = registerSW({
  onNeedRefresh() {
    // Notify user there's an update
    const shouldReload = window.confirm("New content available. Reload?");
    if (shouldReload) updateSW(true);
  },
  onOfflineReady() {
    console.log("App is ready to work offline.");
  },
});

createRoot(document.getElementById('root')!).render(
    <ErrorBoundary>
      <Provider store={store}>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </CartProvider>
      </Provider>
    </ErrorBoundary>
)
