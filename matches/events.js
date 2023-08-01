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
        const event = events.content.matchFacts.events;

        const eve = event.events.map((result) => {
          const removed = result;
          delete removed.profileUrl;
          delete removed.player.profileUrl;
          delete removed.assistProfileUrl;
          delete removed.reactKey;

          return removed;
        });

        const penKick = () => {
          const shootOut = event.penaltyShootoutEvents.map((pen) => {
            const removed = pen;
            delete removed.profileUrl;
            delete removed.player.profileUrl;
            delete removed.reactKey;
            delete removed.shotmapEvent;
            delete removed.assistStr;
            delete removed.assistProfileUrl;
            delete removed.suffix;
            delete removed.suffixKey;

            return removed;
          });
          return shootOut;
        };

        const penalty = event.penaltyShootoutEvents == null ? null : penKick();

        res.json({ events: eve, penaltyShootoutEvents: penalty });
      } catch {
        return res
          .status(400)
          .json({ result: null, message: "Invalid parameters!" });
      }
    }
  };
  getEvents();
};
