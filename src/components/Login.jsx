{
  !isLoggedIn && activeSection === "auth" && (
    <div className="fade-in auth-container">
      <h1>{authMode === "login" ? "Login" : "Register"}</h1>
      {authMode === "register" && (
        <form onSubmit={handleRegister}>{/* Registration Fields */}</form>
      )}
      {authMode === "login" && (
        <form onSubmit={handleLogin}>{/* Login Fields */}</form>
      )}
    </div>
  );
}
