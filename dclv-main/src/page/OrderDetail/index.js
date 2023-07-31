import CustomerInfo from "./components/CustomerInfo";
import OrderInfo from "./components/OrderInfo";
import TimelineStatus from "./components/TimelineStatus";
import ListBill from "./components/ListBill";
import { Button, Grid, Typography, Container } from "@material-ui/core";
import { useState, useEffect } from "react";
import orderApi from "../../api/orderApi";
import { makeStyles } from "@material-ui/core/styles";
import {
  ArrowBack,
  ArrowUpward,
  Cancel,
  ImportExport,
} from "@material-ui/icons";
// import easyinvoice from "easyinvoice";
import DefaultButton from "../../components/Button/DefaultButton";
import { useHistory, useParams } from "react-router-dom";
import SubOrderPopup from "./components/SubOrderPopup";

import { OrderStatus } from "../../const/OrderStatus";
import SubOrderList from "./components/SubOrderList";

const useStyles = makeStyles((theme) => ({
  alignStatusRight: {
    direction: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "right",
  },
  root: {
    "& .MuiPaper-root": {
      backgroundColor: "#fafafb",
      color: theme.palette.primary.main,
    },
  },
  container: {
    display: "flex",
  },
  btnGroup: {
    justifyContent: "flex-end",
  },
  titlePage: {
    fontWeight: "bold",
    color: "#000040",
  },
  btnCancel: {
    backgroundColor: "#EAECFF",
    color: "#696983",
    "&:hover": {
      backgroundColor: "red",
      color: "black",
    },
    textTransform: "none",
    padding: theme.spacing(1.5),
  },
  btnCancelTitle: {
    ...theme.typography.buttonPrimary,
  },
  orderDetailBox: {
    padding: "10px",
  },
}));

export default function OrderDetail() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const role = localStorage.getItem("role");

  const [detail, setDetail] = useState({
    orderStatus: [],
    products: [],
    detailBill: [],
    subOrder: [],
  });
  const [lastStatus, setLastStatus] = useState();

  const handleCancel = async () => {
    const res = await orderApi.updateStatusCancelOrder(id, {
      status: "cancel",
      reason: "cancel by admin",
    });

    let temp = detail;
    temp.orderStatus.push(
      res?.data.orderStatus[res.data.orderStatus.length - 1]
    );
    setDetail(temp);
    setLastStatus(
      res?.data.orderStatus[res?.data.orderStatus?.length - 1]?.name
    );
  };

  const handleExport = async () => {
    const res = await orderApi.exportBill(id);
    // const result = await easyinvoice.createInvoice(res.data);
    // await easyinvoice.download("myInvoice.pdf", result.pdf);
  };

  useEffect(() => {}, [lastStatus, detail.subOrder]);

  useEffect(() => {
    let mounted = true;
    const fetchOrderDetail = async () => {
      const response = await orderApi.getOne(id);

      if (mounted) {
        setDetail(response);
      }
    };
    fetchOrderDetail();

    return () => {
      mounted = false;
    };
  }, []);

  const handleBack = () => {
    history.push(`/order`);
  };

  return (
    <Container maxWidth="xl" className={classes.orderDetailBox}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h4" className={classes.titlePage}>
            {"Chi tiết đơn đặt hàng MDH" + detail.orderId}
          </Typography>
        </Grid>
        <Grid>
          <SubOrderPopup
            orderId={id}
            products={detail.products}
            subOrder={detail.subOrder}></SubOrderPopup>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} md={7}>
          <OrderInfo products={detail.products} deposit={detail.deposit} />
        </Grid>
        <Grid item xs={12} md={5}>
          <TimelineStatus statusList={detail.orderStatus} />
        </Grid>
        <Grid item xs={12} md={7}>
          <ListBill detailBill={detail.detailBill} />
        </Grid>
        <Grid item xs={12} md={5}>
          <CustomerInfo
            customer={detail.clientID}
            receiverName={detail.receiverName}
            receiverPhone={detail.receiverPhone}
            receiverAddress={detail.receiverAddress}
            id={id}
          />
        </Grid>

        {detail.subOrder?.map((item, idx) => (
          <SubOrderList
            item={item}
            idx={idx}
            detail={detail}
            setDetail={setDetail}></SubOrderList>
        ))}
      </Grid>
      <Grid container spacing={2} className={classes.btnGroup}>
        <Grid item>
          <Button
            startIcon={<Cancel />}
            onClick={() => {
              handleCancel();
            }}
            disabled={lastStatus === OrderStatus.CANCELED}
            size="large"
            className={classes.btnCancel}>
            <Typography variant="h6" className={classes.btnCancelTitle}>
              Hủy
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            startIcon={<ImportExport />}
            onClick={() => {
              handleExport();
            }}
            disabled={
              !(
                detail?.orderStatus[detail?.orderStatus?.length - 1]?.name ===
                OrderStatus.COMPLETED
              )
            }
            size="large"
            className={classes.btnCancel}>
            <Typography variant="h6" className={classes.btnCancelTitle}>
              Xuất hoá đơn
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <DefaultButton
            title="Quay lại"
            icon={ArrowBack}
            clickEvent={handleBack}
          />
        </Grid>
        <Grid item>
          <DefaultButton title="Cập nhật" icon={ArrowUpward} />
        </Grid>
      </Grid>
    </Container>
  );
}
