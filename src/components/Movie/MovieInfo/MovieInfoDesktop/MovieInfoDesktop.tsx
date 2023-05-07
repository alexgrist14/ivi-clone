import { FC } from "react";
import styles from "./MovieInfoDesktop.module.sass";
import MovieTitle from "../MovieTitle/MovieTitle";
import MovieParams from "../MovieParams/MovieParams";
import MovieTrailer from "../MovieTrailer/MovieTrailer";
import MovieTrailerButtons from "../MovieButtons/MovieButtons";
import MovieMedallions from "../MovieMedallions/MovieMedallions";
import MovieRating from "../MovieRating/MovieRating";
import MovieDescription from "../MovieDescription/MovieDescription";
import MovieOption from "../MovieOption/MovieOption";
import MovieBadge from "../MovieBadge/MovieBadge";
import MovieOptions from "../MovieOptions/MovieOptions";
import TextDropDown from "/src/UI/TextDropDown/TextDropDown";
import { IMovie } from "/src/types/IMovie";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { IPerson } from "/src/types/IPerson";

interface MovieInfoDesktopProps {
  movie: IMovie;
  persons: IPerson[] | undefined;
}

const MovieInfoDesktop: FC<MovieInfoDesktopProps> = ({ movie, persons }) => {
  const { t } = useTranslation("movie");
  const { locale } = useRouter();
  return (
    <section className={styles.desktop}>
      <div className="container">
        <div className={styles.desktop__row}>
          <div className={styles.trailer}>
            <div className={styles.trailer__sticky}>
              <MovieTrailer movie={movie} />
              <MovieTrailerButtons />
            </div>
          </div>
          <div className={styles.content}>
            <MovieTitle
              title={locale === "ru" ? movie.name_ru : movie.name_en}
              year={movie.year}
            />
            <MovieParams movie={movie} />
            <MovieMedallions movie={movie} persons={persons} />
            <TextDropDown
              toggleTitles={{
                defaultTitle: t("details.show"),
                activeTitle: t("details.hide"),
              }}
            >
              <MovieDescription descriptionHTML={movie.description} />
              <MovieOptions>
                <MovieOption className={styles.option} title={t("details.langs")}>
                  {movie.languagesAudio.map((lang) => (
                    <span className={styles.option__span} key={lang.language_id}>
                      {lang.language}
                    </span>
                  ))}
                </MovieOption>
                <MovieOption className={styles.option} title={t("details.subtitles")}>
                  {movie.languagesSubtitle.map((lang) => (
                    <span className={styles.option__span} key={lang.language_id}>
                      {lang.language}
                    </span>
                  ))}
                </MovieOption>
                <MovieOption className={styles.option} title={t("details.quality")}>
                  {movie.qualities.map((quality) => (
                    <MovieBadge className={styles.option__span} key={quality.quality_id}>
                      {quality.quality}
                    </MovieBadge>
                  ))}
                </MovieOption>
              </MovieOptions>
            </TextDropDown>
            <MovieRating grade={movie.rating} grades={movie.assessments} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieInfoDesktop;
