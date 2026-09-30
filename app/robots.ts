import type { MetadataRoute } from "next";
import { pharmacyConfig } from "@/lib/pharmacy-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${pharmacyConfig.website}/sitemap.xml`,
    host: pharmacyConfig.website,
  };
}
