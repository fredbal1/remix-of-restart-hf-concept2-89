import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    inert?: boolean | "" | (T extends Element ? never : never) | undefined;
  }
}
