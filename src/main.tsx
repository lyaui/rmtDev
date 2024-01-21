import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BookmarksContextProvider from './contexts/BookmarksContextProvider';
import App from './components/App.tsx';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarksContextProvider>
        <App />
      </BookmarksContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
