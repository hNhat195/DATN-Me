import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import productApi from "../../../../../../api/productApi";

function EnterItemId(props) {
  const { handleAddProduct, listProductAdded, order, error, setError } = props;
  const [productId, setProductId] = useState("");

  useEffect(() => {
    const fetchProductById = async (productId) => {
      try {
        const response = await productApi.getOne({ id: productId });

        if (response.length > 0) {
          if (!error.status) handleAddProduct(response);
        } else setError({ status: true, message: "Mã sản phẩm không hợp lệ" });
      } catch (err) {
        if (err.response.status === 500) {
          alert("Have error when fetching product");
        }
      }
    };
    if (!error.status) {
      if (productId !== "") fetchProductById(productId);
    }
  }, [productId]);

  const handleChange = (e) => {
    setProductId(e.target.value);
    validateProduct(e.target.value);
  };
  const validateProduct = (productId) => {
    if (
      listProductAdded.filter((item) => item._id === productId).length !== 0
    ) {
      setError({ status: true, message: "Cây vải đã được thêm vào" });
    } else {
      setError({ status: false, message: "" });
    }
  };
  return (
    <TextField
      color="primary"
      id="input-with-icon-textfield"
      placeholder="Mã sản phẩm"
      fullWidth
      name="productId"
      value={productId}
      onChange={handleChange}
      error={error.status}
      helperText={error.message}
    />
  );
}

export default EnterItemId;
