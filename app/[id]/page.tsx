import "./datasets.scss";
import Breadcrumbs from "@/components/Breadcrumbs";
import PhaseBanner from "@/components/PhaseBanner";
import {
  getDatasetWithSpatialCoverageInfo,
  getPublisher,
} from "../../libs/dataRequests";
import Image from "next/image";

const metadata = [
  {
    field: "Statistical geography",
    type: "String",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id neque at ex accumsan dictum at non tellus. Fusce sagittis, ligula eu condimentum commodo, magna nisi cursus mi, ut sagittis orci elit id orci.",
  },
  {
    field: "Measure type",
    type: "String",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id neque at ex accumsan dictum at non tellus. Fusce sagittis, ligula eu condimentum commodo, magna nisi cursus mi, ut sagittis orci elit id orci.",
  },
  {
    field: "Gregorian time interval",
    type: "Date/Time",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id neque at ex accumsan dictum at non tellus. Fusce sagittis, ligula eu condimentum commodo, magna nisi cursus mi, ut sagittis orci elit id orci.",
  },
  {
    field: "Pupils eligible for free school meals with persistent absences",
    type: "String",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id neque at ex accumsan dictum at non tellus. Fusce sagittis, ligula eu condimentum commodo, magna nisi cursus mi, ut sagittis orci elit id orci.",
  },
  {
    field: "Unit of measure",
    type: "String",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id neque at ex accumsan dictum at non tellus. Fusce sagittis, ligula eu condimentum commodo, magna nisi cursus mi, ut sagittis orci elit id orci.",
  },
  {
    field: "Upper confidence interval",
    type: "String",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id neque at ex accumsan dictum at non tellus. Fusce sagittis, ligula eu condimentum commodo, magna nisi cursus mi, ut sagittis orci elit id orci.",
  },
  {
    field: "Lower confidence interval",
    type: "String",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id neque at ex accumsan dictum at non tellus. Fusce sagittis, ligula eu condimentum commodo, magna nisi cursus mi, ut sagittis orci elit id orci.",
  },
];

const data = [
  {
    field: "Statistical Geography",
    values: [
      "North East",
      "North East",
      "England",
      "County Durham",
      "England",
      "North East",
      "Darlington",
      "Darlington",
      "England",
      "England",
    ],
  },
  {
    field: "Measure type",
    values: [
      "Pupils eligible for free school meals with persistent absences",
      "Pupils eligible for free school meals with persistent absences",
      "Pupils eligible for free school meals with persistent absences",
      "Pupils eligible for free school meals with persistent absences",
      "Pupils eligible for free school meals with persistent absences",
      "Pupils eligible for free school meals with persistent absences",
      "Pupils eligible for free school meals with persistent absences",
      "Pupils eligible for free school meals with persistent absences",
      "Pupils eligible for free school meals with persistent absences",
      "Pupils eligible for free school meals with persistent absences",
    ],
  },
  {
    field: "Gregorian time interval",
    values: [
      "2017-08-01T00:00:00/P1Y",
      "2017-08-01T00:00:00/P1Y",
      "2017-08-01T00:00:00/P1Y",
      "2017-08-01T00:00:00/P1Y",
      "2017-08-01T00:00:00/P1Y",
      "2017-08-01T00:00:00/P1Y",
      "2017-08-01T00:00:00/P1Y",
      "2017-08-01T00:00:00/P1Y",
      "2017-08-01T00:00:00/P1Y",
      "2017-08-01T00:00:00/P1Y",
    ],
  },
  {
    field: "Pupils eligible for free school meals with persistent absences",
    values: [
      "21.20165",
      "23.01075",
      "23.20222",
      "39.96234",
      "20.56852",
      "quarter/2011-Q1",
      "quarter/2022-Q3",
      "quarter/2012-Q1",
      "quarter/2019-Q2",
      "quarter/2015-Q1",
    ],
  },
  {
    field: "Location",
    values: [
      "England and Wales",
      "England and Wales",
      "England and Wales",
      "England and Wales",
      "England and Wales",
      "England and Wales",
      "England and Wales",
      "England and Wales",
      "England and Wales",
      "England and Wales",
    ],
  },
];

export default async function Datasets({ params }: { params: { id: string } }) {
  const dataset = await getDatasetWithSpatialCoverageInfo(params.id);
  const splitPub = dataset.publisher.split("/");
  const result = splitPub[splitPub.length - 1];
  const publisher = await getPublisher(result);

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
                    {publisher.title}
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
                    <div className="govuk-body" key={item}>
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
          <section className="govuk-!-margin-top-7">
            <h1 className="govuk-heading-l" id="preview">
              Data preview
            </h1>
            <div className="app-preview-table">
              <table className="govuk-table">
                <thead className="govuk-table__head">
                  <tr className="govuk-table__row">
                    {data.map((item) => {
                      return (
                        <th scope="col" className="govuk-table__header">
                          {item.field}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="govuk-table__body">
                  {data[0].values.map((_, rowIndex) => {
                    return (
                      <tr key={rowIndex} className="govuk-table__row">
                        {data.map((item, colIndex) => {
                          return (
                            <td key={colIndex} className="govuk-table__cell">
                              {item.values[rowIndex]}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
          <section className="govuk-!-margin-top-7">
            <h1 className="govuk-heading-l" id="metadata">
              Structural metadata
            </h1>
            <table className="govuk-table">
              <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                  <th scope="col" className="govuk-table__header">
                    Field
                  </th>
                  <th scope="col" className="govuk-table__header">
                    Datatype
                  </th>
                  <th
                    scope="col"
                    className="govuk-table__header app-metadata-table__header--visible"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="govuk-table__body">
                {metadata.map((item) => {
                  return (
                    <>
                      <tr className="govuk-table__row">
                        <th
                          scope="row"
                          className="govuk-table__header app-metadata-table__header"
                        >
                          {item.field}
                        </th>
                        <td className="govuk-table__cell app-metadata-table__cell">
                          {item.type}
                        </td>
                        <td className="govuk-table__cell app-metadata-table__cell--visible">
                          {item.description}
                        </td>
                      </tr>
                      <tr className="govuk-table__row">
                        <td
                          colSpan={2}
                          className="govuk-table__cell app-metadata-table__cell--mobile-visible"
                        >
                          {item.description}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </>
  );
}
