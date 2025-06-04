import styled from 'styled-components';

export const GridContainer = styled.div<{ $marginTop: string }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
  margin-top: ${(props) => props.$marginTop};
  box-sizing: border-box;
`;
