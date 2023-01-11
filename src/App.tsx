import { StepType, TourProvider } from "@reactour/tour";
import React, { ReactElement, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import mixpanel from "mixpanel-browser";

import "./App.css";
import Main from "./views/Main";
import { Button } from "@mui/material";
import useModal from "./hooks/useModal";
import ExternalLinkDialog from "./components/Modals/ExternalLinkDialog/ExternalLinkDialog";
import { useDispatch } from "react-redux";
import { deselectEmail } from "redux/emails";

if (
  process.env.REACT_APP_MIXPANEL_ID !== null &&
  process.env.REACT_APP_MIXPANEL_ID !== undefined
) {
  mixpanel.init(process.env.REACT_APP_MIXPANEL_ID);
}

function App(): ReactElement {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { handleModal } = useModal();

  const setCurrentStep = (step: number): void => {
    switch (step) {
      case 0:
      case 1:
        dispatch(deselectEmail());
        navigate("/inbox");
        break;
      default:
        break;
    }
    setStep(step);
  };

  const steps: StepType[] = [
    {
      selector: "body",
      position: "center",
      content: ({ setIsOpen, setCurrentStep }) => (
        <div>
          <h1>Do you want to see how the game works?</h1>
          <p>We&apos;ll give you a quick run-down of how to play.</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="text"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              No thanks
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setCurrentStep(1);
              }}
            >
              Start
            </Button>
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
      action: () => {
        handleModal(
          <ExternalLinkDialog
            url={"https://www.phishmeifyoucan.com"}
          ></ExternalLinkDialog>
        );
      },
      actionAfter: () => {
        handleModal(false);
      },
      content: () => (
        <div>
          <h1>Check links</h1>
          <p>
            Click on any link in an email and a popup will show you where it{" "}
            <b>would have</b> taken you.
          </p>
          <p>
            (If you&apos;re on a computer you can also hover over a link with
            your mouse)
          </p>
          <p>Don&apos;t worry, you&apos;ll stay safely on this website.</p>
        </div>
      ),
    },
    {
      selector: "[data-tour='add-to-scambox']",
      position: "bottom",
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
            Once you think you&apos;ve caught all 5 scam emails. Submit your
            attempt to see how close you are.
          </p>
          <p style={{ textAlign: "center" }}>Good luck!</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <TourProvider
        steps={steps}
        disableFocusLock={true}
        currentStep={step}
        padding={0}
        // @ts-expect-error
        setCurrentStep={setCurrentStep}
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
            <Route path="/" element={<Navigate to={`/inbox/`} replace />} />
            {["/inbox", "/scambox"].map((path, index) => (
              <Route path={path} element={<Main />} key={index}>
                <Route path=":emailId" element={<Main />} />
                <Route path="" element={<Main />} />
              </Route>
            ))}
          </Routes>
        </div>
      </TourProvider>
    </>
  );
}

export default App;
