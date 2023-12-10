const hbs = require("hbs");
const path = require("path");
const express = require("express");
const forcast = require("./utils/forcast");
require("dotenv").config();
// const geocode = require("./utils/geocode");
const PORT = process.env.PORT || 3000;
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
app.set(express.static(publicDirectoryPath));
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directorty to server
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ali Nour",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You should provide an address",
    });
  }
  forcast(req.query.address, (error, { Temp, Forcast, address } = {}) => {
    if (error) {
      res.send({
        Message: "Error",
        error,
      });
    } else {
      res.send({
        Forcast,
        address,
      });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Ali Nour",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text.",
    name: "Ali Nour",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ali Nour",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    content: "Page Not Found !",
    name: "Ali Nour",
  });
});

app.listen(PORT, () => {
  console.log("Server is up om port 3000.");
});
