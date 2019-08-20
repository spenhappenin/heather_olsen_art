import styled from 'styled-components';

export const StyledDropzone = styled.div`
  align-items: center;
  border-color: #cccccc;
  border-radius: 5px;
  border-style: dashed;
  border-width: 2px;
  cursor: pointer;
  display: flex;
  height: ${ props => props.small ? "100px" : "200px" };
  justify-content: center;
`;
