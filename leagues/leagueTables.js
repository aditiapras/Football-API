module.exports = (req, res) => {
  const id = req.query.id;
  const season = req.query.season;

  const getTables = async () => {
    if (!id) {
      res.status(400).json({ result: null, error: "Required League ID" });
    } else {
      try {
        const tables = await fetch(
          `https://www.fotmob.com/api/leagues?id=${id}&season=${season}`
        ).then((r) => r.json());

        const table = tables.table.map((tab) => {
          const name = tab.data.composite;
          const title = name == true ? "tables" : "table";
          const league = tab.data;

          const run = () => {
            const cups = tab.data[title].map((cup) => {
              return {
                groupName: cup.leagueName,

                all: cup.table.all.map((al) => {
                  return {
                    name: al.name,
                    shortName: al.shortName,
                    id: al.id,
                    logo: `https://media-1.api.aditiapras.dev/image_resources/logo/teamlogo/${al.id}_small.png`,
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
                    logo: `https://media-1.api.aditiapras.dev/image_resources/logo/teamlogo/${al.id}_small.png`,
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
                    logo: `https://media-1.api.aditiapras.dev/image_resources/logo/teamlogo/${al.id}_small.png`,
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
                      light: `https://media-1.api.aditiapras.dev/image_resources/logo/leaguelogo/light/${tab.data.leagueId}.png`,
                      dark: `https://media-1.api.aditiapras.dev/image_resources/logo/leaguelogo/dark/${tab.data.leagueId}.png`,
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
                      light: `https://media-1.api.aditiapras.dev/image_resources/logo/leaguelogo/light/${tab.data.leagueId}.png`,
                      dark: `https://media-1.api.aditiapras.dev/image_resources/logo/leaguelogo/dark/${tab.data.leagueId}.png`,
                    },
                    tables: [
                      {
                        all: tab.data.table.all.map((al) => {
                          return {
                            name: al.name,
                            shortName: al.shortName,
                            id: al.id,
                            logo: `https://media-1.api.aditiapras.dev/image_resources/logo/teamlogo/${al.id}_small.png`,
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
                        home: tab.data.table.home.map((al) => {
                          return {
                            name: al.name,
                            shortName: al.shortName,
                            id: al.id,
                            logo: `https://media-1.api.aditiapras.dev/image_resources/logo/teamlogo/${al.id}_small.png`,
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
                        away: tab.data.table.away.map((al) => {
                          return {
                            name: al.name,
                            shortName: al.shortName,
                            id: al.id,
                            logo: `https://media-1.api.aditiapras.dev/image_resources/logo/teamlogo/${al.id}_small.png`,
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
                    ],
                  },
                };

          return res;
        });

        res.json({ table });
      } catch {
        return res
          .status(400)
          .json({ result: null, error: "League ID or Season is invalid." });
      }
    }
  };

  getTables();
};
