import "./App.css";
import ThemeProvider from "./context/theme.context";
import TestComponent from "./components/TestComponent";

function App() {
  return (
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );
}

export default App;
