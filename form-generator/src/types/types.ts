import {ElementType} from "../enums/elementType.ts";

export interface Form {
    id: string;
    name: string;
    elements: Element[];
}


export interface Element {
    id: string;
    type: ElementType;
    label: string;
    isRequired?: boolean;
    choices?: Choice[];
}

export interface Choice {
    id: string;
    name: string;
}

export interface Condition {
    targetElementId: string;
    valueToMatch: any;
    // or more complex logic if desired
}
