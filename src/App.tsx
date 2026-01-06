import { AuthProvider } from "./components/auth/authProvider";
import Router from "./components/router";

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
