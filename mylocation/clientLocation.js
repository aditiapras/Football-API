const moment = require("moment-timezone");
const requestIp = require("request-ip");

module.exports = (req, res) => {
  let ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  let ipv = req.ip;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const getIp = async () => {
    const geo = await fetch(`http://www.geoplugin.net/json.gp?ip=${ipv}`).then(
      (r) => r.json()
    );

    res.json({
      ip: ip,
      ipv,
      tz,
      clientIp: geo.geoplugin_request,
      geoplugin_city: geo.geoplugin_city,
      geoplugin_region: geo.geoplugin_region,
      geoplugin_regionCode: geo.geoplugin_regionCode,
      geoplugin_regionName: geo.geoplugin_regionName,
      geoplugin_countryCode: geo.geoplugin_countryCode,
      geoplugin_countryName: geo.geoplugin_countryName,
      geoplugin_continentCode: geo.geoplugin_continentCode,
      geoplugin_timezone: geo.geoplugin_timezone,
    });
  };
  getIp();
};
