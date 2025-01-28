import React, { useState } from "react";

// third party libs
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// hooks
import { useFormStore } from "../../hooks/useFormStore.ts";

// mui
import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";

// local
import { en } from "../../locale/en.ts";

//enums
import { ElementType } from "../../enums/elementType.ts";

const FormRenderer: React.FC<{ formId: string }> = ({ formId }) => {
    const form = useFormStore((state) =>
        state.forms.find((f) => f.id === formId)
    );
    if (!form) return <div>Form not found</div>;


    const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>(
        form.elements.reduce((acc, element) => {
            if (element.type === ElementType.Checkbox) {
                acc[element.id] = false;
            }
            return acc;
        }, {} as Record<string, boolean>)
    );

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(
            Yup.object(
                form.elements.reduce((acc, element) => {
                    if (element.isRequired) {
                        acc[element.id] = Yup.string().required(
                            `${element.label} is required`
                        );
                    }
                    return acc;
                }, {} as Record<string, any>)
            )
        ),
    });

    const handleCheckboxChange = (id: string) => {
        setCheckboxStates((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const isInputEditable = (index: number): boolean => {
        const previousElement = form.elements[index + 1];
        return (
            previousElement &&
            previousElement.type === ElementType.Checkbox &&
            checkboxStates[previousElement.id]
        );
    };

    const onSubmit = (data: any) => {
        console.log("Form Data: ", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <Typography
                    variant="h4"
                    sx={{ mb: 1, alignSelf: "center", textDecoration: "underline" }}
                >
                    {form.name}
                </Typography>
                {form.elements.map((element, index) => (
                    <div key={element.id}>
                        {element.type === ElementType.Input && (
                            <Controller
                                name={element.id}
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={element.label}
                                        error={!!errors[element.id]}
                                        sx={{ mt: 1 }}
                                        disabled={!isInputEditable(index)}
                                    />
                                )}
                            />
                        )}
                        {element.type === ElementType.Checkbox && (
                            <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                                <Controller
                                    name={element.id}
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            sx={{ padding: "0px" }}
                                            {...field}
                                            checked={checkboxStates[element.id]}
                                            onChange={() => handleCheckboxChange(element.id)}
                                        />
                                    )}
                                />
                                <Typography sx={{ color: "black", paddingLeft: "4px" }}>
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
            <Button sx={{ mt: 3 }} variant="contained" color="primary" type="submit">
                {en.Back}
            </Button>
        </form>
    );
};

export default FormRenderer;
