import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Modal,
  Backdrop,
  Card,
  Typography,
  CardContent,
  InputLabel,
  TextField,
  Container,
  FormControl,
  MenuItem,
  Box,
} from "@material-ui/core";
import moment from "moment";
import clsx from "clsx";
import { Done, Cancel } from "@material-ui/icons";
import DefaultButton from "../../../components/Button/DefaultButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SelectWithInput from "./SelectWithInput";
import productApi from "../../../api/productApi";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  infoButton: {
    width: "80%",
    border: "1px solid #DADADA",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.20)",
    marginTop: "15px",
    color: "#000040",
    marginLeft: "5px",
    "&:hover": {
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.20)",
      background: "#DADADA",
    },
    "&:active": {
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.20)",
      background: "#EAECFF",
      color: "#1B40FA",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formModal: {
    width: "30vw",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  titleModal: {
    textAlign: "center",
    color: "#000040",
  },
  btnColor: {
    color: "#A3A3A3",
    fontSize: 16,
  },
  btnSubmit: {
    textAlign: "center",
    backgroundColor: "#1B40FA",
    color: "#FFFFFF",
    marginTop: "10px",
    marginLeft: "50px",
    "&:active": {
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.20)",
      background: "#EAECFF",
      color: "#1B40FA",
    },
  },
  buttonBox: {
    padding: 0,
    textAlign: "right",
    marginTop: "10px",
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
    marginRight: "10px",
  },
  btnCancelTitle: {
    ...theme.typography.buttonPrimary,
  },
  formSelect: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textBirthday: {},
  nameStaff: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: "100px",
  },
}));

export default function CreatePopup() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(true);
  const [newFabric, setNewFabric] = useState({
    collection: "",
    material: "",
    colorCode: "",
    name: "",
    slug: "",
  });

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const capitalized = (str) => {
    const words = str.split(" ");

    const capitalizedWords = words.map((word) => {
      if (word.length > 0) {
        const firstChar = word.charAt(0).toUpperCase();
        const remainingChars = word.slice(1);

        return firstChar + remainingChars;
      }

      return word;
    });

    return capitalizedWords.join(" ");
  };

  const addDash = (str) => {
    const words = str.split(" ");
    return words.join("-");
  };


  const handleCreateFabric = async () => {
    if (!err) {
      if (Object.values(newFabric).filter((i) => i === null).length > 0)
        alert("Vui lòng điền đầy đủ thông tin!");
      else {
        try {
          //   await supportApi.create(support);
          const tempCollection = newFabric.collection;
          const tempMaterial = capitalized(newFabric.material);
          const tempColorCode = capitalized(newFabric.colorCode);
          const tempName = tempMaterial + " - " + tempColorCode;
          const tempSlug =
            addDash(newFabric.material) + "-" + addDash(newFabric.colorCode);
          const postData = {
            collection: tempCollection,
            fabricType: tempMaterial,
            colorCode: tempColorCode,
            name: tempName,
            slug: tempSlug,
          }
          await productApi.createNewFabric(postData)
          //   setOpen(false);
          //   setRefresh((prevState) => !prevState);
        } catch (error) {
          console.log(error);
          alert("Thông tin không hợp lệ");
        }
      }
    }
  };

  return (
    <div className={classes.root}>
      <DefaultButton
        size="large"
        title="Thêm vải mới"
        icon={AddCircleIcon}
        clickEvent={handleOpen}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              className={classes.titleModal}
            >
              Thêm sản phẩm vải mới
            </Typography>

            <form className={classes.formModal} autoComplete="off">
              <Box className={classes.nameStaff}>
                <FormControl
                  fullWidth
                  margin="dense"
                  style={{ marginRight: "10px" }}
                >
                  <InputLabel htmlFor="support-orderCode"></InputLabel>
                  <Typography
                    gutterBottom
                    variant="h6"
                    className={classes.btnColor}
                  >
                    Loại vải
                  </Typography>
                  <SelectWithInput
                    newFabric={newFabric}
                    setNewFabric={setNewFabric}
                  ></SelectWithInput>
                </FormControl>
              </Box>

              <Box className={classes.nameStaff}>
                <FormControl
                  fullWidth
                  margin="dense"
                  style={{ marginRight: "10px" }}
                >
                  <InputLabel htmlFor="support-content"></InputLabel>
                  <Typography
                    gutterBottom
                    variant="h6"
                    className={classes.btnColor}
                  >
                    Chất liệu
                  </Typography>
                  <TextField
                    required
                    id="standard-required"
                    name="support-content"
                    variant="outlined"
                    minRows={1}
                    multiline
                    placeholder="Chất liệu"
                    style={{ padding: "0px", margin: "0px" }}
                    onChange={(e) => {
                      setErr(e.target.value === "");
                      setNewFabric({ ...newFabric, material: e.target.value });
                    }}
                  />
                </FormControl>
              </Box>
              <Box className={classes.nameStaff}>
                <FormControl
                  fullWidth
                  margin="dense"
                  style={{ marginRight: "10px" }}
                >
                  <InputLabel htmlFor="color-code"></InputLabel>
                  <Typography
                    gutterBottom
                    variant="h6"
                    className={classes.btnColor}
                  >
                    Mã màu
                  </Typography>
                  <TextField
                    required
                    id="standard-required"
                    name="color-code"
                    variant="outlined"
                    minRows={1}
                    multiline
                    placeholder="Mã màu"
                    style={{ padding: "0px", margin: "0px" }}
                    onChange={(e) => {
                      setErr(e.target.value === "");
                      setNewFabric({ ...newFabric, colorCode: e.target.value });
                    }}
                  />
                </FormControl>
              </Box>
              <Container className={classes.buttonBox}>
                <Button
                  startIcon={<Cancel />}
                  size="large"
                  className={classes.btnCancel}
                  onClick={handleClose}
                >
                  <Typography variant="h6" className={classes.btnCancelTitle}>
                    Hủy
                  </Typography>
                </Button>
                <DefaultButton
                  title="Xác nhận"
                  icon={Done}
                  clickEvent={handleCreateFabric}
                />
              </Container>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}
