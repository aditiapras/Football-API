module.exports = (req, res) => {
  const matchId = req.query.matchId;
  const getMatches = async () => {
    const matches = await fetch(
      `https://www.fotmob.com/api/matchDetails?matchId=${matchId}`
    ).then((r) => r.json());

    res.json(matches);
  };
  getMatches();
};
