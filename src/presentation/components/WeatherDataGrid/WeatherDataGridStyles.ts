import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.7rem;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
`;
