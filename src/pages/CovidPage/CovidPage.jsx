import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
  Legend,
} from "recharts";

function CovidPage() {
  const API_URL = "http://localhost:8080/api/v1";

  const [vaccinatedClients, setVaccinatedClients] = useState(0);
  const [allClients, setAllClients] = useState(0);

  const fetchVaccinated = async () => {
    try {
      const responseVaccinated = await axios.get(`${API_URL}/covid/vaccine`);
      const vaccinated = responseVaccinated.data.vaccinated.length;
      setVaccinatedClients(vaccinated);
      const responseGetAll = await axios.get(`${API_URL}/clients`);
      const totalClients = responseGetAll.data.clients.length;
      setAllClients(totalClients);
    } catch (error) {
      console.error("Error fetching vaccinated clients data:", error);
    }
  };

  useEffect(() => {
    fetchVaccinated();
  }, []);

  return (
    <div>
      <h2>Vaccinated Clients </h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ResponsiveContainer width="80%" height={400}>
          <PieChart>
            <Pie
              data={[
                { name: "Vaccinated", value: vaccinatedClients },
                {
                  name: "Non-Vaccinated",
                  value: allClients - vaccinatedClients,
                },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
              dataKey="value"
            >
              <Cell fill="#82ca9d" />
              <Cell fill="#8884d8" />
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default CovidPage;
