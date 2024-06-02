import { useState, useCallback, memo } from "react";
import {
  LuFacebook,
  LuPaintBucket,
  LuLinkedin,
  LuGithub,
  LuAlignJustify,
} from "react-icons/lu";
import SwitchButton from "../Buttons/Switch";
import { useFormContext } from "../../AppContextProvider";
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

const Navbar: React.FC = memo(() => {
  const { theme, handleChangeTheme } = useFormContext();
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleDropdown = useCallback(() => {
    setOpenDropdown((prev) => !prev);
  }, []);

  const handleNavigate = useCallback((address: string) => {
    const newTab = socialMediaLink.find((link) => link.name === address);
    if (newTab) {
      window.open(newTab.link, "_blank")?.focus();
    }
  }, []);

  const renderSocialMediaButtons = useCallback(() => {
    return (
      <>
        {socialMediaLink.map((value, index) => (
          <div key={index}>
            <SwitchButton
              key={value.name}
              onClick={() => handleNavigate(value.name)}
              icon={value.icon}
            />
          </div>
        ))}
        <SwitchButton onClick={handleChangeTheme} icon={<LuPaintBucket />} />
      </>
    );
  }, [handleNavigate, handleChangeTheme]);

  return (
    <div data-theme={theme} className="w-full flex gap-1 px-6 justify-between">
      <h1 className="text-4xl">Expensive form</h1>
      <section className="flex gap-1 max-lg:hidden">
        {renderSocialMediaButtons()}
      </section>

      <div className="lg:hidden relative">
        <SwitchButton onClick={handleDropdown} icon={<LuAlignJustify />} />
        {openDropdown && (
          <div className="absolute animate-fadeIn right-0 mt-1 flex gap-[2px] flex-col shadow-lg z-50">
            {renderSocialMediaButtons()}
          </div>
        )}
      </div>
    </div>
  );
});

export default Navbar;
