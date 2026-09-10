import { RefObject } from "react";
import type { StaticImport, StaticImageData } from "next/dist/shared/lib/get-img-props";

export type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>

export type CarouselImages = {
  id: number;
  src: StaticImageData;
  alt: string;
};

export type hatProducts = {
  id: number,
  src: StaticImageData, 
  alt: string,
  sizes: string[],
  description: string,
  price: number
}

