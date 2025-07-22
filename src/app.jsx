import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UploadPage from './pages/UploadPage';
import VideoPage from './pages/VideoPage';
import SearchResultsPage from './pages/SearchResultsPage';
import QuizPage from './pages/QuizPage';
import ProfilePage from './pages/ProfilePage';
import FormCreatePage from './pages/FormCreatePage';
import QuizResultPage from "./pages/QuizResultPage";

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
                <Route path="/quiz/:videoId" element={<QuizPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/quiz/create/:videoId" element={<FormCreatePage />} />
                <Route path="/quiz-results/:quizId" element={<QuizResultPage />} />
            </Routes>
        </Router>
    );
}

export default App
