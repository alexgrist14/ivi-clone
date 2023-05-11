import { FC, KeyboardEvent, MouseEvent, useRef, useState } from "react";
import SearchCloseButton from "./SearchCloseButton/SearchCloseButton";
import styles from "./SearchModal.module.sass";
import SearchString from "./SearchString/SearchString";
import useOverflowHidden from "/src/hooks/useOverflowHidden";
import { useAppSelector } from "/src/hooks/redux";

interface SearchModalProps {
  closeCallback: () => void;
}

export interface ISearchStates {
  stringActive: boolean;
  buttonActive: boolean;
  buttonHover: boolean;
  inputActive: boolean;
}

const SearchModal: FC<SearchModalProps> = ({ closeCallback }) => {
  const { showSearchModal } = useAppSelector((state) => state.showModal);

  const stringRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchStates, setSearchStates] = useState<ISearchStates>({
    stringActive: true,
    buttonActive: false,
    buttonHover: true,
    inputActive: true,
  });

  const keydownHandler = (e: KeyboardEvent): void => {
    e.key === "Escape" && closeCallback();
    e.key === "Enter" &&
      window.open(
        `https://www.ivi.ru/?ivi_search=${encodeURIComponent(searchQuery)}`
      );
  };

  const clickHandler = (e: MouseEvent): void => {
    if (
      !stringRef.current?.contains(e.target as Node) &&
      searchQuery.length === 0
    ) {
      setSearchStates({
        ...searchStates,
        stringActive: false,
        buttonHover: false,
        inputActive: false,
      });
    }
  };

  useOverflowHidden(showSearchModal);

  return (
    <div
      onKeyDown={keydownHandler}
      onClick={clickHandler}
      className={styles.search}
    >
      <SearchCloseButton clickCallback={closeCallback} />
      <div className={styles.search__container}>
        <h1 className={styles.search__title}>Поиск</h1>
        <div ref={stringRef}>
          <SearchString
            searchQuery={searchQuery}
            searchStates={searchStates}
            setSearchQuery={setSearchQuery}
            setSearchStates={setSearchStates}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
