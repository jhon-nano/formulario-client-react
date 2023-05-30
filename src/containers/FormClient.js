import { Assignment, SaveTwoTone } from '@mui/icons-material';
import { Autocomplete, Card, CardContent, CardHeader, Grid, Skeleton, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import SelectPaises from '../components/SelectPaises';
import SelectCiudad from '../components/SelectCiudad';
import { LoadingButton } from '@mui/lab';

export default function FormClient() {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [api_countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Obtener la lista de países desde el API
    axios.get('https://countriesnow.space/api/v0.1/countries') // Reemplaza la URL con tu API real
      .then(response => {
        console.log(response)
        setLoading(false)
        setCountries(response.data.data);
      })
      .catch(error => {
        console.error(error);
        setLoading(false)
      });
  }, []);



  const onSubmit = (data) => {


console.log(data)
  };


  const country = useWatch({
    control,
    name: "country",
  });



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
              {!country  && loading ? (
                <Skeleton height={50} />
              ) : (
                <SelectCiudad country={country} control={control} />
              )}
            </Grid>

          </Grid>
        
      </CardContent>
      </form>
    </Card>
  )
}
