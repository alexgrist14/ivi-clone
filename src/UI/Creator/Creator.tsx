import { FC } from "react";
import styles from "./Creator.module.sass";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { IPerson } from "/src/types/IPerson";
import { getBackendImage } from "/src/utils/getBackendImg";
import { getPersonFirstName, getPersonLastName, getPersonRole } from "/src/utils/person";

interface CreatorProps {
  person: IPerson;
  type?: "small" | "large";
  className?: string;
}

const Creator: FC<CreatorProps> = ({ person, type = "small", className = "" }) => {
  const { t } = useTranslation("movie");
  const { locale } = useRouter();
  const creatorClassName = styles["creator_" + type];

  return (
    <Link
      className={`${styles.creator} ${creatorClassName} ${className}`}
      href={"/persons/" + person.person_id}
    >
      <div className={styles.wrapper}>
        <Image
          className={styles.wrapper__img}
          src={getBackendImage(person.img)}
          fill={true}
          alt={person.first_name_en}
          placeholder="blur"
          blurDataURL="/images/placeholder.svg"
          sizes="width: 100vw"
        />
      </div>
      <div>
        <h4 className={styles.title}>{getPersonFirstName(person, locale)}</h4>
        <h4 className={styles.title}>{getPersonLastName(person, locale)}</h4>
        <p className={styles.subtitle}>{t("creators." + getPersonRole(person))}</p>
      </div>
    </Link>
  );
};

export default Creator;