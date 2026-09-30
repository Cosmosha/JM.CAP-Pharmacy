import type { MetadataRoute } from "next";
import { pharmacyConfig } from "@/lib/pharmacy-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: pharmacyConfig.website,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
