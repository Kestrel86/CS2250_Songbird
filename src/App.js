import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import Main from "./pages/main";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/songbird" element={<Main />} />
          <Route path="*" element={<noPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
