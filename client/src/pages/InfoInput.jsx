/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../components/Frame";
import styled from "styled-components";

export default function InfoInput() {
  const [formdata, setformdata] = useState({
    name: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // submit action을 안타도록 설정

    let telRegex = /\d{3}\d{4}\d{4}/;
    let name = formdata.name;
    let phone = formdata.phone;
    let score = 500;
    console.log(name);
    if (name === "" || phone === "") alert("데이터를 입력해주세요");
    else if (telRegex.test(phone)) {
      // 전화번호 형식이 맞다면
      fetch(`http://localhost:8081/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({name, phone, score}),
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          // res 값에 따른 결과처리
          console.log(res);
        });
    } else {
      alert("전화번호를 (01012345678)형식으로 다시 입력해주세요!");
    }
  };

  const onChangeInput = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Container>
        <Alien />
        <ScoreContainer>
          <Text>score</Text>
          <ScoreText>1855점</ScoreText>
          <Text style={{ fontSize: "3rem", marginTop: "3rem" }}>
            각 게임에 1등 하신분은 기프티콘을 드려요!
          </Text>
          {/* <Form action="/submit" method="POST"> */}
          <Form>
            <Input
              placeholder="이름입력"
              name="name"
              onChange={onChangeInput}
              required
            />
            {/* 전화번호 형식 저장 */}
            <Input
              placeholder="전화번호 입력 01012345678"
              name="phone"
              onChange={onChangeInput}
              required
            />
            <div>
              <Button>스킵</Button>
              <Button type="submit" onClick={handleSubmit}>
                제출
              </Button>
            </div>
          </Form>
        </ScoreContainer>
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
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
  background-image: url("images/alien2.png");
  background-repeat: no-repeat;
`;

const ScoreContainer = styled.div`
  width: 70rem;
  height: 90rem;
  background-color: #0a0083;
  border: 1.5rem solid #d6d2ff;
  border-radius: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.label`
  color: white;
  font-size: 5rem;
`;

const ScoreText = styled(Text)`
  font-size: 10rem;
`;

const Input = styled.input`
  width: 60rem;
  height: 10rem;
  padding-left: 3rem;
  border: 0.5rem solid white;
  border-radius: 2rem;
  font-size: 3rem;
  color: white;
  background: transparent;
  margin-top: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Button = styled.button`
  font-size: 3rem;
  background: transparent;
  color: white;
`;
