import { ReactElement, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EmailListItem from "components/EmailListItem/EmailListItem";
import {
  useNavigate,
  useLocation,
  matchRoutes,
  Link,
  RouteObject,
  To,
} from "react-router-dom";
import "./EmailSidebar.css";
import { useSelector } from "react-redux";
import { Email } from "models/Email";
import { RootState } from "redux/store";

function TabPanel({
  children,
  value,
  index,
  ...other
}: {
  children: any;
  value: number;
  index: number;
}): ReactElement {
  return (
    <div
      role="tabpanel"
      className="TabWrapper"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        position: "absolute",
        top: "48px",
        left: 0,
        bottom: 0,
        overflowY: "auto",
      }}
      {...other}
    >
      {value === index && (
        <Box sx={{ width: "100%", minWidth: "300px" }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: number): { id: string; "aria-controls": string } {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function getEmailList(list: Email[]): ReactElement[] {
  return list.map((email, index) => (
    <EmailListItem key={index} email={email}></EmailListItem>
  ));
}

const routes: RouteObject[] = [
  { path: "/inbox/:emailId", index: false },
  { path: "/scambox/:emailId", index: true },
  { path: "/inbox", index: false },
  { path: "/scambox", index: true },
];

export default function EmailSidebar(): ReactElement {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const emailList = useSelector((state: RootState) => state.emails.emailList);
  const scamList = useSelector((state: RootState) => state.emails.scamList);

  useEffect(() => {
    const route = matchRoutes(routes, location);
    if (route != null) {
      const routeObj: RouteObject = route[0].route;
      setValue(routeObj.index != null && routeObj.index ? 1 : 0);
    }
  }, [location]);

  const handleChange = (event: React.SyntheticEvent, value: number): void => {
    setValue(value);
    navigate(routes[value].path as To);
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
        {getEmailList(emailList)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {getEmailList(scamList)}
      </TabPanel>
    </Box>
  );
}
