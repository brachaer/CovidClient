import React, { useState, useEffect } from "react";
import "./CovidDetails.css";
import AddVaccine from "../AddVaccine/AddVaccine";
import AddPositiveResult from "../AddPositiveResult/AddPositiveResult";
import AddRecovery from "../AddRecovery/AddRecovery";
import axios from "axios";

function CovidDetails({ clientId }) {
  const API_URL = `http://localhost:8080/api/v1/covid/${clientId}`;

  const [covidDetails, setCovidDetails] = useState({});
  const {
    positiveResultDate,
    recoveryDate,
    vaccineDates = [],
  } = covidDetails || {};
  const [showAddVaccine, setShowAddVaccine] = useState(false);
  const [showAddPositiveResult, setShowAddPositiveResult] = useState(false);
  const [showAddRecovery, setShowAddRecovery] = useState(false);

  const fetchData = () => {
    axios
      .get(API_URL)
      .then((response) => {
        console.log("Data received:", response.data);
        setCovidDetails(response.data.covidDetails);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    fetchData();
  };

  const onAddVaccine = () => {
    setShowAddVaccine((prevState) => !prevState);
    refreshData();
  };

  const onAddPositiveResult = () => {
    setShowAddPositiveResult((prevState) => !prevState);
    refreshData();
  };

  const onAddRecovery = () => {
    setShowAddRecovery((prevState) => !prevState);
    refreshData();
  };

  return (
    <div className="covid-container">
      <p>
        <strong>Vaccine Dates:</strong>
      </p>
      <ul>
        {vaccineDates.length > 0 ? (
          vaccineDates.map((vaccine, index) => (
            <li key={index}>
              {vaccine && vaccine.date ? (
                <>
                  {new Date(vaccine.date).toLocaleDateString()}-
                  {vaccine.manufacturer}
                </>
              ) : null}
            </li>
          ))
        ) : (
          <li>No Vaccine Information Available</li>
        )}
      </ul>
      <p>
        <strong>Positive Result Date:</strong>{" "}
        {new Date(positiveResultDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Recovery Date:</strong>{" "}
        {new Date(recoveryDate).toLocaleDateString()}
      </p>

      {vaccineDates.length < 4 && (
        <button className="button" onClick={onAddVaccine}>
          Add Vaccine
        </button>
      )}
      {!positiveResultDate && (
        <button className="button" onClick={onAddPositiveResult}>
          Add Positive Result Date
        </button>
      )}
      {!recoveryDate && positiveResultDate && (
        <button className="button" onClick={onAddRecovery}>
          Add Recovery Date
        </button>
      )}
      {showAddVaccine && (
        <div>
          <AddVaccine
            className="form-container"
            clientId={clientId}
            showAddVaccine={showAddVaccine}
            onSubmit={onAddVaccine}
          />
        </div>
      )}
      {showAddPositiveResult && (
        <div>
          <AddPositiveResult
            className="form-container"
            clientId={clientId}
            onSubmit={onAddPositiveResult}
          />
        </div>
      )}
      {showAddRecovery && (
        <div>
          <AddRecovery
            className="form-container"
            clientId={clientId}
            onSubmit={onAddRecovery}
          />
        </div>
      )}
    </div>
  );
}

export default CovidDetails;
