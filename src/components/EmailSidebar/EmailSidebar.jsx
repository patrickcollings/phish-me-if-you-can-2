import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EmailListItem from "../EmailListItem/EmailListItem";
import { useNavigate, useLocation, matchRoutes, Link } from "react-router-dom";
import { useEffect } from "react";
import './EmailSidebar.css';
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="TabWrapper"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        position: 'absolute',
        top: '48px',
        left: 0,
        bottom: 0,
        overflowY: 'auto',
      }}
      {...other}
    >
      {value === index && (
        <Box sx={{width: '100%', minWidth: '300px'}}>
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

function getEmailList(list) {
  return list.map((email, index) => (
    <EmailListItem
      key={index}
      email={email}
    ></EmailListItem>
  ));
}

const routes = [
  { path: "/inbox/:emailId", value: 0 },
  { path: "/scambox/:emailId", value: 1 },
  { path: "/inbox", value: 0 },
  { path: "/scambox", value: 1 },
];

export default function EmailSidebar(props) {
  const [value, setValue] = React.useState(0);
  let navigate = useNavigate();
  const location = useLocation();
  const emailList = useSelector((state) => state.emails.emailList);
  const scamList = useSelector((state) => state.emails.scamList);
  
  useEffect(() => {
    const [{ route }] = matchRoutes(routes, location);
    setValue(route.value !== -1 ? route.value : 0);
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(routes[newValue]);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab
            label={`Inbox (${emailList.length})`}
            component={Link}
            to={"/inbox"}
            {...a11yProps(0)}
          />
          <Tab
            label={`Scambox (${scamList.length})`}
            component={Link}
            to={"/scambox"}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} data-tour="sidebar-box">
        {getEmailList(
          emailList,
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {getEmailList(
          scamList,
        )}
      </TabPanel>
    </Box>
  );
}
