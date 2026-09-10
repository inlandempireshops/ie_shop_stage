import greenSnap from "~/public/images/green-ie-snap.jpg";
import greenFitted from "~/public/images/green-ie-fitted.jpg";
import { hatProducts } from "@/types/localTypes"

export const hats: hatProducts[] = [
  {
    id: 1,
    src: greenSnap,
    alt: "The green Inland Empire snapback",
    sizes: ["small", "medium", "large"],
    description: "Forest Green / Snapback",
    price: 29.99
  },
  {
    id: 2,
    src: greenFitted,
    alt: "The green Inland Empire fitted hat",
    sizes: ["small", "medium", "large"],
    description: "Forest Green / Stretch",
    price: 29.99
  }
]