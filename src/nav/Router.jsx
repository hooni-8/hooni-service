import React from 'react';
import {Route, Routes} from "react-router-dom";

import Home from "@pages/Home";

import Expiration from "@pages/loancalc/Expiration";
import Evenness from "@pages/loancalc/Evenness";
import CashFlow from "@pages/cashflow/CashFlow";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/loan-calc">
                <Route path="expiration" element={<Expiration />} />
                <Route path="evenness" element={<Evenness />} />
            </Route>
            <Route path="cashflow" element={<CashFlow />} />
        </Routes>
    )
}