import { TourProvider, useTour } from '@reactour/tour';
import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'; 
import mixpanel from "mixpanel-browser";

import './App.css';
import ExternalLinkDialog from './components/ExternalLinkDialog/ExternalLinkDialog';
import Result from './views/result/result';
import WelcomeDialog from './components/welcome-dialog.js/welcome-dialog';

mixpanel.init(process.env.REACT_APP_MIXPANEL_ID);

const hideWelcomeDialog = !!localStorage.getItem('phishme_hide_welcome_dialog');

function App() {
  const [isExternalLinkOpen, setExternalLinkOpen] = useState(false);
  const [open, setOpen] = useState(!hideWelcomeDialog);
  const [step, setStep] = useState(0);
  const { setIsOpen } = useTour();
  const navigate = useNavigate();

  const steps = [
    {
      selector: "[data-tour='sidebar-box']",
      position: "top",
      disableActions: true,
      stepInteraction: true,
      content: () => (
        <div>
          <h1>Select an email</h1>
          <p>
            Begin by clicking any of the emails
          </p>
        </div>
      ),
    },
    {
      selector: "[data-tour='email-display']",
      position: "center",
      disableActions: false,
      content: () => (
        <div>
          <h1>Read your email</h1>
          <p>This when you decide whether it is a scam or not.</p>
        </div>
      ),
    },
    {
      selector: '[data-tour="external-link"]',
      highlightedSelectors: ["[data-tour='external-link']"],
      mutationObservables: [".shown"],
      position: "top",
      action: (node) => {
        setExternalLinkOpen(true);
      },
      actionAfter: (node) => {
        setExternalLinkOpen(false);
      },
      content: () => (
        <div>
          <h1>Check links</h1>
          <p>
            Click on any link in an email and this popup will show you where it{" "}
            <b>would have</b> taken you.
          </p>
          <p>But don't worry, you'll stay safely on this website.</p>
        </div>
      ),
    },
    {
      selector: "[data-tour='add-to-scambox']",
      content: () => (
        <div>
          <h1>Flag a scam</h1>
          <p>If you think an email is scam, add it to your scambox.</p>
        </div>
      ),
    },
    {
      selector: "[data-tour='submit-attempt']",
      content: () => (
        <div>
          <h1>Submit your attempt</h1>
          <p>
            Once you think you've caught all 5 scam emails. Submit your attempt.
          </p>
          <p>Good luck!</p>
        </div>
      ),
    },
  ];
  
  const setCurrentStep = (step) => {
    switch (step) {
      case 0:
        navigate("/inbox", true);
        break;
      default:
        break;
    }
    setStep(step);
  };

  const handleClose = (hideDialog = false) => {
    if (hideDialog) localStorage.setItem('phishme_hide_welcome_dialog', true);
    navigate("/inbox", false);
    setOpen(false);
    setStep(0);
    setIsOpen(true);
  }

  useEffect(() => {
    // If welcome modal open then navigate back to inbox
    if (open) {
      navigate('/inbox', true);
    }
  }, [open]);

  return (
    <>
      <TourProvider
        steps={steps}
        disableFocusLock={true}
        currentStep={step}
        setCurrentStep={setCurrentStep}
        padding={0}
        disableDotsNavigation={true}
        disableKeyboardNavigation={true}
        disableInteraction={true}
        showBadge={false}
        onClickMask={(clickProps) => {
          if (clickProps.currentStep === steps.length - 1) {
            clickProps.setIsOpen(false);
          }
        }}
      >
        <div className="App" style={{ maxHeight: "100vh", height: "100vh" }}>
          <ExternalLinkDialog
            open={isExternalLinkOpen}
            url={"https://www.phishmeifyoucan.com"}
            handleClose={() => setExternalLinkOpen(false)}
          ></ExternalLinkDialog>
          <WelcomeDialog open={open} handleClose={handleClose} />
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate to={`/inbox/`} replace />}
            />
            {["/inbox", "/scambox"].map((path, index) => (
              <Route path={path} element={<Result />} key={index}>
                <Route path=":emailId" element={<Result />} replace />
                <Route path="" element={<Result />} replace />
              </Route>
            ))}
          </Routes>
        </div>
      </TourProvider>
    </>
  );
}

export default App;
