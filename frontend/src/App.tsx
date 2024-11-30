import "./App.css";
import "./styles/global.scss";
import { useTheme } from "./context/theme.context";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router";
import Company from "./Pages/Company/Company";
import Job from "./Pages/Job/Job";
import Candidate from "./Pages/Candidate/Candidate";
import Home from "./Pages/Home/Home";

const App: React.FC = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`app ${isDarkMode ? "darkMode" : ""}`}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Company' element={<Company />} />
        <Route path='/Job' element={<Job />} />
        <Route path='/Candidate' element={<Candidate />} />
      </Routes>
    </div>
  );
};

export default App;
