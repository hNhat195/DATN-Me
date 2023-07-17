import * as React from "react";
import orderApi from "../../../api/orderApi";
import { useState, useEffect } from "react";
import OrderInfo from "./OrderInfo";
import TimelineStatus from "./TimelineStatus";
import { Button, Grid, Typography, Container } from "@material-ui/core";
import ChangeStatusPopup from "./ChangeStatusPopup";
import CancelSubOrderPopup from "./CancelSubOrderPopup";
import { makeStyles } from "@material-ui/core/styles";

export default function SubOrderList({ item, idx, detail, setDetail }) {
    const [latestStatus, setLastStatus] = useState(item.subOrderStatus[item.subOrderStatus.length - 1].name)
    const [disabledChange, setDisabledChange] = useState(false)
    useEffect(() => {
        if (latestStatus == 'completed' || latestStatus == 'canceled') {
            setDisabledChange(true)
        }
        else {
            setDisabledChange(false)
        }
    }, [latestStatus])
    useEffect(() => { }, [disabledChange])
    return (
        <Grid item container key={idx} xs={12} md={12} spacing={2}>
            <Grid item container xs={12} md={7}>
                <OrderInfo products={item.products} />

            </Grid>
            <Grid item xs={12} md={5}>
                <TimelineStatus statusList={item.subOrderStatus} item={item} />
            </Grid>
            <Grid item container xs={12} md={12}>
                <Grid item xs={3}>
                    <ChangeStatusPopup subOrder={item} idx={idx} detail={detail} setDetail={setDetail} disabledChange={disabledChange}></ChangeStatusPopup>
                </Grid>
                <Grid item xs={3}>
                    <CancelSubOrderPopup subOrder={item} idx={idx} detail={detail} setDetail={setDetail} disabledChange={disabledChange}></CancelSubOrderPopup>
                </Grid>
            </Grid>
        </Grid>
    );
}