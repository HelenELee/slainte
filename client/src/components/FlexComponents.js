//general components to use flex for display
import styled from "styled-components";

export const FlexContainer = styled.div`
    display: flex;
	flex-direction: ${(props) => props.direction};
	flex-wrap: wrap;
	justify-content: center;
	align-items: stretch;
	align-content: stretch;
	margin-bottom: 20px;
	@media (max-width: 1000px) {
		flex-direction: ${props => props.directionSM ? props.directionSM : props.direction};
	}
`

export const FlexChild = styled.div`
	flex: 1 1 20%;
	// border: solid 1px;
	margin: ${props => props.margin ? props.margin : ''};
	// margin: auto;
	
`

