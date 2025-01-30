import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./DogCafeStoreList.css";
import Header from "../Header";
import "../Header.css";
import ImageSlider from "../../ImageSlider";
import Footer from "../Footer";


interface Store {
  store_id: number;
  store_name: string;
  store_description: string;
  store_address: string;
  store_opening_hours: string;
  store_phone_number: string;
  store_dogcafe_detail: string;
  store_img: string[];
  reviews: Review[];
}

interface Review {
  id: number;
  store_id: number;
  rating: number;
  commet: string;
}

interface Tag {
  id: number;
  name: string;
  tag_type: number;
}

const DogCafeStoreList: React.FC = () => {
  const { prefectureId } = useParams<{ prefectureId: string }>();
  const [store, setStore] = useState<Store[]>([]);
  const [type3Tag, setType3Tag] = useState<Tag[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // タグデータ取得
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tags`);
        if (!response.ok) {
          throw new Error("タグの情報の取得に失敗しました");
        }
        const data: Tag[] = await response.json();
        const type3 = data.filter((tag) => tag.tag_type === 3);
        setType3Tag(type3);
      } catch (error) {
        console.error(error);
        setError("タグ情報の取得に失敗しました");
      }
    };
    fetchTags();
  }, []);

  // 都道府県名設定
  useEffect(() => {
    const prefectureNames: { [key: string]: string } = {
      "1": "北海道",
      "13": "東京",
      "27": "大阪",
    };
    setSelectedPrefecture(
      prefectureNames[prefectureId ?? ""] || "ドッグカフェ情報がありません"
    );
  }, [prefectureId]);

// タグ選択のハンドリング
const handleTagClick = (tagId: number) => {
  setSelectedTagIds((prev) =>
    prev.includes(tagId)
      ? prev.filter((id) => id !== tagId)
      : [...prev, tagId]
  );
};

  // 店舗データ取得し、画面に反映する
  useEffect(() => {
    const fetchStores = async () => {
      try {
        let url = `${process.env.REACT_APP_BASE_URL}/stores/list/${prefectureId}/2`;
        if (selectedTagIds.length > 0) {
          url = `${process.env.REACT_APP_BASE_URL}/stores/list/tag/${prefectureId}/2?tagIds=${selectedTagIds.join(
            ","
          )}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("データ取得に失敗しました");
        }
        const data = await response.json();
        setStore(data);
        setError(null);
      } catch (error) {
        console.error("店舗データ取得エラー:", error);
        setError("タグに該当するドッグカフェがありません");
      }
    };
    fetchStores();
  },[prefectureId, selectedTagIds]);
  store.forEach((storeItem) => {
    console.log("取得した店舗情報:", storeItem);
    console.log("口コミデータ:", storeItem.reviews);    
  });

  return (
    <>
    <Header/>
    <div className="content">
      {selectedPrefecture === "ドッグカフェ情報がありません" ? (
        <h2>{selectedPrefecture}</h2>
      ) : (
        <>
        <h2 className="store-list">{selectedPrefecture}のドッグカフェ</h2>
        <h3 className="search-tags">行きたいドッグカフェの条件を選ぶ</h3>
        <div className="type3-tags">
          {type3Tag.map((tag) => (
            <button 
                key={tag.id}
                onClick={() => handleTagClick(tag.id)}
                className={`dogcafe-tag-button ${
                  selectedTagIds.includes(tag.id) ? "selected" : ""
                }`}
                >
                  {tag.name}
                </button>
          ))}
        </div>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="store-list">
            {/* 店舗がない時 */}
            {store.length === 0 ? (
              <p>該当するドッグカフェが見つかりませんでした</p>
            ) : (
              //店舗がある時
              store.map((storeItem) => {
                const reviews = storeItem.reviews ?? [];
                const totalRating = reviews.reduce((sum, review) => sum + ( review.rating || 0),0);

                const averageRating = reviews.length > 0 ? totalRating/reviews.length : 0; 
                
                return (
                  <Link 
                  to={`/dogcafe/detail/${storeItem.store_id}`}
                  className="store-item"
                  key={storeItem.store_id}
                >
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
                          {storeItem.store_description}
                        </p>
                        <p>
                          <strong>住所:</strong> {storeItem.store_address}
                        </p>
                        <p>
                          <strong>電話:</strong> {storeItem.store_phone_number}
                        </p>
                        <p>
                          <strong>営業時間:</strong> {storeItem.store_opening_hours}
                        </p>
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

export default DogCafeStoreList;