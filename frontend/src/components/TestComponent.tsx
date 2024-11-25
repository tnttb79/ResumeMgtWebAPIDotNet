import { useTheme } from "../context/theme.context";

const TestComponent = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return <div></div>;
};

export default TestComponent;
