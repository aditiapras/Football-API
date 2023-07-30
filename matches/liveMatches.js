const moment = require("moment-timezone");

module.exports = (req, res) => {
  const date = moment().format("YYYYMMDD");
  const currentDate = moment().format("LLLL");
  const timezone = moment.tz.guess();
  const getLive = async () => {
    const live = await fetch(
      `https://www.fotmob.com/api/matches?date=${date}&timezone=${timezone}`
    ).then((r) => r.json());

    const liveMatches = live.leagues.map((league) => {
      return {
        id: league.primaryId,
        name: league.name,
        logo: {
          light: `https://images.fotmob.com/image_resources/logo/leaguelogo/${league.primaryId}.png`,
          dark: `https://images.fotmob.com/image_resources/logo/leaguelogo/dark/${league.primaryId}.png`,
        },
        ccode: league.ccode,
        countryLogo: `https://images.fotmob.com/image_resources/logo/teamlogo/${league.ccode.toLowerCase()}.png`,

        matches: league.matches.filter(
          (match) =>
            match.status.finished == false &&
            match.status.started == true &&
            match.status.cancelled == false
        ),
      };
    });

    const liveMatch = liveMatches.filter((match) => match.matches != "");

    res.json({ date: currentDate, timezone: timezone, liveMatches: liveMatch });
  };
  getLive();
};
