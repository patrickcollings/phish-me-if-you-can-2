import { useState } from "react";
import styled from "styled-components";
import emails from "../../assets/emails";
import EmailDisplay from "../../components/email-display/email-display";
import EmailSidebar from "../../components/email-sidebar/email-sidebar";

const EmailSidebarContainer = styled.div`
  width: 400px;
  height: 100%;
  padding: 0;
  margin: 0;
`;

const EmailDisplayContainer = styled.div`
  padding: 0 20px;
  width: 100%;
  min-height: 50vh;
`;

const Container = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  height: 100%;
`;

export default function Result(props) {
  const [selectedEmail, setSelectedEmail] = useState(emails[0]);
  const [scamList, setScamList] = useState([]);
  const [emailList, setEmailList] = useState(emails);
  const [isScamSelected, setIsScamSelected] = useState(false);

  function selectEmail(index) {
    console.log("selecting email", index);
    setIsScamSelected(false);
    setSelectedEmail(emailList[index]);
  }

  function selectScamEmail(index) {
    console.log("selecting scam email", scamList[index]);
    setIsScamSelected(true);
    setSelectedEmail(scamList[index]);
  }

  function findEmailIndex(selectedEmail) {
    return emailList.findIndex((email) => selectedEmail == email);
  }

  function findScamEmailIndex(selectedEmail) {
    return scamList.findIndex((email) => selectedEmail == email);
  }

  function addToScamList() {
    const index = findEmailIndex(selectedEmail);
    if (index < 0) return;
    setScamList([...scamList, emailList[index]]);
    emailList.splice(index, 1);
    setEmailList([...emailList]);
    setSelectedEmail(null);
  }

  function removeFromScamList() {
    const index = findScamEmailIndex(selectedEmail);
    if (index < 0) return;
    setEmailList([...emailList, scamList[index]]);
    scamList.splice(index, 1);
    setScamList([...scamList]);
    setSelectedEmail(null);
  }

  function finishTest() {
    const scamsMissed = emailList.filter(email => !!email.scam);
    const normalsCaught = scamList.filter((email) => !email.scam);
    const totalScamsCaught = scamList.length - normalsCaught.length;
    console.log('scams missed ', scamsMissed.length);
    console.log("scams caught ", totalScamsCaught);
    console.log("normal emails accidentally caught ", normalsCaught.length);
  }

  return (
    <>
      <Container>
        <EmailSidebarContainer>
          <div style={{ height: "100%" }}>
            <EmailSidebar
              emailList={emailList}
              scamList={scamList}
              selectEmail={selectEmail}
              selectScamEmail={selectScamEmail}
              selectedEmail={selectedEmail}
            ></EmailSidebar>
          </div>
        </EmailSidebarContainer>
        <EmailDisplayContainer>
            <h1 onClick={finishTest}>Finished?</h1>
          <EmailDisplay
            selectedEmail={selectedEmail}
            isScamEmail={isScamSelected}
            add={addToScamList}
            remove={removeFromScamList}
          ></EmailDisplay>
        </EmailDisplayContainer>
      </Container>
    </>
  );
}
