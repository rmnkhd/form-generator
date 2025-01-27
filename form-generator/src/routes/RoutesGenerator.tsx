import {Suspense} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import * as Pages from "./pages.ts";
import RoutesUrl from "./RoutesUrl";


function RoutesGenerator() {
    return (
        <BrowserRouter>
            <Suspense fallback={<></>}>
                <Routes>
                    <Route path={RoutesUrl.formGeneratorView} element={<Pages.FormGeneratorView/>}/>
                    <Route path="*" element={<Navigate to={RoutesUrl.formGeneratorView}/>}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default RoutesGenerator;
