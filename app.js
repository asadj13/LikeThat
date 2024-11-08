const { getJson } = require("serpapi");

getJson({
  api_key: "67e98a9baccc9ef786bea4f33d6830bc3a3de5a911bcebc500aa1d15aa8e6aca",
  engine: "google",
  q: "Coffee",
  location: "Dubai, United Arab Emirates",
  google_domain: "google.ae",
  gl: "ae",
  hl: "en",
  tbm: "isch",
  safe: "active"
}, (json) => {
  console.log(json);
});
