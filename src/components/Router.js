import Navbar from "./Navbar";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Main from "../pages/Main";
import Login from "../pages/Login";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

export default function Router() {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </>
    );
  };

  const BrowserRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="support-us" element={<Contact />} />
            <Route path="Songbird" element={<Main />} />
            <Route path="Login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  };

  return <BrowserRoutes />;
}