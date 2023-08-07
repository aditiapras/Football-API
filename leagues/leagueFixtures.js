module.exports = (req, res) => {
  const id = req.query.id;
  const season = req.query.season;

  const getMatches = async () => {
    if (!id) {
      return res
        .status(400)
        .json({ result: null, error: "Required League ID" });
    } else {
      try {
        const matches = await fetch(
          `https://www.fotmob.com/api/leagues?id=${id}&season=${season}`
        ).then((r) => r.json());

        const allMatches = matches.matches.allMatches.map((match) => {
          return {
            round: match.round,
            roundName: match.roundName,
            id: match.id,
            home: {
              name: match.home.name,
              shortName: match.home.shortName,
              id: match.home.id,
              logo: {
                normal: `https://api.soccerhub.pro/image_resources/logo/teamlogo/${match.home.id}.png`,
                small: `https://api.soccerhub.pro/image_resources/logo/teamlogo/${match.home.id}_small.png`,
              },
            },
            away: {
              name: match.away.name,
              shortName: match.away.shortName,
              id: match.away.id,
              logo: {
                normal: `https://api.soccerhub.pro/image_resources/logo/teamlogo/${match.away.id}.png`,
                small: `https://api.soccerhub.pro/image_resources/logo/teamlogo/${match.away.id}_small.png`,
              },
            },
            status: match.status,
          };
        });

        res.json({ matches: { allMatches: allMatches } });
      } catch {
        return res
          .status(400)
          .json({ result: null, error: "League ID is invalid" });
      }
    }
  };

  getMatches();
};
