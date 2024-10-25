import Footers from "@/components/Layout/Footers/Footers";
import Headers from "@/components/Layout/Headers/Headers";
import React, { ReactNode } from "react";

const RouteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Headers />
      {children}
      <Footers />
    </>
  );
};

export default RouteLayout;
