import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import LoginForm from "./components/loginForm";
import AdminPage from "./components/admin/adminPage";
import TeachersManagement from "./components/admin/users/teachersManagement";
import StudentsManagement from "./components/admin/users/studentsManagement";
import AccountsForm from "./components/admin/users/accountsForm";
import EventsFrom from "./components/admin/events/formEvent";
import EventsManagement from "./components/admin/events/eventsManagement";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="admin" element={<AdminPage />}>
            <Route path="teachers" element={<TeachersManagement />} />
            <Route path="students" element={<StudentsManagement />} />
            <Route path="accountsForm" element={<AccountsForm />} />
            <Route path="events" element={<EventsManagement />} />
            <Route path="eventsForm" element={<EventsFrom />} />
          </Route>
          {/* <Route path="*" element={NotFound} /> */}
        </Routes>
      </BrowserRouter>
      ;
    </>
  );
}
