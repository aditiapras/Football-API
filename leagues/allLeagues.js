module.exports = (req, res) => {
  const getAllLeagues = async () => {
    const allLeagues = await fetch(
      `https://www.fotmob.com/api/allLeagues`
    ).then((r) => r.json());
    const result = await allLeagues;

    const popular = result.popular.map((pop) => {
      return {
        id: pop.id,
        name: pop.name,
        localizedName: pop.localizedName,
        logo: {
          light: `https://media.soccerhub.pro/image_resources/logo/leaguelogo/light/${pop.id}.png`,
          dark: `https://media.soccerhub.pro/image_resources/logo/leaguelogo/dark/${pop.id}.png`,
        },
      };
    });

    const international = result.international.map((int) => {
      const leagues = int.leagues.map((league) => {
        return {
          id: league.id,
          name: league.name,
          localizedName: league.localizedName,
          logo: {
            light: `https://media.soccerhub.pro/image_resources/logo/leaguelogo/light/${league.id}.png`,
            dark: `https://media.soccerhub.pro/image_resources/logo/leaguelogo/dark/${league.id}.png`,
          },
        };
      });
      return { ccode: int.ccode, name: int.name, leagues };
    });

    const countries = result.countries.map((cou) => {
      const leagues = cou.leagues.map((league) => {
        return {
          id: league.id,
          name: league.name,
          localizedName: cou.localizedName,
          logo: {
            light: `https://media.soccerhub.pro/image_resources/logo/leaguelogo/light/${league.id}.png`,
            dark: `https://media.soccerhub.pro/image_resources/logo/leaguelogo/dark/${league.id}.png`,
          },
        };
      });
      return { ccode: cou.ccode, name: cou.name, leagues };
    });

    res.json({ popular, international, countries });
  };
  getAllLeagues();
};
