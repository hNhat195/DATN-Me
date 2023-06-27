import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  Grid,
  Typography,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import orderApi from "../../../api/orderApi";

const useStyles = makeStyles({
  orderInfoBox: {
    backgroundColor: "#F6F6F8",
    borderRadius: "5px",
    padding: "10px",
    fontFamily: "'Roboto', sans-serif",
    height: "100%",
  },
  title: {
    color: "#000040",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  totalMoney: {
    color: "#000040",
    fontSize: "20px",
    fontWeight: "bolder",
  },
  alignMoneyRight: {
    textAlign: "right",
  },
  estimateMoney: {
    color: "#000040",
    fontSize: "16px",
    fontWeight: "bolder",
  },
  productScroll: {
    padding: "0",
    maxHeight: "350px",
    minHeight: "349px",
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  lengthField: {
    height: "30px",
    width: "100px",
    border: "0",
    // "&[disabled]": {
    //   opacity: '1',
    // }
  },
});

export default function SubOrderPopup({ orderId, products, subOrder }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [subProductsList, setSubProductsList] = useState();

  const handleClickOpen = () => {
    console.log(subOrder);
    let tempArr = [];
    const copiedProducts = products.map((item) => ({ ...item, quantity: 0 }));
    for (let i = 0; i < products.length; i++) {
      let temp = copiedProducts[i];

      temp["divided"] = 0;
      for (let j = 0; j < subOrder.length; j++) {
        for (let k = 0; k < subOrder[j].products.length; k++) {
          if (
            temp?.fabricID?.fabricTypeId?.name ==
              subOrder[j]?.products[k].fabricID?.fabricTypeId?.name &&
            temp?.fabricID?.colorId?.colorCode ==
              subOrder[j]?.products[k].fabricID?.colorId?.colorCode &&
            subOrder[j].subOrderStatus.length > 0 &&
            subOrder[j].subOrderStatus[subOrder[j].subOrderStatus.length - 1]
              .name != "canceled"
          ) {
            temp["divided"] += subOrder[j].products[k].quantity;
          }
        }
      }
      tempArr.push(temp);
    }
    console.log(tempArr);
    setSubProductsList(tempArr);
    //   const hashTable = {};
    // array2.forEach((obj) => {
    //   hashTable[obj.id] = obj;
    // });

    // // Compare the objects in array1 to the objects in the hash table
    // const result = [];
    // array1.forEach((obj) => {
    //   const matchedObj = hashTable[obj.id];
    //   if (matchedObj) {
    //     result.push({ obj1: obj, obj2: matchedObj });
    //   }
    // });

    // return result;
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    const tempArr = [];
    let checkQuantity = true;
    for (let i = 0; i < products.length; i++) {
      if (
        subProductsList[i].quantity >
          products[i].quantity - subProductsList[i].divided ||
        subProductsList[i].quantity < 0
      ) {
        checkQuantity = false;
        break;
      }
      const tempObj = {
        colorCode: products[i].fabricID.colorId.colorCode,
        typeId: products[i].fabricID.fabricTypeId.name,
        quantity: subProductsList[i].quantity,
      };
      tempArr.push(tempObj);
    }
    if (checkQuantity) {
      const postData = {
        orderId: orderId,
        note: "sub order",
        products: tempArr,
      };
      console.log("tao sub order thanh cong");
      const response = await orderApi.createSubOrder(postData);
      subOrder.push(response);
      setOpen(false);
    } else console.log("tao sub order that bai");
  };

  const handleQuantity = (e, idx) => {
    let tempArr = subProductsList;
    tempArr[idx].quantity = Number.parseInt(e.target.value);
    setSubProductsList(tempArr);
  };

  return (
    <span>
      <Button variant="outline" onClick={handleClickOpen}>
        Tạo suborder
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle>Tạo suborder</DialogTitle>
        <DialogContent>
          <DialogContentText>Chia nhỏ đơn hàng</DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
          <TableContainer component={Paper} className={classes.productScroll}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Loại vải</TableCell>
                  <TableCell>Mã màu</TableCell>
                  <TableCell>Đã đặt (Cây)</TableCell>
                  <TableCell>Đã chia (Cây)</TableCell>
                  <TableCell>Đã giao (Cây)</TableCell>
                  <TableCell>Nhập số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subProductsList?.map((item, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle2">{idx + 1}</Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle2">
                        {item.fabricID.fabricTypeId.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {item.fabricID.colorId.colorCode}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {Number.parseInt(products[idx].quantity)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {Number.parseInt(item.divided)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {Number.parseInt(products[idx].shipped)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        defaultValue={item.quantity}
                        onChange={(e) => handleQuantity(e, idx)}
                        min="0"
                        step="1"
                        className={classes.lengthField}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleCreate}>Tạo</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}