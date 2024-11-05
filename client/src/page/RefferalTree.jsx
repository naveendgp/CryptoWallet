import React, { useState, useEffect } from "react";
import TreeNode from "../components/Treenode";
import Sidebar from "../components/Sidebar";

const ReferralTree = () => {
  const [data, setData] = useState([]);
  const randomId = localStorage.getItem("rootID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://cryptowallet-2.onrender.com/api/getDetails?randomId=${randomId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (randomId) {
      fetchData();
    }
  }, [randomId]);

  // Transform flat data into a hierarchical structure for TreeNode
  const buildTree = (flatData) => {
    const structuredData = [];
    flatData.forEach((item, index) => {
      const node = {
        ...item,
        children: flatData.slice(2 * index + 1, 2 * index + 3), // Assigns up to two children
      };
      structuredData.push(node);
    });
    return structuredData[0]; // Root node
  };

  const structuredData = buildTree(data);

  return (
    <div style={{ display: "flex" }}>
      <section>
        <Sidebar />
      </section>
      <section>
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
          {structuredData ? (
            <TreeNode node={structuredData} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ReferralTree;
