import React from "react";
import useAuth from "../../../../hooks/useAuth";

const HardTab: React.FC = () => {
  const { authData, signOut } = useAuth();
  const user = authData.user;
  return (
    <>
    </>
  )
};

export default HardTab;
