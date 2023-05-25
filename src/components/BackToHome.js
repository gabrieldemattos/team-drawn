//css
import styles from "./BackToHome.module.css";

//router-dom
import { Link } from "react-router-dom";

//icon
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const BackToHome = () => {
  return (
    <Link to="/">
      <div className={styles.icon}>
        <BsFillArrowLeftCircleFill />
        <span>Voltar</span>
      </div>
    </Link>
  );
};

export default BackToHome;
