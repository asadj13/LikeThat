document.getElementById("search-btn").addEventListener("click", () => {
    const query = document.getElementById("search-input").value;
    
    if (!query) {
        alert("Please enter a search term.");
        return;
    }

    // Define SerpApi endpoint with query parameters
    const apiKey = "67e98a9baccc9ef786bea4f33d6830bc3a3de5a911bcebc500aa1d15aa8e6aca";
    const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&location=Dubai, United Arab Emirates&google_domain=google.ae&gl=ae&hl=en&tbm=isch&safe=active&api_key=${apiKey}`;
    
    // Use fetch to get data from SerpApi
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            console.log(json);
            displayResults(json);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Error fetching search results.");
        });
});

function displayResults(data) {
    const table = document.getElementById("resultsTable");
    const tableBody = table.querySelector("tbody");

    // Clear any existing results
    tableBody.innerHTML = "";

    // Check if there are results
    if (data.images_results && Array.isArray(data.images_results) && data.images_results.length > 0) {
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

        // Show the table if there are results
        table.style.display = "table";
    } else {
        alert("No results found.");
    }
}
