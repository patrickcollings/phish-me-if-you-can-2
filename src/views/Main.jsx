import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTour } from '@reactour/tour';
import mixpanel from "mixpanel-browser";
import styled from "styled-components";

import EmailDisplay from "../components/EmailDisplay/EmailDisplay";
import EmailSidebar from "../components/EmailSidebar/EmailSidebar";
import NavBar from "../components/NavBar/NavBar";
import { useContext } from "react";
import { WindowWidthContext } from "../context/WindowWidthContext";
import { useDispatch, useSelector } from "react-redux";
import { deselectEmail, selectEmail } from "../redux/emails";
import { MAX_MOBILE_WIDTH } from "../helpers/constants";

mixpanel.init(process.env.REACT_APP_MIXPANEL_ID);
mixpanel.track("joined");

const EmailSidebarContainer = styled.div`
  position: absolute;
  top: 64px;
  bottom: 0;
  left: 0;
  width: 400px;
  max-width: 400px;
  padding: 0;
  margin: 0;
  overflow: hidden;
`;

const EmailSidebarContainerMobile = styled.div`
  position: absolute;
  top: 64px;
  width: 100%;
  max-width: 100%;
  bottom: 0;
  padding: 0;
  margin: 0;
`;

const EmailDisplayContainer = styled.div`
  position: absolute;
  left: 400px;
  top: 64px;
  right: 0;
  bottom: 0;
  padding-bottom: 20px;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
`;

export default function Main() {
  let params = useParams();
  const dispatch = useDispatch();
  const { isOpen, currentStep, setCurrentStep } = useTour();
  
  const selectedEmail = useSelector((state) => state.emails.selectedEmail);
  const emailList = useSelector((state) => state.emails.emailList);
  const scamList = useSelector((state) => state.emails.scamList);

  const width = useContext(WindowWidthContext);

  useEffect(() => {
    let emailFound, scamFound;
    if (params.emailId) {
      emailFound = emailList.find(
        (email) => email.id === parseInt(params.emailId)
      );
      scamFound = scamList.find(
        (email) => email.id === parseInt(params.emailId)
      );
    }
    if (emailFound) {
      dispatch(selectEmail(emailFound));
      if (currentStep === 1 && isOpen) setCurrentStep(2);
    }
    else if (scamFound) {
      dispatch(selectEmail(scamFound));
    } else {
      dispatch(deselectEmail());
    }
  }, [params]);

  return (
    <>
      <NavBar />
      {width > MAX_MOBILE_WIDTH && (
        <Container>
          <EmailSidebarContainer>
            <div style={{ height: "100%" }}>
              <EmailSidebar />
            </div>
          </EmailSidebarContainer>
          <EmailDisplayContainer>
            <EmailDisplay />
          </EmailDisplayContainer>
        </Container>
      )}
      {width < MAX_MOBILE_WIDTH && !selectedEmail && (
        <EmailSidebarContainerMobile>
          <div style={{ height: "100%" }}>
            <EmailSidebar />
          </div>
        </EmailSidebarContainerMobile>
      )}
      {width < MAX_MOBILE_WIDTH && !!selectedEmail && (
        <EmailSidebarContainerMobile>
          <div style={{ height: "100%" }}><EmailDisplay /></div>
        </EmailSidebarContainerMobile>
      )}
    </>
  );
}
