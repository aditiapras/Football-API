module.exports = (req, res) => {
  const matchId = req.query.matchId;

  const getMatches = async () => {
    if (!matchId) {
      res.status(404).json({ result: null, error: "Required Match ID" });
    } else {
      const matches = await fetch(
        `https://www.fotmob.com/api/matchDetails?matchId=${matchId}`
      ).then((r) => r.json());

      const general = {
        matchId: matches.general.matchId,
        round: matches.general.leagueRoundName,
        leagueId: matches.general.leagueId,
        leagueName: matches.general.leagueName,
        countryCode: matches.general.countryCode,
        season: matches.general.parentLeagueSeason,
        homeTeam: {
          name: matches.general.homeTeam.name,
          id: matches.general.homeTeam.id,
          logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${matches.general.homeTeam.id}_small.png`,
          score: matches.header.teams[0].score,
          fifaRank: matches.header.teams[0].fifaRank,
        },
        awayTeam: {
          name: matches.general.awayTeam.name,
          id: matches.general.awayTeam.id,
          logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${matches.general.awayTeam.id}_small.png`,
          score: matches.header.teams[1].score,
          fifaRank: matches.header.teams[1].fifaRank,
        },
        status: matches.header.status,
        venue: matches.content.matchFacts.infoBox.Stadium,
        referee: matches.content.matchFacts.infoBox.Referee,
        attendance: matches.content.matchFacts.infoBox.Attendance,
        playerOfTheMatch: {
          id: matches.content.matchFacts.playerOfTheMatch.id,
          name: matches.content.matchFacts.playerOfTheMatch.name,
          teamName: matches.content.matchFacts.playerOfTheMatch.teamName,
          teamId: matches.content.matchFacts.playerOfTheMatch.teamId,
          rating: matches.content.matchFacts.playerOfTheMatch.rating,
          minutesPlayed:
            matches.content.matchFacts.playerOfTheMatch.minutesPlayed,
        },
      };

      res.json({
        details: general,
      });
    }
  };

  getMatches();
};
