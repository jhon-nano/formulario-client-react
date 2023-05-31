import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';

export default function SelectCiudad({ pais, control }) {
    return (
        <Controller
            render={({ field }) => (
                <Autocomplete
                    id="country-select-demo"
                    {...field}
                    disabled={pais == undefined}
                    options={pais == undefined ? [] : pais?.cities}
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
                            helperText={pais ? '' : 'Selecciona un Pais.'}
                            error={pais == undefined}
                        />
                    )}
                    onChange={(_, data) => field.onChange(data)}
                />
            )}
            name="ciudad"
            control={control}

        />
    );
}