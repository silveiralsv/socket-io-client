import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

declare module "axios" {
  interface AxiosRequestConfig {
    disableUnauthorizedRedirect?: boolean;
    router?: AppRouterInstance;
  }
}
