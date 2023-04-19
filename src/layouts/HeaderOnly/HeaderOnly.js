import clsx from "clsx";
import styles from "./HeaderOnly.module.css";
import Header from "../layoutComponents/Header/Header";
function HeaderOnly({ children }) {
  return (
    <div className={clsx(styles.wrap_headerOnly)}>
      <div>
        <Header />
      </div>
      {children}
    </div>
  );
}

export default HeaderOnly;
