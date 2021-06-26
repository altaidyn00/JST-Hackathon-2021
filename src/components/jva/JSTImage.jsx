import React from "react";

const JSTImage = ({ colors }) => {
  const {
    cardBorderColor,
    circleColor,
    figureOneColor,
    figureTwoColor,
    figureThreeColor
  } = colors;

  const jastalent_card = {
    width: "280px",
    height: "260px",
    margin: "auto",
    backgroundColor: "white",
    border: `2px solid ${cardBorderColor}`,
    borderRadius: "10px",
    position: "relative",
  };

  const circle = {
    position: "relative",
    top: "13.5px",
    left: "23.5px",
    zIndex: 0
  };

  const figureOne = {
    position: "absolute",
    top: "25.5px",
    left: "35.5px",
    zIndex: 1
  };

  const figureTwo = {
    position: "absolute",
    top: "28.5px",
    left: "160px",
    zIndex: 1
  };

  const figureThree = {
    position: "absolute",
    top: "153px",
    left: "56px",
    zIndex: 1
  };

  return (
    <div style={jastalent_card}>
      <svg width="99" height="82" viewBox="0 0 99 82" fill="none" xmlns="http://www.w3.org/2000/svg" style={figureThree}>
        <path d="M0 40.0003C32 0.400253 81.5 -10.5 98.5 14.0003C40.5 3.5 44 71 94.5 81.5C41 85 9.33333 56.0002 0 40.0003Z" fill={figureThreeColor} />
      </svg>
      <svg width="84" height="199" viewBox="0 0 84 199" fill="none" xmlns="http://www.w3.org/2000/svg" style={figureTwo}>
        <path d="M17.4999 199C125 152 87.9999 17.5 5.49988 0.5C33 52 0.499107 88.5 0.999881 93.5C1.50066 98.5 16.0405 100.808 26.4999 112C44.8203 131.604 58.8771 165.58 17.4999 199Z" fill={figureTwoColor} />
      </svg>
      <svg width="98" height="139" viewBox="0 0 98 139" fill="none" xmlns="http://www.w3.org/2000/svg" style={figureOne}>
        <path d="M5.99565 139C-13.501 75 21.5 8 97.9957 0.5C91 57.5 74 98 5.99565 139Z" fill={figureOneColor} />
      </svg>
      <svg width="233" height="233" viewBox="0 0 233 233" fill="none" xmlns="http://www.w3.org/2000/svg" style={circle}>
        <circle cx="116.5" cy="116.5" r="116.5" fill={circleColor} />
      </svg>
    </div>
  );
};

export default JSTImage;