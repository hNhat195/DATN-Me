import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { alpha, styled } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
// utils
import { fNumber } from "../../../utils/formatNumber";
import orderApi from "../../../api/orderApi";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  //color: theme.palette.primary.darker,
  color: theme.palette.primary.darker,
  backgroundColor: "#C8FACD",
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
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

export default function StaffTotalSale({ dateRangeFilter }) {
  const [orderTotal, setOrderTotal] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  useEffect(() => {
    const fetCountOrder = async () => {
      try {
        const response = await orderApi.getAll();
        setOrderTotal(response);
        setFilteredList(response);
      } catch (error) {
        alert("Failed to fetch order count");
      }
    };
    fetCountOrder();
  }, []);
  useEffect(() => {
    if (dateRangeFilter.startDate && dateRangeFilter.endDate) {
      let temp = orderTotal?.filter(
        (item) =>
          Date.parse(item.orderTime) >= Date.parse(dateRangeFilter.startDate) &&
          Date.parse(item.orderTime) <= Date.parse(dateRangeFilter.endDate)
      );
      setFilteredList(temp);
    } else {
      let temp = orderTotal;
      setFilteredList(temp);
    }
  }, [dateRangeFilter]);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon
          icon="icon-park-outline:transaction-order"
          color="rgb(0, 123, 85)"
          width="35"
          height="35"
        />
      </IconWrapperStyle>
      <Typography variant="h4">{filteredList.length}</Typography>
      <Typography variant="h6" sx={{ opacity: 0.72 }}>
        Tổng đơn hàng
      </Typography>
    </RootStyle>
  );
}
