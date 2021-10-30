import React, { useEffect, useState } from 'react';

import { io } from 'socket.io-client';
const socket = io('http://localhost:3333');

function Cards({ produto }) {
  const { name, image, initialValue, _id } = produto;
  const [value, setValue] = useState(initialValue);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    socket.on('refresh', ({ data, user }) => {
      console.log(user);
      if (data._id === _id) setValue(data.initialValue);
    })
  }, [_id]);

  const hadleClick = () => {
    socket.emit('inc', { id: _id, value: Number(inputValue) });
    setInputValue('');
  };

  return (
    <div>
      <p>{name}</p>
      <img width="100" src={image} alt={name} />
      <p>{`R$ ${value}`}</p>
      <input
        onChange={(ev) => setInputValue(ev.target.value)}
        value={inputValue}
        type="number"
        placeholder="Digite o valor do lance"
      />
      <button onClick={hadleClick} >Dar lance</button>
    </div>
  );
}

export default Cards;