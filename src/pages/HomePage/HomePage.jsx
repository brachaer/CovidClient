import { React, useState, useEffect } from "react";
import axios from "axios";
import ClientsList from "../../components/ClientsList/ClientsList";
import ClientCard from "../../components/ClientCard/ClientCard";
import "./HomePage.css";

function HomePage() {
  const API_URL = "http://localhost:8080/api/v1/clients";

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const fetchData = () => {
    axios
      .get(API_URL)
      .then((response) => {
        setClients(response.data.clients);
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

  const fetchDataForClient = (clientId) => {
    axios
      .get(`${API_URL}/${clientId}`)
      .then((response) => {
        setSelectedClient(response.data.client);
      })
      .catch((error) => {
        console.error("Error details:", error.config);
      });
  };

  const handleSelectClient = async (clientId) => {
    fetchDataForClient(clientId);
  };

  const onClose = () => {
    setSelectedClient(null);
    refreshData();
  };
const onEdit=async (clientId) => {
  await handleSelectClient(clientId);
};
  return (
    <div className="home-page ">
      {!selectedClient ? (
        <ClientsList
          clients={clients}
          onSelectClient={handleSelectClient}
        />
      ) : (
        <ClientCard client={selectedClient} onClose={onClose} onEdit={onEdit} />
      )}
    </div>
  );
}

export default HomePage;
