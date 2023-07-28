const express = require("express");
const app = express();
const port = 3001;
const path = require("path");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
let publicPath = path.join(__dirname, "public");
let docPath = path.join(__dirname, "public");

const isAuth = (req, res, next) => {
  const auth = req.header("X-API-KEY");
  const base = req.header("X-Base-URL");
  if (auth === process.env.API_KEY && base === process.env.BASE_URL) {
    next();
  } else {
    res.status(401);
    res.json({
      error: "Access forbidden, you are not authorized to access this API!",
    });
  }
};

// API HOMEPAGE
app.get("/", (req, res) => {
  res.sendFile(`${publicPath}/index.html`);
});

app.get("/documentation-v1", (req, res) => {
  res.sendFile(`${docPath}/documentation.html`);
});

// GET LEAGUES
app.get("/v1/allLeagues", isAuth, (req, res) => {
  const getAllLeagues = async () => {
    const allLeagues = await fetch(
      `https://www.fotmob.com/api/allLeagues`
    ).then((r) => r.json());

    res.json(allLeagues);
  };
  getAllLeagues();
});

// GET LEAGUE BY ID
app.get("/v1/leagues", isAuth, (req, res) => {
  let id = req.query.id;
  let season = req.query.season;

  const getLeagues = async () => {
    if (!id) {
      return res.json({
        error: "Required League ID, League ID cannot be empty!",
      });
    }

    const leagues = await fetch(
      `https://www.fotmob.com/api/leagues?id=${id}&season=${season}`
    ).then((r) => r.json());

    res.json(leagues);
  };
  getLeagues();
});

// GET MATCHES
app.get("/v1/matches", isAuth, (req, res) => {
  const date = req.query.date;
  const timezone = req.query.timezone;
  const ccode = req.query.ccode3;

  const getMatches = async () => {
    if (!date) {
      return res.json({ error: "Require date, date cannot be empty!" });
    }

    const matches = await fetch(
      `https://www.fotmob.com/api/matches?date=${date}&timezone=${timezone}&ccode3=${ccode}`
    ).then((r) => r.json());

    res.json(matches);
  };
  getMatches();
});

// GET MATCH DETAILS
app.get("/v1/matchDetails", isAuth, (req, res) => {
  const id = req.query.id;

  const getMatchDetails = async () => {
    if (!id) {
      return res.json({ error: "Match ID cannot be empty!" });
    }
    const matchDetails = await fetch(
      `https://www.fotmob.com/api/matchDetails?matchId=${id}`
    ).then((r) => r.json());

    res.json(await matchDetails);
  };
  getMatchDetails();
});

// GET TABLES
app.get("/v1/tables", isAuth, (req, res) => {
  const id = req.query.id;

  const getTables = async () => {
    if (!id) {
      return res.json({ error: "League ID cannot be empty!" });
    }
    const table = await fetch(
      `https://www.fotmob.com/api/tltable?leagueId=${id}`
    )
      .then((r) => r.json())

      .catch((error) => {
        if (error) {
          return error;
        }
      });

    if (!table) {
      return res.json({ error: "No Data Found" });
    }
    res.json({ leagues: table });
  };

  getTables();
});

// GET TEAMS
app.get("/v1/teams", isAuth, (req, res) => {
  const id = req.query.id;

  const getTeams = async () => {
    if (!id) {
      return res.json({
        error: "Required Team ID, Team ID cannot be empty!",
      });
    }
    const teams = await fetch(`https://www.fotmob.com/api/teams?id=${id}`).then(
      (r) => r.json()
    );

    res.json(teams);
  };
  getTeams();
});

// GET PLAYERS
app.get("/v1/players", isAuth, (req, res) => {
  const id = req.query.id;

  const getPlayers = async () => {
    if (!id) {
      return res.json({
        error: "Required Players ID, Players ID cannot be empty!",
      });
    }
    const players = await fetch(
      `https://www.fotmob.com/api/playerData?id=${id}`
    ).then((r) => r.json());

    res.json(players);
  };
  getPlayers();
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));
