import React from "react";
import useAuth from "../../../hooks/useAuth";
import BaseTab from "./BaseTab";


const TopTab: React.FC = () => {
  const { authData, signOut } = useAuth();
  const user = authData.user;
  return (
    <>
      <BaseTab type={'new'}/>
    </>
  )
};

export default TopTab;
