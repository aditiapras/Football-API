const express = require("express");
const app = express();
const port = 4003;
const path = require("path");
const cors = require("cors");
const teamById = require("./teams/teamsDetails.js");
const teamSquad = require("./teams/teamsSquads.js");
const teamFixtures = require("./teams/teamsFixtures.js");
const teamTransfers = require("./teams/teamsTransfers.js");
const teamForms = require("./teams/teamForm.js");
const allLeagues = require("./leagues/allLeagues.js");
const leagueDetails = require("./leagues/leagueDetails.js");
const leagueTables = require("./leagues/leagueTables.js");
const leagueTransfers = require("./leagues/leagueTransfers.js");
const leagueFixtures = require("./leagues/leagueFixtures.js");
const matchPlayoff = require("./leagues/leaguePlayoff.js");
const leagueStats = require("./leagues/leagueStats.js");
const matchByDate = require("./matches/matchesByDate.js");
const matchDay = require("./matches/matchDay.js");
const liveMatches = require("./matches/liveMatches.js");
const liveMatchesAnywhere = require("./matches/liveMatchesAnywhere.js");
const matchDetails = require("./matches/matchDetail.js");
const matchEvents = require("./matches/events.js");
const matchLineups = require("./matches/lineups.js");
const matchStats = require("./matches/stats.js");
const matchH2H = require("./matches/h2h.js");
const playerDetails = require("./players/playersDetails.js");
const playerStats = require("./players/playersStats.js");
const location = require("./mylocation/location.js");
const clientLocation = require("./mylocation/clientLocation.js");

require("dotenv").config();

app.use(cors());
app.set("trust proxy", true);

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

app.get("/", (req, res) => {
  res.json({
    message:
      "Checkout https://rapidapi.com/insidefoot-insidefoot-default/api/football-api68 for information and subscription.",
  });
});

app.get("/documentation-v1", (req, res) => {
  res.json({
    message:
      "Checkout https://rapidapi.com/insidefoot-insidefoot-default/api/football-api68 for information and subscription.",
  });
});

// ** TEAMS Endpoint **
app.get("/teams", isAuth, teamById);
app.get("/teams/squads", isAuth, teamSquad);
app.get("/teams/fixtures", isAuth, teamFixtures);
app.get("/teams/transfers", isAuth, teamTransfers);
app.get("/teams/forms", isAuth, teamForms);

// ** LEAGUE ENDPOINT **
app.get("/allLeagues", isAuth, allLeagues);
app.get("/leagues", isAuth, leagueDetails);
app.get("/leagues/tables", isAuth, leagueTables);
app.get("/leagues/transfers", isAuth, leagueTransfers);
app.get("/leagues/fixtures", isAuth, leagueFixtures);
app.get("/leagues/stats", isAuth, leagueStats);

// ** MATCHES ENDPOINT **
app.get("/matches/playoff", isAuth, matchPlayoff);
app.get("/matches", isAuth, matchByDate);
app.get("/matches/findmatch", isAuth, matchDay);
app.get("/matches/live", isAuth, liveMatches);
app.get("/matches/live/find", isAuth, liveMatchesAnywhere);
app.get("/matches/details", isAuth, matchDetails);
app.get("/matches/events", isAuth, matchEvents);
app.get("/matches/stats", isAuth, matchStats);
app.get("/matches/lineups", isAuth, matchLineups);
app.get("/matches/h2h", isAuth, matchH2H);

// ** PLAYERS ENDPOINT **
app.get("/players/details", isAuth, playerDetails);
app.get("/players/stats", isAuth, playerStats);

app.get("/mylocation", isAuth, location);
app.get("/mylocation/client", isAuth, clientLocation);

app.listen(port, () => console.log(`Express app running on port ${port}!`));
