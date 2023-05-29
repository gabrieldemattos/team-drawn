//css
import styles from "./SimpleDraw.module.css";

//hooks
import { useState } from "react";

//utils
import { shuffleArray } from "../../utils/utils";

//components
import Input from "../../components/Input";
import Button from "../../components/Button";
import BackToHome from "../../components/BackToHome";
import TextArea from "../../components/TextArea";

const SimpleDraw = () => {
  const [playersPerTeam, setPlayersPerTeam] = useState("");
  const [playersList, setPlayersList] = useState("");

  const [isDrawn, setIsDrawn] = useState(false);

  const [teamsList, setTeamsList] = useState([]);

  //transform each line of the textarea into an index of the array, do the checks and call the function to draw the teams
  const handleSubmit = (e) => {
    e.preventDefault();

    const arrayOfPlayers = playersList
      .split("\n")
      .map((elemento) => elemento.trim())
      .filter((elemento) => elemento !== "");

    if (playersPerTeam === "" || playersPerTeam === "0") {
      return alert("Por favor, informe o número de jogadores por time..");
    } else if (arrayOfPlayers.length === 0) {
      return alert("Por favor, informe o nome dos jogadores.");
    } else {
      const drawnTeams = raffle(arrayOfPlayers);
      setTeamsList(drawnTeams);
      setIsDrawn(true);
      return;
    }
  };

  //function to draw players, creating an extra team in case not all teams can have the same minimum number of players established by the user
  const raffle = (amountPlayersList) => {
    const numberOfPlayersMore = amountPlayersList.length % playersPerTeam;

    const playersDrawnForExtraTeam = [];

    const shuffledPlayers = shuffleArray([...amountPlayersList]);

    if (numberOfPlayersMore !== 0) {
      for (let i = 0; i < numberOfPlayersMore; i++) {
        let randomIndex = Math.floor(Math.random() * shuffledPlayers.length);
        let randomPlayer = shuffledPlayers[randomIndex];

        playersDrawnForExtraTeam.push(randomPlayer);
        shuffledPlayers.splice(randomIndex, 1);
      }
    }

    const newSortedPlayers = shuffledPlayers.filter(
      (player) => !playersDrawnForExtraTeam.includes(player)
    );

    const numTeams = Math.ceil(newSortedPlayers.length / playersPerTeam);
    const teams = Array.from({ length: numTeams }, () => []);

    let currentPlayerIndex = 0;

    for (let i = 0; i < playersPerTeam; i++) {
      for (let j = 0; j < numTeams; j++) {
        if (currentPlayerIndex >= newSortedPlayers.length) {
          break;
        }

        teams[j].push(newSortedPlayers[currentPlayerIndex]);
        currentPlayerIndex++;
      }
    }

    if (numberOfPlayersMore !== 0) {
      teams.push(playersDrawnForExtraTeam);
    }

    return teams;
  };

  return (
    <div>
      <BackToHome />
      <div className={styles.container}>
        <h1>Sorteio simples</h1>
        {!isDrawn && (
          <form onSubmit={handleSubmit}>
            <Input
              text="Informe a quantidade máxima de jogadores em cada time:"
              type="number"
              value={playersPerTeam}
              state={setPlayersPerTeam}
              min={1}
            />
            <p>*Cada linha representa um jogador.</p>
            <TextArea state={setPlayersList} />
            <Button text="Enviar nomes" />
          </form>
        )}
        <div className={styles.teams}>
          {teamsList.map((team, index) => (
            <div key={index}>
              <div className={styles.team}>
                <h2>Time {index + 1}</h2>
                {team.map((player, innerIndex) => (
                  <p key={`${innerIndex}a`}>{player}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleDraw;
