import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { styled } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";

import orderApi from "../../../api/orderApi";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.dark,
  //backgroundColor: theme.palette.primary.lighter
  backgroundColor: "#FFE7D9",
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  // backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
  //   theme.palette.primary.dark,
  //   0.24
  // )} 100%)`
  backgroundImage:
    "linear-gradient(135deg, rgba(183, 33, 54, 0) 0%, rgba(183, 33, 54, 0.24) 100%)",
}));

export default function FabricRollBillCompleted({ dateRangeFilter }) {
  const [fabricrollTotal, setFabricRollTotal] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  useEffect(() => {
    const fetchFabricRollTotal = async () => {
      try {
        // const response = await billApi.getFabricRollBillCompleted();
        const response = await orderApi.getCompletedSub();
        setFabricRollTotal(response);
        setFilteredList(response);
      } catch (error) {
        alert("Failed to fetch fabric roll bill completed count");
      }
    };
    fetchFabricRollTotal();
  }, []);
  useEffect(() => {
    if (dateRangeFilter.startDate && dateRangeFilter.endDate) {
      let temp = fabricrollTotal?.filter(
        (item) =>
          Date.parse(item.subOrderTime) >=
            Date.parse(dateRangeFilter.startDate) &&
          Date.parse(item.subOrderTime) <= Date.parse(dateRangeFilter.endDate)
      );
      setFilteredList(temp);
    } else {
      let temp = fabricrollTotal;
      setFilteredList(temp);
    }
  }, [dateRangeFilter]);
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon
          icon="ic:outline-local-shipping"
          color="rgb(183, 33, 54)"
          width="35"
          height="35"
        />
      </IconWrapperStyle>
      <Typography variant="h4">
        {filteredList.reduce(
          (accumulator, currentValue) => accumulator + currentValue.totalQty,
          0
        )}
      </Typography>
      <Typography variant="h6" sx={{ opacity: 0.72 }}>
        Cây vải giao thành công
      </Typography>
    </RootStyle>
  );
}
