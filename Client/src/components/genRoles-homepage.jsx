import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" id="loader">
        <div className="loader-wrapper">
          <span className="loader-letter">G</span>
          <span className="loader-letter">e</span>
          <span className="loader-letter">n</span>
          <span className="loader-letter">e</span>
          <span className="loader-letter">r</span>
          <span className="loader-letter">a</span>
          <span className="loader-letter">t</span>
          <span className="loader-letter">i</span>
          <span className="loader-letter">n</span>
          <span className="loader-letter">g</span>
          <span className="loader-letter">.</span>
          <span className="loader-letter">.</span>
          <span className="loader-letter">.</span>
          <div className="loader-circle" />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    background: linear-gradient(0deg, #3b0a91, #4c1d95, #1e093f);
  }

  .loader-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;
    font-family: "Inter", sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    color: white;
    border-radius: 50%;
    background-color: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .loader-circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background-color: transparent;
    animation: loader-combined 2.3s linear infinite;
    z-index: 0;
  }
@keyframes loader-combined {
  0% {
    transform: rotate(90deg);
    box-shadow:
      0 6px 12px 0 #a855f7 inset,    /* light purple */
      0 12px 18px 0 #7c3aed inset,   /* vivid purple */
      0 36px 36px 0 #4c1d95 inset,   /* deep purple */
      0 0 3px 1.2px rgba(168, 85, 247, 0.3),
      0 0 6px 1.8px rgba(124, 58, 237, 0.2);
  }
  25% {
    transform: rotate(180deg);
    box-shadow:
      0 6px 12px 0 #9333ea inset,
      0 12px 18px 0 #a855f7 inset,
      0 36px 36px 0 #7c3aed inset,
      0 0 6px 2.4px rgba(168, 85, 247, 0.3),
      0 0 12px 3.6px rgba(124, 58, 237, 0.2),
      0 0 18px 6px rgba(76, 29, 149, 0.15);
  }
  50% {
    transform: rotate(270deg);
    box-shadow:
      0 6px 12px 0 #c084fc inset,
      0 12px 6px 0 #9333ea inset,
      0 24px 36px 0 #7c3aed inset,
      0 0 3px 1.2px rgba(168, 85, 247, 0.3),
      0 0 6px 1.8px rgba(124, 58, 237, 0.2);
  }
  75% {
    transform: rotate(360deg);
    box-shadow:
      0 6px 12px 0 #a855f7 inset,
      0 12px 18px 0 #9333ea inset,
      0 36px 36px 0 #6d28d9 inset,
      0 0 6px 2.4px rgba(168, 85, 247, 0.3),
      0 0 12px 3.6px rgba(124, 58, 237, 0.2),
      0 0 18px 6px rgba(76, 29, 149, 0.15);
  }
  100% {
    transform: rotate(450deg);
    box-shadow:
      0 6px 12px 0 #c084fc inset,
      0 12px 18px 0 #7c3aed inset,
      0 36px 36px 0 #4c1d95 inset,
      0 0 3px 1.2px rgba(168, 85, 247, 0.3),
      0 0 6px 1.8px rgba(124, 58, 237, 0.2);
  }
}


  .loader-letter {
    display: inline-block;
    opacity: 0.4;
    transform: translateY(0);
    animation: loader-letter-anim 2.4s infinite;
    z-index: 1;
    border-radius: 50ch;
    border: none;
  }

  .loader-letter:nth-child(1) {
    animation-delay: 0s;
  }
  .loader-letter:nth-child(2) {
    animation-delay: 0.1s;
  }
  .loader-letter:nth-child(3) {
    animation-delay: 0.2s;
  }
  .loader-letter:nth-child(4) {
    animation-delay: 0.3s;
  }
  .loader-letter:nth-child(5) {
    animation-delay: 0.4s;
  }
  .loader-letter:nth-child(6) {
    animation-delay: 0.5s;
  }
  .loader-letter:nth-child(7) {
    animation-delay: 0.6s;
  }
  .loader-letter:nth-child(8) {
    animation-delay: 0.7s;
  }
  .loader-letter:nth-child(9) {
    animation-delay: 0.8s;
  }
  .loader-letter:nth-child(10) {
    animation-delay: 0.9s;
  }
  .loader-letter:nth-child(11) {
    animation-delay: 1s;
  }
  .loader-letter:nth-child(12) {
    animation-delay: 1.1s;
  }
  .loader-letter:nth-child(13) {
    animation-delay: 1.2s;
  }

  @keyframes loader-letter-anim {
    0%,
    100% {
      opacity: 0.4;
      transform: translateY(0);
    }
    20% {
      opacity: 1;
      text-shadow: #f8fcff 0 0 5px;
    }
    40% {
      opacity: 0.7;
      transform: translateY(0);
    }
  }`;

export default Loader;
