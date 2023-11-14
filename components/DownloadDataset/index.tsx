"use client";
import { getCsvPreview, getDatasetCsv } from "@/libs/dataRequests";
import Image from "next/image";
import csvImg from "../../public/assets/images/csv-icon.svg";

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
    // const csvData = await getCsvPreview(csvDownloadUrl);
    // Open a new window/tab and start the download
    // const newWindow = window.open(csvDownloadUrl, "_blank");

    // setTimeout(() => {
    //   if (newWindow && !newWindow.closed) {
    //     newWindow.close();
    //   }
    // }, 100);
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
          <Image
            src={"/datasets/assets/images/csv-icon.svg"}
            width={90}
            height={120}
            alt="icon for csv download"
          />
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
