//css
import styles from "./SkillDraw.module.css";

//hooks
import { useState } from "react";

//utils
import { shuffleArray } from "../../utils/utils";

//components
import Input from "../../components/Input";
import Button from "../../components/Button";
import BackToHome from "../../components/BackToHome";

const SkillDraw = () => {
  const [playersPerTeam, setPlayersPerTeam] = useState("");
  const [amountPlayers, setAmountPlayers] = useState("");

  const [releaseInsertRating, setReleaseInsertRating] = useState(false);
  const [playerRatings, setPlayerRatings] = useState([]);

  const [teams, setTeams] = useState([]);

  const [displayAverage, setDisplayAverage] = useState(true);

  //send only the names
  const handleSubmit = (e) => {
    e.preventDefault();

    const invalidNames = amountPlayers.trim() === "";

    //checks if names and input of players per team have been entered
    if (playersPerTeam === "" || playersPerTeam === "0") {
      return alert("Por favor, informe o número de jogadores por time..");
    } else if (invalidNames) {
      return alert("Por favor, informe o nome dos jogadores.");
    } else {
      //separate each line so that it is a name in the array and return an object for each player, containing the name of the player and the initial rate as 0
      setAmountPlayers(
        amountPlayers
          .split("\n")
          .filter((elemento) => {
            return elemento.trim() !== "";
          })
          .map((player) => {
            return {
              playerName: player,
              playerRating: 0,
            };
          })
      );

      setReleaseInsertRating(true);
    }
  };

  //change the rate of each player according to what was filled in by the user
  const handleChangeRating = (index, value) => {
    setPlayerRatings((prevRatings) => {
      const updatedRatings = [...prevRatings];
      updatedRatings[index] = {
        ...updatedRatings[index],
        playerRating: value,
      };
      return updatedRatings;
    });
  };

  //distribute players in teams evenly, taking into account the rank of players
  const distributePlayers = (players, numPlayersPerTeam) => {
    const shuffledPlayers = shuffleArray([...players]);

    const sortedPlayers = shuffledPlayers.sort(
      (a, b) => b.playerRating - a.playerRating
    );

    const numberOfPlayersMore = sortedPlayers.length % numPlayersPerTeam;

    const playersDrawnForExtraTeam = [];

    if (numberOfPlayersMore !== 0) {
      const copySortedPlayers = [...sortedPlayers];
      const drawnRatings = [];

      for (let i = 0; i < numberOfPlayersMore; i++) {
        let randomIndex;
        let randomPlayer;
        let attempts = 0;

        //Loop to select players with a different rating than those already drawn
        do {
          randomIndex = Math.floor(Math.random() * copySortedPlayers.length);
          randomPlayer = copySortedPlayers[randomIndex];
          attempts++;

          if (attempts > copySortedPlayers.length) {
            break;
          }
        } while (
          drawnRatings.includes(randomPlayer.playerRating) &&
          drawnRatings.length < players.length
        );

        playersDrawnForExtraTeam.push(randomPlayer);
        copySortedPlayers.splice(randomIndex, 1);
        drawnRatings.push(randomPlayer.playerRating);
      }
    }

    const newSortedPlayers = sortedPlayers.filter(
      (player) => !playersDrawnForExtraTeam.includes(player)
    );

    const numTeams = Math.ceil(newSortedPlayers.length / numPlayersPerTeam);
    const teams = Array.from({ length: numTeams }, () => []);

    let currentPlayerIndex = 0;

    //Distribution of players in teams
    for (let i = 0; i < numPlayersPerTeam; i++) {
      for (let j = 0; j < numTeams; j++) {
        if (currentPlayerIndex >= newSortedPlayers.length) {
          break;
        }

        teams[j].push(newSortedPlayers[currentPlayerIndex]);
        currentPlayerIndex++;
        shuffleArray(teams[j]);
      }
    }

    if (numberOfPlayersMore !== 0) {
      teams.push(playersDrawnForExtraTeam);
    }

    return teams;
  };

  //calculate the average of each team
  const calculateTeamAverage = (team) => {
    const sumRating = team.reduce(
      (acc, player) => acc + Number(player.playerRating),
      0
    );

    return sumRating / team.length;
  };

  //send player ratings and run the draw
  const handleSubmitRateAndRaffle = (e) => {
    e.preventDefault();

    const playerNames = amountPlayers.map((player) => player.playerName);
    const updatedRatings = playerNames.map((playerName, index) => ({
      playerName: playerName,
      playerRating: playerRatings[index]?.playerRating || 1,
    }));

    const drawnTeams = distributePlayers(updatedRatings, playersPerTeam);
    const shuffleTeams = shuffleArray(drawnTeams);

    setTeams(shuffleTeams);
  };

  //whether or not to display the average on screen
  const toggleDisplayAverage = () => {
    setDisplayAverage((prevDisplayAverage) => !prevDisplayAverage);
  };

  return (
    <div>
      <BackToHome />
      <div className={styles.container}>
        <h1>Sorteio por habilidade</h1>
        {!releaseInsertRating && (
          <form onSubmit={handleSubmit}>
            <Input
              text="Informe a quantidade máxima de jogadores em cada time:"
              type="number"
              value={playersPerTeam}
              state={setPlayersPerTeam}
            />
            <textarea
              onChange={(e) => setAmountPlayers(e.target.value)}
            ></textarea>
            <Button text="Enviar nomes" />
          </form>
        )}
        {releaseInsertRating && (
          <div className={styles.rating}>
            <h2>Informe as notas de cada jogador:</h2>
            <h3>As notas vão de 1 a 5:</h3>
            <ul>
              <li>1: Muito fraco</li>
              <li>2: Fraco</li>
              <li>3: Médio</li>
              <li>4: Bom</li>
              <li>5: Muito bom</li>
            </ul>
            <h2>Jogadores informados:</h2>
            <form onSubmit={handleSubmitRateAndRaffle}>
              {amountPlayers.map((player, index) => (
                <div className={styles.player} key={index}>
                  <div className={styles.player_name}>
                    <span>Nome:</span>
                    <Input value={player.playerName} disabled={true} />
                  </div>
                  <div className={styles.input_rating}>
                    <span>Nota: </span>
                    <input
                      type="number"
                      value={playerRatings[index]?.playerRating || 1}
                      onChange={(e) =>
                        handleChangeRating(index, e.target.value)
                      }
                      min={1}
                      max={5}
                    />
                  </div>
                </div>
              ))}
              <Button text="relizar sorteio" />
            </form>
          </div>
        )}
        <div className={styles.tip}>
          {teams.length > 0 && (
            <>
              <p>
                * Caso as médias dos times não estejam próximas, você pode
                realizar um novo sorteio para obter uma distribuição mais
                equilibrada.
              </p>
              <div className={styles.display_average}>
                <input
                  type="checkbox"
                  onChange={toggleDisplayAverage}
                  checked={displayAverage}
                />
                <span>Exibir média</span>
              </div>
            </>
          )}
        </div>
        <div className={styles.teams}>
          {teams.map((team, index) => (
            <div key={index}>
              {displayAverage && (
                <p className={styles.average}>
                  média: {calculateTeamAverage(team).toFixed(2)}
                </p>
              )}
              <div className={styles.team}>
                <h2>Time {index + 1}</h2>
                {team.map((player, innerIndex) => (
                  <p key={`${innerIndex}a`}>{player.playerName}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillDraw;
