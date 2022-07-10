import { Card, CardContent } from "@mui/material";
import pdf from "../../assets/logo-pdf.png";

const getExtensionLogo = (extension) => {
    switch (extension) {
        case 'pdf':
            return pdf;
    }
}

export default ({name, extension}) => {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "0 1rem 1rem",
          }}
        >
          <div
            style={{
              border: "1px solid #e8e8e8",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 1rem",
            }}
          >
            <img
              src={getExtensionLogo(extension)}
              width="30px"
              height="30px"
              style={{ marginRight: "1rem" }}
            />
            <p>
              {name}.{extension}
            </p>
          </div>
        </div>
      </>
    );
}