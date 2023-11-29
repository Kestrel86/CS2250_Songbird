import Header from "./Header";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Songbird from "../pages/Songbird";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

export default function Router() {
  const Layout = () => {
    return (
      <>
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </>
    );
  };

  const BrowserRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="contact-us" element={<Contact />} />
            {<Route path="Songbird" element={<Songbird />} />}
          </Route>
        </Routes>
      </BrowserRouter>
    );
  };

  return <BrowserRoutes />;
}
