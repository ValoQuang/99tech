import { useState } from "react";
import {
  LuFacebook,
  LuPaintBucket,
  LuLinkedin,
  LuGithub,
  LuAlignJustify,
} from "react-icons/lu";
import SwitchButton from "../Buttons/Switch";
import { useFormContext } from "../../AppContextProvider";
import { themes } from "../../mockData";
import React from "react";

const socialMediaLink = [
  {
    name: "linkedin",
    icon: <LuLinkedin />,
    link: "https://www.linkedin.com/in/quang-truong-07b150215/",
  },
  {
    name: "github",
    icon: <LuGithub />,
    link: "https://github.com/ValoQuang",
  },
  {
    name: "facebook",
    icon: <LuFacebook />,
    link: "https://www.facebook.com/ngoc.quang.995/",
  },
];

const Navbar: React.FC = React.memo(() => {
  const { theme, setTheme } = useFormContext();
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };

  const handleChangeTheme = () => {
    const currentThemeIndex = themes.indexOf(theme);
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[nextThemeIndex]);
  };

  const handleNavigate = (address: string) => {
    const newTab = socialMediaLink.find((link) => link.name === address);
    if (newTab) {
      window.open(newTab.link, "_blank")?.focus();
    }
  };

  const renderSocialMediaButtons = () => {
    return (
      <>
        {socialMediaLink.map((value, index) => (
          <div key={index}>
            <SwitchButton
              key={value.name}
              onSwap={() => handleNavigate(value.name)}
              icon={value.icon}
            />
          </div>
        ))}
        <SwitchButton onSwap={handleChangeTheme} icon={<LuPaintBucket />} />
      </>
    );
  };

  return (
    <div data-theme={theme}>
      <nav className="w-full h-10 flex gap-1 px-6 justify-between">
        <h1 className="text-4xl">Expensive form</h1>
        <section className="flex gap-1 max-lg:hidden">
          {renderSocialMediaButtons()}
        </section>

        <div className="lg:hidden relative">
          <SwitchButton onSwap={handleDropdown} icon={<LuAlignJustify />} />
          {openDropdown && (
            <div className="absolute animate-fadeIn right-0 mt-1 flex gap-[2px] flex-col shadow-lg z-50">
              {renderSocialMediaButtons()}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
});

export default Navbar;
