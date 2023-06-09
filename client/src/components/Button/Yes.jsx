import styled from "styled-components";
import { useState, useEffect } from "react";

function Start(props) {
  const [isMousedown, SetMousedown] = useState(false);

  const mousedown = () => {
    SetMousedown(true);
  };
  const mouseup = () => {
    SetMousedown(false);
  };
  return (
    <Container
      onClick={props.onClick}
      onMouseDown={mousedown}
      onMouseUp={mouseup}
      className={`${isMousedown ? `button--mousedown` : ""} `}
    />
  );
}

const Container = styled.div`
  width: 30rem;
  height: 24rem;
  background-image: url("images/buttons.png");
  background-position: -5rem -3rem;
  background-size: 480%;
  &.button--mousedown {
    background-position: -38rem -3rem;
  }
`;
export default Start;
