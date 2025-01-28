//react
import React from 'react';

// mui
import {Box, IconButton, TextField, Typography} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

//types
import {Element} from '../../types/types.ts';

//local
import {en} from "../../locale/en.ts";

//enums
import {ElementType} from "../../enums/elementType.ts";

interface FormAddElementsContainerProps {
    elements: Element[];
    setElements: React.Dispatch<React.SetStateAction<Element[]>>;
}

const FormElements: React.FC<FormAddElementsContainerProps> = ({elements, setElements}) => {
    const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
                borderColor: '#ddd',
            },
            '&:hover fieldset': {
                borderColor: '#190b1e',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#190b1e',
            },
        },
        '& .MuiInputLabel-root': {
            fontSize: '1rem',
            color: '#190b1e',
            fontWeight: 500,
        },
    };

    const handleDeleteElement = (id: string) => {
        // Find the index of the element to be deleted
        const elementIndex = elements.findIndex((element) => element.id === id);

        if (elementIndex === -1) return; // If element is not found, do nothing

        // Check if the element to be deleted is a checkbox, and if so, remove the preceding input
        const updatedElements = elements.filter((_, index) => {
            // If the current element is the checkbox to be deleted, we also filter out the preceding input
            if (elements[elementIndex].type === ElementType.Checkbox && index === elementIndex - 1) {
                return false; // Remove the input element above the checkbox
            }
            if (elements[elementIndex].type === ElementType.Input && index === elementIndex + 1) {
                return false; // Remove the checkbox element below the input
            }

            // Keep all other elements
            return elements[index].id !== id;
        });

        setElements(updatedElements);
    };

    return (
        <Box sx={{mt: 4, display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start"}}>
            {elements.map((element, index) => (
                <Box sx={{display: "flex", alignItems: "center", mb: 2}} key={element.id}>
                    <Typography sx={{mr: 2}}>
                        {element.id}.
                    </Typography>

                    <TextField
                        label="Element Label"
                        value={element.label}
                        sx={textFieldStyles}
                        onChange={(e) => {
                            const newElements = [...elements];
                            newElements[index].label = e.target.value;
                            setElements(newElements);
                        }}
                    />

                    <IconButton
                        color="secondary"
                        sx={{ml: 2}}
                        onClick={() => handleDeleteElement(element.id)}
                    >
                        <DeleteIcon/>
                    </IconButton>

                    <Typography sx={{ml: 2}} variant="caption">
                        {en.Type}: {element.type}
                    </Typography>

                </Box>
            ))}
        </Box>
    );
};

export default FormElements;
