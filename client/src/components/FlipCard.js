import React from 'react';
import styled from 'styled-components'


const Wrapper = styled.section`
    height: 100px;
    padding:10;
    margin: 0;
    width: 50%;
    border-radius: 25%;
    border: 1px solid #ccc;
    border-radius: 5px;
  `
const CardSelect = styled.div`
  
  padding:10;
  margin: 0;
  border-radius: 25%;
  border: 1px solid #ccc;
  border-radius: 5px;
`


const FlipCard = (props) => {
  const currentActivities = props.activities.filter((act) => {return act.category === props.category});

    return (
        <>
        <Wrapper>
        <span>{props.category}</span>
       
        <CardSelect key={props.category}>
          {
            currentActivities.length > 0 ? (
              currentActivities.map((act) => (
                <>
                <input type="checkbox" id={act._id} name={"category~" + act.category} value={act.title} key={act._id} onClick={props.onClick} 
                />
                <label htmlFor={act.title}>{act.title}</label><br></br>
                
                </>
                ))
            ) : ("")
          }
            
        </CardSelect>
        
        </Wrapper>
        </>
    )

    
};

export default FlipCard;