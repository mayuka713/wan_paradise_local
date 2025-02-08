import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TopPage.css";
import HamburgerMenu from "../HamburgerMenu";
import DogrunImage from "../pages/assets/images/Dogrun/dogrun.top.png";
import dogcafeImage from "../pages/assets/images/Dogcafe/dogcafe.top.png";
import petshopImage from "../pages/assets/images/Petshop/petshop.top.png";
import hospitalImage from "../pages/assets/images/Hospital/hospital.png";
import dogrunNameTag from "../pages/assets/images/Dogrun/dogrun-nametag.png";
import dogCafeNameTag from "../pages/assets/images/Dogcafe/dogcafe-nametag.png";
import petshopNameTag from "../pages/assets/images/Petshop/petshop-nametag.png";
import hospitalNameTag from "../pages/assets/images/Hospital/hospital-nametag.png";
import Header from "./Header";
import Footer from "./Footer";
import Button from "../components/Button";


const TopPage: React.FC = () => {

  const [isMobile, setIsMobile] = useState(false);
  const [ showTitle, setShowTitle ] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 初回実行

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowTitle(true);
    }, );

    setTimeout(() => {
      setShowScroll(true);
    }, 1600);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const fadeElements = document.querySelectorAll<HTMLElement>(".fade-in");
      fadeElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          el.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="TopPage-container">
      {/* ハンバーガーメニュー */}
      <HamburgerMenu />
      <Header />

      {/* メインタイトル */}
      <p className={`main-title ${showTitle ? "show" : ""}`}>
        ドッグラン、ドッグカフェ、ペットショップや動物病院など
        <br />
        様々なわんこの情報をご紹介しております!
      </p>

      {/* 各セクション */}
      <div
        className={
          isMobile ? "scroll-container mobile" : "scroll-container desktop"
        }
      >
        {isMobile ? (
          
          // スマホ用レイアウト
        <div className="scroll-content">
          <Button/>
            <Link to="/dogrun" className="fade-in">
              <img src={dogrunNameTag} alt="ドッグランネームタグ" />
              <img
                src={DogrunImage}
                alt="ドッグランのイラスト"
                className="item"
              />
            </Link>
            <Link to="/dogcafe" className="fade-in">
              <img src={dogCafeNameTag} alt="ドッグカフェネームタグ" />
              <img
                src={dogcafeImage}
                alt="ドッグカフェのイラスト"
                className="item"
              />
            </Link>
            <Link to="/petshop" className="fade-in">
              <img src={petshopNameTag} alt="ペットショップネームタグ" />
              <img
                src={petshopImage}
                alt="ペットショップのイラスト"
                className="item"
              />
            </Link>
            <Link to="/hospital" className="fade-in">
              <img src={hospitalNameTag} alt="病院ネームタグ"/>
              <img 
                src={hospitalImage} alt="病院のイラスト" className="item" />
            </Link>
          </div>
        ) : (
          // PC用レイアウト
          <div className="scroll-container">
            <div className="scroll-content">
              <Link to="/dogrun">
                <img
                  src={dogrunNameTag}
                  alt="ドッグランネームタグ"
                  className="item-nametag"
                />
                <img
                  src={DogrunImage}
                  alt="ドッグランのイラスト"
                  className="item"
                />
              </Link>
              <Link to="/dogcafe">
                <img
                  src={dogCafeNameTag}
                  alt="ドッグカフェネームタグ"
                  className="item-nametag"
                />
                <img
                  src={dogcafeImage}
                  alt="ドッグカフェのイラスト"
                  className="item"
                />
              </Link>
              <Link to="/petshop">
                <img
                  src={petshopNameTag}
                  alt="ペットショップネームタグ"
                  className="item-nametag"
                />
                <img
                  src={petshopImage}
                  alt="ペットショップのイラスト"
                  className="item"
                />
              </Link>
              <Link to="/hospital">
                <img
                  src={hospitalNameTag}
                  alt="病院ネームタグ"
                  className="item-hospital-nametag"
                />
                <img
                  src={hospitalImage}
                  alt="病院のイラスト"
                  className="hospital-item"
                />
              </Link>
            </div>
            <div className="scroll-content">
              <Link to="/dogrun">
                <img src={dogrunNameTag} alt="ドッグランネームタグ" />
                <img
                  src={DogrunImage}
                  alt="ドッグランのイラスト"
                  className="item"
                />
              </Link>
              <Link to="/dogcafe">
                <img src={dogCafeNameTag} alt="ドッグカフェネームタグ" />
                <img
                  src={dogcafeImage}
                  alt="ドッグカフェのイラスト"
                  className="item"
                />
              </Link>
              <Link to="/petshop">
                <img src={petshopNameTag} alt="ペットショップネームタグ" />
                <img
                  src={petshopImage}
                  alt="ペットショップのイラスト"
                  className="item"
                />
              </Link>
              <Link to="/hospital">
                <img src={hospitalNameTag} alt="病院ネームタグ" className="item-hospital-nametag" />
                <img
                  src={hospitalImage}
                  alt="病院のイラスト"
                  className="hospital-item"
                />
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TopPage;
