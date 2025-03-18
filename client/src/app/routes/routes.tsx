import { Tracker } from "@/pages/tracker";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Providers } from "../providers";

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Providers />}>
                    <Route path="/matches" element={<Tracker />} />
                    <Route path="*" element={<Navigate to="/matches" />} />
                </Route>
            </Routes>
        </Router>
    )
}