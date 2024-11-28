import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import LoginForm from "./components/loginForm";
import AdminPage from "./components/admin/adminPage";
import AccountsManagement from "./components/admin/accountsManagement";
import CreateAccount from "./components/admin/createAccount";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="admin" element={<AdminPage />}>
            <Route path="teacher" element={<AccountsManagement />} />
            <Route path="student" element={<AccountsManagement />} />
            <Route path="createAccount" element={<CreateAccount />} />
          </Route>
          {/* <Route path="*" element={NotFound} /> */}
        </Routes>
      </BrowserRouter>
      ;
    </>
  );
}
