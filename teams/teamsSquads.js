module.exports = (req, res) => {
  const id = req.query.id;
  const getSquads = async () => {
    if (!id) {
      return res.json({ result: null, error: "Required Team ID!" });
    }
    const squads = await fetch(
      `https://www.fotmob.com/api/teams?id=${id}`
    ).then((r) => r.json());

    const returned = () => {
      const status = squads.squad;
      const flow = () => {
        const result = squads.squad.map((squad) => {
          return {
            role: squad[0],
            lists: squad[1].map((list) => {
              return {
                id: list.id,
                name: list.name,
                nationality: {
                  ccode: list.ccode,
                  cname: list.cname,
                },
                picture: `https://images.fotmob.com/image_resources/playerimages/${list.id}.png`,
              };
            }),
          };
        });
        return result;
      };

      const state = status == null ? status : flow();
      return state;
    };

    res.json({
      team: {
        id: squads.details.id,
        name: squads.details.name,
        logo: {
          normal: `https://images.fotmob.com/image_resources/logo/teamlogo/${squads.details.id}.png`,
          small: `https://images.fotmob.com/image_resources/logo/teamlogo/${squads.details.id}_xsmall.png`,
        },
      },
      squads: returned(),
    });
  };
  if (!id) {
    res.json({ result: null, error: "Required Team ID!" });
  } else {
    getSquads();
  }
};
