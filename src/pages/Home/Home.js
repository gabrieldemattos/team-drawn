//router-dom
import { Link } from "react-router-dom";

//components
import Button from "../../components/Button";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Qual tipo de sorteio você gostaria de realizar?</h1>
      <div className={styles.options}>
        <div className={styles.option}>
          <Link to="/simple-draw">
            <Button text="sorteio simples" />
          </Link>
          <details>
            <p>
              O sorteio simples consiste em distribuir os jogadores
              aleatoriamente entre os times, sem seguir critérios específicos
              para o sorteio
            </p>
            <p>
              Nesse sorteio, os times serão formados de maneira aleatória,
              garantindo que todos os jogadores tenham chances iguais de serem
              selecionados para cada time. A distribuição será determinada
              puramente pelo acaso, proporcionando um sorteio justo e imparcial.
            </p>
          </details>
          <Link to="/skill-draw">
            <Button text="sorteio por habilidade" />
          </Link>
          <details>
            <p>
              O sorteio por habilidade tem como objetivo equilibrar os times
              levando em consideração as notas de habilidade atribuídas a cada
              jogador. No momento do sorteio, é necessário informar notas de 1 a
              5 para cada jogador.
            </p>
            <p>
              Durante o processo de sorteio, o critério utilizado será nivelar
              os times de forma a obter uma média similar ou igual entre eles. O
              objetivo é criar times com habilidades balanceadas, levando em
              conta as notas informadas para cada jogador.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Home;
