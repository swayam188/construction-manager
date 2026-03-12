import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProjectList from './pages/ProjectList';
import DPRForm from './pages/DPRForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/dpr/:id" element={<DPRForm />} />
      </Routes>
    </Router>
  );
}
export default App;