import Image from "next/image";

interface LogoProps {
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
  ({ title }: LogoProps) => {
    const shouldDisplay = checkTitle(title);
    return (
      <div
        className={`app-datasets-list__item-bottom-publisher ${
          shouldDisplay
            ? ""
            : "app-datasets-list__item-bottom-publisher--no_border"
        }`}
        style={{backgroundColor: }}
      >
        <Image
          src={src}
          alt="department logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: 34 }} // optional
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
