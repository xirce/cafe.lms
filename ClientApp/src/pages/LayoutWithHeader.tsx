import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import React from "react";

export function LayoutWithHeader() {
    return <><Header/><Outlet/></>;
}