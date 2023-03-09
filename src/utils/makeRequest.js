import axios from 'axios';


async function makeRequest(baseUrl, apiEndPoint, dynamicConfig = {}) {
  const requestDetails = {
    baseURL: baseUrl,
    url: apiEndPoint.url,
    method: apiEndPoint.method,
    ...dynamicConfig,
  };
  const { data } = await axios(requestDetails);
  return data;
}

export default makeRequest;
