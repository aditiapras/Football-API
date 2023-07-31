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
const matchByDate = require("./matches/matchesByDate.js");
const liveMatches = require("./matches/liveMatches.js");
const matchDetails = require("./matches/matchDetail.js");
const matchEvents = require("./matches/events.js");
const matchLineups = require("./matches/lineups.js");
const matchStats = require("./matches/stats.js");
const location = require("./mylocation/location.js");

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

// ** TEAMS Endpoint **
app.get("/teams", teamById);
app.get("/teams/squads", teamSquad);
app.get("/teams/fixtures", teamFixtures);
app.get("/teams/transfers", teamTransfers);
app.get("/teams/forms", teamForms);

// ** LEAGUE ENDPOINT **
app.get("/allLeagues", allLeagues);
app.get("/leagues", leagueDetails);
app.get("/leagues/tables", leagueTables);
app.get("/leagues/transfers", leagueTransfers);
app.get("/leagues/fixtures", leagueFixtures);

// ** MATCHES ENDPOINT **
app.get("/matches/playoff", matchPlayoff);
app.get("/matches", matchByDate);
app.get("/matches/live", liveMatches);
app.get("/matches/details", matchDetails);
app.get("/matches/events", matchEvents);
app.get("/matches/stats", matchStats);
app.get("/matches/lineups", matchLineups);

app.get("/mylocation", isAuth, location);

app.listen(port, () => console.log(`Express app running on port ${port}!`));
