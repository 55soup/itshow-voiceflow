import React, { useState, useEffect, useRef } from "react";
import Frame from "../components/Frame";
import styled from "styled-components";
import * as faceapi from 'face-api.js';
import { useNavigate } from "react-router-dom";

// 비디오 스타일을 정의한 객체
const videoStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  marginLeft: "117px",
	marginTop: "-128px",
  position: "absolute",
  width: "838px",
  height: "621px",
  left: "4px",
  top: "1184px"
};

// 비디오 스타일을 정의한 객체
const CameraStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  width: "838px",
  transform: "scaleX(-1)" // 좌우 반전을 적용하는 부분
};

function Chamcham() {

  // 초기 텍스트 상태를 설정하는 useState 훅
  const [text, setText] = useState(
    "미확인 물체 발견 !! 대원은 왼쪽과 오른쪽 중에 이동할 방향을 선택해 움직여라"
  );
	  // timeLeft : 시작 3초 설정
		const [timeLeft, setTimeLeft] = useState(3);
		// 3초 간격
		const timeRef = React.useRef(Date.now());
    // 컴퓨터 선택 방향 상태
    const [computerDirection, setComputerDirection] = useState("");
  
    // 1초가 되면 정지되도록 코드 수정(3->2->1->0초에서 타이머 멈춤)
    useEffect(() => {
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime === 1) {
              clearInterval(interval); // 1초가 되면 인터벌 정지
              // 랜덤으로 왼쪽 또는 오른쪽 선택
              const randomDirection = getRandomDirection();
              setComputerDirection(randomDirection);
              // 사용자가 선택한 방향과 컴퓨터가 선택한 방향이 같은지 확인
              if (randomDirection === getFaceDirection()) {
                setText("실패");
              }
            }
            return prevTime - 1;
          });
        }, 1000);
        
        return () => {
          clearInterval(interval);
        };
      }, 7000); // 3초 후에 인터벌 시작
    
      return () => {
        clearTimeout(timeout);
      };
    }, []);
    

  // useRef 훅을 사용하여 typingTextRef라는 변수 생성
  const typingTextRef = useRef(null);

  const handleTextChange = (text) => {
    // 텍스트를 변경하는 함수
    setText('ㅇ');
    // typingTextRef의 resetTyping 함수 호출
    // // typingTextRef의 resetTyping 함수 호출
    typingTextRef.current.resetTyping();
  };
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let previousNoseX = 0;

  //face.api.js 모듈 사용 
  useEffect(() => {
    // 필요한 모델을 로드하는 Promise.all을 사용합니다.
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"), // 작은 얼굴 탐지 모델 로드
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"), // 68개의 얼굴 랜드마크 모델 로드
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"), // 얼굴 인식 모델 로드
        faceapi.nets.faceExpressionNet.loadFromUri("/models"), // 표정 인식 모델 로드
    ]).then(startVideo);
  }, []);

  // 비디오 스트림을 가져와서 비디오 요소에 연결
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const detectFace = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        const drawOptions = {
          drawLines: true,
          drawPoints: true,
          lineWidth: 2,
          lineColor: 'rgba(255, 0, 0, 0.5)',
          pointColor: 'rgba(0, 255, 0, 0.5)',
        };
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections, drawOptions);

        const faceDirection = getFaceDirection(resizedDetections);
        if (faceDirection === 'left') {
          console.log('오른쪽');
        } else if (faceDirection === 'right') {
          console.log('왼쪽');
        }
      }, 100);
    }
  };

  const getFaceDirection = (detections) => {
    if (!detections || detections.length === 0) {
      return 'unknown';
    }

    const landmarks = detections[0].landmarks;
    const noseX = landmarks.getNose()[0].x;

    const movementDistance = Math.abs(noseX - previousNoseX);

    let faceDirection = 'unknown';
    const movementThreshold = 5;
    if (movementDistance > movementThreshold) {
      if (noseX < previousNoseX) {
        faceDirection = 'left';
      } else if (noseX > previousNoseX) {
        faceDirection = 'right';
      }

      previousNoseX = faceDirection;
    }

    return faceDirection;
  };
  const getRandomDirection = () => {
    const directions = ["left", "right"];
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
  };

  return (
    <div>
      <Container>
        <Heart />
        <Heart style={{ left: 244 }} />
        <Heart style={{ left: 320 }} />
        <Box>
          <TypingText text={text} ref={typingTextRef} />
        </Box>
        <div style={{ position: 'relative' }}>
			    <video style={CameraStyle} ref={videoRef} onLoadedMetadata={detectFace} autoPlay muted />
			    <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: 838, transform: "scaleX(-1)"}}/>
		    </div>
        <Time>{Math.round(timeLeft)}</Time>
        <video style={videoStyle} autoPlay muted loop>
          <source src="images/spacemotion.mp4" />
        </video>
      </Container>
      <Frame color={"#000000"} />
    </div>
  );
}

// 타이핑 효과 
const TypingText = React.forwardRef(({ text }, ref) => {
  // Text 상태 변수를 생성하고 초기값을 빈 문자열로 설정
  const [Text, setText] = useState("");
  // Count 상태 변수를 생성하고 초기값을 0으로 설정
  const [Count, setCount] = useState(0);

  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 실행되는 부수 효과 함수
    const interval = setInterval(() => {
      // 0.1초마다 실행되는 인터벌 함수

      // 이전 텍스트에 새로운 글자를 추가하여 Text 상태를 업데이트
      setText((prevText) => prevText + text[Count]);
      // Count 상태를 1 증가시킴
      setCount((prevCount) => prevCount + 1);
    }, 100);

    // Count가 텍스트의 길이와 같아지면
    if (Count === text.length) {
      // 인터벌 함수를 중지시킴
      clearInterval(interval);
    }

    // 컴포넌트가 사라질 때 인터벌 함수를 정리(cleanup)
    return () => clearInterval(interval);
    // Count와 text가 변경될 때마다 부수 효과 함수가 실행
  }, [Count, text]);

  useEffect(() => {
    // 컴포넌트가 렌더링될 때와 ref가 변경될 때마다 실행되는 부수 효과 함수
    if (ref) {
      ref.current = {
        resetTyping: () => {
          setText(""); // Text 상태를 초기화
          setCount(0); // Count 상태를 초기화
        },
      };
    }
  }, [ref]); // ref가 변경될 때마다 부수 효과 함수가 실행

  return (
    <div>
      {/* 텍스트가 출력될 곳 */}
      <p className="text" style={{ fontSize: "2.8rem", padding: 65 }}>
        {Text}
      </p>
    </div>
  );
});

const Heart = styled.div`
  position: absolute;
  background-size: cover;
  z-index: 994;
  background-image: url(images/heart.png);
  width: 56px;
  height: 56px;
  left: 168px;
  top: 222px;
`;
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

const Box = styled.div`
  position: absolute;
	width: 769px;
	height: 185px;
	left: 163px;
	top: 340px;
	background-size: cover;
  background-image: url(images/smalltitletext.png);
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 40px;
  font-weight: 400;
  z-index: 999;
`;

const Time = styled.div`
background-color: #ffffff;
padding: 10px 45px 10px 45px;
border-radius : 120px;
position: absolute;
width: 70px;
height: 140px;
top: 619px;
color: #000000;
font-style: normal;
font-weight: 400;
font-size: 140px;
line-height: 140px;
left: 450px;
`

export default Chamcham;
