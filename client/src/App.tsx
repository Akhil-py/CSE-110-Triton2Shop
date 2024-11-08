import { AppProvider } from "./context/AppContext";
import { HomePage } from "./views/HomePage";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
const App = () => {
  // HINT: Wrap the MyBudgetTracker component with AppContextProvider
  return (<AppProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </AppProvider>);
};

export default App;
