import { AppProvider } from "./context/AppContext";
import { HomePage } from "./views/HomePage";
import { Route, Routes } from "react-router-dom";
const App = () => {
  // HINT: Wrap the MyBudgetTracker component with AppContextProvider
  return (<AppProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </AppProvider>);
};

export default App;
