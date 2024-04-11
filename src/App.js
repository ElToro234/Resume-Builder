import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Display from './components/display';
import Navbar from './components/navbar';
// import Database from './database.js';
// import Server from './server.js';

function App() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '@gmail.com',
    mobile: '+1',
    education: '',
    projects: '',
    activity: '',
    occupation: '',
    gender: '',
    languages: [],
  })



  
  const onChangeHandler = (event) => {
    console.log(event)
    if(event.target.name === 'languages') {
        let copy = { ...formData}

        if(event.target.checked) {
          copy.languages.push(event.target.value)
        }else{
          copy.languages = copy.languages.filter(el => el !== event.target.value)
        }

        setFormData(copy)

    }else{
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value
      }))
    }
    
  }

  useEffect(() => {
    axios.get('http://localhost:3001/database')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the data:', error);
        });
    }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault()
    let existingSubmissions = JSON.parse(localStorage.getItem('formData')) || [];

    // Add the new submission to the array of existing submissions
    existingSubmissions.push(formData);
    
    // Save the updated array back to localStorage
    localStorage.setItem('formData', JSON.stringify(existingSubmissions));
    
    // Navigate to the Display component
    navigate('/display', { state: { formData } }); 
  }

  

  return (
    <div className="App">
      <Navbar />
      <div className = "Content">
      <Routes>
      <Route path="/" element={
              <React.Fragment>
                {/* Resume Form Goes Here */}
                <h2>Create Resume</h2>
                  <form onSubmit={onSubmitHandler}>
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input id="name" className="form-control" name="name" autoComplete="name" onChange={onChangeHandler} value={formData.name} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input id="email" className="form-control" name="email"  autoComplete="email" onChange={onChangeHandler} value={formData.email} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile" className="form-label">Mobile</label>
                      <input id="mobile" className="form-control" name="mobile" onChange={onChangeHandler} value={formData.mobile} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="education" className="form-label">Education</label>
                      <input id="education" className="form-control" name="education" onChange={onChangeHandler} value={formData.education} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="projects" className="form-label">Projects</label>
                      <input id="projects" className="form-control" name="Projects" onChange={onChangeHandler} value={formData.project} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="activity" className="form-label">Other Activities</label>
                      <input id="activity"  className="form-control" name="activity" onChange={onChangeHandler} value={formData.activity} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="occupation" className="form-label">Occupation</label>
                      <select id="occupation" className="form-select" name="occupation" onChange={onChangeHandler} value={formData.occupation}>
                        <option value="student">Student</option>
                        <option value="employee">Employee</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Gender</label>
                      <div>
                        <div>
                          <input id="male"  type="radio" name="gender" value="male" onChange={onChangeHandler} checked={formData.gender === 'male'} />
                          <label htmlFor="male">Male</label>
                        </div>
                        <div>
                          <input id="female" type="radio" name="gender" value="female" onChange={onChangeHandler} checked={formData.gender === 'female'} />
                          <label htmlFor="female">Female</label>
                        </div>
                        <div>
                          <input id="other"  type="radio" name="gender" value="other" onChange={onChangeHandler} checked={formData.gender === 'other'} />
                          <label htmlFor="other">Other</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Languages</label>
                      <div>
                        <div>
                          <input id="html" type="checkbox" name="languages" value="html" onChange={onChangeHandler} checked={formData.languages.indexOf('html') !== -1} />
                          <label htmlFor="html">HTML</label>
                        </div>
                        <div>
                          <input id="css"  type="checkbox" name="languages" value="css" onChange={onChangeHandler} checked={formData.languages.indexOf('css') !== -1} />
                          <label htmlFor="css">CSS</label>
                        </div>
                        <div>
                          <input id="javascript" type="checkbox" name="languages" value="javascript" onChange={onChangeHandler} checked={formData.languages.indexOf('javascript') !== -1} />
                          <label htmlFor="javascript">Javascript</label>
                        </div>
                        <div>
                          <input id="python" type="checkbox" name="languages" value="python" onChange={onChangeHandler} checked={formData.languages.indexOf('python') !== -1} />
                          <label htmlFor="python">Python</label>
                        </div>
                        <div>
                          <input id="C++" type="checkbox" name="languages" value="C++" onChange={onChangeHandler} checked={formData.languages.indexOf('C++') !== -1} />
                          <label htmlFor="C++">C++</label>
                        </div>
                        <div>
                          <input id="JAVA" type="checkbox" name="languages" value="JAVA" onChange={onChangeHandler} checked={formData.languages.indexOf('JAVA') !== -1} />
                          <label htmlFor="JAVA">JAVA</label>
                        </div>
                        <div>
                          <input id="RUBY" type="checkbox" name="languages" value="RUBY" onChange={onChangeHandler} checked={formData.languages.indexOf('RUBY') !== -1} />
                          <label htmlFor="RUBY">RUBY</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <button className="btn" type="submit" >Submit</button>
                    </div>
                  </form>
               
              </React.Fragment>
            } />
          <Route path="/display" element={<Display />} />
        </Routes>

      </div>
  </div>
);
}

export default App;
