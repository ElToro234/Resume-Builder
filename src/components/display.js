import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import handlePrint from './handlePrint';

const Display = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state);
    let formDataArr = JSON.parse(localStorage.getItem('formData')) || [];
    

    // const displayLanguages = (formData) => {
    //     // Assuming formData.languages is an array of strings.
    //   if (formData.languages && formData.languages.length > 0) {
    //   return formData.languages.join(", ");
    //     }
    //       return 'No languages provided';
    //   };

    return (
        <div className="display">
        {formDataArr.map((formData, index) => (
                <div key={index} className="resume-container">
                    <h2 className="resume-header">Resume {index + 1}</h2>
                    <div className="resume-entry">
                        <h4>{formData.name || 'No name provided'}</h4>
                        <div className="contact-info">
                            <span>{formData.email || 'No email provided'}</span>
                            <span>{formData.mobile || 'No mobile provided'}</span>
                        </div>
                    </div>
                    <div className="language-section">
                          <h3>Languages</h3>
                          <h2>──────────────────────────────────────────────────</h2>
                          <pre>{formData.languages ? formatMultilineText(String(formData.languages)) : 'No languages provided'}</pre>
                      </div>
                    
                    <div className="education-section">
                        <h3>Education</h3>
                        <h2>──────────────────────────────────────────────────</h2>
                        <pre>{formData.education ? formatMultilineText(formData.education) : 'No education provided'}</pre>
                      </div>
                    {/* <p className="resume-entry">Occupation: {formData.occupation || 'No occupation provided'}</p> */}
                    <div className="experience-section">
                        <h3>Projects and Experience</h3>
                        <h2>──────────────────────────────────────────────────</h2>
                        <pre>{formData.projects ? formatMultilineText(formData.projects) : 'No projects provided'}</pre>
                      </div>
                      <div className="activity-section">
                        <h3>Activities</h3>
                        <h2>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</h2>
                        <pre>{formData.activity ? formatMultilineText(formData.activity) : 'No activity provided'}</pre>
                      </div>
                    <button className="resume-button edit-button" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="resume-button delete-button" onClick={() => handleDelete(index)}>Delete</button>
                    <button className="resume-button print-button" onClick={() => handlePrint(formData, index)}>Print</button>
                    {/* <button className="resume-button translate-button" onClick={() => handleFrench(formData, index)}>Translate</button> */}
                </div>
            ))}
      </div>
    );

    //Handling on formatting the resume
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
    const updatedFormDataArr = [...formDataArr];
    const idToDelete = updatedFormDataArr[index].id;  // Assuming each form data has a unique 'id' property

    // Remove item from the local state and local storage
    updatedFormDataArr.splice(index, 1);
    localStorage.setItem('formData', JSON.stringify(updatedFormDataArr));
    console.log("handleDelete called with index:", index);
    // Call the backend to delete the item from the database
    deleteFromBackend(idToDelete);

    console.log("Deleting resume at index:", index);
    window.location.reload(); // Optionally reload the page to reflect changes, or update the state to re-render
}

async function deleteFromBackend(id) {
    try {
        const response = await fetch(`/database/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete the submission');
        }
        console.log('Submission deleted successfully from backend');
    } catch (error) {
        console.error('Error deleting submission:', error);
    }
}

}
  export default Display;
