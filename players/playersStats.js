module.exports = (req, res) => {
  const id = req.query.id;
  const getPlayerStats = async () => {
    if (!id) {
      res.status(400).json({ result: null, message: "Required Players ID!" });
    } else {
      try {
        const players = await fetch(
          `https://www.fotmob.com/api/playerData?id=${id}`
        ).then((r) => r.json());
        const lastLeague = players.lastLeague;
        const careerStatistics = players.careerStatistics;
        const careerHistory = players.careerHistory;

        res.json({ lastLeague, careerStatistics, careerHistory });
      } catch {
        return res
          .status(400)
          .json({ result: null, message: "Player ID is invalid!" });
      }
    }
  };
  getPlayerStats();
};
