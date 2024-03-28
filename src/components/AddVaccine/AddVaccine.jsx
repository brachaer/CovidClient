import React, { useState } from "react";
import axios from "axios";
import "./AddVaccine.css";

function AddVaccine({ clientId, onSubmit }) {
  const API_URL = `http://localhost:8080/api/v1/covid/vaccine/${clientId}`;

  const [vaccineDate, setVaccineDate] = useState("");
  const [vaccineManufacturer, setVaccineManufacturer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCovidDetails = {
      date: vaccineDate,
      manufacturer: vaccineManufacturer,
    };

    try {
      const response = await axios.patch(API_URL, updatedCovidDetails);
      console.log(response.data);
      window.alert(`Added Vaccine Successfully!`);
      if (typeof onSubmit === "function") {
        onSubmit();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      Add Vaccine
      <form onSubmit={handleSubmit}>
        <label>
          Vaccine Date:
          <input
            type="date"
            value={vaccineDate}
            onChange={(e) => {
              setVaccineDate(e.target.value);
              console.log(vaccineDate);
            }}
          />
        </label>
        <br />
        <label>
          Vaccine Manufacturer:
          <input
            type="text"
            value={vaccineManufacturer}
            onChange={(e) => {
              setVaccineManufacturer(e.target.value);
              console.log(vaccineManufacturer);
            }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddVaccine;
