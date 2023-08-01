module.exports = (req, res) => {
  const matchId = req.query.matchId;
  const getLineups = async () => {
    if (!matchId) {
      res.status(400).json({ result: null, message: "Required Match ID!" });
    } else {
      const lineups = await fetch(
        `https://www.fotmob.com/api/matchDetails?matchId=${matchId}`
      ).then((r) => r.json());

      const lineupStatus = lineups.content.lineup;
      if (lineupStatus == false) {
        return res.json({ lineups: null });
      } else {
        const lineup = lineups.content.lineup.lineup.map((line) => {
          const coachStatus = () => {
            const coach = line.coach.map((coach) => {
              const kuch = coach;
              delete kuch.pageUrl;
              return kuch;
            });
            return coach;
          };

          const playerStatus = () => {
            const players = line.players.map((player) => {
              const play = player.map((p) => {
                const pemain = p;
                delete pemain.pageUrl;
                return pemain;
              });
              return { player: play };
            });
            return players;
          };

          const benchStatus = () => {
            const benches = line.bench.map((cadangan) => {
              const pemain = cadangan;
              delete pemain.pageUrl;
              return pemain;
            });
            return benches;
          };

          const coach = !line.coach ? "No Coach Information" : coachStatus();
          const player = !line.players
            ? "No Players Information"
            : playerStatus();
          const bench = !line.bench
            ? "No Substitute Information"
            : benchStatus();

          return {
            teamId: line.teamId,
            teamName: line.teamName,
            formation: line.lineup,
            players: player,
            bench: bench,
            coach: coach,
          };
        });
        res.json({ lineups: lineup });
      }
    }
  };
  getLineups();
};
