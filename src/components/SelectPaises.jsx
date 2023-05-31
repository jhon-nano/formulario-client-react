import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';

export default function SelectPaises({ countries, control }) {
    return (
        <Controller
            render={({ field }) => (
                <Autocomplete
                    id="country-select-demo"
                    {...field}
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.country}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.country} ({option.iso3})
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Elige un país"
                            required
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                    onChange={(_, data) => field.onChange(data)}
                />
            )}
            name="pais"
            control={control}

        />
    );
}