import { Menu } from "@mui/icons-material/";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";

import { ReactElement, useState } from "react";
import { useTour } from "@reactour/tour";
import { useNavigate } from "react-router-dom";
import logo from "assets/black-logo.png";
import useModal from "hooks/useModal";
import ConfirmationDialog from "../Modals/ConfirmationDialog/ConfirmationDialog";
import { useDispatch, useSelector } from "react-redux";
import { resetEmails } from "redux/emails";
import { restartCurrentMonth, selectIsFinished } from "redux/scores";
import { RootState } from "redux/store";

function SideDrawer(): ReactElement {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { setIsOpen, setCurrentStep } = useTour();
  const { handleModal } = useModal();
  const isFinished = useSelector((state: RootState) => selectIsFinished(state));

  const openConfirmationDialog = (): void => {
    handleModal(
      <ConfirmationDialog
        handleClose={(confirm: boolean) => {
          if (confirm) {
            dispatch(resetEmails());
            dispatch(restartCurrentMonth());
          }
        }}
        description={"This will restart the entire game"}
      ></ConfirmationDialog>
    );
  };

  const data = [
    {
      name: "Home",
      onClick: () => {
        window.open("https://www.phishmeifyoucan.com");
      },
      hide: false,
    },
    {
      name: "Blog",
      onClick: () => {
        window.open("https://www.phishmeifyoucan.com/blog");
      },
      hide: false,
    },
    {
      name: "FAQ",
      onClick: () => {
        window.open("https://www.phishmeifyoucan.com/faq");
      },
      hide: false,
    },
    {
      name: "Reset Game",
      onClick: () => {
        openConfirmationDialog();
      },
      hide: !isFinished,
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
      hide: false,
    },
  ];

  const getList = (): ReactElement => (
    <div
      style={{ width: "100%" }}
      onClick={() => {
        setOpen(false);
      }}
    >
      {data.map(
        (item, index) =>
          !item.hide && (
            <ListItem
              key={index}
              onClick={() => {
                item.onClick();
              }}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          )
      )}
    </div>
  );
  return (
    <div>
      <Menu
        style={{ color: "white", cursor: "pointer" }}
        onClick={() => {
          setOpen(true);
        }}
      />
      <Drawer
        open={open}
        anchor={"left"}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src={logo}
            style={{ height: "30px", width: "30px", margin: "15px" }}
            alt="phish me if you can logo"
          />
          <CloseIcon
            style={{ height: "30px", width: "30px", margin: "15px" }}
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
        {getList()}
      </Drawer>
    </div>
  );
}

export default SideDrawer;
