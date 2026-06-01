
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.ttfrech.co.za/sitemap.xml",
  };
}
