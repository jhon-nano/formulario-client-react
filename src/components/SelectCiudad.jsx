import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';

export default function SelectCiudad({ country, control }) {
    return (
        <Controller
            render={({ field }) => (
                <Autocomplete
                    id="country-select-demo"
                    {...field}
                    disabled={country == undefined}
                    options={country == undefined ? [] : country?.cities}
                    autoHighlight
                    getOptionLabel={(option) => option}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Elige una Ciudad"
                            required
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                            helperText={country ? '' : 'Selecciona un Pais.'}
                            error={country == undefined}
                        />
                    )}
                    onChange={(_, data) => field.onChange(data)}
                />
            )}
            name="city"
            control={control}

        />
    );
}