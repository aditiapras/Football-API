const moment = require("moment-timezone");

module.exports = (req, res) => {
  var ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const getIp = async () => {
    const geo = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`).then(
      (r) => r.json()
    );

    res.json({
      ip: ip,
      cip: ip.ip,
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
