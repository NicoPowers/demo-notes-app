import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/home";
import NotFound from "./containers/notFound";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}
