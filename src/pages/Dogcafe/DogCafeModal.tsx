import React, { useState } from "react";


// Propsの型定義
interface ModalProps {
  show: boolean; // モーダルを表示するか（true: 表示、false: 非表示）
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  storeName: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onSubmit, storeName }) => {
  const [selectedRating, setSelectedRating] = useState<number>(0); // 評価の初期値
  const [comment, setComment] = useState<string>(""); // コメントの初期値
  const [error, setError] = useState<string | null>(null); // エラーメッセージ

  if (!show) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // フォームのリロードを防ぐ
    try {
      if (selectedRating <= 0) {
        setError("評価を入力してください。");
        return;
      }
      if (comment.trim() === "") {
        setError("口コミを入力してください。");
        return;
      }
      //入力が正しい時に、送信処理
      onSubmit(selectedRating, comment.trim());
      setSelectedRating(0);
      setComment("");
      setError(null);
      onClose();
    } catch (error) {
      console.error(error);
      setError("エラーが発生しました");
    }
  };

  const handleStarClick = (value: number) => {
    if (selectedRating === value) {
      setSelectedRating(0);
    } else {
      setSelectedRating(value);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h1>{storeName}</h1>
        <h2>口コミを投稿</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              評価:
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`star ${value <= selectedRating ? "selected" : ""}`}
                    onClick={() => handleStarClick(value)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>
              口コミ:
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="modal-textarea"
              />
            </label>
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="modal-submit-button">
            投稿
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
