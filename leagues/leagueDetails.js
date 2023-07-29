module.exports = (req, res) => {
  const id = req.query.id;
  const season = req.query.season;

  const getLeagues = async () => {
    if (!id) {
      return res.json({
        error: "Required League ID, League ID cannot be empty!",
      });
    }

    const leagues = await fetch(
      `https://www.fotmob.com/api/leagues?id=${id}&season=${season}`
    ).then((r) => r.json());

    const allAvailableSeasons = leagues.allAvailableSeasons;

    const details = {
      id: leagues.details.id,
      type: leagues.details.type,
      name: leagues.details.name,
      selectedSeason: leagues.details.selectedSeason,
      latestSeason: leagues.details.latestSeason,
      shortName: leagues.details.shortName,
      country: leagues.details.country,
      logo: {
        light: `https://images.fotmob.com/image_resources/logo/leaguelogo/${leagues.details.id}.png`,
        dark: `https://images.fotmob.com/image_resources/logo/leaguelogo/dark/${leagues.details.id}.png`,
      },
    };

    const match = leagues.matches;
    const matches = {};
    matches.firstUnplayedMatch = match.firstUnplayedMatch;
    matches.allMatches = match.allMatches.map((match) => {
      const home = {
        name: match.home.name,
        shortName: match.home.shortName,
        id: match.home.id,
        logo: {
          normal:
            (match.home.logo = `https://images.fotmob.com/image_resources/logo/teamlogo/${match.home.id}.png`),
          small:
            (match.home.logo = `https://images.fotmob.com/image_resources/logo/teamlogo/${match.home.id}_xsmall.png`),
        },
      };

      const away = {
        name: match.away.name,
        shortName: match.away.shortName,
        id: match.away.id,
        logo: {
          normal:
            (match.away.logo = `https://images.fotmob.com/image_resources/logo/teamlogo/${match.away.id}.png`),
          small:
            (match.away.logo = `https://images.fotmob.com/image_resources/logo/teamlogo/${match.away.id}_xsmall.png`),
        },
      };

      return {
        round: match.round,
        roundName: match.roundName,
        id: match.id,
        home: home,
        away: away,
        status: match.status,
      };
    });

    res.json({ details, allAvailableSeasons });
  };
  getLeagues();
};
