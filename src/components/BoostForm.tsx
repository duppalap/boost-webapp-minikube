import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
  Container,
  Card,
} from "@mui/material";
import { Form, FormikProvider, getIn, useFormik } from "formik";
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";
import React, { Fragment, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { BoostService } from "../_apis_/boost";
import { get } from "lodash";
import BoostAccordian from "./BoostAccordian";
import useSettings from "../hooks/useSettings";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export interface ISelectOption {
  key: string | number;
  value: string | number;
  display: string;
}

export interface IFormAccordian {
  title: string;
  info?: string;
  fields: IFormField[] | IFormTable[];
}

export interface IFormField {
  name: string;
  label: string;
  select?: boolean;
  switch?: boolean;
  switchValueType?: string;
  disabled?: boolean;
  hidden?: boolean;
  required?: boolean;
  defaultValue?: string;
  handleChange?: any;
  type?: string;
  options?: ISelectOption[];
}

export interface IFormTable {
  type?: any;
  table: any;
}

export interface FormProps {
  heading?: string;
  isEdit: boolean;
  fields?: IFormField[];
  additionalFields?: ReactJSXElement[];
  accordians?: IFormAccordian[];
  initialValues: any;
  additionalValues?: {};
  apiMethod: "POST" | "PUT";
  apiUrl: string;
  formTouched?: boolean;
  successMessage: string;
  onSuccessAction?: any;
  model?: string;
  validationSchema?: any;
  successUrl?: string;
  submitAction?: any;
  additionalBody?: {};
  enableCancel?: boolean;
  cardLayout?: boolean;
  cancelAction?: VoidFunction;
}

function BoostForm({
  heading,
  isEdit,
  fields,
  additionalFields,
  accordians,
  model,
  initialValues,
  additionalValues,
  validationSchema,
  apiMethod,
  apiUrl,
  successUrl,
  successMessage,
  submitAction,
  formTouched = false,
  additionalBody,
  enableCancel,
  cancelAction = () => {},
  onSuccessAction = (data?: any) => {},
  cardLayout = true,
}: FormProps) {
  const navigate = useNavigate();
  const [boostFormTouched, setBoostFormTouched] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<string | false>(`panel0`);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const boostService = new BoostService();
  const theme = useTheme();
  const { themeStretch } = useSettings();

  useEffect(() => {
    setBoostFormTouched(formTouched);
  }, [formTouched]);

  const changeSwitchValues = (
    fields: IFormField[] | undefined,
    values: any
  ) => {
    fields
      ?.filter(
        (item: IFormField) => item.switch && item.switchValueType === "number"
      )
      .forEach((element) => {
        values[element.name] = values[element.name] === true ? 1 : 0;
      });
  };

  const formSubmitAction = async (body: any) => {
    const action = (key: any) => (
      <Fragment>
        <Button onClick={() => closeSnackbar(key)}>Dismiss</Button>
      </Fragment>
    );
    await boostService.submitForm(apiMethod, body, apiUrl).then(
      (response) => {
        if (response && response.status === 200) {
          enqueueSnackbar(successMessage, {
            variant: "success",
            anchorOrigin: { horizontal: `center`, vertical: `top` },
            autoHideDuration: 6000,
            action,
          });
          cancelAction();
          onSuccessAction(response);
        }
      },
      (err) => {
        enqueueSnackbar("Error Creating the form", {
          variant: "error",
          anchorOrigin: { horizontal: `center`, vertical: `top` },
          autoHideDuration: 6000,
          action,
        });
      }
      // I repeat the enqueueSnackbar data because of the variant creates a lint error.
    );
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        changeSwitchValues(fields, values);
        const allValues = { ...values, ...additionalValues };
        const body = model
          ? {
              [model]: allValues,
              ...(additionalBody && additionalBody),
            }
          : allValues;
        submitAction ? submitAction(allValues) : formSubmitAction(body);
        successUrl && navigate(successUrl);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
    resetForm,
  } = formik;

  const getField = (item: IFormField) => {
    const t = getIn(touched, item.name);
    const e = getIn(errors, item.name);
    return item.switch ? (
      <Stack alignItems="flex-start">
        <FormControlLabel
          labelPlacement="start"
          control={
            <Switch
              onChange={(event) => {
                const { checked } = event.target;
                setFieldValue(item.name, checked);
                setBoostFormTouched(true);
                item.handleChange && item.handleChange(event);
              }}
              checked={Boolean(get(values, item.name) === true)}
            />
          }
          label={
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.label}
            </Typography>
          }
        />
      </Stack>
    ) : (
      <TextField
        {...item}
        fullWidth
        key={item.name}
        {...getFieldProps(item.name)}
        error={Boolean(t && e)}
        helperText={t && e}
        onChange={(event) => {
          const { value, name } = event.target;
          setFieldValue(name, item.type == `number` ? Number(value) : value);
          setBoostFormTouched(true);
          item.handleChange && item.handleChange(event);
        }}
      >
        {item.select &&
          item.options &&
          item.options.map((option) => (
            <MenuItem key={option.key} value={option.value}>
              {option.display}
            </MenuItem>
          ))}
      </TextField>
    );
  };

  const getFields = (fields: any[]) => {
    return (
      <Grid item xs={12}>
        <Stack sx={{ p: 3 }} spacing={3}>
          {fields?.map((item) => {
            return (
              !item.hidden &&
              (item.type === "table" ? item.table : getField(item))
            );
          })}
          {additionalFields?.map((item) => {
            return item;
          })}
        </Stack>
      </Grid>
    );
  };

  const resetBoostForm = () => {
    resetForm();
    setBoostFormTouched(false);
  };

  const getHeading = () => {
    return (
      heading && (
        <Box sx={{ mb: 5, mt: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4">{heading}</Typography>
            </Box>
          </Box>
        </Box>
      )
    );
  };

  const getForm = () => {
    return (
      <React.Fragment>
        {heading && getHeading()}
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {accordians
                ? accordians.map((accordian: IFormAccordian, i: number) => {
                    const panel: string = `panel${i}`;
                    return (
                      <Grid item key={`grid_accordian_${panel}`} xs={12}>
                        <BoostAccordian
                          sx={{ boxShadow: theme.shadows[3] }}
                          key={`accordian_panel${i}`}
                          expanded={expanded === panel}
                          onChange={handleChange(panel)}
                          children={getFields(accordian.fields)}
                          title={accordian.title}
                          info={accordian.info}
                        ></BoostAccordian>
                      </Grid>
                    );
                  })
                : fields && getFields(fields)}
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  "& > *": { m: "8px !important" },
                }}
              >
                <LoadingButton
                  disabled={!boostFormTouched}
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {!isEdit ? "Create" : "Save"}
                </LoadingButton>
                {enableCancel && (
                  <Button
                    variant="contained"
                    onClick={() =>
                      cancelAction ? cancelAction() : resetBoostForm()
                    }
                  >
                    Cancel
                  </Button>
                )}
              </Box>
            </Grid>
          </Form>
        </FormikProvider>
      </React.Fragment>
    );
  };

  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      {cardLayout ? <Card sx={{ p: 3 }}>{getForm()}</Card> : getForm()}
    </Container>
  );
}

export default BoostForm;
