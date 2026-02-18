export default function Feed() {
    return null;
  }
  
  export async function getServerSideProps({ res }) {
    const baseUrl = "https://careerschool.co.in";
  
    const posts = [
      {
        title: "Python Career Guide",
        slug: "python-career-guide",
        description: "Complete roadmap to become Python developer",
        date: new Date().toUTCString(),
      },
    ];
  
    const feed = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Careerschool Blog</title>
      <link>${baseUrl}</link>
      <description>Latest training updates</description>
      ${posts
        .map(
          (post) => `
      <item>
        <title>${post.title}</title>
        <link>${baseUrl}/blog/${post.slug}</link>
        <description>${post.description}</description>
        <pubDate>${post.date}</pubDate>
      </item>`
        )
        .join("")}
    </channel>
  </rss>`;
  
    res.setHeader("Content-Type", "application/xml");
    res.write(feed);
    res.end();
  
    return {
      props: {},
    };
  }
  