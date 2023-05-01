import React, { ReactNode } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Typography,
} from "@mui/material";

interface BaseFormProps {
  children: ReactNode;
}

interface FormProps<T> extends BaseFormProps {
  type: string;
  onSubmit: (values: T) => Promise<void>;
  formLoading: boolean;
  onFinish: () => void;
}

const Form2 = <T extends Record<string, any>>({
  type,
  onSubmit,
  formLoading,
  onFinish,
  children,
}: FormProps<T>) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<T>();

  const handleFormSubmit = async (data: T) => {
    await onSubmit(data);
    onFinish();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {type}
      </Typography>
      {children}
      <FormControl sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={formLoading}
        >
          {formLoading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </FormControl>
      <FormControl sx={{ marginTop: 2 }}>
      {errors.name && errors.name.message ? (
  <FormHelperText sx={{ color: "#f44336", fontWeight: 500 }}>
    {errors.name.message}
  </FormHelperText>
) : null}
      </FormControl>
    </Box>
  );
};

export default Form2;
