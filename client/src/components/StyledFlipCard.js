import { FlexChild, FlexContainer } from './FlexComponents';
import FlipCard from './FlipCard';
import styled, { css } from "styled-components";
//import "./styles.css";

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.9s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const Card = styled.div`
  background-color: transparent;
  width: 300px;
  height: 300px;
  perspective: 1000px;

  ${CardInner}:hover {
    transform: rotateY(180deg);
  }
`;

const absoluteStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;

const CardFront = styled.div`
  height: 100%;
  width: 100%;
  ${absoluteStyle}
  
  
`;

const CardBack = styled.div`
  background-color: var(--dusty-pink);
  color: white;
  transform: rotateY(180deg);
  ${absoluteStyle}
`;

const StyledFlipCard = (props) => {
  return (
    <div >
      <Card>
        <CardInner>
          <CardFront >
            <FlexContainer direction="column">
              <FlexChild>
              <h1>{props.category}</h1>
              </FlexChild>
              <FlexChild>
                {props.desc}
              </FlexChild>

              <FlexChild>
                {(props.selections.length > 0 ? `( ${props.selections.length} selected)`: "")}
              </FlexChild>
            
           
            
            </FlexContainer>
           
          </CardFront>
          <CardBack >
          <FlipCard {...props} ></FlipCard>
          </CardBack>
        </CardInner>
      </Card>
    </div>
  );
}

export default StyledFlipCard;