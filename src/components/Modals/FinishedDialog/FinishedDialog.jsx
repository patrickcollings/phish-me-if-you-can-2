import DialogContent from "@mui/material/DialogContent";
import fishing from '../../../assets/fishing2.png';
import ShareIcon from "@mui/icons-material/Share";
import { TwitterIcon, TwitterShareButton, LinkedinIcon, LinkedinShareButton, FacebookShareButton, FacebookIcon } from "react-share";
import { getScoreTitle } from "../../../helpers/helper";
import './FinishedDialog.css';
import mixpanel from "mixpanel-browser";
import { useSelector } from "react-redux";
import Subscribe from "../../Subscribe/Subscribe";
import { selectCurrentResult } from "../../../redux/scores";
import useModal from "../../../hooks/useModal";
import { Alert } from "@mui/material";

mixpanel.init(process.env.REACT_APP_MIXPANEL_ID);

export function FinishedDialog() {
  const currentResult = useSelector((state) => selectCurrentResult(state));
  const { handleSnackbar } = useModal();

  const scoreBreakdown = [
    {
      score: currentResult.caught,
      title: "caught",
    },
    {
      score: currentResult.missed,
      title: "missed",
    },
    {
      score: currentResult.accidental,
      title: "accidental",
    },
  ];

  const copyToClipboard = () => {
    const text = `I scored ${currentResult.score}% meaning I am: "unhackable". How scammable are you? Find out on www.phishmeifyoucan.com`;
    navigator.clipboard.writeText(text);
    handleSnackbar(
      <Alert severity='info'>result copied to clipboard</Alert>
    );
    shareClicked('clipboard');
  }

  const shareClicked = (type) => {
    mixpanel.track("share", type);
  }

  return (
    <div>
      {/* <Dialog
        open={open}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              height: "100%",
            },
          },
        }}
      > */}
        <DialogContent>
          <div>
            <div
              className="scoreContainer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {scoreBreakdown.map((breakdown, key) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "33%",
                  }}
                  key={key}
                >
                  <p className="ScoreTitles">{breakdown.title}</p>
                  <p
                    style={{ margin: 0, fontSize: "3rem", fontWeight: "bold" }}
                  >
                    {breakdown.score}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={fishing}
                style={{
                  maxHeight: "35vh",
                  width: "auto",
                }}
                alt="man fishing in small boat"
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <p style={{ margin: 0 }}>Score</p>
              <h1 style={{ margin: 0 }}>{currentResult.score}%</h1>
              <h2 style={{ margin: 0, textAlign: "center" }}>
                "{getScoreTitle(currentResult.score)}"
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <TwitterShareButton
                title={`I scored ${currentResult.score}% meaning I am: "unhackable". How scammable are you?`}
                hashtags={["phishmeifyoucan"]}
                url="https://play.phishmeifyoucan.com"
                onClick={() => shareClicked("twitter")}
              >
                <TwitterIcon size={32} round={true}></TwitterIcon>
              </TwitterShareButton>
              <LinkedinShareButton
                title={`I scored ${currentResult.score}% meaning I am: "unhackable". How scammable are you?`}
                summary="i am summary"
                source="Phish Me If You Can"
                url="https://play.phishmeifyoucan.com"
                onClick={() => shareClicked("linkedin")}
              >
                <LinkedinIcon size={32} round={true}></LinkedinIcon>
              </LinkedinShareButton>
              <FacebookShareButton
                url="https://play.phishmeifyoucan.com"
                quote={`I scored ${currentResult.score}% meaning I am: "unhackable". How scammable are you?`}
                onClick={() => shareClicked("facebook")}
              >
                <FacebookIcon size={32} round={true}></FacebookIcon>
              </FacebookShareButton>
              <div
                onClick={() => copyToClipboard()}
                style={{
                  border: "1px solid none",
                  width: "32px",
                  height: "32px",
                  backgroundColor: "grey",
                  borderRadius: "50%",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <ShareIcon />
              </div>
            </div>
            <div
              style={{
                marginTop: "3rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ paddingBottom: "10px" }}>
                Subscribe for free to be reminded about each monthly challenge
                and get up to date with the latest scams.
              </span>
              <Subscribe />
            </div>
          </div>
        </DialogContent>
        {/* <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              handleClose();
            }}
          >
            See your results!
          </Button>
        </DialogActions> */}
      {/* </Dialog> */}

    </div>
  );
}
