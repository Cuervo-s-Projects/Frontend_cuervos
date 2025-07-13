import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UploadPage from './pages/UploadPage';
<<<<<<< HEAD
import QuizPage from './pages/QuizPage';


=======
import VideoPage from './pages/VideoPage';
import SearchResultsPage from './pages/SearchResultsPage';
>>>>>>> develop

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/upload" element={<UploadPage />} />
<<<<<<< HEAD
                <Route path="/quiz" element={<QuizPage />} />
=======
                <Route path="/video/:id" element={<VideoPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
>>>>>>> develop
            </Routes>
        </Router>
    );
}

export default App
