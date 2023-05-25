import styles from "./Button.module.css";

const Button = ({ text, disabled, click }) => {
  return (
    <button disabled={disabled} onClick={click} className={styles.btn}>
      {text}
    </button>
  );
};

export default Button;
