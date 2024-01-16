import React, { useState } from "react";
import SetForm from "./SetForm";
import DelForm from "./DelForm";
import AddForm from "./AddForm";

function AdBody() {
  // Define state variables for the form fields
  

  return (
    <>
      <AddForm></AddForm>
      {/* <SetForm></SetForm> */}
      <DelForm></DelForm>
    </>
  );
}

export default AdBody;
