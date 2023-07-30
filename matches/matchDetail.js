module.exports = (req, res) => {
  const matchId = req.query.matchId;
  const getMatches = async () => {
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
      },
      awayTeam: {
        name: matches.general.awayTeam.name,
        id: matches.general.awayTeam.id,
        logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${matches.general.awayTeam.id}_small.png`,
        score: matches.header.teams[1].score,
      },
      status: matches.header.status,
    };
    const events = matches.content.matchFacts.events.events;
    const lineups = matches.content.lineup.lineup.map((line) => {
      return {
        teamId: line.teamId,
        teamName: line.teamName,
        formation: line.lineup,
        bench: line.bench,
        coach: line.coach,
        players: line.players,
      };
    });
    const stats = matches.content.stats.Periods.All.stats;

    res.json({ details: general, events, lineups, stats });
  };
  getMatches();
};
