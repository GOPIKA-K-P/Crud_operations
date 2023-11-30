import React from 'react';
import PatientList from './PatientList';
import PatientForm from './PatientForm';

function App() {
  return (
    <div>
      <h1>Hospital Patient Admissions</h1>
      <PatientList />
      <PatientForm />
    </div>
  );
}

export default App;
