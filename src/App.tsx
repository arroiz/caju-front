import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';
import { Header, HeaderTitle } from './components/Header';
import { Router } from '~/router';
import { queryClient } from '~/config/queryClient';
import { GlobalStyle } from './styles/global';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Header>
        <HeaderTitle>Plataforma de Admissão</HeaderTitle>
      </Header>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}
