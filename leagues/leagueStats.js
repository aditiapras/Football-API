module.exports = (req, res) => {
  const id = req.query.id;
  const season = req.query.season;
  const getStats = async () => {
    if (!id || !season) {
      res
        .status(400)
        .json({ result: null, message: "Required League ID and Season!" });
    } else {
      try {
        const stats = await fetch(
          `https://www.fotmob.com/api/leagues?id=${id}&season=${season}`
        ).then((r) => r.json());

        const playerStats = () => {
          const players = stats.stats.players.map((stat) => {
            return {
              name: stat.name,
              header: stat.header,
              topThree: stat.topThree,
            };
          });
          return players;
        };

        const teamStats = () => {
          const teams = stats.stats.teams.map((stat) => {
            return {
              name: stat.name,
              header: stat.header,
              topThree: stat.topThree,
            };
          });
          return teams;
        };

        const trophyStats = () => {
          const trophies = stats.stats.trophies.map((trophy) => {
            return {
              seasonName: trophy.seasonName,
              winner: {
                id: trophy.winner.id,
                seasonName: trophy.winner.seasonName,
                name: trophy.winner.name,
                logo: `https://media.soccerhub.pro/image_resources/logo/teamlogo/${trophy.winner.id}.png`,
                winner: trophy.winner.winner,
              },
            };
          });
          return trophies;
        };

        const team = stats.stats.teams == null ? null : teamStats();
        const player = stats.stats.players == null ? null : playerStats();
        const throphy = stats.stats.trophies == null ? null : trophyStats();

        res.json({
          statistics: {
            players: player,
            teams: team,
            trophies: throphy,
          },
        });
      } catch {
        return res
          .status(400)
          .json({ result: null, message: "league ID or Season is invalid!" });
      }
    }
  };
  getStats();
};
