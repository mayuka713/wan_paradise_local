import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        method: "POST",
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
 
        const data = await response.json();
        if (response.ok) {
        navigate("/top");
      } else {
        
        setErrorMessage("メールアドレスまたはパスワードが間違っています。");
      }
    } catch (error) {
      setErrorMessage("エラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <div className="login-container">
      <header className="login">
        <p className="login-title">全国のドッグラン、ドッグカフェ、ペットショップ、動物病院を紹介しています!</p>
        <h1>wan paradise</h1>
        <h2>ログイン</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="メールアドレス"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="パスワード"
            />
          </div>
          <button type="submit" className="login-button">ログイン</button>
          <p>初めてご利用の方</p>
          <button
            type="button" className="new-register-button"
            onClick={() => {
              navigate("/register");
            }} >
            新規会員登録
          </button>
        </form>
        {errorMessage && (
          <p id="errorMessage" style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}
      </header>
    </div>
  );
}

export default Login;