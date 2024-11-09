/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_SERVICE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
