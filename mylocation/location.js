const moment = require("moment-timezone");

module.exports = (req, res) => {
  const ip = req.ip;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const getIp = async () => {
    const timezone = moment.tz.guess();
    const geo = await fetch(`http://ip-api.com/json/${ip}`).then((r) =>
      r.json()
    );

    res.json({
      IP: geo.query,
      timezone,
      tz,
      clientTimezone: geo.timezone,
      status: geo.status,
      country: geo.country,
      countryCode: geo.countryCode,
      region: geo.region,
      regionName: geo.regionName,
      city: geo.city,
      lat: geo.lat,
      lon: geo.lon,
      isp: geo.isp,
    });
  };
  getIp();
};
