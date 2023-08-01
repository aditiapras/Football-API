module.exports = (req, res) => {
  const matchId = req.query.matchId;
  const getStats = async () => {
    if (!matchId) {
      res.status(400).json({ result: null, message: "Required Match ID!" });
    } else {
      try {
        const stats = await fetch(
          `https://www.fotmob.com/api/matchDetails?matchId=${matchId}`
        ).then((r) => r.json());

        const stat = stats.content.stats;

        res.json({ stats: stat });
      } catch {
        return res
          .status(400)
          .json({ result: null, message: "Invalid parameters!" });
      }
    }
  };
  getStats();
};
