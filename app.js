// SerpAPI key (replace with your actual key)
const apiKey = 'YOUR_SERPAPI_KEY';

// Function to fetch search results from SerpAPI
async function fetchSearchResults(query) {
    const apiUrl = `https://serpapi.com/search.json?q=${query}&engine=google&api_key=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.organic_results;
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
}

// Function to display the search results on the page
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear any previous results

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
            <a href="${result.link}" target="_blank">${result.title}</a>
            <p>${result.snippet}</p>
        `;
        resultsDiv.appendChild(resultItem);
    });
}

// Function to handle the search button click event
document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    
    if (query.trim() === '') {
        alert('Please enter a search term.');
        return;
    }

    // Fetch the search results
    const results = await fetchSearchResults(query);

    // Display the results on the page
    displayResults(results);
});
