
const { getJson } = require("serpapi");

getJson(
  {
    api_key: "67e98a9baccc9ef786bea4f33d6830bc3a3de5a911bcebc500aa1d15aa8e6aca",
    engine: "google",
    q: "Coffee",
    location: "Dubai, United Arab Emirates",
    google_domain: "google.ae",
    gl: "ae",
    hl: "en",
    tbm: "isch",
    safe: "active",
  },
  (json) => {
    console.log(json);
    displayResults(json);
  }
);

// Function to display results in a table
function displayResults(data) {
  const tableBody = document.querySelector("#resultsTable tbody");

  // Ensure data.items exists and is an array
  if (data.images_results && Array.isArray(data.images_results)) {
    data.images_results.forEach((item) => {
      const row = document.createElement("tr");

      // Title cell
      const titleCell = document.createElement("td");
      titleCell.textContent = item.title || "No Title";
      row.appendChild(titleCell);

      // Image cell with thumbnail
      const imageCell = document.createElement("td");
      const image = document.createElement("img");
      image.src = item.thumbnail || item.original || "";
      image.alt = item.title || "Image";
      image.width = 100;
      imageCell.appendChild(image);
      row.appendChild(imageCell);

      // Source cell
      const sourceCell = document.createElement("td");
      const link = document.createElement("a");
      link.href = item.link;
      link.textContent = item.source || "Source";
      sourceCell.appendChild(link);
      row.appendChild(sourceCell);

      tableBody.appendChild(row);
    });
  } else {
    console.error("No results found or data format is incorrect.");
  }
}
