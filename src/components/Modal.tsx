import React, { useState } from "react";
import { useModal } from "../context/ModalContext";
import "../components/Modal.css";

interface ModalProps {
  onSubmit: (rating: number, comment: string) => Promise<void>//投稿処理を受け取る
}

const Modal: React.FC<ModalProps> = ({ onSubmit }) => {
  const { isModalOpen, closeModal, storeName } = useModal();
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);


  if (!isModalOpen) return null; // モーダルが閉じている場合は何も表示しない

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRating <= 0) {
      setError("評価を入力してください。");
      return;
    }
    if (comment.trim() === "") {
      setError("口コミを入力してください。");
      return;
    }

    try {
      await onSubmit(selectedRating, comment.trim());
      setSelectedRating(0);
      setComment("");
      setError(null);
      closeModal(); // モーダルを閉じる
  } catch (err) {
    console.error("投稿エラー", err);
    setError("投稿に失敗しました");
    }
  };

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={closeModal}>&times;</span>
        <h1 className="titleName">{storeName}</h1>
        <h2 className="review-post">口コミを投稿</h2>
        <form onSubmit={handleSubmit}>
          <div className="rating-container">
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`star ${value <= selectedRating ? "selected" : ""}`}
                  onClick={() => setSelectedRating(value)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="comment-container">
            <textarea
              className="comment-textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="口コミを入力してください"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">投稿</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
