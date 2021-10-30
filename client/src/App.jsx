import React, { useEffect, useState } from "react";
import { api } from './services/api';
import Cards from "./components/Cards";

import './styles/global.css';

function App() {
  const [produtos, setProdutos] = useState();

  const fetchApi = async () => {
    try {
      const request = await api.get('produtos');
      setProdutos(request.data);
    } catch (e) {
      console.log('Deu ruim!');
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="content-card">
      {produtos && produtos.map((produto) => <Cards key={produto.name} produto={produto} /> )}
    </div>
  );
}

export default App;
