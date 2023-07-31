const moment = require("moment-timezone");

module.exports = (req, res) => {
  const getIp = async () => {
    const timezone = moment.tz.guess();
    const ip = await fetch(`https://api64.ipify.org?format=json`).then((r) =>
      r.json()
    );
    const geo = await fetch(
      `http://www.geoplugin.net/json.gp?ip=${ip.ip}`
    ).then((r) => r.json());

    res.json({
      IP: ip.ip,
      timezone,
      city: geo.geoplugin_city,
      region: geo.geoplugin_region,
      ccode: geo.geoplugin_countryCode,
    });
  };
  getIp();
};
