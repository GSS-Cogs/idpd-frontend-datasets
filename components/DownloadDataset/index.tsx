"use client";
import useSWR from "swr";
import { getDatasetCSV } from "@/libs/dataRequests";
import { useEffect, useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getCSVHeaders = () => {
  const headers: Record<string, string> = {
    Accept: "text/csv",
  };

  return headers;
};

async function fetchDataFromURL() {
  const options: RequestInit = {
    method: "GET",
    headers: getCSVHeaders(),
    credentials: "include",
  };
  try {
    const response = await fetch(
      `${BACKEND_URL}${"/datasets/cpih/editions/2022-01/versions/1.csv"}`,
      options
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

const DownloadDataset = ({ id }: { id: string }) => {
  async function downloadCSV() {
    const response = await fetchDataFromURL();
    console.log(response);
    // Create a Blob containing the CSV data
    const blob = new Blob([response], { type: "text/csv" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an invisible <a> element to trigger the download
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = id + "_data.csv";

    // Append the <a> element to the document and trigger the click event
    document.body.appendChild(a);
    a.click();

    // Clean up by removing the <a> element and revoking the Blob URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  return (
    <div
      style={{
        backgroundColor: "#F3F2F1",
        padding: 20,
      }}
    >
      <h2 className="govuk-heading-m">Download dataset</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: 200,
            height: 120,
            border: "solid",
            borderColor: "#B1B4B6",
            borderWidth: 0.5,
            padding: 10,
            backgroundColor: "white",

            marginRight: 20,
            marginBottom: 20,
          }}
        >
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <p className="govuk-body">
            Download the dataset in CSV format for use in the tool or
            application of your choice.
          </p>
          <p className="govuk-body">CSV, 110KB</p>
        </div>
      </div>
      <button
        className="govuk-button"
        data-module="govuk-button"
        onClick={downloadCSV}
        style={{ marginBottom: 0, width: "100%" }}
      >
        Download data (CSV)
      </button>
    </div>
  );
};

export default DownloadDataset;
