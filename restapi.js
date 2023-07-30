const express = require("express");
const app = express();
const port = 3001;
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
const matchPlayoff = require("./matches/matchesPlayoff.js");
const matchByDate = require("./matches/matchesByDate.js");
const liveMatches = require("./matches/liveMatches.js");

require("dotenv").config();

app.use(cors());

let publicPath = path.join(__dirname, "public");
let docPath = path.join(__dirname, "public");

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

// Matches by Date
// app.get("/v1/matches", isAuth, (req, res) => {
//   const date = req.query.date;
//   const timezone = req.query.timezone;
//   const ccode = req.query.ccode3;

//   const getMatches = async () => {
//     if (!date) {
//       return res.json({ error: "Require date, date cannot be empty!" });
//     }

//     const matches = await fetch(
//       `https://www.fotmob.com/api/matches?date=${date}&timezone=${timezone}&ccode3=${ccode}`
//     ).then((r) => r.json());

//     res.json(matches);
//   };
//   getMatches();
// });

// Matches by League ID

// Matches by Teams ID

// Matches Detail
// app.get("/v1/matchDetails", isAuth, (req, res) => {
//   const id = req.query.id;

//   const getMatchDetails = async () => {
//     if (!id) {
//       return res.json({ error: "Match ID cannot be empty!" });
//     }
//     const matchDetails = await fetch(
//       `https://www.fotmob.com/api/matchDetails?matchId=${id}`
//     ).then((r) => r.json());

//     res.json(await matchDetails);
//   };
//   getMatchDetails();
// });

// *---------END-----------*

// --------------------------------------------------

// ** TABLES ENDPOINT **
// app.get("/v1/tables", isAuth, (req, res) => {
//   const id = req.query.id;

//   const getTables = async () => {
//     if (!id) {
//       return res.json({ error: "League ID cannot be empty!" });
//     }
//     const table = await fetch(
//       `https://www.fotmob.com/api/tltable?leagueId=${id}`
//     )
//       .then((r) => r.json())

//       .catch((error) => {
//         if (error) {
//           return error;
//         }
//       });

//     if (!table) {
//       return res.json({ error: "No Data Found" });
//     }
//     res.json({ leagues: table });
//   };

//   getTables();
// });

// *---------END-----------*

// --------------------------------------------------

// ** TEAMS ENDPOINT **
// app.get("/v1/teams", isAuth, (req, res) => {
//   const id = req.query.id;

//   const getTeams = async () => {
//     if (!id) {
//       return res.json({
//         error: "Required Team ID, Team ID cannot be empty!",
//       });
//     }
//     const teams = await fetch(`https://www.fotmob.com/api/teams?id=${id}`).then(
//       (r) => r.json()
//     );

//     res.json(teams);
//   };
//   getTeams();
// });
// *---------END-----------*

// --------------------------------------------------

// ** PLAYERS ENDPOINT **
// app.get("/v1/players", isAuth, (req, res) => {
//   const id = req.query.id;

//   const getPlayers = async () => {
//     if (!id) {
//       return res.json({
//         error: "Required Players ID, Players ID cannot be empty!",
//       });
//     }
//     const players = await fetch(
//       `https://www.fotmob.com/api/playerData?id=${id}`
//     ).then((r) => r.json());

//     res.json(players);
//   };
//   getPlayers();
// });
// *---------END-----------*

// --------------------------------------------------

app.listen(port, () => console.log(`Express app running on port ${port}!`));
