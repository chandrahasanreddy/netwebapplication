
import { useState,useEffect } from "react";
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';





const Section1 = () =>{



    const [formData, setFormData] = useState({
        facilityType: "",
        modelType: "",
        sectionType:"",
        sectionValues:[],
        selectedPicklist:""
      });


      useEffect(() => {
        console.log("hello");
        const fetchData = async () => {
          const dbData = {
            facilityType: "Urban",
            modelType: "Three-Lane Segment",
            sectionType: "Segment",
            picklistOptions: ["Option 1", "Option 2", "Option 3"], // Dynamic picklist values
          };
          setFormData((prevState) => ({
            ...prevState,
            facilityType: dbData.facilityType,
            modelType: dbData.modelType,
            sectionType: dbData.sectionType,
            sectionValues: dbData.picklistOptions,
          }));
        };
        fetchData();
      }, []);
    
   

      const handlePicklistChange = (e) => {
        console.log(e.target.value);
        setFormData({ ...formData, selectedPicklist: e.target.value });
      };

return (
    <div>
      {/* Section Data */}
      <section>
        <h2>Section Data</h2>
        <form>
           
            <div className="form-container">
                <div className="form-row">
                    <div className="form-item">
                        <label>
                        Facility Type:
                        <span>{formData.facilityType}</span>
                        </label>
                    </div>
                    <div className="form-item">
                        <label>
                        Model Type:
                        <span>{formData.modelType}</span>
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-item">
                        <label>
                        Section Type:
                        <span>{formData.sectionType}</span>
                        </label>
                    </div>
                    
                    <div className="form-item">
                        <label>
                        Picklist:
                        <select value={formData.selectedPicklist}  onChange={handlePicklistChange}>
                            <option value="">Select</option>
                            {
                            formData.sectionValues &&
                            formData.sectionValues.map((option, index) => (
                                // console.log(option,index);
                                <option key={index} value={option}> {option} </option>
                            ))}
                        </select>
                        </label>
                    </div>
                </div>
            </div>
        </form>
      </section>


    </div>
  );
};

export default Section1;




