//react
import React, {useEffect, useState} from 'react';

//mui
import {Box, Button, Typography} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import theme from "../theme/theme.ts";

//hooks
import {useFormStore} from "../hooks/useFormStore.ts";

//components
import FormBuilder from "../components/form/FormBuilder.tsx";
import FormRenderer from "../components/form/FormRenderer.tsx";

//local
import {en} from "../locale/en.ts";

//services
import StorageService from "../services/storage.service.ts";


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
    borderRadius: '12px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
}));

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(4),
}));

const FormGeneratorView = () => {
    const [currentFormId, setCurrentFormId] = useState<string | null>(null);
    const getForm = useFormStore((state) => state.getForms);
    const forms = useFormStore((state) => state.forms);

    useEffect(() => {
        const storedForms = StorageService.get("form-data");
        if (Array.isArray(storedForms)) {
            getForm(storedForms)
        }
    }, [getForm]);

    return (
        <ThemeProvider theme={theme}>
            <ContainerBox>
                <FormContainer>
                    <Title variant="h4" gutterBottom>
                        {en.FormGenerator}
                    </Title>
                    {!currentFormId ? (
                        <>
                            <FormBuilder />
                            <Box mt={4}>
                                {forms.map((form) => (
                                    <Button
                                        key={form.id}
                                        onClick={() => setCurrentFormId(form.id)}
                                        variant="contained"
                                        sx={{ marginBottom: '8px', textTransform: 'none' , color:"white" }}
                                    >
                                        {form.name}
                                    </Button>
                                ))}
                            </Box>
                        </>
                    ) : (
                        <FormRenderer formId={currentFormId} setCurrentFormId={setCurrentFormId} />
                    )}
                </FormContainer>
            </ContainerBox>
        </ThemeProvider>
    );
};

export default FormGeneratorView;
