//react
import React from 'react';

//third party libs
import {Controller, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

//hooks
import {useFormStore} from '../../hooks/useFormStore.ts';

//mui
import {Box, Button, Checkbox, TextField, Typography} from '@mui/material';

//local
import {en} from "../../locale/en.ts";
import {ElementType} from "../../enums/elementType.ts";

const FormRenderer: React.FC<{ formId: string }> = ({formId}) => {
    const form = useFormStore((state) => state.forms.find((f) => f.id === formId));
    if (!form) return <div>Form not found</div>;

    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(
            Yup.object(
                form.elements.reduce((acc, element) => {
                    if (element.isRequired) {
                        acc[element.id] = Yup.string().required(`${element.label} is required`);
                    }
                    return acc;
                }, {} as Record<string, any>)
            )
        ),
    });

    const onSubmit = (data: any) => {
        console.log('Form Data: ', data);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "start"}}>
                <Typography variant='h4' sx={{mb: 1 , alignSelf:'center' , textDecoration:'underline'}}>{form.name}</Typography>
                {form.elements.map((element) => (
                    <div key={element.id}>
                        {element.type === ElementType.Input && (
                            <Controller
                                name={element.id}
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        label={element.label}
                                        error={!!errors[element.id]}
                                        helperText={errors[element.id]?.message}
                                        sx={{mt: 1}}
                                    />
                                )}
                            />
                        )}
                        {element.type === ElementType.Checkbox && (
                            <Box sx={{display: "flex", alignItems: "center", mt: 3}}>
                                <Controller
                                    name={element.id}
                                    control={control}
                                    render={({field}) => <Checkbox sx={{padding:"0px"}}  {...field} />}
                                />
                                <Typography sx={{color: "black", paddingLeft: '4px'}}>
                                    {element.label}
                                </Typography>
                            </Box>
                        )}
                        {element.type === ElementType.Text && (
                            <Controller
                                name={element.id}
                                control={control}
                                defaultValue=""
                                render={() => (
                                    <Typography
                                        sx={{mt: 3}}
                                    >
                                        {element.label}
                                    </Typography>
                                )}
                            />
                        )}
                    </div>
                ))}
            </Box>
            <Button
                 sx={{mt: 3}}
                 variant="contained"
                 color="primary"
                 type="submit"
            >
                {en.Back}
            </Button>
        </form>
    );
};

export default FormRenderer;
