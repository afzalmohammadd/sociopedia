import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import Dashboard from "scenes/dashboard";
import LoginPage from "scenes/loginPage";
import AdminLogin from "scenes/admin";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme  } from "@mui/material";
import { themeSettings } from "state/theme";


function App() {

  const mode = useSelector((state) => state.mode )
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode] )
  const isAuth = Boolean(useSelector((state) => state.token ))
  const isAdmin = Boolean(useSelector((state) => state.admintoken ))
  return <div className="app">

    <BrowserRouter>
    <ThemeProvider theme={theme} >
      <CssBaseline />
     <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
      <Route path="/dashboard" element={isAdmin ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/profile/:userId"  element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
     </Routes>
     </ThemeProvider>
    </BrowserRouter>

  </div>;
}

export default App;
