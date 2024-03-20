import React from "react";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();

  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-2 lg:py-2 flex justify-between items-center dark:text-white">
          <div className="mb-0">
            <NavLink to="https://flowbite.com/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                {t("flowbite")}
              </span>
            </NavLink>
          </div>
          <div class="hidden justify-between items-center w-full lg:flex lg:w-auto">
            <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold dark:text-gray-300"
                      : "dark:text-gray-400"
                  }
                >
                  {t("home")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold dark:text-gray-300"
                      : "dark:text-gray-400"
                  }
                >
                  {t("about")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact-us"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold dark:text-gray-300"
                      : "dark:text-gray-400"
                  }
                >
                  {t("contact")}
                </NavLink>
              </li>
              {!isLoggedIn && (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "font-bold dark:text-gray-300"
                        : "dark:text-gray-400"
                    }
                  >
                    {t("login")}
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "font-bold dark:text-gray-300"
                        : "dark:text-gray-400"
                    }
                  >
                    {t("dashboard")}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="flex items-center">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
