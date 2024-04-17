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
        <h2> All Resumes</h2>
        {/* Display the data here */}
            {formDataArr.map((formData, index) => (
                <div key={index}>
                  <h2>--------------------------------</h2>
                  <p>Name: {formData.name || 'No name provided'}</p>
                  <p>Email: {formData.email || 'No email provided'}</p>
                  <p>Mobile: {formData.mobile || 'No mobile provided'}</p>
                  <p>Education: {formData.education || 'No education provided'}</p>
                  <p>Activity: {formData.activity || 'No activity provided'}</p>
                  <p>Occupation: {formData.occupation || 'No occupation provided'}</p>
                  <p>Languages: {displayLanguages(formData)}</p>
                  <p>Projects: {formData.projects || 'No projects provided'}</p>
            </div>
            ))}
      </div>
    );
  // }
}
  export default Display;
