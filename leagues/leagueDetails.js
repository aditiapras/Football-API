module.exports = (req, res) => {
  const id = req.query.id;
  const season = req.query.season;

  const getLeagues = async () => {
    if (!id) {
      res.status(400).json({
        result: null,
        message: "Required League ID. League ID cannot be empty",
      });
    } else {
      try {
        const league = await fetch(
          `https://www.fotmob.com/api/leagues?id=${id}&season=${season}`
        ).then((r) => r.json());
        const leagues = await league;

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
            light: `https://media.soccerhub.pro/image_resources/logo/leaguelogo/light/${leagues.details.id}.png`,
            dark: `https://media.soccerhub.pro/image_resources/logo/leaguelogo/dark/${leagues.details.id}.png`,
          },
        };

        res.json({ details, allAvailableSeasons });
      } catch {
        return res
          .status(400)
          .json({ result: null, message: "League ID is invalid" });
      }
    }
  };

  getLeagues();
};
