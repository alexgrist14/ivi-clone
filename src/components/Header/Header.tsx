import {FC, useEffect, useRef, useState} from "react";
import styles from "./Header.module.sass";
import Navigation from "/src/components/Header/Navigation/Navigation";
import Actions from "/src/components/Header/Actions/Actions";
import DropDown from "/src/components/Header/DropDown/DropDown";
import SearchModal from "/src/components/SearchModal/SearchModal";
import {CSSTransition} from "react-transition-group";
import {DropDownType} from "/src/components/Header/Header.utils";
import {useAppSelector} from "/src/hooks/redux";
import {RootState} from "/src/store";
import Image from "next/image";

const Header: FC = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const [dropDownType, setDropDownType] = useState<DropDownType>("");
    const windowSizeWidth = useAppSelector((state: RootState) => state.windowSize.width);

    const refDropDown = useRef<HTMLDivElement>(null);
    const navigationRef = useRef<HTMLDivElement>(null);
    const actionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dropDownType ? setIsDropdownActive(true) : setIsDropdownActive(false);
    }, [dropDownType])

    const handleHeaderMouseOver = (e: MouseEvent): void => {
        (!navigationRef.current?.contains(e.target as Node) &&
            !refDropDown.current?.contains(e.target as Node) &&
            !actionRef.current?.contains(e.target as Node)) && setDropDownType('')
    }

    return (
        <>
            {
                isSearchActive && <SearchModal closeCallback={() => setIsSearchActive(false)}/>
            }
            <header className={`${styles.header}  container`} onMouseOver={handleHeaderMouseOver}
                    onMouseLeave={() => setDropDownType('')}>
                <div className={`${styles.header__content} ${dropDownType ? styles.header__content_active : ''}`}>
                    <div className={styles.header__navigation}>
                        {
                            windowSizeWidth > 599 &&
                            <div className={styles.header__logo}>
                                <Image src='/images/iviLogo.svg' alt="ivi logo" width={77} height={56}/>
                            </div>
                        }
                        <div ref={navigationRef} className={styles.header__navigation_layout}>
                            {
                                windowSizeWidth > 1160 && <Navigation setDropDownType={setDropDownType}/>
                            }
                        </div>
                    </div>
                    <div ref={actionRef} className={styles.header__action_layout}>
                        <Actions setDropDownType={setDropDownType} setIsSearchActive={setIsSearchActive}/>
                    </div>
                </div>
                <CSSTransition classNames={{
                    enter: styles["header__dropdown-enter"],
                    enterActive: styles["header__dropdown-enter-active"],
                    exit: styles["header__dropdown-exit"],
                    exitActive: styles["header__dropdown-exit-active"],
                }} nodeRef={refDropDown} in={isDropdownActive} timeout={300} unmountOnExit>
                    <div ref={refDropDown} className={`${styles.header__dropdown}`}>
                        <DropDown dropDownType={dropDownType}/>
                    </div>
                </CSSTransition>
            </header>
        </>
    )
}

export default Header;
