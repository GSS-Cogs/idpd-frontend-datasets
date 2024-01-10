import Image from "next/image";

interface LogoProps {
  id: string;
  title: string;
}

interface LogoCompDict {
  [key: string]: (props: LogoProps) => JSX.Element;
}

const checkTitle = (title: string) => {
  if (title === "Office for National Statistics") {
    return false;
  }
  return true;
};

const createLogoComponent =
  (src: string) =>
  ({ title, id }: LogoProps) => {
    const shouldDisplay = checkTitle(title);
    const publisher = id.split("/").pop();
    const colour = govukColoursOrganisations[publisher || ""];

    return (
      <div
        className={`app-datasets-list__item-bottom-publisher ${
          shouldDisplay
            ? ""
            : "app-datasets-list__item-bottom-publisher--no_border"
        }`}
        style={{ borderRightColor: colour?.colour }}
      >
        <Image
          src={src}
          alt="department logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: 34 }}
        />
        {shouldDisplay && (
          <h3 className="app-datasets-list__item-publisher-inner">{title}</h3>
        )}
      </div>
    );
  };

const defaulLogoComponent =
  () =>
  ({ title }: LogoProps) =>
    <div className="app-datasets-list__item-bottom-publisher">{title}</div>;

const logoCompDict: LogoCompDict = {
  "https://staging.idpd.uk/publishers/office-for-national-statistics":
    createLogoComponent(
      "/datasets/assets/images/ONS_Logo_Digital_Colour_English_RGB.svg"
    ),
  "https://staging.idpd.uk/publishers/department-for-energy-security-and-net-zero":
    createLogoComponent("/datasets/assets/images/crest.png"),
  default: defaulLogoComponent(),
};

export default logoCompDict;

const govukColoursOrganisations: {
  [id: string]: { colour: string; colourWebsafe?: string };
} = {
  "attorney-generals-office": {
    colour: "#9f1888",
    colourWebsafe: "#a03a88",
  },
  "cabinet-office": {
    colour: "#005abb",
    colourWebsafe: "#347da4",
  },
  "civil-service": {
    colour: "#af292e",
  },
  "department-for-business-innovation-skills": {
    colour: "#003479",
    colourWebsafe: "#347da4",
  },
  "department-for-communities-and-local-government": {
    colour: "#009999",
    colourWebsafe: "#37836e",
  },
  "department-for-culture-media-sport": {
    colour: "#d40072",
    colourWebsafe: "#a03155",
  },
  "department-for-education": {
    colour: "#003a69",
    colourWebsafe: "#347ca9",
  },
  "department-for-environment-food-rural-affairs": {
    colour: "#00a33b",
    colourWebsafe: "#008938",
  },
  "department-for-international-development": {
    colour: "#002878",
    colourWebsafe: "#405e9a",
  },
  "department-for-international-trade": {
    colour: "#cf102d",
    colourWebsafe: "#005ea5",
  },
  "department-for-business-and-trade": {
    colour: "#cf102d",
    colourWebsafe: "#005ea5",
  },
  "department-for-levelling-up-housing-and-communities": {
    colour: "#012169",
  },
  "department-for-transport": {
    colour: "#006c56",
    colourWebsafe: "#398373",
  },
  "department-for-work-pensions": {
    colour: "#00beb7",
    colourWebsafe: "#37807b",
  },
  "department-of-energy-climate-change": {
    colour: "#009ddb",
    colourWebsafe: "#2b7cac",
  },
  "department-of-health": {
    colour: "#00ad93",
    colourWebsafe: "#39836e",
  },
  "foreign-commonwealth-development-office": {
    colour: "#012169",
  },
  "foreign-commonwealth-office": {
    colour: "#003e74",
    colourWebsafe: "#406e97",
  },
  "government-equalities-office": {
    colour: "#9325b2",
  },
  "hm-government": {
    colour: "#0076c0",
    colourWebsafe: "#347da4",
  },
  "hm-revenue-customs": {
    colour: "#009390",
    colourWebsafe: "#008670",
  },
  "hm-treasury": {
    colour: "#af292e",
    colourWebsafe: "#832322",
  },
  "home-office": {
    colour: "#9325b2",
    colourWebsafe: "#9440b2",
  },
  "ministry-of-defence": {
    colour: "#4d2942",
    colourWebsafe: "#5a5c92",
  },
  "ministry-of-justice": {
    colour: "#231f20",
    colourWebsafe: "#5a5c92",
  },
  "northern-ireland-office": {
    colour: "#002663",
    colourWebsafe: "#3e598c",
  },
  "office-of-the-advocate-general-for-scotland": {
    colour: "#002663",
    colourWebsafe: "#005ea5",
  },
  "office-of-the-leader-of-the-house-of-commons": {
    colour: "#317023",
    colourWebsafe: "#005f8f",
  },
  "office-of-the-leader-of-the-house-of-lords": {
    colour: "#9c132e",
    colourWebsafe: "#c2395d",
  },
  "scotland-office": {
    colour: "#002663",
    colourWebsafe: "#405c8a",
  },
  "uk-export-finance": {
    colour: "#005747",
    colourWebsafe: "#005ea5",
  },
  "uk-trade-investment": {
    colour: "#c80651",
    colourWebsafe: "#005ea5",
  },
  "wales-office": {
    colour: "#a33038",
    colourWebsafe: "#7a242a",
  },
};
