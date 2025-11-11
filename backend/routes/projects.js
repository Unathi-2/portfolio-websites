const express = require('express');
const router = express.Router();

const projects = [
  {
    id: 1,
    title: "Retail Market Analysis",
    description: "Analyzed customer purchasing patterns to identify key product categories and customer segments, leading to 15% increase in targeted marketing efficiency.",
    technologies: ["Python", "Pandas", "Matplotlib", "Scikit-learn"],
    category: ["python", "ml"],
    image: "/static/images/project1.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Predictive Maintenance Model",
    description: "Developed a model to predict equipment failures with 92% accuracy, reducing downtime by 35% and saving $250k annually in maintenance costs.",
    technologies: ["R", "Machine Learning", "Random Forest"],
    category: ["r", "ml"],
    image: "/static/images/project2.jpg"
  }
];

router.get('/', (req, res) => {
  res.json({ success: true, projects });
});

router.get('/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  res.json({ success: true, project });
});

module.exports = router;