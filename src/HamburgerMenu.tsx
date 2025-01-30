import React, { useState } from "react";
import "./HamburgerMenu.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const menuItems = [
    { label: "トップページ", link: "/top"},
    { label: "ドッグラン", link: "/dogrun" },
    { label: "ドッグカフェ", link: "/dogcafe" },
    { label: "ペットショップ", link: "/petshop" },
    { label: "動物病院", link: "/hospital" },
    { label: "お気に入り", link: "/favorites" },
  ];


  return (
    <div className="hamburger-menu">
      <div
        className={`burger ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </div>
      <nav className={`menu ${isOpen ? "visible" : ""}`}>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
