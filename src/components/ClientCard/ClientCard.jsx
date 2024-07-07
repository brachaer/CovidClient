import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClientCard.css";
import CovidDetails from "../CovidDetails/CovidDetails";
import EditClientInfo from "../EditClientInfo/EditClientInfo";

const ClientCard = ({ client, onClose }) => {
  const API_URL = "https://covidserver.onrender.com";

  const [deleted, setDeleted] = useState(false);
  const [clientData, setClientData] = useState(null);
  const { city, street, number } = client.personalInfo.address || {};
  const {
    firstName,
    lastName,
    IDNumber,
    dateOfBirth,
    phone,
    mobilePhone,
    imageUrl,
  } = client.personalInfo;
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCovidInfo, setShowCovidInfo] = useState(false);

  useEffect(() => {
    setClientData({ client });
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/clients/${client._id}`, client._id);
        setDeleted(true);
        window.alert("Client deleted successfully!");
        onClose();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleToggleCovidInfo = async () => {
    setShowCovidInfo((prevState) => !prevState);
  };

  const handleEdit = () => {
    setShowEditForm((prevState) => !prevState);
  };

  return (
    <div className="client-card-overlay">
      <div className="client-card-actions">
        <button className="button" onClick={handleEdit}>
          Edit
        </button>
        <button className="button" onClick={handleDelete}>
          Delete
        </button>
        <button className="button" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="client-card-container">
        {!showEditForm ? (
          <div>
            <h2>
              {firstName} {lastName}
            </h2>

            {imageUrl && (
              <img
                className="client-image"
                src={`../../../src/assets/profileImages/${imageUrl}`}
                alt={`${firstName} ${lastName}`}
              />
            )}
            <p>
              <strong>ID Number:</strong> {IDNumber}
            </p>
            <p>
              <strong>Address:</strong> {city}, {street} {number}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(dateOfBirth).toLocaleDateString()}
            </p>
            <p>
              <strong>Phone:</strong> {phone}
            </p>

            <p>
              <strong>Mobile Phone:</strong> {mobilePhone || "---"}
            </p>
            <button className="button" onClick={handleToggleCovidInfo}>
              {showCovidInfo ? "Hide COVID Info" : "Show COVID Info"}
            </button>
          </div>
        ) : (
          <EditClientInfo clientId={client._id} onSubmit={handleEdit} />
        )}
      </div>

      {showCovidInfo ? <CovidDetails clientId={client._id} /> : null}
    </div>
  );
};

export default ClientCard;
