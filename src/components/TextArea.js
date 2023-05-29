import styles from "./TextArea.module.css";

const TextArea = ({ state }) => {
  return (
    <div className={styles.textarea}>
      <textarea onChange={(e) => state(e.target.value)}></textarea>
    </div>
  );
};

export default TextArea;
