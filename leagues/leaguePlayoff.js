module.exports = (req, res) => {
  const id = req.query.id;
  const season = req.query.season;

  const getPlayoff = async () => {
    if (!id) {
      res.status(400).json({ result: null, error: "Required ID parameter!" });
    } else {
      try {
        const playoff = await fetch(
          `https://www.fotmob.com/api/leagues?id=${id}&season=${season}`
        ).then((r) => r.json());

        const returned = () => {
          const status = playoff.playoff;
          const round = () => {
            const rounds = playoff.playoff.rounds.map((round) => {
              return {
                participantCount: round.participantCount,
                stage: round.stage,
                matchups: round.matchups.map((matchup) => {
                  const teamWinner =
                    matchup.winner == matchup.homeTeamId
                      ? matchup.homeTeam
                      : matchup.awayTeam;
                  const winnerLogo =
                    matchup.winner == matchup.homeTeamId
                      ? matchup.homeTeamId
                      : matchup.awayTeamId;
                  return {
                    stage: matchup.stage,
                    winner: {
                      id: matchup.winner,
                      team: teamWinner,
                      logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${winnerLogo}_xsmall.png`,
                    },
                    homeTeamId: matchup.homeTeamId,
                    awayTeamId: matchup.awayTeamId,
                    aggregatedResult: {
                      homeScore: matchup.homeScore,
                      awayScore: matchup.awayScore,
                    },
                    homeTeam: matchup.homeTeam,
                    homeTeamShortName: matchup.homeTeamShortName,
                    homeTeamLogo: `https://images.fotmob.com/image_resources/logo/teamlogo/${matchup.homeTeamId}_xsmall.png`,
                    awayTeam: matchup.awayTeam,
                    awayTeamShortName: matchup.awayTeamShortName,
                    awayTeamLogo: `https://images.fotmob.com/image_resources/logo/teamlogo/${matchup.awayTeamId}_xsmall.png`,
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
            return rounds;
          };
          const state = status == null ? null : round();
          return state;
        };

        res.json({
          playoff: {
            id: playoff.details.id,
            name: playoff.details.name,
            logo: {
              light: `https://images.fotmob.com/image_resources/logo/leaguelogo/${playoff.details.id}.png`,
              dark: `https://images.fotmob.com/image_resources/logo/leaguelogo/dark/${playoff.details.id}.png`,
            },
            season: playoff.details.selectedSeason,
            rounds: returned(),
          },
        });
      } catch {
        return res
          .status(400)
          .json({ result: null, error: "League ID is invalid!" });
      }
    }
  };

  getPlayoff();
};
