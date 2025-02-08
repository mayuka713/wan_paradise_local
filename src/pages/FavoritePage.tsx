import React, { useEffect, useState } from "react";
import "../pages/FavoritePage.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

interface Favorite {
  id: number;
  user_id: number;
  store_id: number;
  store_name: string;
  store_address: string;
  store_URL: string;
  store_img: string;
  store_type: string;
}

interface Review {
  id: number;
  store_id: number;
  rating: number;
  comment: string;
}

const FavoritePage: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user_id, setUser_id] = useState<number | null>(0)


  const getUserIdFromCookie = (): number | null => {
    const cookies = document.cookie.split("; "); // クッキーを分割
    for (let cookie of cookies) {
      const [name, value] = cookie.split("="); // クッキー名と値を分割
      if (name === "user_id") {
        const parsedValue = parseInt(decodeURIComponent(value), 10); // URIデコードしてから数値に変換
        return isNaN(parsedValue) ? null : parsedValue; // NaNの場合はnullを返す
        console.log(user_id);
      }
    }
    return null; // 該当するクッキーが存在しない場合
  };

  useEffect(() => {
    const userIdFromCookie = getUserIdFromCookie();
    setUser_id(userIdFromCookie); // `number | null` の型で渡す
  }, []);


  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`http://localhost:5003/favorites/${user_id}`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("エラーが返されました");
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("予想しないデータ形式");
        }
        setFavorites(data);
      } catch (error) {
      }
    };

    fetchFavorites();
  }, [user_id]);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5003/reviews", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("口コミデータの取得に失敗しました");
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("予測しないデータ形式");
        }
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, []);


  // store_type に基づいてカテゴリごとに分類
  const categories = [
    { type: "1", name: "ドッグラン" },
    { type: "2", name: "ドッグカフェ" },
    { type: "3", name: "ペットショップ" },
    { type: "4", name: "動物病院" },
  ];

  const categorizedFavorites = categories.map(({ type, name }) => ({
    category: name,
    stores: favorites.filter((favorite) => favorite.store_type === type),
  }));


  return (
    <>
      <Header />
      <div className="favorite-container">
        <header className="app-header">
          <h1 className="favorite-main-title">お気に入りリスト</h1>
        </header>
        {/* カテゴリごとにリストを作成 */}
        {categorizedFavorites.map(({ category, stores }) => (
          <div key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <ul className="favorite-list">
              {stores.length > 0 ? (

                stores.map((favorite) => {

                  //口コミの平均評価を計算
                  const storeReviews = reviews.filter(
                    (review) => review.store_id === favorite.store_id
                  );
                  const averageRating =
                    storeReviews.length > 0 ? storeReviews.reduce((sum, review) => sum + review.rating, 0) /
                      storeReviews.length
                      : 0;


                  // store_type に応じた詳細ページへのリンク
                  let detailPage = "/";
                  switch (favorite.store_type) {
                    case "1":
                      detailPage = `/dogrun/detail/${favorite.store_id}`;
                      break;
                    case "2":
                      detailPage = `/dogcafe/detail/${favorite.store_id}`;
                      break;
                    case "3":
                      detailPage = `/petshop/detail/${favorite.store_id}`;
                      break;
                    case "4":
                      detailPage = `/hospital/detail/${favorite.store_id}`;
                      break;
                    default:
                      detailPage = "/";
                  }
                  return (
                    <Link key={favorite.id} to={detailPage} className="favorite-link">
                      <li className="favorite-item">
                        <img
                          src={
                            (() => {
                              try {
                                const parsedImg = JSON.parse(favorite.store_img); // JSON文字列を配列としてパース
                                return Array.isArray(parsedImg) && parsedImg[0]
                                  ? parsedImg[0] // 配列の最初の要素を取得
                                  : "https://placehold.jp/150x150.png"; // プレースホルダー画像
                              } catch (error) {
                              }
                            })()
                          }
                          alt={favorite.store_name}
                          className="favorite-item-img"
                          onError={(e) => {
                            if (e.currentTarget.src !== "https://placehold.jp/150x150.png") {
                              e.currentTarget.src = "https://placehold.jp/150x150.png";
                            }
                          }}
                        />
                        <h2 className="favorite-title">{favorite.store_name}</h2>

                        {/* 口コミの平均評価を表示 */}
                        <div className="review-average-favorite">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <span
                              key={`star-${favorite.store_id}-${value}`}
                              className={`star ${value <= Math.round(averageRating) ? "selected" : ""}`}
                            >
                              ★
                            </span>
                          ))}

                          <strong>{averageRating.toFixed(1)}</strong>
                        </div>
                      </li>
                    </Link>
                  );
                })
              ) : (
                <p className="no-favorites">お気に入りがまだ登録されていません。</p>
              )}
            </ul>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default FavoritePage;