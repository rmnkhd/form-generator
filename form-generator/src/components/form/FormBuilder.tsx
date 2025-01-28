//react
import React, {useState} from 'react';

//mui
import {Box, Button, IconButton, TextField, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

//types
import {Element, Form} from '../../types/types.ts';

//hooks
import {useFormStore} from '../../hooks/useFormStore';

//local
import {en} from "../../locale/en.ts";

//enums
import {ElementType} from "../../enums/elementType.ts";


const FormBuilder: React.FC = () => {
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

    const [formName, setFormName] = useState('');
    const [elements, setElements] = useState<Element[]>([]);
    const addForm = useFormStore((state) => state.addForm);

    const handleAddElement = (type: ElementType) => {
        const newElement: Element = {
            id: `${elements.length + 1}`,
            type,
            label: '',
        };
        setElements([...elements, newElement]);
    };

    const handleDeleteElement = (id: string) => {
        const updatedElements = elements.filter((element) => element.id !== id);
        setElements(updatedElements);
    };


    const handleSaveForm = () => {
        const newForm: Form = { id: Date.now().toString(), name: formName, elements };
        addForm(newForm);
        setFormName('');
        setElements([]);
    };

    return (
        <div>
            <TextField
                label={en.FormName}
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                fullWidth
            />
            <Box sx={{mt:3 , display: 'flex', gap: 2}}>
                <Button variant="outlined" color="secondary" onClick={() => handleAddElement(ElementType.Input)}>{en.AddInputElement}</Button>
                <Button variant="outlined" color="secondary" onClick={() => handleAddElement(ElementType.Checkbox)}>{en.AddCheckboxElement}</Button>
                <Button variant="outlined" color="secondary" onClick={() => handleAddElement(ElementType.Text)}>{en.AddTextElement}</Button>
            </Box>
            <Box sx={{mt:4 , display:"flex" , flexDirection:"column" , justifyContent:"start" , alignItems:"start"}}>
                {elements.map((element, index) => (
                    <Box sx={{display:"flex" , alignItems:"center" , mb:2}} key={element.id}>
                        <Typography sx={{mr:2}}>
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
                            sx={{ ml: 2 }}
                            onClick={() => handleDeleteElement(element.id)}
                        >
                            <DeleteIcon />
                        </IconButton>

                    </Box>
                ))}
            </Box>
            <Button
                sx={{mt:5}}
                variant="contained"
                color="primary"
                onClick={handleSaveForm}
            >
                {en.Save}
            </Button>
        </div>
    );
};

export default FormBuilder;
