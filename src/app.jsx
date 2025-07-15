import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UploadPage from './pages/UploadPage';
import VideoPage from './pages/VideoPage';
import SearchResultsPage from './pages/SearchResultsPage';
import QuizPage from './pages/QuizPage';
import QuizCreatorPage from './pages/QuizCreatorPage';
import ProfilePage from './pages/ProfilePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/video/:id" element={<VideoPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/quiz/:id" element={<QuizPage />} />
                <Route path="/create-quiz" element={<QuizCreatorPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App