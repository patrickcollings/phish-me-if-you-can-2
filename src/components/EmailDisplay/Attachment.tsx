import pdf from "assets/logo-pdf.png";
import exe from "assets/logo-exe.png";
import doc from "assets/logo-doc.png";
import jpg from "assets/logo-jpg.png";
import zip from "assets/logo-zip.png";
import { ReactElement } from "react";

const getExtensionLogo = (extension: string | undefined): any => {
  switch (extension) {
    case "pdf":
      return pdf;
    case "exe":
      return exe;
    case "jpg":
      return jpg;
    case "zip":
      return zip;
    case "doc":
      return doc;
    default:
      return pdf;
  }
};

const getExtension = ({
  name,
  extension,
}: {
  name: string | undefined;
  extension: string | undefined;
}): ReactElement => {
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
            width="auto"
            height="35px"
            style={{ marginRight: "1rem" }}
            alt="extension logo"
          />
          <p>
            {name}.{extension}
          </p>
        </div>
      </div>
    </>
  );
};

export default getExtension;
