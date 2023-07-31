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
        const event = events.content.matchFacts.events.events;

        const eve = event.map((result) => {
          const removed = result;
          delete removed.profileUrl;
          delete removed.player.profileUrl;
          delete removed.assistProfileUrl;
          delete removed.reactKey;
          return removed;
        });

        res.json({ events: eve });
      } catch {
        return res
          .status(400)
          .json({ result: null, message: "Invalid parameters!" });
      }
    }
  };
  getEvents();
};
