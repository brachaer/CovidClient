import React, { useState } from "react";
import axios from "axios";
import "./AddRecovery.css";

function AddRecovery({ clientId, onSubmit }) {
  const API_URL = `https://covidserver.onrender.com/covid/positive/${clientId}`;
  const [recoveryDate, setrecoveryDate] = useState(Date);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCovidDetails = {
      recoveryDate: recoveryDate,
    };

    try {
      const response = await axios.patch(API_URL, updatedCovidDetails);
      console.log(response.data);
      window.alert(`Added Recovery Date Successfully!`);

      if (typeof onSubmit === "function") {
        onSubmit();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      Add Recovery Date:
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={recoveryDate}
          onChange={(e) => setrecoveryDate(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddRecovery;
