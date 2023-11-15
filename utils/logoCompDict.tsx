import Image from "next/image";

interface LogoProps {
  title: string;
}

interface LogoCompDict {
  [key: string]: (props: LogoProps) => JSX.Element;
}

const displayTitle = (title: string) => {
  if (title === "The Office for National Statistics") {
    return null;
  }
  return <h3 className="app-datasets__publisher-text">{title}</h3>;
};

const createLogoComponent =
  (src: string) =>
  ({ title }: LogoProps) =>
    (
      <div className="app-datasets__publisher">
        <Image
          src={src}
          alt="department logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: 34 }} // optional
        />
        {displayTitle(title)}
      </div>
    );

const defaulLogoComponent =
  () =>
  ({ title }: LogoProps) =>
    <div className="app-datasets__publisher-text">{displayTitle(title)}</div>;

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
