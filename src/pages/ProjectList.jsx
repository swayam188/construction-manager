import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../utils/mockData';
import styles from './ProjectList.module.css';

const ProjectList = () => {
  const navigate = useNavigate();

  // Helper to handle navigation to the DPR form
  const handleProjectClick = (projectId) => {
    navigate(`/dpr/${projectId}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Projects</h1>
        <p>Select a project to file a DPR</p>
      </header>

      <div className={styles.grid}>
        {PROJECTS.map((project) => (
          <div 
            key={project.id} 
            className={styles.card} 
            onClick={() => handleProjectClick(project.id)}
          >
            <div className={styles.cardHeader}>
              <h3>{project.name}</h3>
              <span className={`${styles.badge} ${styles[project.status.replace(' ', '').toLowerCase()]}`}>
                {project.status}
              </span>
            </div>
            <div className={styles.cardBody}>
              <p><strong>Location:</strong> {project.location}</p>
              <p><strong>Start Date:</strong> {project.date}</p>
            </div>
            <button className={styles.viewBtn}>Create DPR</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;