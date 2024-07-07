import React, { useState } from "react";
import axios from "axios";
import "./PersonalInfoForm.css";

function PersonalInfoForm({ onClose }) {
  const API_URL = "https://covidserver.onrender.com/clients";
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
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          API_URL,
          JSON.stringify({ personalInfo }),
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        setPersonalInfo({
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
        if (typeof onClose === "function") {
          onClose();
        }
      } catch (error) {
        console.error("Error adding client:", error);
      }
    } else {
      setErrors(validationErrors);
    }
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
  const validate = () => {
    const validationErrors = {};
    if (!personalInfo.firstName) {
      validationErrors.firstName = "First name is required";
    } else if (
      personalInfo.firstName.length < 3 ||
      personalInfo.firstName.length > 20
    ) {
      validationErrors.firstName =
        "First name must be between 3 and 20 characters";
    }

    if (!personalInfo.lastName) {
      validationErrors.lastName = "Last name is required";
    } else if (
      personalInfo.lastName.length < 3 ||
      personalInfo.lastName.length > 20
    ) {
      validationErrors.lastName =
        "Last name must be between 3 and 20 characters";
    }

    if (!personalInfo.IDNumber) {
      validationErrors.IDNumber = "ID Number is required";
    } else if (!/^\d{9}$/.test(personalInfo.IDNumber)) {
      validationErrors.IDNumber = "ID Number must be exactly 9 digits";
    }

    if (!personalInfo.dateOfBirth) {
      validationErrors.dateOfBirth = "Date of birth is required";
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(personalInfo.dateOfBirth);
      if (selectedDate > currentDate) {
        validationErrors.dateOfBirth = "Date of birth cannot be in the future";
      }
    }
    if (!personalInfo.phone) {
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

  return (
    <div className="personal-info-form">
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={personalInfo.firstName}
          onChange={onChange}
          placeholder="First Name"
          required
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
        <input
          type="text"
          name="lastName"
          value={personalInfo.lastName}
          onChange={onChange}
          placeholder="Last Name"
          required
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
        <input
          type="text"
          name="IDNumber"
          value={personalInfo.IDNumber}
          onChange={onChange}
          placeholder="ID Number"
          required
        />
        {errors.IDNumber && <span className="error">{errors.IDNumber}</span>}
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
          placeholder="street"
        />{" "}
        <input
          type="number"
          name="address.number"
          value={personalInfo.address.number}
          onChange={onChange}
          placeholder="number"
        />
        <br />
        <span>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={personalInfo.dateOfBirth}
            onChange={onChange}
            placeholder="Date of Birth"
            required
          />
        </span>
        {errors.dateOfBirth && (
          <span className="error">{errors.dateOfBirth}</span>
        )}
        <input
          type="tel"
          name="phone"
          value={personalInfo.phone}
          onChange={onChange}
          placeholder="Phone"
          required
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
        <input
          type="tel"
          name="mobilePhone"
          value={personalInfo.mobilePhone}
          onChange={onChange}
          placeholder="Mobile Phone"
        />
        {errors.mobilePhone && (
          <span className="error">{errors.mobilePhone}</span>
        )}
        <br />
        <button type="submit">Add Client</button>
      </form>
    </div>
  );
}
export default PersonalInfoForm;
