const router = require('express').Router();
// We will create the Location and Question models in the next step
// const Location = require('../models/location.model');
// const Question = require('../models/question.model');

// For now, let's use the hardcoded data to ensure the API works.
// We will replace this later with a database call.

const campusLocations = [
    { id: 1, name: "Rishihood Central Library", icon: "BookOpen", position: { x: 25, y: 30 }, description: "Knowledge hub across A, B, C blocks", color: "from-blue-500 to-blue-700", unlocked: true },
    { id: 2, name: "Innovation Labs", icon: "FlaskConical", position: { x: 60, y: 25 }, description: "Cross-block innovation facilities", color: "from-purple-500 to-purple-700", unlocked: true },
    { id: 3, name: "Chai Adda", icon: "Coffee", position: { x: 40, y: 50 }, description: "Popular student hangout spot", color: "from-amber-500 to-amber-700", unlocked: true },
    { id: 4, name: "Pushpa Devi Mess", icon: "Utensils", position: { x: 70, y: 60 }, description: "Main mess with A Block Mess", color: "from-green-500 to-green-700", unlocked: true },
    { id: 5, name: "Fitness Center", icon: "Dumbbell", position: { x: 20, y: 70 }, description: "Wellness facility for all blocks", color: "from-orange-500 to-orange-700", unlocked: true },
    { id: 6, name: "R1, R2, R3 Residencies", icon: "Users", position: { x: 80, y: 40 }, description: "Three residential blocks", color: "from-pink-500 to-pink-700", unlocked: true },
    { id: 7, name: "A, B, C Academic Blocks", icon: "GraduationCap", position: { x: 45, y: 80 }, description: "Three main academic buildings", color: "from-indigo-500 to-indigo-700", unlocked: false }
];

const locationQuestions = {
    1: [{ question: "What is the primary mission of Rishihood University?", options: ["Traditional education", "Holistic development and innovation", "Only technical skills", "Sports excellence"], correct: 1, explanation: "Rishihood University focuses on holistic development, combining academics with personal growth and innovation." }],
    2: [{ question: "What type of projects are typically developed in innovation labs?", options: ["Only software", "Interdisciplinary solutions", "Traditional crafts", "Administrative work"], correct: 1, explanation: "Innovation labs at Rishihood foster interdisciplinary collaboration to solve complex problems." }],
    3: [{ question: "What is the popular name for Rishihood's main canteen?", options: ["Campus Café", "Chai Adda", "Food Court", "Student Center"], correct: 1, explanation: "The main canteen is affectionately known as 'Chai Adda' by students." }],
    4: [{ question: "What is the official name of Rishihood's main mess?", options: ["Campus Mess", "Pushpa Devi Mess", "Central Dining", "University Cafeteria"], correct: 1, explanation: "The main mess is named 'Pushpa Devi Mess'." }],
    5: [{ question: "How does physical fitness impact academic success?", options: ["Reduces study time", "Improves cognitive function and stress management", "Only for sports students", "Waste of energy"], correct: 1, explanation: "Regular exercise improves cognitive function and helps manage academic stress." }],
    6: [{ question: "How many residential blocks serve the Rishihood campus?", options: ["Two residencies", "Three residencies: R1, R2, and R3", "Four residencies", "No on-campus housing"], correct: 1, explanation: "Rishihood has three residential blocks: R1, R2, and R3." }],
    7: [{ question: "Which residency houses 2nd and 3rd year male students?", options: ["R1 Residency", "R2 Residency", "R3 Residency", "External housing"], correct: 0, explanation: "R1 Residency is designated for 2nd and 3rd year male students." }],
};

router.route('/locations').get((req, res) => {
    res.json(campusLocations);
});

router.route('/questions').get((req, res) => {
    res.json(locationQuestions);
});

module.exports = router;