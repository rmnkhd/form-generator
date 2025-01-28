import React from 'react';

// mui
import {Box, Button} from '@mui/material';

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

const FormAddElementsContainer: React.FC<FormAddElementsContainerProps> = ({elements, setElements}) => {

    const handleAddElement = (type: ElementType) => {
        const lastElement = elements[elements.length - 1];

        // Helper function to create a new element
        const createNewElement = (type: ElementType): Element => ({
            id: `${elements.length + 1}`,
            type,
            label: '',
            isRequired: type === ElementType.Input
        });

        // Helper function to check the conditions for adding elements
        const canAddElement = (lastElement: Element | undefined, type: ElementType): boolean => {
            if (!lastElement) return true; // No elements yet, allow adding any type

            switch (lastElement.type) {
                case ElementType.Input:
                    return type === ElementType.Checkbox; // After input, we need to add checkbox
                case ElementType.Checkbox:
                case ElementType.Text:
                    return type === ElementType.Text || type === ElementType.Input; // After checkbox or text, allow input or text
                default:
                    return false;
            }
        };

        // Check if the new element can be added based on the last element type
        if (canAddElement(lastElement, type)) {
            const newElement = createNewElement(type);
            setElements([...elements, newElement]);
        } else {
            alert(`You must add the correct type of element after ${lastElement.type}`)
        }
    };

    return (
        <Box sx={{mt: 3, display: 'flex', gap: 2}}>
            <Button variant="outlined" color="secondary" onClick={() => handleAddElement(ElementType.Input)}>
                {en.AddInputElement}
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => handleAddElement(ElementType.Checkbox)}>
                {en.AddCheckboxElement}
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => handleAddElement(ElementType.Text)}>
                {en.AddTextElement}
            </Button>
        </Box>
    );
};

export default FormAddElementsContainer;
