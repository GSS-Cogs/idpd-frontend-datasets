"use client";
import useSWR from "swr";
import { getDatasetCSV } from "@/libs/dataRequests";
import { useEffect, useState } from "react";

const getCSVHeaders = () => {
  const headers: Record<string, string> = {
    Accept: "text/csv",
  };

  return headers;
};

const DownloadDataset = ({
  id,
  edition,
  version,
  date,
}: {
  id: string;
  edition: string;
  version: string;
  date: string;
}) => {
  async function downloadCSV() {
    function formatDate(input: string) {
      // Create a Date object from the input string
      const date = new Date(input);

      // if (isNaN(date)) {
      //   // Handle invalid input
      //   return "Invalid Date";
      // }

      // Define an array of abbreviated month names
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Extract the month and year from the Date object
      const month = monthNames[date.getMonth()]; // Get the month name
      const year = date.getFullYear().toString().slice(-2);

      // Format the date as "MM-yy"
      return `${month}-${year}`;
    }

    // const response = await getDatasetCSV(id, edition, version);
    // // Create a Blob containing the CSV data
    // const blob = new Blob([response], { type: "text/csv" });

    // // Create a URL for the Blob
    // const url = URL.createObjectURL(blob);
    // const formattedDate = formatDate(date);
    // // Create an invisible <a> element to trigger the download
    // const a = document.createElement("a");
    // a.style.display = "none";
    // a.href = url;
    // a.download = id + "_" + formattedDate + ".csv";

    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // URL.revokeObjectURL(url);
    const dummyData = "rahul,delhi,accountsdept\n";
    const csvContent = `data:text/csv;charset=utf-8,${dummyData}`;
    const encodedURI = encodeURI(csvContent);
    window.open(encodedURI);
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
