module.exports = (req, res) => {
  const id = req.query.id;
  const getTables = async () => {
    const tables = await fetch(
      `https://www.fotmob.com/api/leagues?id=${id}`
    ).then((r) => r.json());

    const table = tables.table.map((tab) => {
      const name = tab.data.composite;
      const title = name == true ? "tables" : "table";
      const league = tab.data;
      const run = () => {
        const cups = tab.data[title].map((cup) => {
          return {
            groupName: cup.leagueName,
            table: {
              all: cup.table.all.map((al) => {
                return {
                  name: al.name,
                  shortName: al.shortName,
                  id: al.id,
                  logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${al.id}_xsmall.png`,
                  deduction: al.deduction,
                  ongoing: al.ongoing,
                  played: al.played,
                  wins: al.wins,
                  draws: al.draws,
                  losses: al.losses,
                  scoresStr: al.scoresStr,
                  goalConDiff: al.goalConDiff,
                  pts: al.pts,
                  idx: al.idx,
                  qualColor: al.qualColor,
                };
              }),
              home: cup.table.home.map((al) => {
                return {
                  name: al.name,
                  shortName: al.shortName,
                  id: al.id,
                  logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${al.id}_xsmall.png`,
                  deduction: al.deduction,
                  ongoing: al.ongoing,
                  played: al.played,
                  wins: al.wins,
                  draws: al.draws,
                  losses: al.losses,
                  scoresStr: al.scoresStr,
                  goalConDiff: al.goalConDiff,
                  pts: al.pts,
                  idx: al.idx,
                  qualColor: al.qualColor,
                };
              }),
              away: cup.table.away.map((al) => {
                return {
                  name: al.name,
                  shortName: al.shortName,
                  id: al.id,
                  logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${al.id}_xsmall.png`,
                  deduction: al.deduction,
                  ongoing: al.ongoing,
                  played: al.played,
                  wins: al.wins,
                  draws: al.draws,
                  losses: al.losses,
                  scoresStr: al.scoresStr,
                  goalConDiff: al.goalConDiff,
                  pts: al.pts,
                  idx: al.idx,
                  qualColor: al.qualColor,
                };
              }),
            },
          };
        });
        const flow = title == "tables" ? cups : league;
        return flow;
      };
      const res =
        title == "tables"
          ? {
              type: "Cup",
              data: {
                ccode: tab.data.ccode,
                leagueId: tab.data.leagueId,
                leagueName: tab.data.leagueName,
                logo: {
                  light: `https://images.fotmob.com/image_resources/logo/leaguelogo/${tab.data.leagueId}.png`,
                  dark: `https://images.fotmob.com/image_resources/logo/leaguelogo/dark/${tab.data.leagueId}.png`,
                },
                tables: run(),
              },
            }
          : {
              type: "League",
              data: {
                ccode: tab.data.ccode,
                leagueId: tab.data.leagueId,
                leagueName: tab.data.leagueName,
                logo: {
                  light: `https://images.fotmob.com/image_resources/logo/leaguelogo/${tab.data.leagueId}.png`,
                  dark: `https://images.fotmob.com/image_resources/logo/leaguelogo/dark/${tab.data.leagueId}.png`,
                },
              },
            };
      return res;
    });
    res.json({ table });
  };

  getTables();
};
