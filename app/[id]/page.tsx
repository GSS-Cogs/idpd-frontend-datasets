import "./datasets.scss";
import Breadcrumbs from "@/components/Breadcrumbs";
import PhaseBanner from "@/components/PhaseBanner";
import { getDataset } from "../../libs/dataRequests";
import Image from "next/image";

export default async function Datasets({}: {}) {
  const dataset = await getDataset("cpih");

  return (
    <>
      <div className="app-width-container">
        <PhaseBanner
          href="/"
          tag={{ children: "prototype" }}
          className="govuk-phase-banner--inverse"
        />
        <Breadcrumbs items={[{ text: "Home", href: "/" }]} />
        <div className={`app-datasets`}>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <span className="govuk-caption-xl app-datasets__caption">
                Dataset
              </span>
              <h1 className="govuk-heading-xl app-datasets__title">
                {dataset.title}
              </h1>
              <p className="app-datasets__description">{dataset.summary}</p>
            </div>
          </div>
        </div>
        <main className="app-datasets" id="main-content" role="main"></main>
      </div>
    </>
  );
}
