import { ImageLoaderProps } from "next/image";

export const unsplashLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}&fm=jpg&fit=max`;
};
