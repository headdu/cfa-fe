import React from "react";
import CounterContext from "../CounterContext";

export default function Warning() {
  const context = React.useContext(CounterContext);

  return (
    context.warning ?
    <div
      style={{ position: "absolute" }}
      className={`warningMessage`}
      onClick={context.onWarningClick}
    >
      {context.warning}
    </div> : null
  );
}
