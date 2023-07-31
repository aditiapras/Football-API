module.exports = (req, res) => {
  const matchId = req.query.matchId;
  const getEvents = async () => {
    if (!matchId) {
      res.status(400).json({ result: null, message: "Required Match ID!" });
    } else {
      try {
        const events = await fetch(
          `https://www.fotmob.com/api/matchDetails?matchId=${matchId}`
        ).then((r) => r.json());

        res.json({ events });
      } catch {
        return res
          .status(400)
          .json({ result: null, message: "Invalid parameters!" });
      }
    }
  };
  getEvents();
};
