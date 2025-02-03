import "./App.css";
import "./styles/global.scss";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router";
import Company from "./Pages/Company/Company";
import Job from "./Pages/Job/Job";
import Candidate from "./Pages/Candidate/Candidate";
import Home from "./Pages/Home/Home";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Company' element={<Company />} />
          <Route path='/Job' element={<Job />} />
          <Route path='/Candidate' element={<Candidate />} />
        </Routes>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
