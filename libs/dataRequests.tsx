import { redirect } from "next/navigation";

const USERNAME = process.env.NEXT_PRIVATE_USERNAME;
const PASSWORD = process.env.NEXT_PRIVATE_PASSWORD;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getCsvPreview(url: string): Promise<string[][]> {

  try {
    const response = await fetchCsvData(url, "GET");
    const csvData = await response.text();

    // Split the CSV data into lines
    const lines = csvData.split('\n').slice(0, 10); // Get the first 10 lines

    // Parse each line into an array of values
    const data = lines.map((line) => line.split(','));

    return data;
  } catch (error) {
    throw error; // You can throw an error for handling it in the caller
  }
}

const getCsvHeaders = () => {
  const headers: Record<string, string> = {
    Accept: "text/csv",
  };

  const basicAuth = `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString(
    "base64"
  )}`;
  headers.Authorization = basicAuth;

  return headers;
};

const getHeaders = () => {
  const headers: Record<string, string> = {
    Accept: "application/ld+json",
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

  const contentType = response.headers.get('content-type');

  if (
    contentType &&
    (contentType.includes('application/json') || contentType.includes('application/ld+json'))
  ) {
    return response.json();
  } else {
    return response;
  }

};

const fetchCsvData = async (url: string, method: string): Promise<any> => {
  try {
    const options: RequestInit = {
      method,
      headers: getCsvHeaders(),
      credentials: "include",
    };

    let fetchURL;

    if (url.startsWith('http://') || url.startsWith('https://')) {
      // If the URL already starts with "http://" or "https://", use it as is
      fetchURL = url;
    } else {
      // If not, prepend it with BACKEND_URL
      fetchURL = `${BACKEND_URL}${url}`;
    }

    const response = await fetch(fetchURL, options);
    return handleResponse(response);
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

const fetchData = async (url: string, method: string): Promise<any> => {
  try {
    const options: RequestInit = {
      method,
      headers: getHeaders(),
      credentials: "include",
    };

    let fetchURL;

    if (url.startsWith('http://') || url.startsWith('https://')) {
      // If the URL already starts with "http://" or "https://", use it as is
      fetchURL = url;
    } else {
      // If not, prepend it with BACKEND_URL
      fetchURL = `${BACKEND_URL}${url}`;
    }

    const response = await fetch(fetchURL, options);
    return handleResponse(response);
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
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

const getDatasetLatestEditionMetadata = async (dataset_id: string) => {
  /*
  Given a dataset id, returns the url for the latest
  edition of that dataset.
  */
  console.log("Hitting getDatasetLatestEditionMetadata")
  const data = await fetchData(`/datasets/${dataset_id}`, "GET")
  console.log(JSON.stringify(data, null, 2))
  return data.editions[0]
}

const getEditionLatestVersionMetadata = async (edition_url: string) => {
  /*
  Given a dataset_id and an edtion_id, returns the metadata
  for the latest version.
  */
  console.log("Hitting getEditionLatestVersionMetadata")
  const data = await fetchData(edition_url, "GET")
  const latest_version_id = data.versions[0]["@id"]
  console.log(latest_version_id)

  const latestVersionDocument = await fetchData(latest_version_id, "GET")
  console.log(JSON.stringify(latestVersionDocument, null, 2))
  return latestVersionDocument
}

const getLatestDatasetEditionVersionMetadata = async (dataset_id: string) => {
  /*
  Given a dataset_id, retrieve the latest version of the
  latest edition of the dataset.
  */
  console.log("Hitting getDatasetLatestEditionMetadata")
  console.log()
  const latestEditionMetadata = await getDatasetLatestEditionMetadata(dataset_id)
  console.log(JSON.stringify(latestEditionMetadata, null, 2))

  console.log("Hitting getEditionLatestVersionMetadata")
  const latestEditionVersionMetadata = await getEditionLatestVersionMetadata(latestEditionMetadata["@id"])
  console.log(JSON.stringify(latestEditionVersionMetadata, null, 2))
  return latestEditionVersionMetadata
}

const getDatasetWithSpatialCoverageInfo = async (id: string) => {
  // this function gets the dataset like normal then adds a new field 'spatial_coverage_name' to it
  // which is the corresponding name of the given coverage code
  // e.g. K02000001 -> United Kingdom
  const data = await fetchData(`/datasets/${id}`, "GET");
  const code = data.spatial_coverage;

  const response = await handleResponse(
    await fetch(`https://findthatpostcode.uk/areas/${code}.json`)
  );

  const coverage = response.data.attributes.name;

  data.spatial_coverage_name = coverage;

  return data;
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

export {
  getCsvPreview,
  getDatasets,
  getDataset,
  getDatasetLatestEditionMetadata,
  getEditionLatestVersionMetadata,
  getLatestDatasetEditionVersionMetadata,
  getDatasetWithSpatialCoverageInfo,
  getTopics,
  getPublishers,
};
