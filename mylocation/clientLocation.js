const moment = require("moment-timezone");

module.exports = (req, res) => {
  var ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const getIp = async () => {
    const timezone = moment.tz.guess();
    const geo = await fetch(
      `http://www.geoplugin.net/json.gp?ip=${ip.ip}`
    ).then((r) => r.json());

    res.json({
      IP: ip,
      timezone,
      tz,
      clientTimezone: geo.geoplugin_timezone,
      city: geo.geoplugin_city,
      region: geo.geoplugin_region,
      ccode: geo.geoplugin_countryCode,
      clientIp: ip,
    });
  };
  getIp();
};
