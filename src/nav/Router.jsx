import React from 'react';
import {Route, Routes} from "react-router-dom";

import Home from "@pages/Home";

import Loancalc from "@pages/loancalc/Loancalc";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/loan-calc" element={<Loancalc />} />
        </Routes>
    )
}