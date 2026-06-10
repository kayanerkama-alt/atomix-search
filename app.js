async function search() {
  const query = document.getElementById("query").value;

  const resultsDiv =
    document.getElementById("results");

  resultsDiv.innerHTML =
    "<p>Searching...</p>";

  const response = await fetch(
    "/api/search",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify({
        query
      })
    }
  );

  const data = await response.json();

  if (!data.results) {
    resultsDiv.innerHTML =
      "<p>No results found.</p>";
    return;
  }

  resultsDiv.innerHTML = data.results
    .map(
      result => `
      <div class="result">
        <h3>
          <a href="${result.url}"
             target="_blank">
            ${result.title}
          </a>
        </h3>

        <p>
          ${result.description || ""}
        </p>
      </div>
    `
    )
    .join("");
}
