/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../components/Frame";
import styled from "styled-components";

export default function ScoreRank() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [done, setDone] = useState(false);
  const game = localStorage.getItem("game");
  const score = localStorage.getItem("score");


  useEffect(() => {
    const query = new URLSearchParams({ game : game}).toString();
    fetch(`http://localhost:8081/api/scorerank?${query}`)
      .then(response => 
      response.json().then(data => ({
          scores: data,
          status: response.status
      })
    ).then(res => {
        setData(res.scores);
        setDone(true);
        console.log(data);
        // getRank();
    }));
    }, []);

    const gameName={
      "proverb" : "속담 이어말하기",
      "chamcham" : "잘 피해라 참참참",
      "snack" : "냠냠쩝쩝 과자이름 맞추기",
    };

    const getRank = () => {
        for(let a in data){
          console.log(a);
          if(data[a].score===score){
            return a
          }
        }
    }
  return (
    <>
      <Container>
        <Alien />
        <ScoreContainer>
          <RankText>
            <Text>{gameName[game]}</Text>
            {/* {done ? <Text>당신의 등수는? {data.includes(score)}</Text> : null} */}
            {/* {done ? <H1Text>YOUR RANK {getRank()+1}등</H1Text> : null} */}
            {done ? <H1Text>RANK</H1Text> : null}
            <Text style={{ fontSize: "3rem", marginTop: "3rem" }}>
              각 게임에 1등 하신분은 기프티콘을 드려요!
            </Text>
          </RankText>
          {/* 전화번호 형식 저장 */}
          { data != undefined ?
            <ScoreBoxContainer>
              {/* 1등출력 */}
              <Box>1ST&nbsp;&nbsp;<NameText>{data[0].name}</NameText>
                <Text>{data[0].score}점</Text>
              </Box>
                <SmallBoxContainer>
                {data.map((a, i)=>{
                  return( // 2등부터 출력
                    i>0 && i<5?
                    <SmallBox>{i+1}ST {data[i].name}</SmallBox>
                    : null
                  )
                })}
                </SmallBoxContainer>
            </ScoreBoxContainer> 
            : "데이터를 가져오는 중..."}
        </ScoreContainer>
        <Button onClick={()=>{navigate("/");}}>메인화면으로</Button>
        <Alien2 />
      </Container>
      <Frame />
      <Background />
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  margin-top: 23vw;
  z-index: 100;
`;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("images/infoInputBack.png");
  background-repeat: no-repeat;
  background-size: cover;
`;

const Alien = styled.div`
  width: 10rem;
  height: 10rem;
  background: url("images/alien2.png") no-repeat;
`;

const BaseFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const ScoreContainer = styled(BaseFlex)`
  width: 70rem;
  background-color: #0a0083;
  padding: 5rem 0;
  border: 1.5rem solid #d6d2ff;
  border-radius: 3rem;
  overflow: hidden;
  `;
  
const RankText = styled(BaseFlex)`
  height: 30rem;
`
const ScoreBoxContainer = styled(BaseFlex)`
  overflow: scroll;
`;

const Text = styled.label`
  color: white;
  font-size: 3.5rem;
`;

const H1Text = styled(Text)`
  font-size: 8rem;
`;

const NameText = styled(Text)`
  width: 28rem;
  font-size: 4.5rem;
`;

const Box = styled.div`
  width: 60rem;
  height: 10rem;
  padding-left: 2rem;
  border: 0.5rem solid white;
  border-radius: 2rem;
  font-size: 6rem;
  color: white;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SmallBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
`

const SmallBox = styled(Box)`
  width: 28rem;
  height: 10rem;
  font-size: 4rem;
`
const Alien2 = styled.div`
  width: 40rem;
  height: 30rem;
  margin-top: 5rem;
  background: url('/images/alienScore.png') center/contain no-repeat;
`;
const Button = styled.button`
  font-size: 3rem;
  background: #0A0083;
  color: white;
  padding: 1rem;
  margin-left: 50rem;
`;
