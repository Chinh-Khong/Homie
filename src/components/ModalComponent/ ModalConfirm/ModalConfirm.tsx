"use client";

import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

interface ModalConfirmProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  title: string;
  content?: string;
  okText?: string;
  cancelText?: string;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  open,
  onOk,
  onCancel,
  title,
  content = "This action cannot be undone.",
  okText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <Modal open={open} onClose={onCancel}>
      <Box sx={style}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          {title}
        </Typography>
        <Typography mb={3}>{content}</Typography>
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button color="error" variant="outlined" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button variant="contained" color="error" onClick={onOk}>
            {okText}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalConfirm;
