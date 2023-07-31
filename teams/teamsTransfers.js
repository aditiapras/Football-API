module.exports = (req, res) => {
  const id = req.query.id;
  const getTransfers = async () => {
    const transfers = await fetch(
      `https://www.fotmob.com/api/teams?id=${id}`
    ).then((r) => r.json());

    res.json({ transfers: transfers.transfers });
  };
  if (!id) {
    res.status(400).json({ error: "Required Team ID" });
  } else {
    getTransfers();
  }
};
