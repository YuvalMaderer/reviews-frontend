import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusinessPage from "./pages/BusinessPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/general-components/NavBar";
import ContactUsPage from "./pages/ContactUsPage";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
