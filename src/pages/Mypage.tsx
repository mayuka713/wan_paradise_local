import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../pages/mypage.css";

const MyPage: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formUserName, setFormUserName] = useState(userName);
  const [formEmail, setFormEmail] = useState(email);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5003/auth/me", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("ユーザー情報の取得に失敗しました");
        }
        const data = await response.json();
        setUserName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error("エラー:", error);
      }
    };
    
    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5003/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: formUserName, email: formEmail, password }),
      });
      if (!response.ok) {
        throw new Error("プロフィールの更新に失敗しました");
      }
      const data = await response.json();
      console.log("プロフィール更新成功:", data);
      setUserName(formUserName);
      setEmail(formEmail);
      setPassword("");

      //モーダルを開く
      setIsModalOpen(true);
    } catch (error) {
      console.error("エラー発生:", error);
    }
  };

  return (
    <>
      <div className="mypage-container">
        <Header />
        <h1 className="mypage-title">マイページ</h1>
        <div className="user-info-container">
          <p>ユーザー名：{userName}</p>
          <p>メールアドレス:{email}</p>
        </div>
        <Link to="/favorites">
        <div className="favorite-mypage-container">
          <p className="favorite-mypage">お気に入りを見る</p>
        </div>
        </Link>
        <p className="update-info-title">ユーザー名とパスワードを変更する</p>
        <form className="profile-update-form" onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}>
          <label>
            ユーザ名の変更
            <input
              type="text"
              placeholder="新しいユーザー名を入力"
              onChange={(e) => setFormUserName(e.target.value)}
              className="text-input" 
            />
          </label>
          <label>
            メールアドレスの変更:
            <input
              type="email"
              placeholder="メールアドレスを入力"
              onChange={(e) => setFormEmail(e.target.value)}
              className="email-input" 
            />
          </label>

          <label>
            パスワードの変更
            <input
              type="password"
              placeholder="新しいパスワードを入力"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">保存</button>
        </form>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <p>プロフィールが新しく更新されました!</p>
              <button onClick={() => setIsModalOpen(false)}>閉じる</button>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default MyPage;
