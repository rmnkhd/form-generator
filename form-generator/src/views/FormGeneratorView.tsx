//react
import React, { useState } from 'react';

//mui
import { Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import theme from "../theme/theme.ts";

//hooks
import {useFormStore} from "../hooks/useFormStore.ts";


const ContainerBox = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
}));

const FormContainer = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
}));

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(4),
}));

const FormGeneratorView = () => {

    return (
        <ThemeProvider theme={theme}>
            <ContainerBox>
                <FormContainer>
                    <Title variant="h4" gutterBottom>
                        Form Generator
                    </Title>

                </FormContainer>
            </ContainerBox>
        </ThemeProvider>
    );
};

export default FormGeneratorView;
