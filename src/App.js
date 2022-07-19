import './App.css';
import Result from './views/result/result';
import WelcomeDialog from './components/welcome-dialog.js/welcome-dialog';
import { useState } from 'react';
import mixpanel from "mixpanel-browser";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 

mixpanel.init("1");

const hideWelcomeDialog = !!localStorage.getItem('phishme_hide_welcome_dialog');

function App() {
  const [open, setOpen] = useState(!hideWelcomeDialog);

  const handleClose = (hideDialog = false) => {
    if (hideDialog) localStorage.setItem('phishme_hide_welcome_dialog', true)
    setOpen(false);
  }

  return (
    <Router>
      <div className="App" style={{ maxHeight: "100vh", height: "100vh" }}>
        <WelcomeDialog open={open} handleClose={handleClose} />
        <Routes>
          <Route exact path="/" element={<Navigate to="/inbox" replace />} />
          {["/inbox", "/scambox"].map((path) => (
            <Route path={path} element={<Result />}>
              <Route path=":emailId" element={<Result />} replace />
              <Route path="" element={<Result />} replace />
            </Route>
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
