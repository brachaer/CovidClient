import { React} from "react";
import "./ClientsList.css";
function ClientsList({ clients, onSelectClient }) {
  return (
    <div className="clients-list">
      <h1>Health Fund Management System</h1>
      <table className="clients-table">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>ID Number</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id} onClick={() => onSelectClient(client._id)}>
              <td>{client.personalInfo.lastName}</td>
              <td>{client.personalInfo.firstName}</td>
              <td>{client.personalInfo.IDNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientsList;
