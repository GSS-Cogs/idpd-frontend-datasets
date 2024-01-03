"use server";
import moment from "moment";
import { redirect } from "next/navigation";

const USERNAME = process.env.NEXT_PRIVATE_USERNAME;
const PASSWORD = process.env.NEXT_PRIVATE_PASSWORD;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const BACKEND_PORT = process.env.NEXT_PUBLIC_BACKEND_PORT || "";

const backendUrlSplit = BACKEND_URL?.split("://");
const scheme = backendUrlSplit?.[0];
const domain = backendUrlSplit?.[1];

const logInfo = (message: string, method: string, url: string) => {
  console.info({
    event: message,
    http: {
      method: method,
      scheme: scheme,
      host: domain,
      port: BACKEND_PORT,
      path: url,
      started_at: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSSZZ"),
    },
  });
};

const logError = (message: string, method: string, url: string, error: any) => {
  const modifiedError = { message: error.message, stack: error.stack };
  console.error({
    event: message,
    http: {
      method: method,
      scheme: scheme,
      host: domain,
      port: BACKEND_PORT,
      path: url,
      started_at: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSSZZ"),
    },
    errors: [modifiedError],
  });
};

async function getCsvPreview(url: string): Promise<string[][]> {
  logInfo(`fetching data from ${url}`, "GET", url);
  try {
    const response = await fetchData(url, "GET", "text/csv");
    const reader = response.body.getReader();
    let result = await reader.read();
    let csvData = "";

    while (!result.done && csvData.split("\n").length <= 10) {
      csvData += new TextDecoder().decode(result.value, { stream: true });
      result = await reader.read();
    }

    // Split the CSV data into lines
    const lines = csvData.split("\n").slice(0, 10);

    // Parse each line into an array of values
    const data = lines.map((line: string) => line.split(","));

    return data;
  } catch (error: any) {
    throw logError(`failed fetch data from ${url}`, "GET", url, error);
  }
}

const getDatasetCsv = async (url: string) => {
  /*
    Get full csv data for downloading
  */
  logInfo(`fetching data from ${url}`, "GET", url);
  try {
    const data = await fetchData(url, "GET", "text/csv");
    return data.text();
  } catch (error: any) {
    throw logError(`failed fetch data from ${url}`, "GET", url, error);
  }
};

const getHeaders = (mimeType: string) => {
  const headers: Record<string, string> = {
    Accept: mimeType,
  };

  const basicAuth = `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString(
    "base64"
  )}`;
  headers.Authorization = basicAuth;

  return headers;
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    if (response.status === 404) {
      redirect("/not-found");
    }
    redirect("/error");
  }

  const contentType = response.headers.get("content-type");

  if (
    contentType &&
    (contentType.includes("application/json") ||
      contentType.includes("application/ld+json"))
  ) {
    return response.json();
  } else {
    return response;
  }
};

const fetchData = async (
  url: string,
  method: string,
  mimeType: string = "application/ld+json"
): Promise<any> => {
  logInfo(`fetching data from ${url}`, method, url);
  try {
    const options: RequestInit = {
      method,
      headers: getHeaders(mimeType),
      credentials: "include",
      next: { revalidate: 600 }, // revalidate at most every 10 minutes
    };

    let fetchURL;

    if (url.startsWith("http://") || url.startsWith("https://")) {
      // If the URL already starts with "http://" or "https://", use it as is
      fetchURL = url;
    } else {
      // If not, prepend it with BACKEND_URL
      fetchURL = `${BACKEND_URL}${url}`;
    }

    const response = await fetch(fetchURL, options);
    return handleResponse(response);
  } catch (error) {
    throw logError(`failed fetch data from ${url}`, method, url, error);
  }
};

const getDatasets = async () => {
  /*
  Get metadata for all datasets.
  */
  const data = await fetchData("/datasets", "GET");
  return data;
};

const getDataset = async (id: string) => {
  /*
  Get metadata for a single dataset
  */
  const data = await fetchData(`/datasets/${id}`, "GET");
  return data;
};

const getDatasetLatestEditionUrl = async (datasetId: string) => {
  /*
  Given a dataset id, returns the url for the latest
  edition of that dataset.
  */
  const data = await fetchData(`/datasets/${datasetId}`, "GET");
  return data.editions[0]["@id"];
};

const getEditionLatestVersionMetadata = async (editionUrl: string) => {
  /*
  Given a dataset_id and an edtion_id, returns the metadata
  for the latest version.
  */
  const data = await fetchData(editionUrl, "GET");
  const latestVersionId = data.versions[0]["@id"];
  const latestVersionDocument = await fetchData(latestVersionId, "GET");
  return latestVersionDocument;
};

const getDatasetLatestEditionLatestVersionMetadata = async (
  datasetID: string
) => {
  /*
  Given a dataset_id, retrieve metadata document of latest version
  of the latest edition of the dataset.
  */
  const latestEditionUrl = await getDatasetLatestEditionUrl(datasetID);
  const latestEditionVersionMetadata = await getEditionLatestVersionMetadata(
    latestEditionUrl
  );
  return latestEditionVersionMetadata;
};

const getDatasetWithSpatialCoverageInfo = async (id: string) => {
  // this function gets the dataset like normal then adds a new field 'spatial_coverage_name' to it
  // which is the corresponding name of the given coverage code
  // e.g. K02000001 -> United Kingdom

  try {
    const data = await fetchData(`/datasets/${id}`, "GET");

    const geoportalCodes = await handleResponse(
      await fetch(
        "https://opendata.arcgis.com/datasets/33a3c8eadd084ac38d20ff3dcfa110ce_0/FeatureServer/0/query?outFields=*&where=1%3D1"
      )
    );

    let coverage = "UNKNOWN";
    for (const feature of geoportalCodes.features) {
      if (feature.attributes.CTRY15CD === data.spatial_coverage) {
        coverage = feature.attributes.CTRY15NM;
        break;
      }
    }

    data.spatial_coverage_name = coverage;

    return data;
  } catch (error: any) {
    throw logError(`failed fetch data from ${id}`, "GET", id, error);
  }
};

const getTopics = async () => {
  /*
  Get metadata for all topics
  */
  const data = await fetchData(`/topics`, "GET");
  return data;
};

const getPublishers = async () => {
  /*
  Get metadata for all publishers
  */
  const data = await fetchData(`/publishers`, "GET");
  return data;
};

const getPublisher = async (id: string) => {
  const data = await fetchData(`/publishers/${id}`, "GET");
  return data;
};

export {
  getCsvPreview,
  getDatasets,
  getDataset,
  getDatasetLatestEditionUrl,
  getEditionLatestVersionMetadata,
  getDatasetLatestEditionLatestVersionMetadata,
  getDatasetWithSpatialCoverageInfo,
  getTopics,
  getPublishers,
  getPublisher,
  getDatasetCsv,
};
