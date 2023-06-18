//used for login and signup forms - pop up as modals
import React from 'react'
import styled from 'styled-components'

const ModalDiv = styled.div`
    display: ${p => p.block && p.block};
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    height:100%;
    
    border-radius: 25%;
    z-index: 20;
    
`
const ContentDiv = styled.div`
    position: fixed;
    top: 50%;
    left:50%;
    width: 50%;
    height:auto;
    padding: 2rem;
    transform: translate(-50%, -50%);
    background: white;
    border: solid 2px;
    border-radius: 1%;
`

export const StyledModal = (
    {
        handleClose,
        show,
        children
    }
) => {
    return (
        <ModalDiv block={show ? "block" : "none"}>
            <ContentDiv>
                {children}
               
            </ContentDiv>
        </ModalDiv>
    )
}