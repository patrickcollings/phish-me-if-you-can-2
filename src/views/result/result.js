import { useState } from "react";
import styled from "styled-components";
import emails from "../../assets/emails";
import EmailDisplay from "../../components/email-display/email-display";
import EmailSidebar from "../../components/email-sidebar/email-sidebar";

const EmailSidebarContainer = styled.section`
  max-width: 300px;
  width: 300px;
  padding: 0;
  margin: 0;
`;

const EmailDisplayContainer = styled.section`
  padding: 0 20px;
  width: 100%;
  min-height: 50vh;
`;

const Container = styled.section`
  max-width: 100%;
  width: 100%;
  display: flex;
`;


const emailList = emails;

export default function Result(props) {
    const [selectedEmail, setSelectedEmail] = useState(emails[0]);

    function selectEmail(index) {
      console.log("selecting email", index);
      setSelectedEmail(emailList[index]);
    }

    return (
        <>
        <h1>Phish Me If You Can</h1>
        <Container>
            <EmailSidebarContainer>
                <EmailSidebar list={emailList} selectEmail={selectEmail} selectedEmail={selectedEmail}></EmailSidebar>
            </EmailSidebarContainer>
            <EmailDisplayContainer>
                <EmailDisplay selectedEmail={selectedEmail}></EmailDisplay>
            </EmailDisplayContainer>
        </Container>
        </>
    );
}
