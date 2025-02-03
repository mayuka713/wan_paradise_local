import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TopPage from "./pages/TopPage";
import FavoritePage from "./pages/FavoritePage";
import { FavoriteProvider } from "./context/FavoriteContext";
import { ModalProvider } from "./context/ModalContext";
import HamburgerMenu from "./HamburgerMenu";
import MyPage from "./pages/MyPage";

// ドッグランのページ
import DogRunPage from "./pages/Dogrun/DogRunPage";
import DogrunRegionList from "./pages/Dogrun/DogrunRegionList";
import DogRunStoreList from "./pages/Dogrun/DogRunStoreList";
import DogRunDetail from "./pages/Dogrun/DogRunDetail";
import DogRunReview from "./pages/Dogrun/DogRunReviewList";

// ドッグカフェのページ
import DogcafePage from "./pages/Dogcafe/DogCafePage";
import DogCafeRegionList from "./pages/Dogcafe/DogCafeRegionList";
import DogCafeStoreList from "./pages/Dogcafe/DogCafeStoreList";
import DogCafeDetail from "./pages/Dogcafe/DogCafeDetail";
import DogCafeReview from "./pages/Dogcafe/DogCafeReviewList";

// ペットショップのページ
import PetshopPage from "./pages/Petshop/PetShopPage";
import PetShopRegionList from "./pages/Petshop/PetshopRegionList";
import PetShopStoreList from "./pages/Petshop/PetShopStoreList";
import PetShopDetail from "./pages/Petshop/PetShopDetail";
import PetShopReview from "./pages/Petshop/PetShopReviewList";

// 病院のページ
import HospitalPage from "./pages/Hospital/HospitalPage";
import HospitalRegionList from "./pages/Hospital/HospitalRegionList";
import HospitalStoreList from "./pages/Hospital/HospitalStoreList";
import HospitalDetail from "./pages/Hospital/HospitalDetail";
import HospitalReview from "./pages/Hospital/HospitalReviewList";

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {/* ログインページ・新規登録ページ以外でハンバーガーメニューを表示 */}
      {!isAuthPage && <HamburgerMenu />}
      <Routes>
        {/* ログイン・登録 */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* トップページ */}
        <Route path="/top" element={<TopPage />} />
        <Route path="/favorites" element={<FavoritePage />} />

        {/* ドッグランページ */}
        <Route path="/dogrun" element={<DogRunPage />} />
        <Route path="/DogrunRegionsList" element={<DogrunRegionList />} />
        <Route path="/dogrun/:prefectureId" element={<DogRunStoreList />} />
        <Route path="/dogrun/detail/:id" element={<DogRunDetail />} />
        <Route path="/dogrun/reviews/:storeId" element={<DogRunReview />} />

        {/* ドッグカフェページ */}
        <Route path="/dogcafe" element={<DogcafePage />} />
        <Route path="/DogCafeRegionList" element={<DogCafeRegionList />} />
        <Route path="/dogcafe/:prefectureId" element={<DogCafeStoreList />} />
        <Route path="/dogcafe/detail/:id" element={<DogCafeDetail />} />
        <Route path="/dogcafe/reviews/:storeId" element={<DogCafeReview />} />

        {/* ペットショップページ */}
        <Route path="/petshop" element={<PetshopPage />} />
        <Route path="/petshop-regions-list" element={<PetShopRegionList />} />
        <Route path="/petshop/:prefectureId" element={<PetShopStoreList />} />
        <Route path="/petshop/detail/:id" element={<PetShopDetail />} />
        <Route path="/petshop/reviews/:storeId" element={<PetShopReview />} />

        {/* 病院ページ */}
        <Route path="/hospital" element={<HospitalPage />} />
        <Route path="/hospitalregionsList" element={<HospitalRegionList />} />
        <Route path="/hospital/:prefectureId" element={<HospitalStoreList />} />
        <Route path="/hospital/detail/:id" element={<HospitalDetail />} />
        <Route path="/hospital/reviews/:storeId" element={<HospitalReview />} />

        <Route path="/mypage" element = {<MyPage/>} />
      </Routes>
    </>
  );
};


const App: React.FC = () => {
  return (
    <ModalProvider>
      <FavoriteProvider>
        <Router>
          <Layout /> 
        </Router>
      </FavoriteProvider>
    </ModalProvider>
  );
};

export default App;
