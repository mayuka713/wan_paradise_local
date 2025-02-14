import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DogRunPage.css";
import DogrunImage from "../assets/images/Dogrun/dogrun.top.png";
import Header from "../Header";
import Footer from "../Footer";

interface Store {
  store_id: number;
  store_name: string;
  description: string;
  store_img: string[];
  address: string;
  phone_number: string;
  opening_hours: string;
  store_url: string;
  prefecture_name: string;
}

const DogRunPage: React.FC = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState<Store[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const handleClick = () => {
    navigate("/DogrunRegionsList");
  };

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/stores/type/random/1`);
        if (!response.ok) {
          throw new Error(`HTTPエラー: ${response.status}`);
        }

        const data = await response.json();
    
        
        // データを複製してループを作成
        setStores([...data, ...data]);
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
      }
    };

    fetchStoreData();
  }, []);

  useEffect(() => {
    if (!sliderRef.current || stores.length === 0) return;

    const slider = sliderRef.current;
    let startPosition = 0;

    const animate = () => {
      startPosition -= 1; // 速度を設定（0.5pxずつ移動）

      if (Math.abs(startPosition) >= slider.scrollWidth / 2) {
        // スクロール幅の半分を超えたらリセット
        startPosition = 0;
      }

      slider.style.transform = `translateX(${startPosition}px)`;
      animationFrameId.current = requestAnimationFrame(animate); // 再帰的に呼び出す
    };

    // アニメーション開始
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [stores]);

  return (
    <>
      <Header />
      <div className="dogrun-page-container">
        <p onClick={handleClick} className="search-dogrun">
          全国のドッグランを探す→
        </p>
        <div>
          <img src={DogrunImage} alt="ドッグランのイラスト" className="dogrun-image" />
        </div>
        <div className="store-slider-container">
          <div className="dogrun-slider" ref={sliderRef}>
            {stores.map((store, index) => (
              <div
                key={`${store.store_id}-${index}`}
                className="store-card"
                onClick={() => navigate(`/dogrun/detail/${store.store_id}`)}
              >
                {store.store_img.length > 0 && (
                  <img
                    src={store.store_img[0]}
                    alt={store.store_name}
                    className="store-image"
                  />
                )}
                <h3 className="slider-store-name">{store.store_name}</h3>
                <h3 className="slider-prefecture-name">{store.prefecture_name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DogRunPage;
