import React, { useState, useEffect } from "react";
import IntersectionItems from "./IntersectionItems";

const IntersectionData = () => {
  const [intersectionData, setIntersectionData] = useState("");
  const [responseData, setResponseData] = useState(null);

  const handleIntersection = (event) => {
    setIntersectionData(event.target.value);
  };

  const handleSubmit = async () => {
    if (!intersectionData) {
      alert("Please select an intersection.");
      return;
    }

    try {
      const response = await fetch("api/intersection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intersectionName: intersectionData,
        }),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      const data = await response.json();
      console.log("data",data);
      setResponseData(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      alert("Failed to fetch data. Please try again later.");
    }
  };



  return (
    <div>
      <label>
        Intersection:
        <select value={intersectionData} onChange={handleIntersection}>
          <option value="">--Select an Intersection--</option>
          <option value="SW 34th St & Main St">SW 34th St & Main St</option>
          <option value="NW 12th Ave & 1st St">NW 12th Ave & 1st St</option>
          <option value="SE 15th St & 8th Ave">SE 15th St & 8th Ave</option>
        </select>
      </label>
      <button onClick={handleSubmit}>Fetch Data</button>

      {responseData && (
        <IntersectionItems
          intersectionId={responseData.intersectionId}
          categories={responseData.categories}
        />
      )}
    </div>
  );
};

export default IntersectionData;
