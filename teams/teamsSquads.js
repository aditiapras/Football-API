module.exports = (req, res) => {
  const id = req.query.id;
  const getSquads = async () => {
    if (!id) {
      return res.json({ result: null, error: "Required Team ID!" });
    }

    const squads = await fetch(
      `https://www.fotmob.com/api/teams?id=${id}`
    ).then((r) => r.json());

    res.json({ squad: squads.squad });
  };
  getSquads();
};
