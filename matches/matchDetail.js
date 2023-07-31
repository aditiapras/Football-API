module.exports = (req, res) => {
  const matchId = req.query.matchId;
  const getMatches = async () => {
    const matches = await fetch(
      `https://www.fotmob.com/api/matchDetails?matchId=${matchId}`
    ).then((r) => r.json());

    const general = {
      matchId: matches.general.matchId,
      round: matches.general.leagueRoundName,
      leagueId: matches.general.leagueId,
      leagueName: matches.general.leagueName,
      countryCode: matches.general.countryCode,
      season: matches.general.parentLeagueSeason,
      homeTeam: {
        name: matches.general.homeTeam.name,
        id: matches.general.homeTeam.id,
        logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${matches.general.homeTeam.id}_small.png`,
        score: matches.header.teams[0].score,
        fifaRank: matches.header.teams[0].fifaRank,
      },
      awayTeam: {
        name: matches.general.awayTeam.name,
        id: matches.general.awayTeam.id,
        logo: `https://images.fotmob.com/image_resources/logo/teamlogo/${matches.general.awayTeam.id}_small.png`,
        score: matches.header.teams[1].score,
        fifaRank: matches.header.teams[1].fifaRank,
      },
      status: matches.header.status,
    };

    const events = matches.content.matchFacts.events.events;

    const lineupsStates = matches.content.lineup;

    const lineupState = () => {
      const lineup = () => {
        const lineups = matches.content.lineup.lineup.map((line) => {
          const benches = line.bench.map((bench) => {
            return {
              id: bench.id,
              name: bench.name,
              position: bench.position,
              imageUrl: `https://images.fotmob.com/image_resources/playerimages/${bench.id}.png`,
              name: {
                firstName: bench.name.firstName,
                lastName: bench.name.lastName,
                fullName: bench.name.fullName,
              },
              shirt: bench.name.shirt,
              timeSubbedOn: bench.timeSubbedOn,
              timeSubbedOff: bench.timeSubbedOff,
              role: bench.role,
              minutesPlayed: bench.minutesPlayed,
              events: bench.events,
              stats: bench.stats,
            };
          });

          const coachStates = line.coach;
          const coachState = () => {
            const coaches = line.coach.map((coach) => {
              return {
                id: coach.id,
                name: {
                  firstName: coach.name.firstName,
                  lastName: coach.name.lastName,
                  fullName: coach.name.fullName,
                },
                position: coach.position,
                imageUrl: `https://images.fotmob.com/image_resources/playerimages/${coach.id}.png`,
                role: coach.role,
                events: coach.events,
              };
            });

            const returnCoach = !coachStates ? null : coaches();

            return returnCoach;
          };

          const players = line.players.map((player) => {
            return {
              player: player.map((play) => {
                return {
                  id: play.id,
                  name: {
                    firstName: play.name.firstName,
                    lastName: play.name.lastName,
                    fullName: play.name.fullName,
                  },
                  positionStringShort: player.positionStringShort,
                  position: play.position,
                  imageUrl: `https://images.fotmob.com/image_resources/playerimages/${play.id}.png`,
                  shirt: play.shirt,
                  timeSubbedOn: play.timeSubbedOn,
                  timeSubbedOff: play.timeSubbedOff,
                  role: play.role,
                  minutesPlayed: play.minutesPlayed,
                  events: play.events,
                  stats: play.stats,
                };
              }),
            };
          });

          return {
            teamId: line.teamId,
            teamName: line.teamName,
            formation: line.lineup,
            bench: benches,
            coach: coachState,
            players: players,
          };
        });
        return lineups;
      };
      const returnLineup = lineupsStates == false ? null : lineup();
      return returnLineup;
    };

    const stats = () => {
      const stat = () => {
        const data = matches.content.stats.Periods;
        return data;
      };
      const state = matches.content.stats == null ? null : stat();
      return state;
    };

    res.json({
      details: general,
      events,
      lineups: lineupState(),
      stats: stats(),
    });
  };
  if (!matchId) {
    res.status(404).json({ result: null, error: "Required Match ID" });
  } else {
    getMatches();
  }
};
