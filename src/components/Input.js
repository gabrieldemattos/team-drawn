import styles from "./Input.module.css";

const Input = ({ text, type, value, state, disabled, min, max }) => {
  return (
    <div className={styles.form}>
      <label>{text}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => state(e.target.value)}
        disabled={disabled}
        min={min}
        max={max}
      />
    </div>
  );
};

export default Input;
