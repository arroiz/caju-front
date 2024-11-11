import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfirmationDialogProvider } from '~/contexts/ConfirmationDialogContext';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

type ReactQueryTestWrapperProps = PropsWithChildren<{}>;

export const ReactQueryTestWrapper = ({ children }: ReactQueryTestWrapperProps) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    <Toaster />
  </BrowserRouter>
);

type ConfirmationDialogWrapperProps = PropsWithChildren<{}>;

export const ConfirmationDialogWrapper = ({ children }: ConfirmationDialogWrapperProps) => (
  <ReactQueryTestWrapper>
    <ConfirmationDialogProvider>{children}</ConfirmationDialogProvider>
  </ReactQueryTestWrapper>
);
