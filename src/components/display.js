import { useLocation } from 'react-router-dom';

const Display = ({ data }) => {
    const location = useLocation();
  const { formData } = location.state || {};

    return (
        <div className="display">
        {/* Display the data here */}
        <p>Name: {formData ? formData.name : 'No name provided'}</p>
        <p>Email: {formData ? formData.email : 'No email provided'}</p>
        <p>Mobile: {formData ? formData.mobile: 'No mobile provided'}</p>
        <p>Education: {formData ? formData.education : 'No education provided'}</p>
        <p>Activity: {formData ? formData.activity : 'No activity provided'}</p>
        <p>Occupation: {formData ? formData.occupation : 'No occupation provided'}</p>
        <p>Gender: {formData ? formData.gender : 'No gender provided'}</p>
        <p>Languages: {formData ? formData.languages : 'No language provided'}</p>
        {/* Repeat for other pieces of data */}
      </div>
    );
  }
  
  export default Display;
