module.exports = (req, res) => {
  const date = req.query.date;
  // const timezone = req.query.timezone;
  // const ccode = req.query.ccode;

  const getMatches = async () => {
    if (!date) {
      res.status(400).json({ result: null, message: "Required Date" });
    } else {
      const locations = await fetch(
        `https://football-api68.p.rapidapi.com/mylocation`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.RAPID_KEY,
            "X-RapidAPI-Host": process.env.RAPID_BASE,
          },
        }
      ).then((r) => r.json());

      const tz = locations.timezone;
      const ccode = locations.country_code;

      const matches = await fetch(
        `https://www.fotmob.com/api/matches?date=${date}&ccode3=${ccode}&timezone=${tz}`
      ).then((r) => r.json());

      res.json({
        query: { date: date, ccode: ccode, timezone: tz },
        leagues: matches.leagues,
      });
    }
  };
  getMatches();
};
