import React from "react";

const Header = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "32px 0 24px 0",
      }}
    ><h1
  style={{
    fontFamily: "'Orbitron', 'Montserrat', Arial, sans-serif",
    fontWeight: 700,
    fontSize: "2.5rem",
    letterSpacing: "2px",
    color: "#00eaff",
    textShadow: "0 2px 16px #0f2027",
    margin: 0,
    textTransform: "uppercase",
  }}
>
  Coin Watch
</h1>
    
    </div>
  );
};

export default Header;