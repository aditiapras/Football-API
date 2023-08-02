module.exports = (req, res) => {
  const id = req.query.id;
  const getPlayerDetails = async () => {
    if (!id) {
      res.status(400).json({ result: null, message: "Required Players ID!" });
    } else {
      try {
        const players = await fetch(
          `https://www.fotmob.com/api/playerData?id=${id}`
        ).then((r) => r.json());

        const player = {
          id: players.id,
          name: players.name,
          picUrl: `https://images.fotmob.com/image_resources/playerimages/${players.id}.png`,
          origin: players.origin,
          playerProps: players.playerProps,
          injuryInformation: players.injuryInformation,
        };

        res.json(player);
      } catch {
        return res
          .status(400)
          .json({ result: null, message: "Player ID is invalid!" });
      }
    }
  };
  getPlayerDetails();
};
