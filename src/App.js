import { TourProvider, useTour } from '@reactour/tour';
import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'; 
import mixpanel from "mixpanel-browser";

import './App.css';
import Main from './views/Main';
import WelcomeDialog from './components/Modals/WelcomeDialog.js/WelcomeDialog';
import { Button } from '@mui/material';
import useModal from './hooks/useModal';
import ExternalLinkDialog from './components/Modals/ExternalLinkDialog/ExternalLinkDialog';

mixpanel.init(process.env.REACT_APP_MIXPANEL_ID);

function App() {
  const [step, setStep] = useState(0);
  const { setIsOpen } = useTour();
  const navigate = useNavigate();
  const { handleModal } = useModal();

  const steps = [
    {
      position: "center",
      content: ({setIsOpen, setCurrentStep}) => (
        <div>
          <h1>Do you want to see how the game works?</h1>
          <p>We'll give you a quick run-down of how to play.</p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Button variant="text" onClick={() => setIsOpen(false)}>No thanks</Button>
            <Button variant="contained" onClick={() => setCurrentStep(1)}>Start</Button>
          </div>
        </div>
      ),
    },
    {
      selector: "[data-tour='sidebar-box']",
      position: "bottom",
      disableActions: true,
      stepInteraction: true,
      content: () => (
        <div>
          <h1>Select an email</h1>
          <p>Begin by clicking any of the emails</p>
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
          <p>This is how you decide whether it is a scam or not.</p>
        </div>
      ),
    },
    {
      selector: '[data-tour="external-link"]',
      highlightedSelectors: ["[data-tour='external-link']"],
      mutationObservables: [".shown"],
      position: "top",
      action: (node) => {
        handleModal(
          <ExternalLinkDialog
            url={"https://www.phishmeifyoucan.com"}
          ></ExternalLinkDialog>
        );
      },
      actionAfter: (node) => {
        handleModal(false);
      },
      content: () => (
        <div>
          <h1>Check links</h1>
          <p>
            Click on any link in an email and a popup will show you where it <b>would have</b> taken you.
          </p>
          <p>(If you're on a computer you can also hover over a link with your mouse)</p>
          <p>Don't worry, you'll stay safely on this website.</p>
        </div>
      ),
    },
    {
      selector: "[data-tour='add-to-scambox']",
      position: 'bottom',
      content: () => (
        <div>
          <h1>Flag a scam</h1>
          <p>If you think an email is a scam, add it to your scambox.</p>
        </div>
      ),
    },
    {
      selector: "[data-tour='submit-attempt']",
      content: () => (
        <div>
          <h1>Finish your attempt</h1>
          <p>
            Once you think you've caught all 5 scam emails. Submit your attempt to see how close you are.
          </p>
          <p style={{textAlign: 'center'}}>Good luck!</p>
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

  const handleClose = () => {
    navigate("/inbox", false);
    setStep(0);
    setIsOpen(true);
    handleModal(false);
  }

  useEffect(() => {
    if (!localStorage.getItem('phishme_hide_welcome_dialog')) {
      handleModal(<WelcomeDialog handleClose={handleClose} />);
    }
  }, []);

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
            <Routes>
              <Route
                exact
                path="/"
                element={<Navigate to={`/inbox/`} replace />}
              />
                {["/inbox", "/scambox"].map((path, index) => (
                  <Route path={path} element={<Main />} key={index}>
                    <Route path=":emailId" element={<Main />} replace />
                    <Route path="" element={<Main />} replace />
                  </Route>
                ))}
            </Routes>
        </div>
      </TourProvider>
    </>
  );
}

export default App;
