import {create} from 'zustand';
import { Form } from '../types/types.ts';

interface FormState {
    forms: Form[];
    addForm: (form: Form) => void;
    updateForm: (formId: string, form: Form) => void;
}

export const useFormStore = create<FormState>((set) => ({
    forms: [],
    addForm: (form) => set((state) => ({ forms: [...state.forms, form] })),
    updateForm: (formId, form) =>
        set((state) => ({
            forms: state.forms.map((f) => (f.id === formId ? form : f)),
        })),
}));
