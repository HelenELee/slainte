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
  color: black;
`


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
                     <label 
                     key={"label_"+act._id} 
                     htmlFor={act.title}>{act.title}
                     </label><br></br>
                    
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