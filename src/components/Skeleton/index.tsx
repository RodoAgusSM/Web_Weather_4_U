import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const skeletonBase = css`
  ${props =>
    props.theme && (props.theme as any).mode === 'dark'
      ? css`
          /* dark base with a brighter mid shimmer so animation is visible */
          background: linear-gradient(
            90deg,
            rgba(40,50,60,0.4) 15%,
            rgba(255,255,255,0.10) 50%,
            rgba(40,50,60,0.4) 85%
          );
          /* keep a very faint inner edge for depth */
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.01);
        `
      : css`
          background: linear-gradient(
            90deg,
            rgba(230, 240, 247, 0.95) 20%,
            rgba(245, 249, 252, 0.98) 50%,
            rgba(230, 240, 247, 0.95) 80%
          );
        `}

  ${props =>
    !props.theme &&
    css`
      @media (prefers-color-scheme: dark) {
        background: linear-gradient(
          90deg,
          rgba(40,50,60,0.95) 15%,
          rgba(255,255,255,0.10) 50%,
          rgba(40,50,60,0.95) 85%
        );
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.01);
      }
    `}

  background-size: 200% 100%;
  animation: ${shimmer} 1.4s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background: ${props =>
      props.theme && (props.theme as any).mode === 'dark'
        ? 'rgba(56,66,76,0.6)'
        : 'rgba(200,220,235,0.6)'};
  }
`;

export const SkeletonBox = styled.div`
  ${skeletonBase}
`;

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => (
  <SkeletonBox {...rest}>{children}</SkeletonBox>
);

export default Skeleton;
