module.exports = (req, res) => {
  const matchId = req.query.matchId;
  const getHead = async () => {
    if (!matchId) {
      res.status(400).json({ result: null, message: "Required Match ID!" });
    } else {
      try {
        const heads = await fetch(
          `https://www.fotmob.com/api/matchDetails?matchId=${matchId}`
        ).then((r) => r.json());

        const h2h = () => {
          const hth = heads.content.h2h.matches.map((match) => {
            return {
              league: {
                name: match.league.name,
                id: match.league.id,
                logo: {
                  light: `https://images.fotmob.com/image_resources/logo/leaguelogo/${match.league.id}.png`,
                  dark: `https://images.fotmob.com/image_resources/logo/leaguelogo/dark/${match.league.id}.png`,
                },
              },
              home: {
                name: match.home.name,
                id: match.home.id,
                logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${match.home.id}.png`,
              },
              away: {
                name: match.away.name,
                id: match.away.id,
                logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${match.away.id}.png`,
              },
              status: match.status,
            };
          });
          return hth;
        };

        const sum = () => {
          const matchWinner = heads.content.h2h.summary;
          return {
            homeTeamWin: matchWinner[0],
            draw: matchWinner[1],
            awayTeamWin: matchWinner[2],
          };
        };

        const headtohead =
          !heads.content.h2h && !heads.content.matches
            ? { headTohead: "Nothing to display or invalid Match ID" }
            : { headTohead: { summary: sum(), matches: h2h() } };

        res.json(headtohead);
      } catch {
        return res
          .status(400)
          .json({ result: null, message: "Invalid parameters!" });
      }
    }
  };
  getHead();
};
