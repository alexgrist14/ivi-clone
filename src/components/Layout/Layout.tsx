import { FC, ReactNode, useEffect } from "react";
import Head from "next/head";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { useDispatch } from "react-redux";
import { setWindowSize } from "/src/store/slices/windowSizeSlice";
import { useAppSelector } from "/src/hooks/redux";
import { useDebouncedCallback } from "use-debounce";
import MobileMenu from "./MobileMenu/MobileMenu";
import { setSlugs } from "/src/store/slices/slugsSlice";
import { ToastContainer } from "react-toastify";
import { iviSans, iviIcons, iconFont } from "/src/utils/fonts";
import ProgressBar from "/src/UI/ProgressBar/ProgressBar";
import { useCountriesSlugs } from "/src/api/countries";
import { useGenresSlugs } from "/src/api/genres";
import { setAuth } from "/src/store/slices/authSlice";
import {
  isUserAuthorized,
  refreshAccessToken,
  RefreshResponse,
} from "/src/api/user";
import { useAppInterceptors } from "/src/hooks/useAppInterceptors";
import { removeAuthData, setAuthData } from "/src/utils/localStorage";
import {deleteCookiesByNames, getCookieByName} from "/src/utils/cookies";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ title, children }) => {
  const genresSlugs = useGenresSlugs();
  const countriesSlugs = useCountriesSlugs();

  const windowSizeWidth = useAppSelector((state) => state.windowSize.width);
  const dispatch = useDispatch();

  useAppInterceptors();

  const debouncedResize = useDebouncedCallback((): void => {
    dispatch(
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    );
  }, 100);

  const getRefreshToken = async (): Promise<RefreshResponse | undefined> => {
    return await refreshAccessToken();
  };

  useEffect(() => {
    // const userData = getCookieByName("userData");
    // if((userData !== null)){
    //   const decodedCoockie= decodeURIComponent(userData);
    // }

    isUserAuthorized().then((res) => {
      if (res === true) {
        getRefreshToken()
          .then((res) => {
            console.log(res);
            setAuthData(res?.email, res?.accessToken);
            dispatch(
              setAuth({
                userEmail: localStorage.getItem("email") || "",
                isLogged: true,
              })
            );
          });
      }else if(res === false){
        console.log(res);
        removeAuthData();
        //deleteCookiesByNames(["accessToken","refreshToken","userData"]);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      setSlugs({
        genresSlugs: genresSlugs.data || [],
        countriesSlugs: countriesSlugs.data || [],
      })
    );
  }, [countriesSlugs.data, dispatch, genresSlugs.data]);

  useEffect(() => {
    debouncedResize();
    window.addEventListener("resize", debouncedResize);

    return () => window.removeEventListener("resize", debouncedResize);
  }, [dispatch, debouncedResize]);

  return (
    <div
      className={`${iviSans.className} ${iviSans.variable} ${iviIcons.variable} ${iconFont.variable}`}
    >
      <ToastContainer />
      <ProgressBar value={0} isFixed={true} type="loading" />
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main>{children}</main>
      {windowSizeWidth < 1160 && <MobileMenu />}
      <Footer />
    </div>
  );
};

export default Layout;
