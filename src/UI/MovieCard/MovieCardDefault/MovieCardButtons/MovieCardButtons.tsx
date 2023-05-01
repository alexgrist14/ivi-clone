import { FC } from "react";
import styles from "./MovieCardButtons.module.sass";
import { buttonsId } from "../../../../utils/movieCard";
import { useTranslation } from "next-i18next";
import Tippy from "@tippyjs/react";

const MovieCardButtons: FC = () => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.buttons}>
      {buttonsId.map((id, index) => (
        <Tippy
          className={styles.tooltip}
          key={index}
          placement="top-start"
          content={`${t(`tooltips.${id}`)}`}
          arrow={true}
        >
          <button className={styles.buttons__button}>
            <i className={`${styles[`icon_${id}`]} ${styles.icon}`}></i>
          </button>
        </Tippy>
      ))}
    </div>
  );
};

export default MovieCardButtons;
