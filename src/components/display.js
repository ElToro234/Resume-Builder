import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Display = () => {
    const location = useLocation();
    const navigate = useNavigate();
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
                    <p className="resume-entry">Languages: {displayLanguages(formData)}</p>
                    <div className="education-section">
                        <h3>Education</h3>
                        <h2>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</h2>
                        <pre>{formData.education ? formatMultilineText(formData.education) : 'No education provided'}</pre>
                      </div>
                    {/* <p className="resume-entry">Occupation: {formData.occupation || 'No occupation provided'}</p> */}
                    <div className="experience-section">
                        <h3>Projects and Experience</h3>
                        <h2>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</h2>
                        <pre>{formData.projects ? formatMultilineText(formData.projects) : 'No projects provided'}</pre>
                      </div>
                      <div className="activity-section">
                        <h3>Activities</h3>
                        <h2>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</h2>
                        <pre>{formData.activity ? formatMultilineText(formData.activity) : 'No activity provided'}</pre>
                      </div>
                    <button className="resume-button edit-button" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="resume-button delete-button" onClick={() => handleDelete(index)}>Delete</button>
                </div>
            ))}
      </div>
    );

    //Handling on fomratting the resume
    function formatMultilineText(text) {
      return text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
    }

    function handleEdit (index) {
      // Navigate to a new route or pop up a modal for editing
      // For simplicity, we will just navigate to a form, assuming you have a component 'EditForm'
      navigate('/edit', { state: { formData: formDataArr[index], index } });
  };
  
    function handleDelete(index) {
      let updatedFormDataArr = [...formDataArr];
      updatedFormDataArr.splice(index, 1);
      localStorage.setItem('formData', JSON.stringify(updatedFormDataArr));
      console.log("Deleting resume at index:", index);
      window.location.reload(); // Reload the page to reflect changes
  }

}
  export default Display;
