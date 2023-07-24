const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const requestIp = require("request-ip");

require("dotenv").config();

app.use(cors());

// API HOMEPAGE
app.get("/", (req, res) => {
  res.send("Welcome to Unofficial Fotmob Football API");
});

//  GET REQUEST LOCATION
app.get(`/v1/mylocation/`, (req, res) => {
  const getData = async () => {
    const data = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GEO_API_KEY}`
    ).then((r) => r.json());
    const result = await data;
    var clientIp = requestIp.getClientIp(req);
    console.log(clientIp);

    res.json({ responses: result, ip: clientIp });
  };
  getData();
});

// GET REQUEST MATCHES
app.get(
  "/v1/matches",
  (req, res, next) => {
    if (req.query.apikey == process.env.MY_API_KEY) next("route");
    else next();
  },
  (req, res, next) => {
    // send a regular response
    res.json({ Error, message: "Your are not authorized to access this API." });
    console.log(req.query);
  }
);

app.get(`/v1/matches`, (req, res, next) => {
  const date = req.query.date;
  const timezone = req.query.timezone;
  const ccode = req.query.ccode3;
  console.log("date: ", date);
  console.log("apikey: ", process.env.MY_API_KEY);

  const getData = async () => {
    const data = await fetch(
      `https://www.fotmob.com/api/matches?date=${date}&timezone=${timezone}&ccode3=${ccode}`
    ).then((r) => r.json());

    const result = await data;

    res.json({
      date: date,
      timezone: timezone,
      countryCode: ccode,
      responses: result,
    });
  };
  getData();
});
//

// GET REQUEST ALL LEAGUES
app.get(
  "/v1/allLeagues",
  (req, res, next) => {
    // if the user ID is 0, skip to the next route
    if (req.query.apikey == process.env.MY_API_KEY) next("route");
    // otherwise pass the control to the next middleware function in this stack
    else next();
  },
  (req, res, next) => {
    // send a regular response
    res.json({ Error, message: "Your are not authorized to access this API." });
    console.log(req.query);
    console.log(apiKeys);
  }
);

app.get(`/v1/allLeagues`, (req, res, next) => {
  const getData = async () => {
    const data = await fetch(`https://www.fotmob.com/api/allLeagues`).then(
      (r) => r.json()
    );
    const result = await data;
    res.json({
      responses: result,
    });
  };
  getData();
});
//

// GET REQUEST LEAGUE DETAILS
// https://www.fotmob.com/api/leagues?id=47&ccode3=IDN&season=2022/2023

// GET REQUEST TABLES
// https://www.fotmob.com/api/tltable?leagueId=47

// GET REQUEST MATCH by id
//www.fotmob.com/api/match?id=4173719

// GET REQUEST MATCH DETAILS by match id
// https://www.fotmob.com/api/matchDetails?matchId=4183889

// GET REQUEST TEAM DETAILS
// https://www.fotmob.com/api/teams?id=9825&ccode3=IDN

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
