import React, { useState, useEffect } from "react";
import "./GlobalImageSlider.css";

interface GlobalImageSliderProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const GlobalImageSlider: React.FC<GlobalImageSliderProps> = ({
  images,
  autoPlayInterval = 3000, // デフォルトで3秒ごとにスライド
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // 次の画像に進む
    }, autoPlayInterval);

    return () => clearInterval(interval); // コンポーネントのアンマウント時にクリーンアップ+
  }, [images, autoPlayInterval]);

  return (
    <div className="global-image-slider">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="slider-image"
      />
    </div>
  );
};

export default GlobalImageSlider;
