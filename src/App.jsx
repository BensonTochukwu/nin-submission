import { BrowserRouter, Routes, Route } from "react-router-dom";

import FormPage from "./pages/public/FormPage";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Submissions from "./pages/admin/Submissions";
import SubmissionDetails from "./pages/admin/SubmissionDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<FormPage />} />

        {/* Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/submissions" element={<Submissions />} />
        <Route
          path="/admin/submissions/:id"
          element={<SubmissionDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;