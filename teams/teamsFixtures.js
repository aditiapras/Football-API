// Fixtures by month group using lodash

module.exports = (req, res) => {
  const id = req.query.id;

  const getFixtures = async () => {
    const data = await fetch(`https://www.fotmob.com/api/teams?id=${id}`).then(
      (r) => r.json()
    );
    const result = data.fixtures;

    const fixtures = result.allFixtures.fixtures.map((fix) => {
      return {
        id: fix.id,
        opponent: {
          id: fix.opponent.id,
          name: fix.opponent.name,
          logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${fix.opponent.id}_xsmall.png`,
          score: fix.opponent.score,
        },
        home: {
          id: fix.home.id,
          name: fix.home.name,
          logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${fix.home.id}_xsmall.png`,
          score: fix.home.score,
        },
        away: {
          id: fix.away.id,
          name: fix.away.name,
          logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${fix.away.id}_xsmall.png`,
          score: fix.away.score,
        },
        notStarted: fix.notStarted,
        tournament: {
          name: fix.tournament.name,
          leagueId: fix.tournament.leagueId,
          logo: {
            light: `https://images.fotmob.com/image_resources/logo/leaguelogo/${fix.tournament.leagueId}.png`,
            dark: `https://images.fotmob.com/image_resources/logo/leaguelogo/dark/${fix.tournament.leagueId}.png`,
          },
        },
        status: fix.status,
      };
    });

    const nextMatch = {
      id: result.allFixtures.nextMatch.id,
      opponent: {
        id: result.allFixtures.nextMatch.opponent.id,
        name: result.allFixtures.nextMatch.opponent.name,
        logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${result.allFixtures.nextMatch.opponent.id}_xsmall.png`,
        score: result.allFixtures.nextMatch.opponent.score,
      },
      home: {
        id: result.allFixtures.nextMatch.home.id,
        name: result.allFixtures.nextMatch.home.name,
        logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${result.allFixtures.nextMatch.home.id}_xsmall.png`,
        score: result.allFixtures.nextMatch.home.score,
      },
      away: {
        id: result.allFixtures.nextMatch.away.id,
        name: result.allFixtures.nextMatch.away.name,
        logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${result.allFixtures.nextMatch.away.id}_xsmall.png`,
        score: result.allFixtures.nextMatch.away.score,
      },
      notStarted: result.allFixtures.nextMatch.notStarted,
      tournament: {
        name: result.allFixtures.nextMatch.tournament.name,
        leagueId: result.allFixtures.nextMatch.tournament.leagueId,
        logo: {
          light: `https://images.fotmob.com/image_resources/logo/leaguelogo/${result.allFixtures.nextMatch.tournament.leagueId}.png`,
          dark: `https://images.fotmob.com/image_resources/logo/leaguelogo/dark/${result.allFixtures.nextMatch.tournament.leagueId}.png`,
        },
      },
      status: result.allFixtures.nextMatch.status,
    };

    res.json({ allFixtures: { fixtures, nextMatch } });
  };
  getFixtures();
};
