import React, { useState, useEffect } from "react";
import axios from "axios";

function EditClientForm({ clientId, onSubmit }) {
  const API_URL = `http://localhost:8080/api/v1/clients/${clientId}`;
  const [errors, setErrors] = useState({});
  const [clientData, setClientData] = useState({});
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    IDNumber: "",
    address: {
      city: "",
      street: "",
      number: "",
    },
    dateOfBirth: "",
    phone: "",
    mobilePhone: "",
  });

  const fetchClientData = async () => {
    await axios
      .get(API_URL)
      .then((response) => {
        setClientData(response.data.client);
        setPersonalInfo(response.data.client.personalInfo);
      })
      .catch((error) => {
        console.error("Error details:", error.config);
      });
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  const validate = () => {
    const validationErrors = {};
    if (!personalInfo || !personalInfo.phone) {
      validationErrors.phone = "Phone is required";
    } else if (!/^\d{9,10}$/.test(personalInfo.phone)) {
      validationErrors.phone = "Phone must be 9 or 10 digits";
    }
    if (
      personalInfo.mobilePhone &&
      !/^\d{9,10}$/.test(personalInfo.mobilePhone)
    ) {
      validationErrors.mobilePhone = "Phone must be 9 or 10 digits";
    }
    return validationErrors;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address")) {
      const [fieldName, nestedField] = name.split(".");
      setPersonalInfo((prevPersonalInfo) => ({
        ...prevPersonalInfo,
        address: {
          ...prevPersonalInfo.address,
          [nestedField]: value,
        },
      }));
    } else {
      setPersonalInfo({
        ...personalInfo,
        [name]: value,
      });
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      await fetchData();
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.patch(API_URL, { personalInfo });
      window.alert(`Edited Client Personal Info Succesfuly!`);
      if (typeof onSubmit === "function") {
        onSubmit();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={personalInfo.firstName}
        onChange={onChange}
        placeholder="First Name"
        readOnly
        required
      />
      <input
        type="text"
        name="lastName"
        value={personalInfo.lastName}
        onChange={onChange}
        placeholder="Last Name"
        readOnly
        required
      />
      <input
        type="text"
        name="IDNumber"
        value={personalInfo.IDNumber}
        onChange={onChange}
        placeholder="ID Number"
        readOnly
        required
      />
      <input
        type="text"
        name="address.city"
        value={personalInfo.address.city}
        onChange={onChange}
        placeholder="City"
      />
      <input
        type="text"
        name="address.street"
        value={personalInfo.address.street}
        onChange={onChange}
        placeholder="Street"
      />
      <input
        type="number"
        name="address.number"
        value={personalInfo.address.number}
        onChange={onChange}
        placeholder="Number"
      />

      <input
        type="tel"
        name="phone"
        value={personalInfo.phone}
        onChange={onChange}
        placeholder="Phone"
        required
      />
      <input
        type="tel"
        name="mobilePhone"
        value={personalInfo.mobilePhone}
        onChange={onChange}
        placeholder="Mobile Phone"
      />
      <input
        type="text"
        name="imageUrl"
        value={personalInfo.imageUrl}
        onChange={onChange}
        placeholder="Image URL"
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditClientForm;
