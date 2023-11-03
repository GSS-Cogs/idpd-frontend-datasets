const USERNAME = process.env.NEXT_PRIVATE_USERNAME;
const PASSWORD = process.env.NEXT_PRIVATE_PASSWORD;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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
    throw new Error(`Failed to fetch data. Status: ${response.status}`);
  }

  return response.json();
};

const fetchData = async (url: string, method: string): Promise<any> => {
  try {
    const options: RequestInit = {
      method,
      headers: getHeaders(),
      credentials: "include",
    };

    const response = await fetch(`${BACKEND_URL}${url}`, options);
    return handleResponse(response);
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

const getDatasets = async () => {
  const data = await fetchData("/datasets", "GET");
  return data;
};

const getDataset = async (id: string) => {
  const data = await fetchData(`/datasets/${id}`, "GET");
  return data;
};

const getTopics = async () => {
  const data = await fetchData(`/topics`, "GET");
  return data;
};

const getPublishers = async () => {
  const data = await fetchData(`/publishers`, "GET");
  return data;
};

export { getDatasets, getDataset, getTopics, getPublishers };
