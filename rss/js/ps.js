fetch("/posts.json")
  .then(response => response.json())
  .then(posts => {
    const container = document.getElementById("posts");

    posts
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .forEach(post => {
        const card = document.createElement("a");

        card.href = `/post.html?slug=${post.slug}`;
        card.className = "post-card";

        card.innerHTML = `
        <h2><a href="/post.html?slug=${post.slug}">${post.title}</a></h2>
        <small>${post.date}</small> <small>${post.author}</small> 
        <p>${post.description}</p>

`;


        container.appendChild(card);
      });
  })
  .catch(err => {
    console.error("Failed to load posts:", err);
  });