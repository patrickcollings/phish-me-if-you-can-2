import { Menu } from "@mui/icons-material/";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";

import { useState, } from "react";
import { useTour } from '@reactour/tour';
import { useNavigate } from 'react-router-dom';
import Subscribe from "../Subscribe/Subscribe";
import logo from '../../assets/black-logo.png'



function SideDrawer({ openResetConfirmation, showReset }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { setIsOpen, setCurrentStep } = useTour();

  const data = [
    {
      name: "Home",
      onClick: () => {
        window.open("https://www.phishmeifyoucan.com");
      },
    },
    {
      name: "Blog",
      onClick: () => {
        window.open("https://www.phishmeifyoucan.com/blog");
      },
    },
    {
      name: "FAQ",
      onClick: () => {
        window.open("https://www.phishmeifyoucan.com/faq");
      },
    },
    {
      name: "Reset Game",
      onClick: () => {
        openResetConfirmation(true);
      },
      hide: !showReset,
    },
    {
      name: "Tutorial",
      onClick: () => {
        navigate("/inbox");
        setCurrentStep(0);
        setTimeout(() => {
          setIsOpen(true);
        }, 500);
      },
    },
  ];

  const getList = () => (
    <div style={{ width: '100%' }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        !item.hide && 
        <ListItem button key={index} onClick={() => item.onClick()}>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </div>
  );
  return (
    <div>
      <Menu
        style={{ color: "white", cursor: "pointer" }}
        onClick={() => setOpen(true)}
      />
      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src={logo}
            style={{ height: "30px", width: "30px", margin: "15px" }}
            alt="phish me if you can logo"
          />
          <CloseIcon
            style={{ height: "30px", width: "30px", margin: "15px" }}
            onClick={() => setOpen(false)}
          />
        </div>
        {getList()}
        <div style={{ maxWidth: "300px", padding: "1rem" }}>
          <Subscribe />
        </div>
      </Drawer>
    </div>
  );
}

export default SideDrawer;
