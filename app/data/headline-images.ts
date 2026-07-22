import groupDark from "~/public/images/group-dark.jpeg";
import shelDark from "~/public/images/shel-solo-dark.jpeg";
import davisDark from "~/public/images/davis-solo-dark.jpeg"
import darrylDark from "~/public/images/darryl-solo-dark.jpeg";
import { StaticImageData } from "next/image";

type HeadlineImage = {
  id: number;
  src: StaticImageData;
  alt: string;
};

export const headlineImgs = [
  {
    id: 1,
    src: shelDark,
    alt: "Image of ie shop models wearing ie hat with dark background"
  },
  {
    id: 2,
    src: davisDark,
    alt: "Image of ie shop male model wearing ie hat with dark background"
  },
  {
    id: 3,
    src: groupDark,
    alt: "Image of ie shop male model wearing ie hat with dark background"
  },
  // {
  //   id: 4,
  //   src: darrylDark,
  //   alt: "Image of ie shop male model wearing ie hat with dark background"
  // }
]