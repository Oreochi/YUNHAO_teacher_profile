fetch("data/publications.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load publications.json");
    }
    return response.json();
  })
  .then(publications => {
    const publicationList = document.getElementById("publication-list");

    publicationList.innerHTML = "";

    publications
      .sort((a, b) => b.year - a.year)
      .forEach(pub => {
        const item = document.createElement("article");
        item.className = "publication-item";

        const links = [];

        if (pub.links.paper) {
          links.push(`<a href="${pub.links.paper}" target="_blank">Paper</a>`);
        }

        if (pub.links.doi) {
          links.push(`<a href="${pub.links.doi}" target="_blank">DOI</a>`);
        }

        if (pub.links.pdf) {
          links.push(`<a href="${pub.links.pdf}" target="_blank">PDF</a>`);
        }

        if (pub.links.code) {
          links.push(`<a href="${pub.links.code}" target="_blank">Code</a>`);
        }

        if (pub.links.project) {
          links.push(`<a href="${pub.links.project}" target="_blank">Project</a>`);
        }

        item.innerHTML = `
          <div class="publication-meta">
            <span>${pub.type}</span>
            <span>${pub.year}</span>
            <span>${pub.status}</span>
          </div>

          <h3>${pub.title}</h3>
          <p class="authors">${pub.authors}</p>
          <p class="venue">${pub.venue}</p>

          <div class="publication-links">
            ${links.join("")}
          </div>
        `;

        publicationList.appendChild(item);
      });
  })
  .catch(error => {
    console.error(error);
    document.getElementById("publication-list").textContent =
      "Unable to load publications.";
  });