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

    return (
        <>
        <Wrapper>
        <span>Description for meditiaton</span>
        <CardSelect>
            <input type="checkbox" id="meditate" name="meditate" value="Meditate" />
            <label htmlFor="meditate">Meditate</label><br></br>
            <input type="checkbox" id="journal" name="journal" value="Journal" />
            <label htmlFor="journal">journal</label><br></br>
        </CardSelect>
        
        </Wrapper>
        </>
    )

    
};

export default FlipCard;