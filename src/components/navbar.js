// const Navbar = () => {
//     return (
//         <nav className = "navbar">
//             <h1>Resume Generator</h1>
//             <div className = "links">
//                 <a href="/">Home</a>
//                 <a href="/display">Display</a>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Resume Generator</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/display">Display</Link>
      </div>
    </nav>
  );
}

export default Navbar;