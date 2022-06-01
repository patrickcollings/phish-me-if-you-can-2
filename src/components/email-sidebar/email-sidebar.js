import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EmailListItem from "../email-list-item/email-list-item";

const tabStyles = {
    '.MuiBox-root': {
        padding: '0px',
    },
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{height: '100%'}}
      {...other}
    >
      {value === index && (
        <Box sx={{overflowY: 'scroll', height: '100%'}}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function getEmailList(list, selectEmail, selectedEmail) {
  return list.map((email, index) => (
    <EmailListItem
      key={index}
      email={email}
      index={index}
      onClick={selectEmail}
      isSelected={selectedEmail && selectedEmail.id === email.id}
    ></EmailListItem>
  ));
}

export default function EmailSidebar(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Inbox" {...a11yProps(0)} />
          <Tab label="Scam" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {getEmailList(props.emailList, props.selectEmail, props.selectedEmail)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {getEmailList(props.scamList, props.selectScamEmail, props.selectedEmail)}
      </TabPanel>
    </Box>
  );
}
