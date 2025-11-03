import React from 'react';
import styled from 'styled-components';

const UserNameCard = ({ name, mail }) => {
  return (
    <Wrapper>
      <div className="card">
        <div className="top">
          <div className="pfp">
            <div className="playing">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`purpleline line-${i + 1}`} />
              ))}
            </div>
          </div>
          <div className="texts">
            <p className="title-1">Good to see you again, <br />{name}</p>
            <p className="title-2">Logged in as {mail}</p>
          </div>
        </div>
        <div className="time">
          <div className="elapsed" />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .card {
    position: relative;
    width: 100vh;
    max-width: 450px;
    height: 100%;
    min-height: 10rem;
    background: linear-gradient(135deg, #1e1e2f, #3a1f6a);
    border-radius: 15px;
    padding: 20px 25px;
    box-shadow: 0 8px 20px rgba(58, 31, 106, 0.3);
    font-family: 'Spotify Circular', Arial, sans-serif;
  }

  .top {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .pfp {
    position: relative;
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
    justify-content: center;
    align-items: flex-end;
    gap: 2px;
    height: 22px;
    width: 40px;
  }

  .purpleline {
    background: linear-gradient(180deg, #b794f4 0%, #6b46c1 100%);
    height: 20px;
    width: 3px;
    border-radius: 2px;
    position: relative;
    transform-origin: bottom;
    box-shadow: 0 0 5px 1px #a78bfa;
    animation: playing 1.2s ease-in-out infinite;
  }

  .line-1 { animation-delay: 0.2s; height: 12px; }
  .line-2 { animation-delay: 0.4s; height: 18px; }
  .line-3 { animation-delay: 0.6s; height: 10px; }
  .line-4 { animation-delay: 0s; height: 16px; }
  .line-5 { animation-delay: 0.5s; height: 14px; }

  .texts {
    flex-grow: 1;
  }

  .title-1 {
    color: #d6bcfa;
    font-size: 20px;
    font-weight: 700;
    margin: 0;
  }

  .title-2 {
    color: #b794f4;
    font-size: 14px;
    font-weight: 600;
    margin-top: 4px;
    opacity: 0.9;
  }

  .time {
    width: 90%;
    background-color: #6b46c1;
    height: 8px;
    border-radius: 50px;
    position: absolute;
    left: 5%;
    bottom: 20px;
    box-shadow: 0 0 8px rgba(107, 70, 193, 0.4);
  }

  .elapsed {
    width: 82%;
    background-color: #b794f4;
    height: 100%;
    border-radius: 50px;
    box-shadow: 0 0 10px 1px #b794f4;
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
`;

export default UserNameCard;
