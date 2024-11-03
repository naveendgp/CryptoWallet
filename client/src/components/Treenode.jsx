import React, { useEffect, useState } from "react";
import axios from "axios";
import profile from "../../images/profile.png"; // Make sure to update the path to your profile image

const TreeNode = ({node}) => {
  // Function to determine background color based on node ID


  const getBackgroundColor = (id) => {
    const colors = {
      1: "bg-green-500",
      2: "bg-blue-500",
      3: "bg-red-500",
      4: "bg-purple-500",
      // Add more colors as needed for other IDs
    };
    return colors[id] || "bg-gray-800"; // Default color if ID not found
  };


  const randomId = localStorage.getItem("rootID")
 
  console.log(randomId)
  
  return (
    <div className="flex flex-col items-center">
      {/* Node Box */}
      <div
        className={`text-white p-6 rounded-lg mx-5 shadow-lg flex flex-col items-center ${getBackgroundColor(
          randomId
        )}`}
      >
        <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
          <img src={profile} alt="Profile" className="w-16 h-16 rounded-full" />
        </div>
        <span className="mt-2 text-lg font-semibold">{node.randomId}</span>
        {/* Render extra data if available */}
        {node.name && <span className="text-sm mt-1">{node.name}</span>}
        {node.level && (
          <span className="text-sm mt-1">Level: {node.status}</span>
        )}
      </div>

      {/* Children Nodes */}
      {node.children && node.children.length > 0 && (
        <div
          className={`flex overflow-x-auto mt-4 space-x-4`} // Horizontal scrolling
        >
          {node.children.map((childNode, index) => (
            <TreeNode key={index} node={childNode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
