module.exports = (req, res) => {
  const id = req.query.id;
  const getTransfers = async () => {
    const transfers = await fetch(
      `https://www.fotmob.com/api/teams?id=${id}`
    ).then((r) => r.json());

    res.json({ transfers: transfers.transfers });
  };
  getTransfers();
};

// https://images.fotmob.com/image_resources/playerimages/1077975.png
