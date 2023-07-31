module.exports = (req, res) => {
  const date = req.query.date;
  const getMatches = async () => {
    const matches = await fetch(
      `https://www.fotmob.com/api/matches?date=${date}`
    ).then((r) => r.json());

    res.json({ leagues: matches.leagues });
  };
  getMatches();
};
