module.exports = (req, res) => {
  const id = req.query.id;

  const getTeams = async () => {
    if (!id) {
      return res.json({ result: null, error: "Required Team ID!" });
    }

    const team = await fetch(`https://www.fotmob.com/api/teams?id=${id}`).then(
      (r) => r.json()
    );
    const details = {
      id: team.details.id,
      name: team.details.name,
      latestSeason: team.details.latestSeason,
      shortName: team.details.shortName,
      country: team.details.country,
      logo: {
        normal: team.details.sportsTeamJSONLD.logo,
        small: `https://images.fotmob.com/image_resources/logo/teamlogo/${team.details.id}_xsmall.png`,
      },
      coach: team.details.sportsTeamJSONLD.coach.name,
      league: team.details.sportsTeamJSONLD.memberOf.name,
      venue: team.overview.venue,
    };
    const history = team.history.trophyList;

    res.json({ details, history: { trophyList: history } });
  };
  getTeams();
};