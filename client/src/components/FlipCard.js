//used in StyledFlipCard
import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.section`
    height: 100px;
    padding:10;
    margin: 0;
    width: auto;
    border-radius: 25%;
    border-radius: 5px;
  `
const CardSelect = styled.div`
  padding:10;
  margin: 0;
  border-radius: 25%;
  border-radius: 5px;
  color: black;
  text-align: left;
  width: auto;
`

const Title = styled.h1`
  color: ${props => props.category === 'Food' ? 'var(--strong-blue)' 
  : props.category === 'Mind' ? 'var(--orange)'
  : props.category === 'Exercise' ? 'var(--pale-green)'
  : 'var(--dark-pink)'};
`;

const StyledCheckBoxLabel = styled.label`
  color: var(--slate-grey);
  font-family: 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
`;

const FlipCard = (props) => {
  const currentActivities = props.activities.filter((act) => {return act.category === props.category});
  const selections = props.selections;

    return (
        <>
        <Wrapper key={"wrapper_"+props.category}>
        <Title>{props.category}</Title>
        <CardSelect key={"card_"+props.category}>
          {
            // check if you have activities to display
            currentActivities.length > 0 ? (
              currentActivities.map((act) => {
                // check if option was previously selected
                let isChecked = selections.includes(act.title) ? true : false;
                
                return (<>
                    <input 
                    type="checkbox" 
                    id={act._id} 
                    name={"category~" + act.category} 
                    value={act.title} 
                    key={act._id} 
                    onChange={props.onClick} 
                    checked={isChecked}
                    title={act.description}
                     />
                     <StyledCheckBoxLabel 
                     key={"label_"+act._id} 
                     htmlFor={act.title}>{act.title}
                     </StyledCheckBoxLabel><br></br>
                    
                     </>)
                  })  
            ) : ("")
          }
            
        </CardSelect>
        
        </Wrapper>
        </>
    )

    
};

export default FlipCard;