import React, { useEffect, useState } from "react";


// データの型を定義
type Store = {
  id: number;
  name: string;
  description: string;
  address: string;
};

const StoresList: React.FC = () => {

  const [stores, setStores] = useState<Store[]>([]);   // APIから取得したデータを保存するためのステート
  useEffect(() => {
    // APIを呼び出してデータを取得
    fetch("http://localhost:5003/stores")
      .then((response) => response.json()) // JSON形式でレスポンスを取得
      .then((data: Store[]) => { // データの型を明示的に指定
        setStores(data); // 取得したデータをステートに保存
      })
      .catch((error) => {
        console.error("エラーが発生しました", error); // エラーハンドリング
      });
  }, []);

  return (
    <>
    <h1>ドッグラン一覧</h1>
    {stores.length > 0 ? (
      <ul>
        {stores.map((store) => (
          <button key={store.id}>
            <h2>{store.name}</h2>
            <p>{store.description}</p>
            <p>{store.address}</p>
            </button>
        ))}
      </ul>
      
    ):(
      <p>データがありません</p>
    )}
    </>
  );
};

export default StoresList;