"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Search from "@/components/Search";
import idsLogo from "../../public/assets/images/ids/IDS_logo_landscape_WHITE.svg";
import topicItems from "../../app/data/topicItems.json";

const popularItems = [
  { text: "About the data service", href: "" },
  { text: "IDS Hub", href: "https://integrateddataservice.gov.uk/" },
  {
    text: "Climate change portal",
    href: "https://climate-change.data.gov.uk/",
  },
  {
    text: "Violence against women and girls portal",
    href: "https://vawg.gss-data.org.uk/",
  },
];

const PopularItem = ({ text, href }: { text: string; href: string }) => (
  <li className="app-navigation-header__popular-item">
    <a className="govuk-link app-navigation-header__popular-link" href={href}>
      {text}
    </a>
  </li>
);

export default function Header({
  href,
  serviceName,
  borderColour = "yellow-border",
}: {
  href?: string;
  serviceName?: string;
  borderColour?: "yellow-border" | "blue-border" | "blue-alt-border";
}) {
  const [isSearchMenuHidden, setIsSearchMenuHidden] = useState(true);
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const [isJsEnabled, setIsJsEnabled] = useState(false);

  const jsCheck = () => {
    const hasJavaScript =
      typeof window !== "undefined" && "IntersectionObserver" in window;
    setIsJsEnabled(hasJavaScript);
  };
  useEffect(() => {
    jsCheck();
  });

  const toggleSearchMenu = () => {
    setIsSearchMenuHidden(!isSearchMenuHidden);
    if (!isMenuHidden) {
      setIsMenuHidden(true);
    }
  };

  const toggleMenu = () => {
    setIsMenuHidden(!isMenuHidden);
    if (!isSearchMenuHidden) {
      setIsSearchMenuHidden(true);
    }
  };

  const SearchButtonJsDisabled = () => (
    <a className="app-navigation-header__search-item-link" href="/datasets">
      <span className="govuk-visually-hidden">Search GOV.UK</span>
      <svg
        className="app-navigation-header__search-toggle-button-link-icon"
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12.0161"
          cy="11.0161"
          r="8.51613"
          stroke="currentColor"
          strokeWidth="3"
        ></circle>
        <line
          x1="17.8668"
          y1="17.3587"
          x2="26.4475"
          y2="25.9393"
          stroke="currentColor"
          strokeWidth="3"
        ></line>
      </svg>
    </a>
  );

  const SearchButtonJsEnabled = () => (
    <button
      onClick={() => toggleSearchMenu()}
      className={`app-navigation-header__search-toggle-button${
        !isSearchMenuHidden ? "-open" : ""
      }`}
      id="super-search-menu-toggle"
      type="button"
    >
      <span className="govuk-visually-hidden">Search GOV.UK</span>

      <svg
        className="app-navigation-header__search-toggle-button-link-icon"
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        visibility={isSearchMenuHidden ? "visible" : "hidden"}
      >
        <circle
          cx="12.0161"
          cy="11.0161"
          r="8.51613"
          stroke="currentColor"
          strokeWidth="3"
        ></circle>
        <line
          x1="17.8668"
          y1="17.3587"
          x2="26.4475"
          y2="25.9393"
          stroke="currentColor"
          strokeWidth="3"
        ></line>
      </svg>
      <span
        className="app-navigation-header__navigation-top-toggle-close-icon"
        hidden={isSearchMenuHidden}
      >
        ×
      </span>
    </button>
  );

  const MenuButtonJsDisabled = () => (
    <a className="app-navigation-header__navigation-item-link" href="/topics">
      <span className="app-navigation-header__navigation-item-link-inner">
        Menu
      </span>
    </a>
  );

  const MenuButtonJsEnabled = () => (
    <button
      aria-label="Show navigation menu"
      className={`app-navigation-header__navigation-top-toggle-button${
        !isMenuHidden ? "-open" : ""
      }`}
      type="button"
      onClick={() => toggleMenu()}
    >
      <span className="app-navigation-header__navigation-top-toggle-button-inner">
        Menu
      </span>
    </button>
  );
  const headerClass = "govuk-header--" + borderColour;
  const containerClass = "govuk-header__container--" + borderColour;

  return (
    <header
      className={`govuk-header ${headerClass}`}
      role="banner"
      data-module="govuk-header"
    >
      <div
        className={`app-width-container govuk-header__container ${containerClass}`}
      >
        <div className="govuk-header__logo">
          <a
            href={href || "/"}
            className="govuk-header__link govuk-header__link--homepage"
            id="logo"
            title="Go to the Data Explorer homepage"
          >
            <span className="govuk-header__logotype">
              <Image
                priority
                src={idsLogo}
                alt="IDS Data Explorer"
                className="govuk-header__logotype-crown"
                height={30}
              />
            </span>
          </a>
        </div>
        {serviceName ? (
          <div className="govuk-header__content">
            <a
              href={href || "/"}
              className="govuk-header__link govuk-header__service-name"
            >
              {serviceName}
            </a>
          </div>
        ) : null}
      </div>
      <nav className="app-navigation-header__content">
        <div className="app-width-container app-navigation-header__button-width-container">
          <div className="app-navigation-header__button-container">
            <div className="app-navigation-header__navigation-item">
              {isJsEnabled ? <MenuButtonJsEnabled /> : <MenuButtonJsDisabled />}
            </div>
            <div className="app-navigation-header__search-item">
              {isJsEnabled ? (
                <SearchButtonJsEnabled />
              ) : (
                <SearchButtonJsDisabled />
              )}
            </div>
          </div>
        </div>
        <div
          id="super-search-menu"
          className="app-navigation-header__navigation-dropdown-menu"
          hidden={isSearchMenuHidden}
        >
          <div className="app-width-container app-navigation-header__search-container">
            <Search />
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <h3 className="govuk-heading-m">Popular on GOV.UK</h3>
                <ul className="govuk-list">
                  {popularItems.map((item) => (
                    <PopularItem
                      key={item.text}
                      text={item.text}
                      href={item.href}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          id="super-search-menu"
          className="app-navigation-header__navigation-dropdown-menu"
          hidden={isMenuHidden}
        >
          <div className="app-width-container app-navigation-header__search-container">
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-two-thirds">
                <h3 className="govuk-heading-m">Topics</h3>
                <ul className="govuk-list app-header__list">
                  {topicItems.topics?.map(
                    (item: { heading: string; href: string }) => (
                      <PopularItem
                        key={item.heading}
                        text={item.heading}
                        href={item.href}
                      />
                    )
                  )}
                </ul>
              </div>
              <div className="govuk-grid-column-one-third">
                <h3 className="govuk-heading-m">Government activity</h3>
                <ul className="govuk-list">
                  {popularItems.map((item) => (
                    <PopularItem
                      key={item.text}
                      text={item.text}
                      href={item.href}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
