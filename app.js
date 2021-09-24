// require('dotenv').config();
const express = require("express");
const https = require("https");
const app = express();


app.use(express.urlencoded({ extended: true }));

require("dotenv").config();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


// Custom - Search API
const API_KEY = process.env.API_KEY;
const searchId = process.env.SEARCH_ID;

const defaultLink = "https://customsearch.googleapis.com/customsearch/v1?";



app.get("/", (req, res) => {
  res.render("home");
})

app.post("/", (req, res) => {
  
  const query = req.body.query;

  const link = `${defaultLink}q=${query}&cx=${searchId}&key=${API_KEY}`;
  if (query === "") {
    res.redirect("/")
  } else {
    https.get(link, (response) => {
      let body = "";
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        gResponse = JSON.parse(body);
        res.render("result", { query: req.body.query, content: gResponse })
      });
    }).on("error", (error) => console.error(error.message));
  }
})

app.post("/result", (req, res) => {
  const query = req.body.query;

  const link = `${defaultLink}q=${query}&cx=${searchId}&key=${API_KEY}`;

  if (query !== "") {
    https.get(link, (response) => {
      let body = "";
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        gResponse = JSON.parse(body);
        res.render("result", { query: req.body.query, content: gResponse })
      });
    }).on("error", (error) => console.error(error.message));
  }
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, () => {
  console.log("Server is up and running on port 3000");
})


