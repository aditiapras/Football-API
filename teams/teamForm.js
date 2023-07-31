module.exports = (req, res) => {
  const id = req.query.id;
  const getForms = async () => {
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
          logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${form.tooltipText.homeTeamId}_xsmall.png`,
          score: form.tooltipText.homeScore,
        },
        away: {
          name: form.tooltipText.awayTeam,
          id: form.tooltipText.awayTeamId,
          logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${form.tooltipText.awayTeamId}_xsmall.png`,
          score: form.tooltipText.awayScore,
        },
        score: form.score,
        date: form.date,
      };
    });

    res.json({ forms });
  };

  if (!id) {
    res.status(400).json({ result: null, error: "Required Team ID" });
  } else {
    getForms();
  }
};
