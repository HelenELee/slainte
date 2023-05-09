import styled from "styled-components";

export const FlexContainer = styled.div`
    display: flex;
	flex-direction: ${(props) => props.direction};
	flex-wrap: wrap;
	justify-content: center;
	align-items: stretch;
	align-content: stretch;
`

export const FlexChild = styled.div`
    flex: 1 1 20%;
	
`

