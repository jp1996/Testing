export default function attachCamera(
  gameObj,
  offsetX = 0,
  offsetY = 0,
  fixedX = null,
  fixedY = null
) {
  if (fixedX && !fixedY) {
    onUpdate(() => {
      camPos(fixedX, gameObj.pos.y);
    });

    return;
  }

  if (!fixedX && fixedY) {
    onUpdate(() => {
      camPos(gameObj.pos.x + offsetX, fixedY);
    });

    return;
  }

  if (fixedX && fixedY) {
    onUpdate(() => {
      camPos(fixedX, fixedY);
    });

    return;
  }

  onUpdate(() => {
    camPos(gameObj.pos.x + offsetX, gameObj.pos.y + offsetY);
  });

  return;
}
