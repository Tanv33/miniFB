import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function Message(props) {
  return (
    <Stack sx={{ width: "100%", position: "absolute", top: "0" }} spacing={2}>
      <Alert severity={props.type}>{props.message}</Alert>
    </Stack>
  );
}
