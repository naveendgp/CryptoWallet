import React, { useContext } from "react";
import TreeNode from "../components/Treenode";
import Sidebar from "../components/SideBar";

const ReferralTree = () => {
  const data = {
    id: "Root",
    children: [
      {
        id: "Node 1",
        children: [
          { id: "Node 1.1", children: [] },
          { id: "Node 1.2", children: [] },
          { id: "Node 1.3", children: [] },
        ],
      },
     
      {
        id: "Node 2",
        children: [
          { id: "Node 2.1", children: [] },
          { id: "Node 2.2", children: [] },
          { id: "Node 2.3", children: [] },
        ],
      },
     
      {
        id: "Node 3",
        children: [
          { id: "Node 3.1", children: [] },
          { id: "Node 3.2", children: [] },
          { id: "Node 3.3", children: [] },
        ],
      },

     
    ],
  };

 
  return (
    <div style={{ display: "flex" }}>
      <section>
        <Sidebar />
      </section>
      <section>
        <div className="flex justify-center items-center min-h-screen  bg-gray-900 text-white">
          <TreeNode node={data} />
        </div>
      </section>
    </div>
  );
};

export default ReferralTree;
