import AppRoutes from './routes/AppRoutes';
import { Provider } from "react-redux";
import { store } from "../src/app/store/store";
import { ThemeProvider } from "./components/ThemeContext";

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
