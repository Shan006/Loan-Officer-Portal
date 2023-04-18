import {
  Button,
  Dialog,
  DialogContent,
  Fade,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef } from "react";

const Transition = forwardRef(function Transition(prop, ref) {
  return <Fade ref={ref} {...prop} />;
});
const Conformation = ({ open, closeDialog, title, deleteFunction }) => {
  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="sm"
      scroll="body"
      onClose={closeDialog}
      onBackdropClick={closeDialog}
      TransitionComponent={Transition}
    >
      <DialogContent sx={{ px: 6, py: 6, position: "relative" }}>
        <IconButton
          size="medium"
          onClick={closeDialog}
          sx={{ position: "absolute", right: "1rem", top: "1rem" }}
        >
          x
        </IconButton>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h5">Delete {title}</Typography>
              <Typography variant="body1">
                Are you sure you want to delete this {title} ?
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
          >
            <Button
              size="medium"
              variant="contained"
              color="primary"
              onClick={closeDialog}
            >
              cancel
            </Button>
            <Button
              size="medium"
              variant="contained"
              color="error"
              onClick={deleteFunction}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Conformation;
