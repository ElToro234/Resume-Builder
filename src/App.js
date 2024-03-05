import './App.css';
import { useState } from 'react';

function App() {

  const [formData, setFormData] = useState({
    username: '',
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

  const onSubmitHandler = (event) => {
    event.preventDefault()
    console.table(formData)
  }

  return (
    <div className="App">
    <form onSubmit={onSubmitHandler}>
      <div className="form-group">
        <label htmlFor="username" className="form-label">User Name</label>
        <input className="form-control" name="username" onChange={onChangeHandler} value={formData.username} />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input className="form-control" name="email" onChange={onChangeHandler} value={formData.email} />
      </div>
      <div className="form-group">
        <label htmlFor="mobile" className="form-label">Mobile</label>
        <input className="form-control" name="mobile" onChange={onChangeHandler} value={formData.mobile} />
      </div>
      <div className="form-group">
        <label htmlFor="education" className="form-label">Education</label>
        <input className="form-control" name="education" onChange={onChangeHandler} value={formData.education} />
      </div>
      <div className="form-group">
        <label htmlFor="projects" className="form-label">Projects</label>
        <input className="form-control" name="Projects" onChange={onChangeHandler} value={formData.project} />
      </div>
      <div className="form-group">
        <label htmlFor="activity" className="form-label">Other Activities</label>
        <input className="form-control" name="activity" onChange={onChangeHandler} value={formData.activity} />
      </div>
      <div className="form-group">
        <label htmlFor="occupation" className="form-label">Occupation</label>
        <select className="form-select" name="occupation" onChange={onChangeHandler} value={formData.occupation}>
          <option value="student">Student</option>
          <option value="employee">Employee</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="gender" className="form-label">Gender</label>
        <div>
          <div>
            <input type="radio" name="gender" value="male" onChange={onChangeHandler} checked={formData.gender === 'male'} />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input type="radio" name="gender" value="female" onChange={onChangeHandler} checked={formData.gender === 'female'} />
            <label htmlFor="female">Female</label>
          </div>
          <div>
            <input type="radio" name="gender" value="other" onChange={onChangeHandler} checked={formData.gender === 'other'} />
            <label htmlFor="other">Other</label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="gender" className="form-label">Languages</label>
        <div>
          <div>
            <input type="checkbox" name="languages" value="html" onChange={onChangeHandler} checked={formData.languages.indexOf('html') !== -1} />
            <label htmlFor="html">HTML</label>
          </div>
          <div>
            <input type="checkbox" name="languages" value="css" onChange={onChangeHandler} checked={formData.languages.indexOf('css') !== -1} />
            <label htmlFor="css">CSS</label>
          </div>
          <div>
            <input type="checkbox" name="languages" value="javascript" onChange={onChangeHandler} checked={formData.languages.indexOf('javascript') !== -1} />
            <label htmlFor="javascript">Javascript</label>
          </div>
          <div>
            <input type="checkbox" name="languages" value="python" onChange={onChangeHandler} checked={formData.languages.indexOf('python') !== -1} />
            <label htmlFor="python">Python</label>
          </div>
          <div>
            <input type="checkbox" name="languages" value="C++" onChange={onChangeHandler} checked={formData.languages.indexOf('C++') !== -1} />
            <label htmlFor="C++">C++</label>
          </div>
          <div>
            <input type="checkbox" name="languages" value="JAVA" onChange={onChangeHandler} checked={formData.languages.indexOf('JAVA') !== -1} />
            <label htmlFor="JAVA">JAVA</label>
          </div>
          <div>
            <input type="checkbox" name="languages" value="RUBY" onChange={onChangeHandler} checked={formData.languages.indexOf('RUBY') !== -1} />
            <label htmlFor="RUBY">RUBY</label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <button className="btn" type="submit" >Submit</button>
      </div>
    </form>
  </div>
);
}

export default App;
