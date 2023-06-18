//used in DayForm - cards for each category
//back and front cards on top of each other (absolute position)
//on hover -> transform and back of card is set so not visible when flipped
import { FlexChild, FlexContainer } from './FlexComponents';
import FlipCard from './FlipCard';
import styled, { css } from "styled-components";

//various parts of the flip card
const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 1.9s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const Card = styled.div`
  background-color: transparent;
  width: 200px;
  height: 300px;
  perspective: 1000px;

  ${CardInner}:hover {
    transform: rotateY(180deg);
  }
`;
//absolute positioning of back/front of cards so they are on top of each other
const absoluteStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden; //back of card not visible when flipped
`;

const CardFront = styled.div`
  height: 100%;
  width: 100%;
  ${absoluteStyle}
  
  
`;

const CardBack = styled.div`
  background-color: var(--mid-grey);
  color: white;
  transform: rotateY(180deg); //start with it flipped 180
  ${absoluteStyle}
  // padding:30px;
`;

const Title = styled.h1`
  color: ${props => props.category === 'Food' ? 'var(--strong-blue)' 
  : props.category === 'Mind' ? 'var(--orange)'
  : props.category === 'Exercise' ? 'var(--pale-green)'
  : 'var(--dark-pink)'};
`;

const Description = styled.span`
  color: var(--slate-grey);
  padding: 20px;
  font-family: 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
`;

const StyledFlipCard = (props) => {
  return (
    <div>
      <Card>
        <CardInner>
          <CardFront >
            <FlexContainer direction="column">
              <FlexChild>
                  <Title category={props.category}>{props.category}</Title>
              </FlexChild>
              <FlexChild>
                <Description>
                  {props.desc}
                </Description>
                
              </FlexChild>

              <FlexChild>
                {/* <CardInner> */}
                {(props.selections.length > 0 ? `( ${props.selections.length} selected)`: "")}
                {/* </CardInner> */}
                
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