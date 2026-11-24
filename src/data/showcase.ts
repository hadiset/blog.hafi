import type { ImageMetadata } from "astro";
import Porto1Thumbnail from "../assets/Prtfl1/Thumbnail.webp";
import Porto2Thumbnail from "../assets/Prtfl2/Thumbnail.webp";

export interface ShowcaseProject {
  slug: string;
  title: string;
  thumbnail: ImageMetadata;
  tags: string[];
}

// Newest first.
export const projects: ShowcaseProject[] = [
  {
    slug: "smg-wo",
    title: "Semarang Wedding Organizer",
    thumbnail: Porto2Thumbnail,
    tags: ["Landing Page", "Wedding Organizer"],
  },
  {
    slug: "porto-1",
    title: "Modern Product Launch",
    thumbnail: Porto1Thumbnail,
    tags: ["Landing Page", "Product Launch"],
  },
];
