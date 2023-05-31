import { Assignment, SaveTwoTone } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Card, CardContent, CardHeader, Grid, Skeleton, TextField } from '@mui/material';
import { API } from 'aws-amplify';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import SelectCiudad from '../components/SelectCiudad';
import SelectPaises from '../components/SelectPaises';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';

export default function FormClient() {
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [api_countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Obtener la lista de países desde el API
    axios.get('https://countriesnow.space/api/v0.1/countries') // Reemplaza la URL con tu API real
      .then(response => {

        setLoading(false)
        setCountries(response.data.data);
      })
      .catch(error => {
        console.error(error);
        setLoading(false)
      });
  }, []);



  const onSubmit = (data) => {
    const id = generarIdAleatorio(8);

    const { nombre_completo, pais: { country }, ciudad } = data;

    confirm({
      title: 'Ingresar el Formulario ?',
      description: "Presione el boton de CONFIRMAR.",
      confirmationText: 'CONFIRMAR',
      confirmationButtonProps: {
        variant: 'contained',
        color: 'primary'
      },
      cancellationText: 'CANCELAR',
      cancellationButtonProps: {
        variant: 'text',
        color: 'error'
      },
    })
      .then(() => {
        setLoading(true)
        API.post('api', '/form/create', { body: { id: id, nombre_completo: nombre_completo, pais: country, ciudad: ciudad } })
          .then((res) => {
            reset();
            setLoading(false);
            enqueueSnackbar("Formulario Ingresado!", {
              variant: "success",
            });
          })
          .catch((error) => {
            setLoading(false);
            console.error(error);
            enqueueSnackbar("Error Ingresado Formulario!", {
              variant: "error",
            });
          });
      })
      .catch(() => {
        console.error('cancel confirm');
      });
  };


  const pais = useWatch({
    control,
    name: "pais",
  });

  function generarIdAleatorio(length) {
    let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      id += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return id;
  }


  return (
    <Card sx={{ width: 400 }} >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader
          avatar={<Assignment fontSize='large' />}
          title='Formulario'
          subheader='Completa el Formulario'
          action={
            <LoadingButton
              color="primary"
              type="submit"
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveTwoTone />}
              variant="contained"
            >
              {loading ? "CARGANDO" : "REGISTRAR"}
            </LoadingButton>
          }
        />
        <CardContent >

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {loading ? (
                <Skeleton height={50} />
              ) : (
                <Controller
                  name="nombre_completo"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Este campo es requerido' }}
                  render={({ field }) => (
                    <TextField
                      label="Nombre Completo"
                      fullWidth
                      required
                      {...field}
                      error={!!errors.nombres}
                      helperText={errors.nombres ? errors.nombres.message : ''}
                    />
                  )}
                />)}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {loading ? (
                <Skeleton height={50} />
              ) : (
                <SelectPaises countries={api_countries} control={control} />
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {loading ? (
                <Skeleton height={50} />
              ) : (
                <SelectCiudad pais={pais} control={control} />
              )}
            </Grid>

          </Grid>

        </CardContent>
      </form>
    </Card>
  )
}
