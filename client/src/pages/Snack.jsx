import React, { useState, useEffect, useRef } from 'react';
import Frame from "../components/Frame";
import styled from "styled-components";
import { useSpeechRecognition } from "react-speech-kit";
import { useNavigate } from 'react-router-dom';
import Timer from '../components/Timer';


function Snack() {
  const [showOnBoarding, setShowOnBoarding] = useState(true);
  const [randomImage, setRandomImage] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [value, setValue] = useState('');
  const [randomIndex, setRandomIndex] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(100);
  const [countdown, setCountdown] = useState(30); 
  const inputRef = useRef();
  const [passCount, setPassCount] = useState(1); // 패스 갯수

  const navigate = useNavigate();

  const imageList = [
    `${process.env.PUBLIC_URL}/images/snackImage/bananakick.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/chocomushroom.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/fish.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/ggoggalcone.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/maga.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/postic.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/squidpeanut.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/ace.png`,
    `${process.env.PUBLIC_URL}/images/snackImage/alseauchip.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/bakedPotato.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/bbotto.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/bbushu.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/beepizza.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/bigpie.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/binz.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/bluecrab.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/buttercoconet.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/butterring.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/butterwaffle.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/chamcracker.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/chickenleg.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/chikchok.avif`,
    `${process.env.PUBLIC_URL}/images/snackImage/chocopiejung.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/chocotintin.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/chokchok.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/cornchi.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/corncho.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/creampie.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/crownsando.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/daije.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/dodohannacho.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/doritos.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/eggCracker.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/ggameo.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/ggobookchip.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/gosomi.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/hasu.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/HoneyPretzel.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/ivy.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/jagabi.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/kido.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/litz.png`,
    `${process.env.PUBLIC_URL}/images/snackImage/longs.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/lottesand.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/mizz.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/moogamja.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/mountain.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/noongamja.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/oing.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/oranda.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/oreo.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/ottttu.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/oyeahs.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/peanutSand.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/potatoCracker.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/rolipoli.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/sabure.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/saddorice.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/shindangdong.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/ssirial.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/ssunchip.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/sweetpotatoCracker.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/whaleCracker.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/yacheacracker.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/yacheatime.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/yeahgam.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/zec.jpg`,
    `${process.env.PUBLIC_URL}/images/snackImage/sarubia.jpeg`,
    `${process.env.PUBLIC_URL}/images/snackImage/seaukkang.jpeg`,
  ];
  const imageListName = [
    '바나나킥',
    '초코송이',
    '참붕어빵',
    '꼬깔콘',
    '마가렛트',
    '포스틱',
    '오징어땅콩',
    '에이스',
    '알새우칩',
    '구운감자',
    '뽀또',
    '뿌셔뿌셔',
    '벌집핏자',
    '빅파이',
    '빈츠',
    '꽃게랑',
    '빠다코코낫',
    '버터링',
    '버터와플',
    '참크래커',
    '닭다리',
    '칙촉',
    '초코파이정',
    '초코틴틴',
    '촉촉한초코칩',
    '콘치',
    '콘초',
    '크림파이',
    '크라운산도',
    '다이제',
    '도도한나쵸',
    '도리토스',
    '계란과자',
    '까메오',
    '꼬북칩',
    '고소미',
    '웨하스',
    '꿀꽈배기',
    '아이비',
    '자가비',
    '키드오',
    '리츠크래커',
    '롱스',
    '롯데샌드',
    '미쯔',
    '무뚝뚝감자칩',
    '맛동산',
    '눈을감자',
    '오잉',
    '오란다',
    '오레오',
    '오뜨',
    '오예스',
    '땅콩샌드',
    '감자깡',
    '롤리폴리',
    '사브레',
    '사또밥',
    '신당동장독대를뛰쳐나온떡볶이총각의맛있는프로포즈',
    '씨리얼',
    '썬칩',
    '고구마깡',
    '고래밥',
    '야채크래커',
    '야채타임',
    '예감',
    '제크',
    '사루비아',
    '새우깡'
  ];
  
  const { listen, listening, stop, transcript: recognizedTranscript } = useSpeechRecognition({
    onResult: (result) => {
      setTranscript(result);
    },
  });
  
  const handleListen = () => {
    if (!listening) {
      listen();
    }
  };
  useEffect(() => {
    const startListening = async () => {
      try {
        await handleListen();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (!showOnBoarding) {
      startListening();
    }
  }, [showOnBoarding]);

  const handleStop = () => {
    stop();
  };


  // const handleSend = () => {
  //   const cleanedTranscript = transcript.replace(/\s/g, '');
  //   const cleanedAnswer = imageListName[randomIndex].replace(/\s/g, '');
  
  //   if (cleanedTranscript === cleanedAnswer) {
  //     setIsCorrectAnswer(true);
  //     setCorrectAnswerCount((prevCount) => prevCount + 100);
  //     console.log(isCorrectAnswer, correctAnswerCount);
  //     console.log("맞았습니다");
  //     getNextProblem();
  //   } else if (cleanedTranscript !== cleanedAnswer) {
  //     console.log("틀렸습니다");
  //     console.log(transcript, imageListName[randomIndex], randomIndex);
  //     setIsCorrectAnswer(false);
  //   }
  // };
  
  useEffect(() => {
    const recognizeAndCheckAnswer = () => {
      const cleanedTranscript = (transcript ?? '').replace(/\s/g, '');
      const cleanedAnswer = (imageListName[randomIndex] ?? '').replace(/\s/g, '');
  
      if (cleanedTranscript === cleanedAnswer) {
        setIsCorrectAnswer(true);
        setCorrectAnswerCount((prevCount) => prevCount + 100);
        console.log(isCorrectAnswer, correctAnswerCount);
        console.log("맞았습니다");
        getNextProblem();
      } else if (cleanedTranscript !== cleanedAnswer) {
        console.log("틀렸습니다");
        console.log(transcript, imageListName[randomIndex], randomIndex);
        setIsCorrectAnswer(false);
      }
    };
  
    recognizeAndCheckAnswer();
  }, [transcript]);
  
console.log(correctAnswerCount);

useEffect(() => {
  localStorage.setItem("score", correctAnswerCount);
}, [correctAnswerCount]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOnBoarding(false);
      startCountdown();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
    

  const startCountdown = () => {
    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownTimer);
      handleStop();
      navigateToPage();
    }, 60000);
  };

  const navigateToPage = async () => {
    console.log(correctAnswerCount);
    localStorage.setItem("game", "snack");
    handleStop();
    navigate('/InfoInput');
    console.log("navigator");
  };

  useEffect(() => {
    let timer;
    if (isCorrectAnswer !== null) {
      timer = setTimeout(() => {
        setIsCorrectAnswer(null); // 1초 후에 isCorrectAnswer를 null로 설정하여 숨김
      }, 1000);
    }
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [isCorrectAnswer]);
  

  const onBoarding = () => (
    <div style={{ width: '50vw', alignContent: 'center' }}>
      <p style={textStyletitle}>
        game
        <br />
        !start!
      </p>
      <p style={textStyle}>과자 이름 맞추기</p>
    </div>
  );


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOnBoarding(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const getRandomImage = () => {
    const newIndex = Math.floor(Math.random() * imageList.length);
    const selectedImage = imageList[newIndex];
    setRandomImage(selectedImage);
    setRandomIndex(newIndex);
  };
  
  
    
       
  useEffect(() => {
    getRandomImage();
  }, []);

  useEffect(() => {
    if (recognizedTranscript !== null) {
      setTranscript(recognizedTranscript);
    }
  }, [recognizedTranscript]);
  

  const getNextProblem = () => {
    getRandomImage();
  };


  function toNext() {
    setPassCount(passCount+1);
    getNextProblem();
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setTimeout(() => {
      setTranscript(value);
    }, 500);
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Container>
        {showOnBoarding && onBoarding()}
        {!showOnBoarding && (
          <div style={{ maxWidth: '70vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Timer score={correctAnswerCount} second={60} />
            {randomImage && <img src={randomImage} alt="Random" style={{ width: '50vw', height: '40vw' }} />}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <SpeechBubble>
                <span
                  style={{ cursor: 'text', color: 'black', width: '50vw', height: '10vw', fontSize: '4vw', textAlign: 'center', marginTop: '5vw' }}
                  onClick={() => inputRef.current.focus()}
                >
                  {transcript || ''}
                </span>
              </SpeechBubble>
              <input
                id="transcript-input"
                type="hidden"
                value={transcript || ''}
                onChange={handleChange}
                placeholder="Enter the recognized text..."
                ref={inputRef}
              />
            </div>
            <div style={{ minHeight: '5vw' }}>
              {isCorrectAnswer === true ? (
                <p style={correctAnswerStyle}>정답입니다!</p>
              ) : isCorrectAnswer === null ? (
                <p style={correctAnswerStyle}>     </p>
              ) : (
                <p style={wrongAnswerStyle}>틀렸습니다</p>
              )}
            </div>
            {4 - passCount > 0 ? (
              <div>
                <TextStyle visibility={true} onClick={toNext}>
                  {4 - passCount} / 3
                </TextStyle>
                <PassBtn visibility={true} onClick={toNext}>
                  PASS
                </PassBtn>
              </div>
            ) : null}
          </div>
        )}
        {!showOnBoarding && passCount >= 3 ? <PassBtn visibility={false} onClick={toNext}>PASS</PassBtn> : null}
      </Container>
      <Frame color="#000" />
    </div>
  );
  
}

const correctAnswerStyle = {
  fontSize: '3vw',
  color: 'green',
  textAlign: 'center',
};

const wrongAnswerStyle = {
  fontSize: '3vw',
  color: 'red',
  textAlign: 'center',
};

const inputStyle = {
  fontSize:'50rem',
  textAlign:'center'
};


const PassBtn = styled.button`
  font-size: 5rem;
  color: white;
  cursor: pointer;
  background: transparent;
  visibility: ${(props)=> ( props.visibility ? "visible" : "hidden")};
  margin-left : 1vw;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin-left: 10px;
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

const textStyletitle = {
  color: 'blue',
  fontSize: '15vw',
  fontWeight: 'bold',
  textAlign: 'center',
  textShadow: '-10px 0px white, 0px 10px white, 10px 0px white, 0px -10px white',
};

const TextStyle = styled.div`
  font-size: 5vw;
  color: white;
  text-align: center;
  color: #fff;
`;

const textStyle = {
  fontSize: '5vw',
  color: 'white',
  textAlign: 'center',
  paddingTop: '30vw',
  color: '#fff'
};


const buttonStyle = {
  marginLeft : '2vw',
  marginRight : '2vw',
}

const SpeechBubble = styled.div`
  width: 200vw;
  height: 22vw;
  background-image: url("images/speechbubble.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  transform: ${(props) => props.rotate};
  display: flex;
  justify-content: center;
`;
export default Snack;
