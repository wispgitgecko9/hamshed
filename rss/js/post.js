const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

if (!slug) {
  document.getElementById("post").innerHTML = "<p>Post not found.</p>";
} else {
  fetch(`rss/posts/${slug}.md`)
    .then(res => {
      if (!res.ok) throw new Error("Post not found");
      return res.text();
    })
    .then(md => {
      let frontmatter = {};
      
      // Extract frontmatter
      const match = md.match(/^---\n([\s\S]*?)\n---/);
      if (match) {
        frontmatter = jsyaml.load(match[1]);
        md = md.replace(match[0], "").trim(); // Remove frontmatter
      }

      // Fill header
      document.getElementById("post-title").textContent = frontmatter.title || "Untitled";
      document.getElementById("post-description").textContent = frontmatter.description || "";
      document.getElementById("post-date").textContent = frontmatter.date || "";
      document.getElementById("post-author").textContent = frontmatter.author || "";

      // Render Markdown
      document.getElementById("post").innerHTML = marked.parse(md);
    })
    .catch(err => {
      console.error(err);
      document.getElementById("post").innerHTML = "<p>Post not found.</p>";
    });
}
