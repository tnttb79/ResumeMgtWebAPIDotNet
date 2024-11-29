import "./App.css";
import "./styles/global.scss";
import { useTheme } from "./context/theme.context";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router";
import Company from "./Pages/Company";
import Job from "./Pages/Job";
import Candidate from "./Pages/Candidate";

const App: React.FC = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`app ${isDarkMode ? "darkMode" : ""}`}>
      <NavBar />
      <Routes>
        <Route path='/Company' element={<Company />} />
        <Route path='/Job' element={<Job />} />
        <Route path='/Candidate' element={<Candidate />} />
      </Routes>
    </div>
  );
};

export default App;
