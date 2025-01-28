//react
import React, {useState} from 'react';

//third party libraries
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

//mui
import {Button, TextField} from '@mui/material';

//types
import {Element, Form} from '../../types/types.ts';

//hooks
import {useFormStore} from '../../hooks/useFormStore';

//local
import {en} from "../../locale/en.ts";

//components
import FormAddElementsContainer from "./FormAddElementsContainer.tsx";
import FormElements from "./FormElements.tsx";

//services
import StorageService from "../../services/storage.service.ts";


const FormBuilder: React.FC = () => {
    const [formName, setFormName] = useState('');
    const [elements, setElements] = useState<Element[]>([]);
    const addForm = useFormStore((state) => state.addForm);
    const forms = useFormStore((state) => state.forms);

    const validationSchema = Yup.object().shape({
        formName: Yup.string().required('Form name is required'),

    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            formName: '',
        },
    });

    const handleSaveForm = () => {
        const newForm: Form = {id: Date.now().toString(), name: formName, elements};
        addForm(newForm);
        StorageService.set('form-data', [...forms, newForm]);
        setFormName('');
        setElements([]);
    };

    return (
            <form onSubmit={handleSubmit(handleSaveForm)}>
                <Controller
                    name="formName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={en.FormName}
                            fullWidth
                            error={!!errors.formName}
                            helperText={errors.formName?.message}
                        />
                    )}
                />
                <FormAddElementsContainer elements={elements} setElements={setElements} />

                <FormElements elements={elements} setElements={setElements} />

                <Button
                    sx={{ mt: 5 }}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    {en.Save}
                </Button>
            </form>

    );
};

export default FormBuilder;
