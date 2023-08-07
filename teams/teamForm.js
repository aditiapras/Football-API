module.exports = (req, res) => {
  const id = req.query.id;
  const getForms = async () => {
    if (!id) {
      res.status(400).json({ result: null, error: "Required Team ID" });
    } else {
      try {
        const getForm = await fetch(
          `https://www.fotmob.com/api/teams?id=${id}`
        ).then((r) => r.json());

        const forms = getForm.overview.teamForm.map((form) => {
          return {
            result: form.result,
            resultString: form.resultString,
            home: {
              name: form.tooltipText.homeTeam,
              id: form.tooltipText.homeTeamId,
              logo: `https://media-1.api.aditiapras.dev/image_resources/logo/teamlogo/${form.tooltipText.homeTeamId}_small.png`,
              score: form.tooltipText.homeScore,
            },
            away: {
              name: form.tooltipText.awayTeam,
              id: form.tooltipText.awayTeamId,
              logo: `https://media-1.api.aditiapras.dev/image_resources/logo/teamlogo/${form.tooltipText.awayTeamId}_small.png`,
              score: form.tooltipText.awayScore,
            },
            score: form.score,
            date: form.date,
          };
        });

        res.json({ forms });
      } catch {
        return res
          .status(400)
          .json({ result: null, error: "Team ID is invalid!" });
      }
    }
  };

  getForms();
};
