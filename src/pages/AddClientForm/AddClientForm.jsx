import { React } from "react";
import PersonalInfoForm from "../../components/PersonalInfoForm/PersonalInfoForm";
import "./AddClientForm.css";
import { useNavigate } from "react-router-dom";

function AddClientForm({ onClose }) {
  const navigate = useNavigate();

  const handleCloseAddClientForm = () => {
    navigate("/");
  };
  return (
    <div className="form-container">
      <h2>Personal Information</h2>
      <PersonalInfoForm
        className="form-group"
        onClose={handleCloseAddClientForm}
      />
    </div>
  );
}

export default AddClientForm;
