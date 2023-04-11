import { useState } from "react";

import "./App.css";
import axios from "axios";
import Posts from "./pages/Posts";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthProvider value={{ isAuthenticated, login, logout }}>
      <div className="App">
        {isAuthenticated ? (
          <Posts onAuthentication={setIsAuthenticated} />
        ) : (
          <Login onAuthentication={setIsAuthenticated} />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
