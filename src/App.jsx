// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/download.png";
import model from "./assets/model.jpg";
import istock from "./assets/istock.jpg";
import portrait from "./assets/portrait.jpg";
import Assignments from './Assignments.jsx';


function App() {
  const [activeSection, setActiveSection] = useState("welcome");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("student");
  const [error, setError] = useState("");
  const slides = [model, istock, portrait];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);


  const getUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const users = getUsers();
    const userExists = users.find((user) => user.username === username);

    if (userExists) {
      setError("Username already exists.");
      return;
    }

    const newUser = { username, password, userType: selectedUserType };
    users.push(newUser);
    saveUsers(users);
    setIsLoggedIn(true);
    setUserType(selectedUserType);
    setActiveSection("home");
    setUsername("");
    setPassword("");
    setSelectedUserType("student");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const users = getUsers();
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setIsLoggedIn(true);
      setUserType(user.userType);
      setActiveSection("home");
      setUsername("");
      setPassword("");
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setActiveSection("welcome"); 
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim() === "") return; 
    setQuestions([...questions, { text: newQuestion, answers: [] }]);
    setNewQuestion(""); 
  };

  const handleAnswerSubmit = (index, answer) => {
    if (answer.trim() === "") return; 
    const updatedQuestions = [...questions];
    updatedQuestions[index].answers.push(answer);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="background-container">
      <header className="main-header">
        <nav className="main-nav">
          <img src={logo} alt="tracom-logo" className="main-logo" />
          <ul id="main-nav-ul">
            {isLoggedIn && (
              <>
                <li>
                  <a
                    href="#"
                    className={activeSection === "home" ? "active" : ""}
                    onClick={() => setActiveSection("home")}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={activeSection === "about" ? "active" : ""}
                    onClick={() => setActiveSection("about")}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={activeSection === "services" ? "active" : ""}
                    onClick={() => setActiveSection("services")}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={activeSection === "team" ? "active" : ""}
                    onClick={() => setActiveSection("team")}
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={activeSection === "assignments" ? "active" : ""}
                    onClick={() => setActiveSection("assignments")}
                  >
                    Assignments
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={activeSection === "contact" ? "active" : ""}
                    onClick={() => setActiveSection("contact")}
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </li>
              </>
            )}
            
          </ul>
        </nav>
      </header>

      <div className="content">
        
        {!isLoggedIn && activeSection === "welcome" && (
          <div className="fade-in auth-welcome-container">
            <h1>Welcome to Tracom Academy</h1>
            <p>Leading the industry with innovative solutions.</p>
            <button
              onClick={() => {
                setAuthMode("register");
                setActiveSection("auth");
              }}
              className="primary-button"
            >
              Register
            </button>
            <p className="switch-auth">
              Already have an account?{" "}
              <button
                onClick={() => {
                  setAuthMode("login");
                  setActiveSection("auth");
                }}
                className="secondary-button"
              >
                Login
              </button>
            </p>
          </div>
        )}

        {!isLoggedIn && activeSection === "auth" && (
          <div className="fade-in auth-container">
            <h1>{authMode === "login" ? "Login" : "Register"}</h1>
            {authMode === "register" && (
              <form onSubmit={handleRegister} className="auth-form">
                <div className="form-group">
                  <label htmlFor="register-username">Username:</label>
                  <input
                    type="text"
                    id="register-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="register-password">Password:</label>
                  <input
                    type="password"
                    id="register-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="register-userType">User Type:</label>
                  <select
                    id="register-userType"
                    value={selectedUserType}
                    onChange={(e) => setSelectedUserType(e.target.value)}
                    className="form-select"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="primary-button">
                  Register
                </button>
                <p className="switch-auth">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      setError("");
                    }}
                    className="secondary-button"
                  >
                    Login
                  </button>
                </p>
              </form>
            )}
            {authMode === "login" && (
              <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                  <label htmlFor="login-username">Username:</label>
                  <input
                    type="text"
                    id="login-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="login-password">Password:</label>
                  <input
                    type="password"
                    id="login-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="primary-button">
                  Login
                </button>
                <p className="switch-auth">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("register");
                      setError("");
                    }}
                    className="secondary-button"
                  >
                    Register
                  </button>
                </p>
              </form>
            )}
          </div>
        )}

     
        {activeSection === "home" && isLoggedIn && (
          <div className="fade-in home-container">
            <h1 className="typewriter-text">Welcome to Tracom Academy</h1>
            <p className="typewriter-text" style={{ animationDelay: "3.5s" }}>
              Leading the industry with innovative solutions.
            </p>
            {userType === "student" && (
              <div className="student-section">
                <h2>Ask a Question</h2>
                <form onSubmit={handleQuestionSubmit} className="question-form">
                  <input
                    type="text"
                    placeholder="Ask a question..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="form-input"
                  />
                  <button type="submit" className="primary-button">
                    Submit
                  </button>
                </form>
                <h3>Questions:</h3>
                <ul className="question-list">
                  {questions.map((question, index) => (
                    <li key={index} className="question-item">
                      <strong>{question.text}</strong>
                      <div className="answer-input">
                        <input
                          type="text"
                          placeholder="Your answer..."
                          onBlur={(e) =>
                            handleAnswerSubmit(index, e.target.value)
                          }
                          className="form-input"
                        />
                      </div>
                      <ul className="answer-list">
                        {question.answers.map((answer, ansIndex) => (
                          <li key={ansIndex} className="answer-item">
                            {answer}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {userType === "teacher" && (
              <div className="teacher-section">
                <h2>Manage Assignments</h2>
                
              </div>
            )}
          </div>
        )}

        {isLoggedIn && activeSection === "about" && (
          <div className="fade-in about-container">
            <h1>About Us</h1>
            <p>We are a leading technology and training institution.</p>
            <button className="cta-button">Learn More</button>
          </div>
        )}

        {isLoggedIn && activeSection === "services" && (
          <div className="fade-in services-container">
            <div className="card">
              <h2>Software Development</h2>
              <p>We provide customized software solutions for businesses.</p>
            </div>
            <div className="card">
              <h2>Training</h2>
              <p>
                Get the latest skills in technology with our training programs.
              </p>
            </div>
            <div className="card">
              <h2>Consulting</h2>
              <p>
                Our team provides consulting services to help grow your
                business.
              </p>
            </div>
          </div>
        )}

        
        {isLoggedIn && activeSection === "team" && (
          <div className="fade-in team-container">
            <div className="slideshow">
              <img
                src={slides[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
                className="slideshow-image"
              />
            </div>
            <p>Meet the innovative minds behind our success.</p>
          </div>
        )}

        {isLoggedIn && activeSection === "assignments" && (
          <div className="fade-in assignments-container">
            <Assignments userType={userType} />
          </div>
        )}

        {isLoggedIn && activeSection === "contact" && (
          <div className="fade-in contact-container">
            <h1>Contact Us</h1>
            <p>Get in touch with us via email or phone.</p>
            <button className="cta-button">Get in Touch</button>
          </div>
        )}
      </div>

    
    </div>
  );
}

export default App;
