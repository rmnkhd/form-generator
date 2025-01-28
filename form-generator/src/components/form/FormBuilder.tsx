//react
import React, {useState} from 'react';

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

    const handleSaveForm = () => {
        const newForm: Form = {id: Date.now().toString(), name: formName, elements};
        addForm(newForm);
        StorageService.set('form-data', [...forms, newForm]);
        setFormName('');
        setElements([]);
    };



    return (
        <>
            <TextField
                label={en.FormName}
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                fullWidth
            />
            <FormAddElementsContainer elements={elements} setElements={setElements}/>

            <FormElements elements={elements} setElements={setElements}/>

            <Button
                sx={{mt: 5}}
                variant="contained"
                color="primary"
                onClick={handleSaveForm}
            >
                {en.Save}
            </Button>
        </>
    );
};

export default FormBuilder;
