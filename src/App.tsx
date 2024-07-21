import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusinessPage from "./pages/BusinessPage";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/business" element={<BusinessPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
