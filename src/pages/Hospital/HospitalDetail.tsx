import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ImageSlider from "../../ImageSlider";
import "./HospitalDetail.css";

interface Store {
  store_id: number;
  store_name: string;
  store_description: string;
  store_address: string;
  store_opening_hours: string;
  store_phone_number: string;
  store_url: string;
  store_img: string[];
  tags: string[];
  reviews?: Review[];
}

interface Review {
  id: number;
  store_id: number;
  rating: number;
  comment: string;
}

const getUserIdFromCookie = (): number | null => {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "user_id") {
      const parsedValue = parseInt(value, 10);
      return isNaN(parsedValue) ? null : parsedValue;
    }
  }
  return null;
};

const HospitalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(0);
  const MAP_API_KEY = process.env.REACT_APP_MAP_API_KEY;

  //クッキーからuserIdを取得するための関数
  useEffect(() => {
    const userIdFromCookie = getUserIdFromCookie();
    setUserId(userIdFromCookie);
  }, []);

  //店舗の口コミ
  useEffect(() => {
    const fetchStoreAndReviews = async () => {
      try {
        const storeResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/stores/detail/${id}`);
        const reviewResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/reviews`);

        if (!storeResponse.ok || !reviewResponse.ok) {
          throw new Error("データ取得に失敗しました");
        }

        const storeData: Store = await storeResponse.json();
        const reviewData: Review[] = await reviewResponse.json();

        const reviews = reviewData.filter(
          (review) => review.store_id === storeData.store_id);
        setStore({ ...storeData, reviews });
      } catch (err: any) {
        setError("店舗情報の取得に失敗しました");
      }
    };
    if (id) {
    fetchStoreAndReviews();
    }
  }, [id]);




  //-------指定された店舗の情報とその店舗がユーザーのお気に入りに登録されているかどうかを取得する

  useEffect(() => {
    const fetchFavorites= async () => {
      if (userId === null) return;

      try {
        const favoriteResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/favorites/${userId}`);
        if (favoriteResponse.ok) {
          const favoriteData: {store_id: number}[] = await favoriteResponse.json();
          setIsFavorite(favoriteData.some((fav) => fav.store_id === Number(id)));
        }

      } catch (err: any) {
        console.error("お気に入りエラー",err);
      }
    };
    if (id && userId !== null) {
      fetchFavorites();
    }
    
  }, [id, userId]);

  // お気に入りの追加・解除
 const handleFavoriteClick = async () => {
  if (!store || userId === null) return;

  const url = `${process.env.REACT_APP_BASE_URL}/favorites`;
  const method = isFavorite ? "DELETE" : "POST";
  const body = JSON.stringify({
    user_id: userId,
    store_id: store.store_id,
  });

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body,
    });
    if (!response.ok) throw new Error("お気に入りの更新に失敗しました");
    setIsFavorite(!isFavorite);
  } catch (err) {
    setError("お気に入りの更新に失敗しました");
  }
};


  if (error) return <div className="container">{error}</div>;
  if (!store) return <div className="container">データを読み込んでいます...</div>;

  //平均評価の計算
  const averageRating =
    store.reviews && store.reviews.length > 0
      ? store.reviews.reduce((sum, rev) => sum + rev.rating, 0) /
      store.reviews.length
      : 0;



  return (
    <>
      <Header />
      <div className="detail-container">
        <h1 className="detail-title">{store.store_name}</h1>
        <div className="container">
        {store.store_img.length > 0 ? (
          <ImageSlider images={store.store_img} />
        ) : (
          <p>画像がありません</p>
        )}
        {store.reviews && store.reviews.length > 0 && (
          <Link
            to={`/hospital/reviews/${store.store_id}`}
            className="review-button-detail"
          >
            口コミを見る
          </Link>
        )}
      </div>
        {/* 平均評価 */}
        <div style={{ margin: "20px 0" }}>
          {store.reviews && store.reviews.length > 0 ? (
            <>
              <div style={{ fontSize: "20px", color: "gray" }}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`star ${
                      value <= Math.round(averageRating) ? "selected" : ""
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                {averageRating.toFixed(1)}
              </p>
            </>
          ) : (
            <p>まだ口コミはありません</p>
          )}
        </div>

        <p>
          <strong>住所: </strong>
          {store.store_address}
        </p>
        {MAP_API_KEY && (
          <iframe
            title="Google Map"
            width="100%"
            height="300"
            style={{ border: "0", borderRadius: "8px" }}
            src={`https://www.google.com/maps/embed/v1/place?key=${MAP_API_KEY}&q=${encodeURIComponent(
              store.store_address
            )}`}
            allowFullScreen
          ></iframe>
        )}
        <p>電話番号: {store.store_phone_number}</p>
        <p>営業時間: {store.store_opening_hours}</p>

        <button
          onClick={handleFavoriteClick}
          className={`favorite-button ${isFavorite ? "active" : ""}`}
        >
          {isFavorite ? "お気に入り解除" : "お気に入り登録"}
        </button>
        <br />
        <a
          href={store.store_url}
          target="_blank"
          rel="noopener noreferrer"
          className="official-site"
        >
          店舗の公式サイト
        </a>
      </div>
      <Footer />
    </>
  );
};

export default HospitalDetail;