// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TopPage from "./pages/TopPage";
import { DogRunPage, DogRunDetailPage } from "./pages/DogRunPage"; // ドッグランページのインポート
import DogcafePage from "./pages/DogCafePage";
import OsakaDogCafe from "./pages/OsakaDogCafe";
import PetshopPage from "./pages/PetshopPage";
import HospitalPage from "./pages/HospitalPage";
import KansaiDogCafe from "./pages/KansaiDogCafe";
var App = function () {
    return (<Router>
      <div className="App">
        <Routes>
          {/* ログインページ */}
          <Route path="/" element={<Login />}/>
          {/* 登録ページ */}
          <Route path="/register" element={<Register />}/>
          {/* トップページ */}
          <Route path="/top" element={<TopPage />}/>
          {/* ドッグランページ */}
          <Route path="/dogrun" element={<DogRunPage />}/>
          <Route path="/dogrun/:prefecture" element={<DogRunDetailPage />}/>
          {/* ドッグカフェページ */}
          <Route path="/dogcafe" element={<DogcafePage />}/>
          {/* 大阪ドッグカフェ */}
          <Route path="/dogcafe/osaka" element={<OsakaDogCafe />}/>
                    {/* ペットショップページ */}
          <Route path="/petshop" element={<PetshopPage />}/> 
          {/* 病院ページ */}
          <Route path="/hospital" element={<HospitalPage />}/>
          <Route path="/dogcafe/kansai" element={<KansaiDogCafe />}/>
        </Routes>
      </div>
    </Router>);
};
export default App;
