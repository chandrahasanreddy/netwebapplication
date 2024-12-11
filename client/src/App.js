import React, { useState } from "react";

import Section1 from "./Components/Section1";
import InputSection from "./Components/InputSection";


function App()
{
      return (
        <div>
          <Section1 />
          <InputSection/>
        </div>
  );
}
// function App() {
//   const [num1, setNum1] = useState("");
//   const [num2, setNum2] = useState("");
//   const [result, setResult] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ num1: parseInt(num1), num2: parseInt(num2) }),
//       });

//       // const response1 = await fetch("/api/add", {
//       //   method: "GET",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       // });

//       // console.log("Response status:", response1);
//       console.log("Response status:", response);
//       console.log("Response status:", response.status); 
//       console.log("Response headers:", response.headers); 
  
//       if (!response.ok) {
//         console.error("Server error:", response.status, response.statusText);
//         return;
//       }
  
//       const data = await response.json();
//       setResult(data.sum);
//     } 
//     catch (error) {
//       console.error("Error:", error);
//     }
//   };
  

//   return (
//     <div>
//       <h1>Sum Calculator</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="number" value={num1}  onChange={(e) => setNum1(e.target.value)} placeholder="Enter first number" required
//         />
//         <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} placeholder="Enter second number" required/>
//         <button type="submit">Calculate</button>
//       </form>
//       {result !== null && <h2>Result: {result}</h2>}
//     </div>
//   );
// }

export default App;

