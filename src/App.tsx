// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Tomy2000Page from "./pages/projects/Tomy2000Page";

export default function App() {
  return (
    <Routes>
      {/* All pages share Layout (nav + footer) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects/tomy-2000" element={<Tomy2000Page />} />
        {/* add other routes here, e.g.
        <Route path="/the-book" element={<TheBook />} />
        */}
      </Route>
    </Routes>
  );
}
