import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
  box-sizing: border-box;

  /* Ensure consistent width across all grid instances */
  max-width: 100%;
  margin: 0;

  /* Force equal column widths */
  & > * {
    width: 100%;
    min-width: 0; /* Allow proper size constraint in grid */
  }

  @media (max-width: 480px) {
    gap: 8px;
  }

  @media (max-width: 360px) {
    gap: 6px;
  }
`;
