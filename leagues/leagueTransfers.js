module.exports = (req, res) => {
  const id = req.query.id;
  const season = req.query.season;

  const getTransfers = async () => {
    const transfers = await fetch(
      `https://www.fotmob.com/api/leagues?id=${id}`
    ).then((r) => r.json());
    res.json({ transfers: transfers.transfers });
  };
  getTransfers();
};