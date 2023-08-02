const satelize = require("satelize-lts");

module.exports = (req, res) => {
  let ip = req.ip;
  satelize.satelize({ ip: `${ip}` }, function (err, payload) {
    res.json(payload);
  });
};
