import React from "react";
import CreateImageLink from "../components/CreateImageLink";
import CreateRedirectLink from "../components/CreateRedirectLink";

export default function HomePage() {
  return (
    <div style={{ margin: "0 auto" }}>
      <CreateRedirectLink />
      <hr />
      <CreateImageLink />
    </div>
  );
}
