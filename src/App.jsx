
import './App.css'
import Home from "../src/Components/Home"
import {Routes , Route} from "react-router-dom";
import Navbar from './Components/Navbar';
import SignUp from './Pages/signUpPage';
import LoginUp from './Pages/loginPage';
import CrackAI from './Pages/crackAI';
import {UserAnalytics} from './Pages/userAnalytics';
import InterviewSets from '../src/Components/InterviewSets';
import SetDetails from "../src/Components/SetDetails";
import MCQSection from "../src/Components/MCQSection";
import TheorySection from "../src/Components/TheoriticalSection";
import CodingSection from "../src/Components/CodingSection";
import ShowCorrectMcq from './Components/ShowCorrectMcq';
import CodeEditor from './Pages/CodeEditor';
import AiChecker from './Components/AiChecker';
import AiResponse from './Components/AiResponse';
import  CrackITSteps from "./Components/StepSection"
import Footer from './Components/Footer';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../src/Context/UserContext";
import Logout from './Pages/LogoutPage';
import {useLocation} from "react-router-dom";






function App() {
  const location = useLocation();
  const hideFooter = location.pathname === "/code-editor/:id";

  return (
    <div>
       <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path='/logout' element={<Logout/>}></Route>
      <Route path="/" element={<Home/>} ></Route>
      <Route path='/signUp' element={<SignUp/>}></Route>
      <Route path='/login' element={<LoginUp/>}></Route>
      <Route path='/aiSearch' element={<CrackAI/>}></Route>
      <Route path='/userAnalytics/:id' element={<UserAnalytics/>}></Route>
      <Route path='/interviewSets' element={<InterviewSets/>}></Route>
      <Route path="/set-details/:id" element={<SetDetails />} />
      <Route path="/mcq/:id" element={<MCQSection />} />
      <Route path="/theory/:id" element={<TheorySection />} />
      <Route path="/coding/:id" element={<CodingSection />} />
      <Route path="/correctMCQ" element={<ShowCorrectMcq />} />  
      <Route path="/code-editor/:id" element={<CodeEditor />} ></Route>
      <Route path="/aiResponse/:userAnswerId" element={<AiResponse />} ></Route>
      <Route path="/aiChecker" element={<AiChecker />} ></Route>
      <Route path="/stepSection" element={<CrackITSteps />} ></Route>
    </Routes>
    <Toaster/>
    {!hideFooter && <Footer />}
    </AuthProvider>
    </div>
    
   
  )
}
export default App
