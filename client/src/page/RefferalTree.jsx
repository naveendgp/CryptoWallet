import React, { useContext, useState,useEffect } from "react";
import TreeNode from "../components/Treenode";
import Sidebar from '../components/Sidebar'
const ReferralTree = () => {
  const [data,setData] = useState([])
  const randomId = localStorage.getItem("rootID");

  useEffect(() => {
    const randomId = localStorage.getItem("rootID");
    const fetchData = async () => {
      try {
        setAccount(currentAccount);

        const response = await fetch(
          `https://cryptowallet-2.onrender.com/api/getDetails?randomId=${randomId}`
        );
        console.log("responselogin", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
        setError("");
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Unable to fetch data. Please try again.");
      }
    };

    if (randomId) {
      fetchData();
    }
  }, [randomId]);


  // const data = {
  //   id: "Root",
  //   children: [
  //     {
  //       id: "Node 1",
  //       children: [
  //         { id: "Node 1.1", children: [
            
  //         ] },
  //         { id: "Node 1.2", children: [] },
  //         { id: "Node 1.3", children: [] },
  //       ],
  //     },
     
  //     {
  //       id: "Node 2",
  //       children: [
  //         { id: "Node 2.1", children: [] },
  //         { id: "Node 2.2", children: [] },
  //         { id: "Node 2.3", children: [] },
  //       ],
  //     },
     
  //     {
  //       id: "Node 3",
  //       children: [
  //         { id: "Node 3.1", children: [] },
  //         { id: "Node 3.2", children: [] },
  //         { id: "Node 3.3", children: [] },
  //       ],
  //     },

     
  //   ],
  // };

 
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
