"use client";
import { getDatasetCsv } from "@/libs/dataRequests";

const DownloadDataset = ({
  id,
  date,
  csvDownloadUrl,
}: {
  id: string;
  date: string;
  csvDownloadUrl: string;
}) => {
  async function downloadCSV() {
    const formatDate = (input: string) => {
      const date = new Date(input);

      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();

      // Format the date as "MM-yy"
      return `${year}-${month}`;
    };

    const response = await getDatasetCsv(csvDownloadUrl);
    // Create a Blob containing the CSV data
    const blob = new Blob([response], { type: "text/csv" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    const formattedDate = formatDate(date);
    // Create an invisible <a> element to trigger the download
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = id + "_" + formattedDate + ".csv";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="app-download-dataset">
      <h2 className="govuk-heading-m">Download dataset</h2>
      <div className="app-download-dataset-content">
        <div className="app-download-dataset-content__image">
          <div
            style={{
              width: "100%",
              height: 20,
              backgroundColor: "#B1B4B6",
              marginBottom: 10,
            }}
          ></div>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              height: "75%",
            }}
          >
            <tbody>
              {Array.from({ length: 6 }).map((_, row) => (
                <tr key={row}>
                  {Array.from({ length: 4 }).map((_, col) => (
                    <td
                      key={col}
                      style={
                        col === 0
                          ? {
                              border: "2px solid #B1B4B6",
                              textAlign: "center",
                              backgroundColor: "#B1B4B6",
                              color: "white",
                            }
                          : {
                              border: "2px solid #B1B4B6",
                              textAlign: "center",
                            }
                      }
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="app-download-dataset-content__text-wrapper">
          <p className="govuk-body">
            Download the dataset in CSV format for use in the tool or
            application of your choice.
          </p>
          <p className="govuk-body">CSV, 110KB</p>
        </div>
      </div>
      <button
        className="govuk-button app-download-dataset__button"
        data-module="govuk-button"
        onClick={downloadCSV}
      >
        Download data (CSV)
      </button>
    </div>
  );
};

export default DownloadDataset;
