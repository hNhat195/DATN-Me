import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Order from "./components/Order";
import FilterBar from "./components/FilterBar";
import ListHeader from "./components/ListHeader";
import orderApi from "../../api/orderApi";

export default function OrderListPage() {
  const [orderList, setOrderList] = useState([]);
  const [filteredOrderList, setFilteredOrderList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    async function fetchData() {
      const response = await orderApi.getAll(1, 100);
      setOrderList(response);
      setFilteredOrderList(response);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let tempOrderList = [];
    if (filter !== "all")
      tempOrderList = orderList.filter(
        (item) => item.orderStatus[item.orderStatus.length - 1].name === filter
      );
    else {
      tempOrderList = orderList;
    }

    if (dateRangeFilter.startDate && dateRangeFilter.endDate) {
      tempOrderList = tempOrderList?.filter(
        (item) =>
          Date.parse(item.orderTime) >= Date.parse(dateRangeFilter.startDate) &&
          Date.parse(item.orderTime) <= Date.parse(dateRangeFilter.endDate)
      );
    }
    setFilteredOrderList(tempOrderList);
  }, [filter, dateRangeFilter]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleDateRangeFilterChange = (newDateRange) => {
    setDateRangeFilter(newDateRange);
  };

  return (
    <>
      <Container maxWidth="xl">
        <FilterBar
          filter={filter}
          handleFilterChange={handleFilterChange}
          dateRangeFilter={dateRangeFilter}
          handleDateRangeFilterChange={handleDateRangeFilterChange}
        />
        <ListHeader />
        {filteredOrderList?.map((item, idx) => {
          return <Order key={idx} order={item} />;
        })}
      </Container>
    </>
  );
}
