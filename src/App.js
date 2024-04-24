import 'normalize.css';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import ExercisePage from './pages/ExercisePage';
import HelpPage from './pages/HelpPage';
import AddWorkout from './components/crud/AddWorkout';
import AddExercise from './components/crud/AddExercise';
import UnderConstruction from './pages/UnderConstruction';

function App() {
    return (
        <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/exercise-page/:specificworkout" element={<ExercisePage />} />
                <Route path="/help-page" element={<HelpPage />} />
                <Route path="/create-workout" element={<AddWorkout />} />
                <Route path="/add-exercise/:specificworkout" element={<AddExercise />} />
                <Route path="/under-construction" element={<UnderConstruction />} />
            </Routes>
        </Router>
        </div>
    );
}

export default App;