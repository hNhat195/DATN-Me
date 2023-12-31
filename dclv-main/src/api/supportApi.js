import axiosClient from "./axiosClient";

class SupportApi {
  getSupportsByClientId = (clientId) => {
    const url = `/supports/client/${clientId}`;
    return axiosClient.get(url);
  };
  getAllSupports = () => {
    const url = `/supports/get-all`;
    return axiosClient.get(url);
  };
  responseSupport = (data) => {
    const url = "/support/response";
    return axiosClient.put(url, data);
  };
  create = (data) => {
    const url = "/support/create";
    return axiosClient.post(url, data);
  };
  getByCustomer = (id) => {
    const url = `/support/customer/${id}`;
    return axiosClient.get(url);
  };
}
const supportApi = new SupportApi();
export default supportApi;
