module.exports = (req, res) => {
  const id = req.query.id;
  const getPlayoff = async () => {
    const playoff = await fetch(
      `https://www.fotmob.com/api/leagues?id=${id}`
    ).then((r) => r.json());

    const round = playoff.playoff.rounds.map((round) => {
      return {
        participantCount: round.participantCount,
        stage: round.stage,
        matchups: round.matchups.map((matchup) => {
          return {
            homeTeamId: matchup.homeTeamId,
            awayTeamId: matchup.awayTeamId,
            stage: matchup.stage,
            aggregatedResult: {
              homeScore: matchup.homeScore,
              awayScore: matchup.awayScore,
            },
            homeTeam: matchup.homeTeam,
            homeTeamLogo: `https://images.fotmob.com/image_resources/logo/teamlogo/${matchup.homeTeamId}_xsmall.png`,
            awayTeam: matchup.awayTeam,
            awayTeamLogo: `https://images.fotmob.com/image_resources/logo/teamlogo/${matchup.awayTeamId}_xsmall.png`,
            homeTeamShortName: matchup.homeTeamShortName,
            awayTeamShortName: matchup.awayTeamShortName,
            matches: matchup.matches.map((match) => {
              return {
                matchId: match.matchId,
                home: {
                  id: match.home.id,
                  name: match.home.name,
                  logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${match.home.id}_xsmall.png`,
                  shortName: match.home.shortName,
                  score: match.home.score,
                  winner: match.home.winner,
                },
                away: {
                  id: match.away.id,
                  name: match.away.name,
                  logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${match.away.id}_xsmall.png`,
                  shortName: match.away.shortName,
                  score: match.away.score,
                  winner: match.away.winner,
                },
                status: match.status,
              };
            }),
          };
        }),
      };
    });

    res.json({ playoff: { rounds: round } });
  };
  getPlayoff();
};
