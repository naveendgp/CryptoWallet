import React from "react";
import profile from "../../images/profile.png"; // Make sure to update the path to your profile image

const TreeNode = ({ node }) => {
  const getBackgroundColor = (status) => {
    const colors = {
      true: "bg-green-500",
      false: "bg-gray-800",
    };
    return colors[status] || "bg-gray-800"; // Default color if status not found
  };

  return (
    <div className="flex flex-col items-center">
      {/* Node Box */}
      <div
        className={`text-white p-6 rounded-lg mx-5 shadow-lg flex flex-col items-center ${getBackgroundColor(
          node.status
        )}`}
      >
        <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
          <img src={profile} alt="Profile" className="w-16 h-16 rounded-full" />
        </div>
        <span className="mt-2 text-lg font-semibold">{node.randomId}</span>
        <span className="text-sm mt-1">{node.status ? "Active" : "Inactive"}</span>
      </div>

      {/* Children Nodes */}
      {node.children && node.children.length > 0 && (
        <div className="flex overflow-x-auto mt-4 space-x-4"> {/* Horizontal scrolling */}
          {node.children.map((childNode, index) => (
            <TreeNode key={index} node={childNode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
