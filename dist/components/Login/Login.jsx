import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    //フォームデータの状態を管理する
    var _a = useState(""), email = _a[0], setEmail = _a[1];
    var _b = useState(""), password = _b[0], setPassword = _b[1];
    var _c = useState(""), errorMessage = _c[0], setErrorMessage = _c[1];
    var navigate = useNavigate(); //useNavigateを定義
    //フォーム送信時の処理
    var handleSubmit = function (e) {
        e.preventDefault(); //ページのロードを防ぐ
        //デモ用のログイン情報
        var correctEmail = "example@example.com";
        var correctPassword = "password123";
        // ログイン情報の検証
        if (email === correctEmail && password === correctPassword) {
            // ログイン成功時の処理
            alert("ログイン成功！");
            setErrorMessage(""); // エラーメッセージをクリア
            navigate("/home"); // ログイン成功後にホームページにリダイレクト
        }
        else {
            setErrorMessage("メールアドレスまたはパスワードが間違っています。");
        }
    };
    // コンポーネントのレンダリング部分
    return (<div className="login-container">
      <header className="login">
        <h1>wan paradise</h1>
        <h2>ログイン</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder="メールアドレス" value={email} onChange={function (e) { return setEmail(e.target.value); }} required aria-label="メールアドレス"/>
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder="パスワード" value={password} onChange={function (e) { return setPassword(e.target.value); }} required aria-label="パスワード"/>
          </div>
          <button type="submit">ログイン</button>
          <p>初めてご利用の方</p>
          <button type="button" onClick={function () {
            navigate("/register"); //新規会員登録ページに推移
        }}>
            新規会員登録
          </button>
        </form>
        {errorMessage && (<p id="errorMessage" style={{ color: "red" }}>
            {errorMessage}
          </p>)}
      </header>
    </div>);
}
export default Login;