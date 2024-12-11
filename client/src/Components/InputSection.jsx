import React, { useEffect, useState } from "react";
import axios from 'axios';
import OutputSection from "./OutputSection";;

const InputSection = () => {
  const [inputSectionData, setInputSectionData] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    error: "5", // Default value for picklist
    precision: false, // Default state for checkbox
  });

  const [responseData, setResponseData] = useState(null);

  const handleInputChange = (event) => {
    const name=event.target.name
    let value=""
    if(event.target.name==="precision")
    {
        console.log(event.target.checked)
        value=event.target.checked
        console.log(value)
    }
    else
    {
        value=event.target.value
    }

    setInputSectionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(inputSectionData)
  };

  const handlePicklistChange = (event) => {
    const { value } = event.target;
    setInputSectionData((prevData) => ({
      ...prevData,
      error: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Sending data to API:", inputSectionData);
    const dataToSend = {
      ...inputSectionData,
      a: parseInt(inputSectionData.a) || 0,
      b: parseInt(inputSectionData.b) || 0,
      c: parseInt(inputSectionData.c) || 0,
      d: parseInt(inputSectionData.d) || 0,
      error:parseInt(inputSectionData.error),
    };
    console.log("Sending data to API:", dataToSend);

    // try {
    //   const response = await axios.post("/api/inputsection", inputSectionData); // Replace with your API endpoint
    //   console.log("Response from server:", response.data);
    //   alert("Data sent successfully!");
    // } catch (error) {
    //   console.error("Error sending data:", error);
    //   alert("Failed to send data. Please try again.");
    // }

    try {
              const response = await fetch("/api/inputsection", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
              });
              console.log("hey",response);
              const data = await response.json();
              setResponseData(data);
              console.log(data);
            }
            catch (error) {
                  console.error("Error sending data:", error);
                  alert("Failed to send data. Please try again.");
                }
                
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          A:
          <input
            type="number"
            name="a"
            value={inputSectionData.a}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          B:
          <input
            type="number"
            name="b"
            value={inputSectionData.b}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          C:
          <input
            type="number"
            name="c"
            value={inputSectionData.c}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          D:
          <input
            type="number"
            name="d"
            value={inputSectionData.d}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Precision:
          <input
            type="checkbox"
            name="precision"
            checked={inputSectionData.precision}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Error:
          <select
            name="error"
            value={inputSectionData.error}
            onChange={handlePicklistChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
      <button type="submit">Calculate</button>
    </form>

{responseData && <OutputSection data={responseData} />}
</div>
  );
};

export default InputSection;
