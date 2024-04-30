import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const index = location.state ? location.state.index : -1;

  const [formData, setFormData] = useState(location.state ? location.state.formData : {
    name: '',
    email: '',
    mobile: '',
    education: '',
    activity: '',
    projects: '',
    languages: []
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if (name === "languages") {
      let copy = { ...formData };

      if (checked) {
        copy.languages.push(value);
      } else {
        copy.languages = copy.languages.filter(el => el !== value);
      }

      setFormData(copy);
    } else {
      setFormData(() => ({
        ...formData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Retrieve the current array from localStorage
    let existingData = JSON.parse(localStorage.getItem('formData')) || [];
    // Replace the element at the current index
    existingData[index] = formData;
    // Update localStorage with the modified array
    localStorage.setItem('formData', JSON.stringify(existingData));
    // Navigate back to the display page
    navigate('/display');
  };

  if (!formData) return <div>No data to edit</div>;
  const languages = ["HTML", "CSS", "JavaScript", "Python", "C++", "JAVA", "RUBY"];

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">Name:</label>
        <input type="text" defaultValue={formData.name} name="name" onChange={handleChange} className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" defaultValue={formData.email} name="email" onChange={handleChange} className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="mobile" className="form-label">Mobile:</label>
        <input type="text" defaultValue={formData.mobile} name="mobile" onChange={handleChange} className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="education" className="form-label">Education:</label>
        <textarea type="text" defaultValue={formData.education} name="education" onChange={handleChange} className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="activity" className="form-label">Activity:</label>
        <textarea type="text" defaultValue={formData.activity} name="activity" onChange={handleChange} className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="projects" className="form-label">Projects and Experience:</label>
        <textarea type="text" defaultValue={formData.projects} name="projects" onChange={handleChange} className="form-control" />
      </div>
      <div className="form-group">  
      <label className="form-label">Languages</label>
        {languages.map((lang) => (
          <div key={lang}>
            <input
              id={lang.toLowerCase()}
              type="checkbox"
              name="languages"
              value={lang}
              onChange={handleChange}
              checked={formData.languages.includes(lang)}
            />
            <label htmlFor={lang.toLowerCase()}>{lang}</label>
          </div>
        ))}
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </div>
      
    </form>
  );
};

export default EditForm;