import ILink from "/src/types/ILink";
import {
  FaGooglePlay,
  FaLinkedinIn,
  FaOdnoklassniki,
  FaTelegramPlane,
  FaTwitter,
  FaVk,
} from "react-icons/fa";
import { IoTvSharp } from "react-icons/io5";
import { MdDevices, MdPhoneInTalk } from "react-icons/md";
import ButtonContent from "./ButtonContent/ButtonContent";
import { BsApple } from "react-icons/bs";

export const bottomRightLinks: Array<ILink> = [
  {
    url: "https://vk.com/iviru?crc=fa4448c13e06e69ba9e814e8743c7e2e",
    text: <FaVk />,
    target: "_blank",
  },
  { url: "https://ok.ru/ivi.ru", text: <FaOdnoklassniki />, target: "_blank" },
  { url: "https://twitter.com/ivi_ru", text: <FaTwitter />, target: "_blank" },
  { url: "https://vb.me/a0544c", text: <MdPhoneInTalk />, target: "_blank" },
  {
    url: "https://www.linkedin.com/company/2543415/",
    text: <FaLinkedinIn />,
    target: "_blank",
  },
  {
    url: "https://t.me/official_iviru",
    text: <FaTelegramPlane style={{ paddingRight: "3px" }} />,
    target: "_blank",
  },
];

export const bottomLeftLinks: Array<ILink> = [
  {
    url: "https://go.onelink.me/app/devicesiOS",
    text: (
      <ButtonContent
        icon={<BsApple size={20} />}
        topText="Загрузить в"
        bottomText="App Store"
      />
    ),
    target: "_blank",
  },
  {
    url: "https://go.onelink.me/app/devicesAndroid",
    text: (
      <ButtonContent
        icon={<FaGooglePlay size={18} />}
        topText="Доступно в"
        bottomText="Google Play"
      />
    ),
    target: "_blank",
  },
  {
    url: "https://www.ivi.ru/pages/tvsmart",
    text: (
      <ButtonContent
        icon={<IoTvSharp size={20} />}
        topText="Смотрите на"
        bottomText="Smart TV"
      />
    ),
    target: "_blank",
  },
  {
    url: "https://www.ivi.ru/devices",
    text: (
      <ButtonContent
        icon={<MdDevices size={20} />}
        bottomText="Все устройства"
      />
    ),
    target: "_blank",
  },
];