import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import ViewStatement from "./pages/ViewStatement/ViewStatement";
import TransactionManagement from "./pages/TransactionManagement/TransactionManagement";
import UserOperations from "./pages/UserOperations/UserOperations";
import LoanApplication from "./pages/LoanApplication/LoanApplication";
import { createContext, useEffect, useState } from "react";
import { isAuthDataStored } from "./utils/localStorageHelper";
import ProtectedRoute from "./utils/ProtectedRoute";
import UnAuthOnlyRoutes from "./utils/UnAuthOnlyRoutes";

export const Auth = createContext();
export const SetAuth = createContext();

toast.configure();
function App() {
  const [auth, setauth] = useState(false);

  useEffect(() => {
    if (isAuthDataStored()) {
      setauth(true);
    } else {
      setauth(false);
    }

    return () => {};
  }, []);

  return (
    <div className="App">
      <Auth.Provider value={auth}>
        <SetAuth.Provider value={setauth}>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />

              <Route element={<UnAuthOnlyRoutes auth={auth} />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
              </Route>

              <Route element={<ProtectedRoute auth={auth} />}>
                <Route path="/statement" element={<ViewStatement />} />
                <Route
                  path="/transaction"
                  element={<TransactionManagement />}
                />
                <Route path="/operations" element={<UserOperations />} />
                <Route path="/loan" element={<LoanApplication />} />
              </Route>
            </Routes>
          </Router>
        </SetAuth.Provider>
      </Auth.Provider>
    </div>
  );
}

export default App;
