export const level3Config = {
  gravity: 1400,
  playerSpeed: 400,
  jumpForce: 650,
  nbLives: 3,
  playerStartPosX: 1500,
  playerStartPosY: 100,

  birdRanges: [200, 100, 250, 300, 300, 150, 150, 400, 100, 50, 350, 300],
  birdPositions: [
    () => vec2(2200, 200),
    () => vec2(1900, 300),
    () => vec2(3000, 100),
    () => vec2(3500, 800),
    () => vec2(4000, 100),
    () => vec2(5000, 80),
    () => vec2(6000, 200),
    () => vec2(8000, 500),
    () => vec2(6100, 150),
    () => vec2(6300, 150),
    () => vec2(6700, 100),
    () => vec2(7500, 100),
  ],
};
