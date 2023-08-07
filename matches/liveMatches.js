const moment = require("moment-timezone");

module.exports = (req, res) => {
  const date = moment().format("YYYYMMDD");
  const currentDate = moment().format("LLLL");
  const utcTime = moment.utc();
  const tz = req.query.timezone;
  const ccode = req.query.ccode;

  const getLive = async () => {
    const live = await fetch(
      `https://www.fotmob.com/api/matches?date=${date}&timezone=${tz}&ccode3=${ccode}`
    ).then((r) => r.json());

    const liveMatches = live.leagues.map((league) => {
      return {
        id: league.primaryId,
        name: league.name,
        logo: {
          light: `https://api.soccerhub.pro/image_resources/logo/leaguelogo/light/${league.primaryId}.png`,
          dark: `https://api.soccerhub.pro/image_resources/logo/leaguelogo/dark/${league.primaryId}.png`,
        },
        ccode: league.ccode,
        countryLogo: `https://api.soccerhub.pro/image_resources/logo/teamlogo/${league.ccode.toLowerCase()}.png`,

        matches: league.matches.filter(
          (match) =>
            match.status.finished == false &&
            match.status.started == true &&
            match.status.cancelled == false
        ),
      };
    });

    const liveMatch = liveMatches.filter((match) => match.matches != "");

    res.json({
      datetime: currentDate,
      utcTime: utcTime,
      countryCode: ccode,
      timezone: tz,
      liveMatches: liveMatch,
    });
  };
  getLive();
};
