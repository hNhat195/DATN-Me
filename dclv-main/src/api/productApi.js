import axiosClient from "./axiosClient";
class ProductApi {
  getProductsByMaterialSlug = (materialSlug) => {
    const url = `/collections/${materialSlug}`;
    return axiosClient.get(url);
  };

  getProductBySlug = (productSlug) => {
    const url = `/product/${productSlug}`;
    return axiosClient.get(url);
  };

  getProductHomepage = () => {
    const url = `/product/homepage`;
    return axiosClient.get(url);
  };

  getProductById = (productId) => {
    const url = `/product/${productId}`;
    return axiosClient.get(url);
  };
  getAll = () => {
    const url = "/fabric/get-all";
    return axiosClient.get(url);
  };

  getAllProducts = () => {
    const url = `/product`;
    return axiosClient.get(url);
  };

  getOne = (id) => {
    const url = `/fabric/product/${id}`;
    return axiosClient.get(url);
  };
  getListById = (data) => {
    const url = "/fabric/roll";
    return axiosClient.post(url, data);
  };
  getListOfBill = (data) => {
    const url = "/fabric/rollOfBill";
    return axiosClient.post(url, data);
  };
  getChartWarehouseTrue = (params) => {
    const url = "/fabric/chartwarehouse";
    return axiosClient.get(url, { params });
  };
  getFullListType = (params) => {
    const url = "/fabric/fullTypeList";
    return axiosClient.get(url, { params });
  };
  getListColorcode = (params) => {
    const url = "/fabric/colorCode";
    return axiosClient.get(url, { params });
  };
  getAllMaterialCode = (params) => {
    const url = "/product/allmaterialcode";
    return axiosClient.get(url, { params });
  };
  getAllColorCode = (params) => {
    const url = "product/allcolorcode";
    return axiosClient.get(url, { params });
  };

  getMaterialByColor = (params) => {
    const url = "product/matbycolor";
    return axiosClient.get(url, { params });
  };

  getColorByMaterial = (params) => {
    const url = "product/colorbymat";
    return axiosClient.post(url, { materialId: params });
  };

  createNewFabric = (body) => {
    const url = "fabric/create"
    return axiosClient.post(url, body)
  }
}
const productApi = new ProductApi();
export default productApi;
