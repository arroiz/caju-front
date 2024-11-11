/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_SERVICE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import '@tanstack/react-query';

interface MyMeta extends Record<string, unknown> {
  errorMessage: string;
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: MyMeta;
    mutationMeta: MyMeta;
  }
}
