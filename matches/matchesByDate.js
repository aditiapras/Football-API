module.exports = (req, res) => {
  const id = req.query.id;
  const getMatches = async () => {
    const matches = await fetch(``).then((r) => r.json());

    res.json(matches);
  };
  getMatches();
};
