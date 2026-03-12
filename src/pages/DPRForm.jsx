import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../utils/mockData';
import styles from './DPRForm.module.css';

const DPRForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    projectId: id || '',
    date: new Date().toISOString().split('T')[0],
    weather: 'Sunny',
    description: '',
    workerCount: 0
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert("Maximum 3 images allowed.");
      return;
    }
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages([...images, ...newImages]);
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.description || formData.description.length < 10) 
      tempErrors.description = "Description must be at least 10 characters."; 
    if (formData.workerCount <= 0) 
      tempErrors.workerCount = "Worker count must be greater than 0."; 
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("DPR Submitted Successfully!");
      navigate('/projects'); 
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate('/projects')}>Back</button>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Daily Progress Report</h2>

        <label>Select Project</label>
        <select 
          value={formData.projectId} 
          onChange={(e) => setFormData({...formData, projectId: e.target.value})}
        >
          <option value="">-- Choose a Project --</option>
          {PROJECTS.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select> [cite: 35]

        <div className={styles.row}>
          <div>
            <label>Date</label>
            <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
          </div>
          <div>
            <label>Weather</label>
            <select value={formData.weather} onChange={(e) => setFormData({...formData, weather: e.target.value})}>
              <option>Sunny</option>
              <option>Cloudy</option>
              <option>Rainy</option>
            </select>
          </div>
        </div> [cite: 36]

        <label>Work Description</label>
        <textarea 
          rows="4" 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        ></textarea>
        {errors.description && <span className={styles.error}>{errors.description}</span>} [cite: 37]

        <label>Worker Count</label>
        <input 
          type="number" 
          value={formData.workerCount}
          onChange={(e) => setFormData({...formData, workerCount: e.target.value})} 
        />
        {errors.workerCount && <span className={styles.error}>{errors.workerCount}</span>} [cite: 37]

        <label>Photos (Max 3)</label>
        <input type="file" multiple accept="image/*" onChange={handleImageChange} disabled={images.length >= 3} />
        
        <div className={styles.previewContainer}>
          {images.map((img, index) => (
            <div key={index} className={styles.thumbnail}>
              <img src={img.preview} alt="preview" />
              <button type="button" onClick={() => setImages(images.filter((_, i) => i !== index))}>×</button>
            </div>
          ))}
        </div> [cite: 38]

        <button type="submit" className={styles.submitBtn}>Submit Report</button> [cite: 39]
      </form>
    </div>
  );
};

export default DPRForm;