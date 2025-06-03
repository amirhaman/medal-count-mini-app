"use client";

import React from "react";
import MedalsHeader from "./MedalsHeader";
import MedalItem from "./MedalItem";
import { MedalProvider } from "./context/MedalsContext";

const MedalTable = () => {
  return (
    <MedalProvider>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg my-2 w-full">
        <table className="min-w-full">
          <MedalsHeader />
          <MedalItem />
        </table>
      </div>
    </MedalProvider>
  );
};

export default MedalTable;
