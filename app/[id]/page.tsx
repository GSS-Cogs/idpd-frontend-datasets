import "./datasets.scss";
import Breadcrumbs from "@/components/Breadcrumbs";
import PhaseBanner from "@/components/PhaseBanner";
import { getDatasetWithSpatialCoverageInfo } from "../../libs/dataRequests";
import Image from "next/image";

export default async function Datasets({ params }: { params: { id: string } }) {
  const dataset = await getDatasetWithSpatialCoverageInfo(params.id);
  function formatDate(date: string) {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return d
      .toLocaleDateString("en-GB", options)
      .replace(/( AM| PM)/g, (m) => m.trim().toLowerCase());
  }

  const SectionBreak = () => (
    <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"></hr>
  );

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
        <main className="app-datasets" id="main-content" role="main">
          <div>
            <h4 className="govuk-heading-s app-datasets__contents-title">
              Contents
            </h4>
            <ul className="govuk-list">
              <li className="app-datasets__list-item">
                <a className="govuk-link" href="#about">
                  About this dataset
                </a>
              </li>
              <li className="app-datasets__list-item">
                <a className="govuk-link" href="#preview">
                  Data preview
                </a>
              </li>
              <li className="app-datasets__list-item">
                <a className="govuk-link" href="#metadata">
                  Structural metadata
                </a>
              </li>
              <li className="app-datasets__list-item">
                <a className="govuk-link" href="#related">
                  Related datasets
                </a>
              </li>
            </ul>
          </div>
          <SectionBreak />

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-l" id="about">
                About this dataset
              </h1>
              <div className="govuk-body">
                <h3 className="govuk-heading-s">Publisher</h3>
                <div className="app-datasets__publisher">
                  <Image
                    src="/assets/images/crest.png"
                    width={40}
                    height={34}
                    alt="Govuk Crest"
                  />
                  <h3 className="app-datasets__publisher-text">
                    {dataset.publisher}
                  </h3>
                </div>
                <a className="govuk-link" href="#">
                  View more datasets by this publisher
                </a>
              </div>
              <SectionBreak />
              <div>
                <h3 className="govuk-heading-s">Contact</h3>
                <div className="govuk-body">
                  {dataset.contact_point.name} -{" "}
                  <a className="govuk-link" href="#">
                    {dataset.contact_point.email}
                  </a>
                </div>
              </div>
              <SectionBreak />
              <table className="govuk-table">
                <tbody className="govuk-table__body">
                  <tr className="govuk-table__row">
                    <th
                      scope="col"
                      className="govuk-table__header app-date-table__header"
                    >
                      Published
                    </th>
                    <td className="govuk-table__cell app-date-table__cell">
                      {formatDate(dataset.issued)}
                    </td>
                  </tr>
                  <tr className="govuk-table__row">
                    <th
                      scope="row"
                      className="govuk-table__header app-date-table__header"
                    >
                      Modified
                    </th>
                    <td className="govuk-table__cell app-date-table__cell">
                      {formatDate(dataset.next_release)}
                    </td>
                  </tr>
                  <tr className="govuk-table__row">
                    <th
                      scope="row"
                      className="govuk-table__header app-date-table__header"
                    >
                      Next release
                    </th>
                    <td className="govuk-table__cell app-date-table__cell">
                      {formatDate(dataset.next_release)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <SectionBreak />
              <div>
                <h3 className="govuk-heading-s">Topics and subtopics</h3>

                {dataset.topics.map((item: string) => {
                  return (
                    <div className="govuk-body">
                      <a className="govuk-link" href="#">
                        {item}
                      </a>
                    </div>
                  );
                })}
              </div>
              <SectionBreak />
              <div>
                <h3 className="govuk-heading-s">Description</h3>
                <p className="govuk-body">{dataset.description}</p>
              </div>
              <SectionBreak />
              <div>
                <h3 className="govuk-heading-s">Coverage</h3>
                <p className="govuk-body">{dataset.spatial_coverage_name}</p>
              </div>
              <SectionBreak />
              <div>
                <h3 className="govuk-heading-s">Geography definition</h3>
                <p className="govuk-body">
                  Local Authority Districts and Unitary Authorities, Regions,
                  Nation (England)
                </p>
              </div>
              <SectionBreak />
              <div>
                <h3 className="govuk-heading-s">Source</h3>
                <div className="govuk-body">
                  England:{" "}
                  <a className="govuk-link" href="#">
                    {dataset.creator}
                  </a>
                </div>
              </div>

              {/* notes and caveats secttion is in designs but isn't implemented yet */}
              {/* <SectionBreak />
              <div>
                <h3 className="govuk-heading-s">Notes and caveats</h3>
                <div>
                  <p className="govuk-body">
                    Persistent absence includes absence where a pupil had tested
                    positive for COVID-19 (national isolation policies for
                    people ill with COVID-19 were still in effect during this
                    period). Consequently a large proportion of persistent
                    absence and regional variation in persistent absence is due
                    to differing regional spread of COVID-19 rather than pupil
                    behaviour.
                  </p>
                  <h3 className="govuk-heading-s" style={{ marginTop: 15 }}>
                    How to read time intervals in ISO8601 format
                  </h3>
                  <p className="govuk-body">
                    This dataset uses custom time intervals format for periods,
                    YYYY-MM-DDT00:00:00/PnI, where P tells that this is period;
                    n is the number of intervals and I is interval type which
                    can be Y(year), M(month), W(week), D(day). For example, from
                    April 2019 to March 2022 is represented as
                    2019-04-01T00:00:00/P3Y, which can be read as '3 years
                    period starts from 1st of April 2019 and ends on 31st March
                    2022'. For more instructions on how to read this, please
                    visit{" "}
                    <a className="govuk-link" href="#">
                      time intervals on Wikipedia.
                    </a>
                  </p>
                </div>
              </div> */}
              <SectionBreak />
              <div>
                <h3 className="govuk-heading-s">Methodology</h3>
                <div className="govuk-body">
                  <a className="govuk-link" href={dataset?.["@id"]}>
                    Methodology documentation
                  </a>
                </div>
              </div>
              <SectionBreak />
              <div>
                <h3 className="govuk-heading-s">Licence</h3>
                <div className="govuk-body">
                  OGL{" "}
                  <a className="govuk-link" href={dataset.licence}>
                    Open Government Licence v3.0
                  </a>
                </div>
              </div>
            </div>
            <div className="govuk-grid-column-one-third">
              <h2 className="govuk-heading-m">Download dataset</h2>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
