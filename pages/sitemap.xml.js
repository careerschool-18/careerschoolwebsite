export async function getServerSideProps({ res }) {
  const baseUrl = "https://careerschool.co.in";

  const urls = [
    "",
    "/nellorepython",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === "" ? "1.0" : "0.9"}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap.trim());
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
