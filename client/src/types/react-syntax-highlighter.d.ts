/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "react-syntax-highlighter" {
  export const Prism: any;
  export const Light: any;
}

// 👇 Ceci déclare tous les fichiers de style prism individuellement
declare module "react-syntax-highlighter/dist/esm/styles/prism/*" {
  const style: any;
  export = style;
}
