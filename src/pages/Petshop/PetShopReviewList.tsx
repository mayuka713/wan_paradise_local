import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Review = {
  id: number;
  name: string;
  store_id: number;
  rating: number;
  comment: string;
  date: string;
  created_at: string;
  updated_at: string;
};

const PetShopReviewList: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [storeName, setStoreName] = useState<string>("");

  //口コミを取得
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/reviews`);
        const data = await response.json();

        // 明示的に created_at で降順ソート
        const storedData = data.sort(
          (a: Review, b: Review) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        // 平均評価を計算
        const avgRating = storedData.length
          ? storedData.reduce((sum: number, review: Review) => sum + review.rating, 0) /
            storedData.length
          : 0;

        setReviews(storedData);
        setAverageRating(avgRating);
      } catch (error) {
        console.error(error);
        setError("口コミの取得に失敗しました");
      }
    };


 //店舗名を取得する
  const fetchStoreName = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/stores/store-name/${storeId}`);
      const data = await response.json();
      console.log("取得した店舗データ");
      setStoreName(data.store_name);
    } catch (error){
      setError("店舗情報の取得に失敗しました");
    }
  };
  fetchReviews();
  fetchStoreName();
}, [storeId]);


//口コミ投稿処理
  const handleReviewSubmit = async (rating: number, comment: string) => {
    try {
      console.log("storeId:", storeId);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          store_id: storeId,
          rating,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error("コメント投稿に失敗しました");
      }
      const createdReview = (await response.json()) as Review;

      setReviews((prev) => [createdReview, ...prev]);
      setError(null);
      setShowModal(false);
    } catch (error) {
      console.error(error);
      setError("コメント投稿に失敗しました");
    }
  };

  const handleStarClick = (value: number) => {
    setSelectedRating(value);
  };

  return (
    <div className="review-container">
      {/* 平均評価を表示 */}
      <h1 className = "store-name">{storeName || "店舗名を取得中"}</h1>
      <div className="average-rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`star ${value <= Math.round(averageRating) ? "selected" : ""}`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="average-rating-value">
        {averageRating.toFixed(1)} 
      </span>
      <h2 className="review-title">口コミ一覧</h2>
      <button onClick={() => setShowModal(true)} style={{ marginTop: "20px" }}>
        投稿
      </button>
      {error && reviews.length > 0 && <p style={{ color: "red" }}>{error}</p>}
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <p className="review-rating">
  
            {[1, 2, 3, 4, 5].map ((value) => (
              <span key= {value} className= {`star ${value <= review.rating ? "selected" : ""}`}
              >
                ★
              </span>
              
            ))}
        <strong>{review.rating}.0</strong> 
          </p>
          <p className="review-comment">
            <strong>口コミ:</strong> {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PetShopReviewList;
