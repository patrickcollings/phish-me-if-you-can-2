import * as React from "react";
import { DialogContent } from "@mui/material";

export default function ExternalLinkDialog({url}: {url: string}) {
  return (
    <>
      {/* Span is required to trigger a redraw of the reactour */}
      <span className="shown" />
      <div data-tour="external-link">
        <DialogContent>
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            This link would have taken you to
          </p>
          <p style={{ wordBreak: "break-all" }}>{url}</p>
        </DialogContent>
      </div>
    </>
  );
}
