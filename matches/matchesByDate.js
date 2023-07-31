module.exports = (req, res) => {
  const date = req.query.date;
  const timezone = req.query.timezone;
  const ccode = req.query.ccode;

  const getMatches = async () => {
    if (!date) {
      res.status(400).json({ result: null, message: "Required Date" });
    } else {
      const matches = await fetch(
        `https://www.fotmob.com/api/matches?date=${date}&ccode3=${ccode}&timezone=${timezone}`
      ).then((r) => r.json());

      res.json({
        query: { date: date, ccode: ccode, timezone: timezone },
        leagues: matches.leagues,
      });
    }
  };
  getMatches();
};
