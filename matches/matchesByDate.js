module.exports = (req, res) => {
  const date = req.query.date;
  const timezone = req.query.timezone;
  const ccode = req.query.ccode;

  const getMatches = async () => {
    const matches = await fetch(
      `https://www.fotmob.com/api/matches?date=${date}&ccode3=${ccode}&timezone=${timezone}`
    ).then((r) => r.json());

    res.json({
      date: date,
      timezone: timezone,
      ccode: ccode,
      leagues: matches.leagues,
    });
  };
  getMatches();
};
