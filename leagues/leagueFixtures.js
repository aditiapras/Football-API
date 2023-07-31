module.exports = (req, res) => {
  const id = req.query.id;
  const season = req.query.season;

  const getMatches = async () => {
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
            normal: `https://images.fotmob.com/image_resources/logo/teamlogo/${match.home.id}.png`,
            small: `https://images.fotmob.com/image_resources/logo/teamlogo/${match.home.id}_xsmall.png`,
          },
        },
        away: {
          name: match.away.name,
          shortName: match.away.shortName,
          id: match.away.id,
          logo: {
            normal: `https://images.fotmob.com/image_resources/logo/teamlogo/${match.away.id}.png`,
            small: `https://images.fotmob.com/image_resources/logo/teamlogo/${match.away.id}_xsmall.png`,
          },
        },
        status: match.status,
      };
    });

    res.json({ matches: { allMatches: allMatches } });
  };
  if (!id) {
    res.status(400).json({ result: null, error: "Required League ID" });
  } else {
    getMatches();
  }
};
