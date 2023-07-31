module.exports = (req, res) => {
  const id = req.query.id;
  const season = req.query.season;

  const getTransfers = async () => {
    if (!id) {
      res.status(400).json({ result: null, error: "Required League ID" });
    } else {
      try {
        const transfers = await fetch(
          `https://www.fotmob.com/api/leagues?id=${id}`
        ).then((r) => r.json());
        res.json({ transfers: transfers.transfers });
      } catch {
        return res
          .status(400)
          .json({ result: null, error: "League ID is invalid" });
      }
    }
  };
  getTransfers();
};
