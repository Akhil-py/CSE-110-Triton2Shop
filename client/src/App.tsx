import { AppProvider } from "./context/AppContext";
import { HomePage } from "./views/HomePage"

const App = () => {
  // HINT: Wrap the MyBudgetTracker component with AppContextProvider
  return (<AppProvider>
    <HomePage />
  </AppProvider>);
};

export default App;
