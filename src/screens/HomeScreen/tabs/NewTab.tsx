import React from "react";
import useAuth from "../../../hooks/useAuth";
import BaseTab from "./BaseTab";

const NewTab: React.FC = () => {
  const { authData, signOut } = useAuth();
  const user = authData.user;
  return (
    <>
      <BaseTab type={'new'}/>
    </>
  )
};

export default NewTab;
