module.exports = (req, res) => {
  let ipv = req.ip;
  const getIp = async () => {
    const geo = await fetch(`http://www.geoplugin.net/json.gp?ip=${ipv}`).then(
      (r) => r.json()
    );

    res.json({
      ip: ipv,
      query: geo.geoplugin_request,
      city: geo.geoplugin_city,
      region: geo.geoplugin_region,
      regionCode: geo.geoplugin_regionCode,
      regionName: geo.geoplugin_regionName,
      countryCode: geo.geoplugin_countryCode,
      countryName: geo.geoplugin_countryName,
      continentCode: geo.geoplugin_continentCode,
      timezone: geo.geoplugin_timezone,
    });
  };
  getIp();
};
