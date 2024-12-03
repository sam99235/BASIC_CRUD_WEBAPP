import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import LoginForm from "./components/loginForm";
import AdminPage from "./components/admin/adminPage";
import TeachersManagement from "./components/admin/users/teachersManagement";
import StudentsManagement from "./components/admin/users/studentsManagement";
import CreateAccount from "./components/admin/users/createAccount";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="admin" element={<AdminPage />}>
            <Route path="teacher" element={<TeachersManagement />} />
            <Route path="student" element={<StudentsManagement />} />
            <Route path="createAccount" element={<CreateAccount />} />
          </Route>
          {/* <Route path="*" element={NotFound} /> */}
        </Routes>
      </BrowserRouter>
      ;
    </>
  );
}
