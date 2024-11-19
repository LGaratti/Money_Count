import { IconType } from "react-icons";
import { FiHome, FiSettings } from "react-icons/fi";
import Homepage from "../../pages/Homepage";
import DemoPage from "../../pages/DemoPage";

export interface PagesConfig
{
  index?: boolean;
  element: () => JSX.Element;
  name: string;
  link: string;
  icon: IconType;
}

export const PagesConfig: PagesConfig[] = [
  {
    index: true,
    element: Homepage,
    name: 'Home',
    link: '/',
    icon: FiHome,
  },
  {
    element: DemoPage,
    name: 'Demo',
    link: '/demo',
    icon: FiSettings,
  },  
]