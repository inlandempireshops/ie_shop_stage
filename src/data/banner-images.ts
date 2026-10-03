import { CarouselImages } from "@/types/localTypes";
import davisDark from "~/public/images/davisDark.jpeg";
import soniaDark from "~/public/images/soniaDark.jpeg";
import soniaLight from "~/public/images/soniaLight.jpeg";
import silasLight from "~/public/images/silasLight.jpeg";

export const bannerImages: CarouselImages[] = [
  {
    id: 1,
    src: davisDark,
    alt: "Images of models wearing ie hats",
  },
  {
    id: 2,
    src: soniaDark,
    alt: "Images of models wearing ie hats",
  }
]

export const bannerImagesDesktop: CarouselImages[] = [
  {
    id: 1,
    src: silasLight,
    alt: "Images of models wearing ie hats",
  },
  {
    id: 2,
    src: soniaLight,
    alt: "Images of models wearing ie hats",
  }
]