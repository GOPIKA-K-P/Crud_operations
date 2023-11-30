// src/PatientForm.js

import React, { useState } from 'react';
import axios from 'axios';

const PatientForm = () => {
  const [newPatient, setNewPatient] = useState({ name: '', admission_date: '', diagnosis: '' });

  const handleInputChange = (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };

  const handleAddPatient = () => {
    axios.post('http://localhost:8000/api/patients/', newPatient)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Add Patient</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
      <input type="date" name="admission_date" placeholder="Admission Date" onChange={handleInputChange} />
      <input type="text" name="diagnosis" placeholder="Diagnosis" onChange={handleInputChange} />
      <button onClick={handleAddPatient}>Add Patient</button>
    </div>
  );
};

export default PatientForm;
