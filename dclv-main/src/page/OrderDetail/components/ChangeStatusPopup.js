import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import { makeStyles } from "@material-ui/core/styles";
import orderApi from "../../../api/orderApi";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  changeButton: {
    "&:hover": {
      color: "rgb(252, 186, 3)",
    },
  },
  deleteButton: {
    "&:hover": {
      color: "rgb(245, 66, 51)",
    },
  },
  acceptButton: {
    "&:hover": {
      color: "rgb(11, 214, 38)",
    },
  },
}));

export default function ChangeStatusPopup({
  subOrder,
  idx,
  detail,
  setDetail,
  disabledChange,
}) {
  const [open, setOpen] = React.useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [nextStatus, setNextStatus] = useState("");

  const classes = useStyles();

  useEffect(() => {}, [disabledChange]);

  const handleClickOpen = () => {
    const latestStatus =
      subOrder.subOrderStatus[subOrder.subOrderStatus.length - 1].name;
    if (latestStatus == "ready") {
      setCurrentStatus("Đã sẵn sàng");
      setNextStatus("Đang giao");
    } else if (latestStatus == "in-progress") {
      setCurrentStatus("Đang giao");
      setNextStatus("Đã hoàn thành");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = async () => {
    const res = await orderApi.updateSubOrderStatus(subOrder._id, {
      reason: "",
    });
    let temp = detail;
    temp.subOrder[idx] = res;
    setDetail(temp);
    setOpen(false);
    window.location.reload();
  };

  return (
    <span>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        disabled={disabledChange}
        title="Chuyển trạng thái"
        color="warning"
      >
        Chuyển trạng thái
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Chuyển trạng thái</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>
              Suborder này sẽ được chuyển từ trạng thái
              <b> "{currentStatus}" </b>
              sang trạng thái
              <b> "{nextStatus}" </b>
            </p>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            className={classes.deleteButton}
            variant="outline"
            onClick={handleClose}
          >
            Không
          </Button>
          <Button
            className={classes.acceptButton}
            variant="outline"
            onClick={handleChange}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
