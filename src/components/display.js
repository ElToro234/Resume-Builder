import React from 'react';
import { useLocation } from 'react-router-dom';

const Display = () => {
    const location = useLocation();
    console.log(location.state);
    let formDataArr = JSON.parse(localStorage.getItem('formData')) || [];
    

    const displayLanguages = (formData) => {
        // Assuming formData.languages is an array of strings.
      if (formData.languages && formData.languages.length > 0) {
      return formData.languages.join(", ");
        }
          return 'No languages provided';
      };

    return (
        <div className="display">
        {formDataArr.map((formData, index) => (
                <div key={index} className="resume-container">
                    <h2 className="resume-header">Resume {index + 1}</h2>
                    <p className="resume-entry">Name: {formData.name || 'No name provided'}</p>
                    <p className="resume-entry">Email: {formData.email || 'No email provided'}</p>
                    <p className="resume-entry">Mobile: {formData.mobile || 'No mobile provided'}</p>
                    <p className="resume-entry">Education: {formData.education || 'No education provided'}</p>
                    <p className="resume-entry">Activity: {formData.activity || 'No activity provided'}</p>
                    <p className="resume-entry">Occupation: {formData.occupation || 'No occupation provided'}</p>
                    <p className="resume-entry">Languages: {displayLanguages(formData)}</p>
                    <p className="resume-entry">Projects: {formData.projects || 'No projects provided'}</p>
                    <button className="resume-button edit-button" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="resume-button delete-button" onClick={() => handleDelete(index)}>Delete</button>
                </div>
            ))}
      </div>
    );

    function handleEdit(index) {
      console.log("Editing resume at index:", index);
    }
  
    function handleDelete(index) {
      console.log("Deleting resume at index:", index)
    }
}
  export default Display;
