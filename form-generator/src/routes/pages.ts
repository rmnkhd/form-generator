import React, { lazy, LazyExoticComponent } from 'react';

type ImportFunc = () => Promise<{ default: React.ComponentType<any> }>;


const lazyWithDefault = (importFunc: ImportFunc): LazyExoticComponent<React.ComponentType<any>> => {
    return lazy(() => importFunc().then(module => ({ default: module.default })));
};

const FormGeneratorView = lazyWithDefault(() => import("../views/FormGeneratorView.tsx"));

export {
    FormGeneratorView,
};
