import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/patients/')
      .then(response => setPatients(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEditPatient = (patientId) => {
    // Set the selected patient for editing
    const selected = patients.find(patient => patient.id === patientId);
    setSelectedPatient(selected);
  };

  const handleDeletePatient = (patientId) => {
    // Perform actions when delete button is clicked for a specific patient
    axios.delete(`http://localhost:8000/api/patients/${patientId}/`)
      .then(response => {
        // Handle the response, update state, or perform additional actions
        console.log(`Deleted patient with ID: ${patientId}`);
        setPatients(patients.filter(patient => patient.id !== patientId));
        setSelectedPatient(null);
      })
      .catch(error => console.error(error));
  };
  

  const handleUpdatePatient = (updatedPatient) => {
    // Perform actions when the form is submitted for updating the patient
    axios.put(`http://localhost:8000/api/patients/${updatedPatient.id}/`, updatedPatient)
      .then(response => {
        // Handle the response, update state, or perform additional actions
        console.log('Updated Patient:', response.data);
        setPatients(patients.map(patient => (patient.id === updatedPatient.id ? response.data : patient)));
        setSelectedPatient(null);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Patients List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Admission Date</th>
            <th>Diagnosis</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.admission_date}</td>
              <td>{patient.diagnosis}</td>
              <td>
                <button onClick={() => handleEditPatient(patient.id)}>Edit</button>
                <button onClick={() => handleDeletePatient(patient.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPatient && (
        <div>
          <h2>Edit Patient</h2>
          {/* Render a form for editing the selected patient */}
          <form onSubmit={() => handleUpdatePatient(selectedPatient)}>
            <label>Name:</label>
            <input
              type="text"
              value={selectedPatient.name}
              onChange={(e) => setSelectedPatient({ ...selectedPatient, name: e.target.value })}
            />
            <label>Admission Date:</label>
            <input
              type="date"
              value={selectedPatient.admission_date}
              onChange={(e) => setSelectedPatient({ ...selectedPatient, admission_date: e.target.value })}
            />
            <label>Diagnosis:</label>
            <input
              type="text"
              value={selectedPatient.diagnosis}
              onChange={(e) => setSelectedPatient({ ...selectedPatient, diagnosis: e.target.value })}
            />
            <button type="submit">Update</button>
          </form>
          <button onClick={() => setSelectedPatient(null)}>Cancel Edit</button>
        </div>
      )}
    </div>
  );
};

export default PatientList;
