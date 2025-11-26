import React from 'react';
import styled from 'styled-components';

const UserNameCard = ({ name, mail }) => {
  return (
    <Wrapper>
      <div className="card">

        {name.length === 0 ? (
          <div className="time only-loader">
            <div className="elapsed" />
          </div>
        ) : (
          <>
            <div className="top">
              <div className="pfp">
                <div className="playing">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`purpleline line-${i + 1}`} />
                  ))}
                </div>
              </div>

              <div className="texts">
                <p className="title-1">
                  Good to see you again, <br />
                  {name}
                </p>
                <p className="title-2">Logged in as {mail}</p>
              </div>
            </div>
          </>
        )}

      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  // justify-content: center;

  .card {
    position: relative;
    width: 100%;
    max-width: 420px;
    min-height: 10rem;
    background: linear-gradient(135deg, #1e1e2f, #3a1f6a);
    border-radius: 15px;
    padding: 20px 25px;
    box-shadow: 0 8px 20px rgba(58, 31, 106, 0.3);
    font-family: 'Spotify Circular', Arial, sans-serif;

    display: flex;
    align-items: center;
  }

  .only-loader {
    width: 100%;
  }

  .top {
    display: flex;
    align-items: center;
    gap: 18px;
    width: 100%;
  }

  .pfp {
    height: 55px;
    width: 55px;
    background-color: #5a3ea3;
    border-radius: 50%;
    box-shadow: 0 0 12px 4px rgba(167, 139, 250, 0.6);
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .playing {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 2px;
    height: 42px;
    width: 30px;
  }

  .purpleline {
    background: linear-gradient(180deg, #b794f4 0%, #6b46c1 100%);
    width: 3px;
    border-radius: 2px;
    transform-origin: bottom;
    animation: playing 1.2s ease-in-out infinite;
    box-shadow: 0 0 5px 1px #a78bfa;
  }

  .line-1 { animation-delay: 0.2s; height: 12px; }
  .line-2 { animation-delay: 0.4s; height: 18px; }
  .line-3 { animation-delay: 0.6s; height: 10px; }
  .line-4 { animation-delay: 0s;  height: 16px; }
  .line-5 { animation-delay: 0.5s; height: 14px; }

  .texts {
    flex-grow: 1;
  }

  .title-1 {
    color: #d6bcfa;
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
  }

  .title-2 {
    color: #b794f4;
    font-size: 0.85rem;
    font-weight: 600;
    margin-top: 4px;
  }

  .time {
    width: 100%;
    height: 8px;
    background-color: #6b46c1;
    border-radius: 50px;
  }

  .elapsed {
    width: 0%;
    background-color: #b794f4;
    height: 100%;
    border-radius: 50px;
    animation: loadingBar 3.6s ease-in infinite;
  }

  @keyframes loadingBar {
    0% { width: 0%; opacity: 0.6; }
    50% { width: 100%; opacity: 1; }
    100% { width: 0%; opacity: 0.6; }
  }

  @keyframes playing {
    0%, 100% {
      transform: scaleY(0.3);
      opacity: 0.7;
    }
    50% {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  /* Mobile improvements */
  @media (max-width: 480px) {
    .card {
      padding: 18px 20px;
      min-height: 8.5rem;
    }

    .pfp {
      height: 48px;
      width: 48px;
    }

    .title-1 {
      font-size: 1rem;
    }

    .title-2 {
      font-size: 0.78rem;
    }
  }
`;

export default UserNameCard;
