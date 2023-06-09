import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../components/Frame";
import styled from "styled-components";
import Gamestart from "../components/Button/Gamestart";

function ChooseGame() {
  const navigator = useNavigate();
  const [gameIdx, setGameIdx] = useState(0);
  const gameTitle = [
    { text: "속담 이어말하기", url: "proverb" },
    { text: "직접 움직여라참참참!", url: "introcham" },
    { text: "냠냠쩝쩝\n과자이름 맞추기", url: "snack" },
  ];
  return (
    <>
      <Container>
        <div style={{display: 'flex', gap: '30rem'}}>
        <NextBtn
            onClick={() => {
              gameIdx <= 0
                ? setGameIdx(gameTitle.length - 1)
                : setGameIdx(gameIdx - 1);
              console.log(gameIdx);
            }}
            style={{rotate: '180deg'}}
          />
          <NextBtn
            onClick={() => {
              gameIdx >= gameTitle.length - 1
                ? setGameIdx(0)
                : setGameIdx(gameIdx + 1);
              console.log(gameIdx);
            }}
          />
        </div>
        <Title>{gameTitle[gameIdx].text}</Title>
        <div>
        </div>
        <Gamestart
          onClick={() => {
            navigator(`/${gameTitle[gameIdx].url}`);
          }}
        />
      </Container>
      <Alien />
      <Frame />
      <UFO />
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const UFO = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("images/ufo.png");
  background-color: var(--background-main-color);
`;

const Button = styled.button`
  width: 15rem;
  height: 10rem;
  font-size: 5rem;
`;

const NextBtn = styled.button`
  width: 18rem;
  height: 18rem;
  font-size: 5rem;
  background: url('/images/nextBtn.png') center/contain no-repeat;
  border: 0;
`;
const Title = styled.h2`
  font-size: 6rem;
  font-weight: lighter;
  margin: 10rem 0 10rem 0;
`;

const Alien = styled.div`
  background: url(images/alien.png) center/contain no-repeat;
  position: absolute;
  width: 25rem;
  height: 15rem;
  right: 10rem;
  top: 48rem;
`
export default ChooseGame;
