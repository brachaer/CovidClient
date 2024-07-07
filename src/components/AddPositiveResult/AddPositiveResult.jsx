import React, { useState } from "react";
import axios from "axios";
import "./AddPositiveResult.css";

function AddPositiveResult({ clientId, onSubmit }) {
  const API_URL = `https://covidserver.onrender.com/covid/positive/${clientId}`;

  const [positiveResult, setPositiveResult] = useState(Date);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCovidDetails = {
      positiveResultDate: positiveResult,
    };

    try {
      const response = await axios.patch(API_URL, updatedCovidDetails);
      console.log(response.data);
      window.alert(`Added Positive Result Successfully!`);
      if (typeof onSubmit === "function") {
        onSubmit();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      Add Positive Result Date:
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={positiveResult}
          onChange={(e) => setPositiveResult(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddPositiveResult;
