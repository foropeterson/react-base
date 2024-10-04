{
  /* Inside your React component (e.g., Register Form) */
}
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
</form>;
