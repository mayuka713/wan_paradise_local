import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./DogRunStoreList.css";
import Header from "../Header";
import Footer from "../Footer";
import "../Header.css";
import ImageSlider from "../../ImageSlider";


interface Store {
  store_id: number;
  store_name: string;
  store_description: string;
  store_address: string;
  store_opening_hours: number;
  store_phone_number: string;
  store_url: string;
  store_img: string[];
  reviews?: Review[];
}

interface Review {
  id: number;
  store_id: number;
  rating: number;
  comment: string;
}

interface Tag {
  id: number;
  name: string;
  tag_type: number;
}

const DogRunStoreList: React.FC = () => {
  const { prefectureId } = useParams<{ prefectureId: string }>();
  const [store, setStore] = useState<Store[]>([]);
  const [type1Tag, setType1Tag] = useState<Tag[]>([]);
  const [type2Tag, setType2Tag] = useState<Tag[]>([]);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  // タグの一覧を取得する
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:5003/tags");
        if (!response.ok) {
          throw new Error("タグ情報の取得に失敗しました");
        }
        const data: Tag[] = await response.json();
        const type1 = data.filter((tag) => tag.tag_type === 1);
        const type2 = data.filter((tag) => tag.tag_type === 2);

        setType1Tag(type1);
        setType2Tag(type2);
        setError(null); // エラーをリセット
      } catch (error) {
        console.error(error);
        setError("タグ情報の取得に失敗しました");
      }
    };
    fetchTags();
  }, []);

  // 各都道府県を設定
  useEffect(() => {
    const prefectureNames: { [key: string]: string } = {
      "1": "北海道",
      "13": "東京",
      "27": "大阪",
    };
    setSelectedPrefecture(
      prefectureNames[prefectureId ?? ""] || "ドッグラン情報がありません");
  }, [prefectureId]);

  // タグ選択の処理
  const handleTagClick = (tagId: number) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]);
  };

  // 店舗データの取得
  useEffect(() => {
    const fetchStores = async () => {
      try {
        let url = `http://localhost:5003/stores/list/${prefectureId}/1`;
        if (selectedTagIds.length > 0) {
          url = `http://localhost:5003/stores/list/tag/${prefectureId}/1?tagIds=${selectedTagIds.join(",")}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("データ取得に失敗しました");
        }
        const data = await response.json();
        setStore(data);
        setError(null);
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
        setError("タグに該当するドッグランがありません");
      }
    };
    fetchStores();
  }, [prefectureId, selectedTagIds]);
  store.forEach((storeItem) => {
    console.log("取得した店舗情報:", storeItem);
    console.log("口コミデータ:", storeItem.reviews);
  });

  return (
    <>
      <Header />
      <div className="content">
        {selectedPrefecture === "ドッグラン情報がありません" ? (
          <h2>{selectedPrefecture}</h2>
        ) : (
          <>
            <h2 className="store-list">{selectedPrefecture}のドッグラン</h2>
            <h3 className="search-tags">行きたい条件のドッグランを探す</h3>
            <div className="type1-tags">
              {/* type1Tagを表示 */}
              {type1Tag.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.id)}
                  className={`dogrun-tag-button ${selectedTagIds.includes(tag.id) ? "selected" : ""
                    }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
            {/* type2Tagを表示 */}
            <h3 className="search-tags2">設備を探す</h3>
            <div className="type2-tags">
              {type2Tag.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.id)}
                  className={`dogrun-tag-button ${selectedTagIds.includes(tag.id) ? "selected" : ""
                    }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
            {/* エラーメッセージ */}
            {error ? (
              <p className="error-message">{error}</p>
            ) : (
              <div className="store-list">
                {/* 店舗がない場合 */}
                {store.length === 0 ? (
                  <p>該当するドッグランはありません。</p>
                ) : (
                  // 店舗がある場合
                  store.map((storeItem) => {
                    const reviews = storeItem.reviews ?? [];
                    // 初期値 0 を指定して NaN を防ぐ
                    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
                    // レビューがない場合、平均評価を 0 にする
                    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
                    console.log("averageRating:", averageRating);
                    console.log("stars width:", !isNaN(averageRating) ? (averageRating / 5) * 100 : 0);

                    return (
                      <Link
                        to={`/dogrun/detail/${storeItem.store_id}`}
                        className="store-item"
                        key={storeItem.store_id}
                      >
                        {/* 画像の表示 */}
                        <ImageSlider images={storeItem.store_img} />

                        {/* 星評価の表示 */}
                        <div className="star-rating-container">
                            <div className="stars-background-storelist">★★★★★</div>
                            <div
                              className="stars-filled-storelist"
                              style={{
                                width: `${(averageRating / 5) * 100}%` 
                                }}> 
                              ★★★★★
                            </div>
                          <span className="average-rating-value-storelist">
                            {averageRating.toFixed(1)}
                          </span>
                        </div>
                        <h3 className="store-name-storelist">{storeItem.store_name}</h3>
                        <p className="store-description">
                        {storeItem.store_description}</p>
                        <p><strong>住所: </strong>{storeItem.store_address}</p>
                        <p><strong>電話: </strong> {storeItem.store_phone_number}</p>
                        <p><strong>営業時間: </strong>{storeItem.store_opening_hours}</p>
                      </Link>
                    );
                  })
                )}
              </div>
            )}
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default DogRunStoreList;
