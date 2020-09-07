import React from "react";
import "./Infobox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

const Infobox = ({ title, cases, active, isRed, total, ...props }) => {
  return (
    <Card
      onClick={props.onClick}
      className={`Infobox ${active && `infoBox--selected `} ${isRed && `infoBox--selected--isRed `}`}
    >
      <CardContent>
        <Typography className="infobox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="cases">{cases}</h2>
        <Typography className="infobox__total" color="textSecondary">
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Infobox;
