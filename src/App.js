import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Display from './components/display';
import EditForm from './components/EditForm';
import Navbar from './components/navbar';
import { useOpenAI, OpenAIProvider } from './components/openAI';
import Login from './components/login';
import Signup from './components/signup';

function App() {
  const { generateText } = useOpenAI();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '@gmail.com',
    mobile: '+1',
    education: '',
    projects: '',
    activity: '',
    // occupation: '',
    languages: [],
  })

  const handleAutomaticFilling = async () => {
    try {
      const educationPrompt = "Im looking into creating a resume tailored to IT field, create in resume format education in CS. ";
      const education = await generateText(educationPrompt);
      
      const projectsPrompt = "Describe a couple of software projects and experiences suitable for a resume.";
      const projects = await generateText(projectsPrompt);
      
      const activityPrompt = "Suggest some professional activities outside of work. ";
      const activity = await generateText(activityPrompt);

      

      setFormData(prevState => ({
        ...prevState,
        education,
        projects,
        activity,
      }));
    } catch (error) {
      console.error("Error auto-filling form:", error);
    }
  };


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
    axios.get('http://localhost:3004/database')
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

    // Post data to the server
    axios.post('http://localhost:3004/database', formData, {
    headers: {
        'Content-Type': 'application/json', // Adjust the content type if needed
    },
})
    .then(response => console.log('Data inserted successfully:', response.data))
    .catch(error => console.error('Error submitting data:', error));

    //reset the form
    setFormData({
      name: '',
      email: '@gmail.com',
      mobile: '+1',
      education: '',
      projects: '',
      activity: '',
      // occupation: '',
      languages: [],
    });
  }



  return (
    <OpenAIProvider>
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
                      <label htmlFor="education" className="form-label">Education</label>
                      <textarea id="education" className="form-control2" name="education" onChange={onChangeHandler} value={formData.education} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="projects" className="form-label">Projects</label>
                      <textarea id="projects" className="form-control2" name="projects" onChange={onChangeHandler} value={formData.projects} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="activity" className="form-label">Other Activities</label>
                      <textarea id="activity"  className="form-control2" name="activity" onChange={onChangeHandler} value={formData.activity} />
                    </div>
                    {/* <div className="form-group">
                      <label htmlFor="occupation" className="form-label">Occupation</label>
                      <select id="occupation" className="form-select" name="occupation" onChange={onChangeHandler} value={formData.occupation}>
                        <option value="student">Student</option>
                        <option value="employee">Employee</option>
                        <option value="other">Other</option>
                      </select>
                    </div> */}
                    
                    <div className="form-group">
                      <button className="btn" type="button" onClick={handleAutomaticFilling}>Auto-Fill with AI</button>
                      <button className="btn" type="submit" >Submit</button>
                    </div>
                  </form>
              </React.Fragment>
              
            } />
            <Route path="/edit" element={<EditForm />} /> 
          <Route path="/display" element={<Display />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

      </div>
  </div>
  </OpenAIProvider>
);
}

export default App;
