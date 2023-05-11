//not used!
import React from 'react';
import styled from 'styled-components'


const Wrapper = styled.section`
    height: 100px;
    padding:10;
    margin: 0;
    width: auto;
    border-radius: 25%;
   // border: 1px solid #ccc;
    border-radius: 5px;
  `
const CardSelect = styled.div`
  
  padding:10;
  margin: 0;
  border-radius: 25%;
 // border: 1px solid #ccc;
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
  //console.log("SELECTIONS", props.category + " / " + selections);

    return (
        <>
        <Wrapper key={"wrapper_"+props.category}>
        <Title>{props.category}</Title>
        

        
        <CardSelect key={"card_"+props.category}>
          {
            currentActivities.length > 0 ? (
              currentActivities.map((act) => {
                let isChecked = selections.includes(act.title) ? true : false;
                //let isChecked = selections.includes(act.title) ? 'defaultChecked' : '';
              //  console.log("ISCHECKED for " + act.title , isChecked);
                return (<>
                    <input 
                    type="checkbox" 
                    id={act._id} 
                    name={"category~" + act.category} 
                    value={act.title} 
                    key={act._id} 
                    onChange={props.onClick} 
                    checked={isChecked}
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