class UIManager {
  displayLivesCount(player) {
    this.livesCountUI = add([
      text("", {
        font: "Round",
        size: 50,
      }),
      fixed(),
      pos(70, 10),
    ]);

    this.livesCountUI.add([
      sprite("star-icon"),
      pos(-60, -5),
      scale(3),
      fixed(),
    ]);
  }

  displayCoinCount(player) {
    this.coinCountUI = add([
      text("", {
        font: "Round",
        size: 50,
      }),
      {
        fullCoinCount: get("coin", { recursive: true }).length,
      },
      fixed(),
      pos(70, 70),
    ]);

    this.coinCountUI.add([sprite("coin-icon"), pos(-60, 0), scale(3), fixed()]);
  }

  //Blinking Message that fades in and out every half second
  displayBlinkingUIMessage(content, position) {
    const message = add([
      text(content, {
        size: 24,
        font: "Round",
      }),
      area(),
      anchor("center"),
      pos(position),
      opacity(),
      state("flash-up", ["flash-up", "flash-down"]),
    ]);

    message.onStateEnter("flash-up", async () => {
      //tween function allows you to change opacity of message to 0 every 0.5 seconds when the messages state is flash up (opacity slides to 0)
      await tween(
        message.opacity,
        0,
        0.5,
        (nextOpacityValue) => (message.opacity = nextOpacityValue),
        easings.linear
      );
      message.enterState("flash-down");
    });

    message.onStateEnter("flash-down", async () => {
      //tween function allows you to change opacity of message to 1 every 0.5 seconds when the messages state is flash down (opacity slides to 1)
      await tween(
        message.opacity,
        1,
        0.5,
        (nextOpacityValue) => (message.opacity = nextOpacityValue),
        easings.linear
      );
      message.enterState("flash-up");
    });
  }

  //Main menu consists of a forest background, logo, and a blinking message to start the game. Control screen starts on enter
  displayMainMenu() {
    add([sprite("forest-background"), scale(4)]);
    add([
      sprite("logo"),
      area(),
      anchor("center"),
      pos(center().x, center().y - 200),
      scale(8),
    ]);

    this.displayBlinkingUIMessage(
      "Press [ Enter ] to Start Game",
      vec2(center().x, center().y + 100)
    );

    onKeyPress("enter", () => {
      play("confirm-ui", { speed: 1.5 });
      go("controls");
    });
  }

  //Control menu to tell the player how to use the controls, has a blinking message to start the game. Level 1 starts on enter
  displayControlsMenu() {
    add([sprite("forest-background"), scale(4)]);
    add([
      text("Controls", { font: "Round", size: 50 }),
      area(),
      anchor("center"),
      pos(center().x, center().y - 200),
    ]);

    const controlPrompts = add([pos(center().x, center().y + 50)]);

    controlPrompts.add([sprite("up"), pos(0, -80), area(), anchor("center")]);

    controlPrompts.add([sprite("down"), area(), anchor("center")]);

    controlPrompts.add([sprite("right"), pos(80, 0), area(), anchor("center")]);

    controlPrompts.add([sprite("left"), pos(-80, 0), area(), anchor("center")]);

    controlPrompts.add([
      sprite("space"),
      pos(0, 100),
      scale(2),
      area(),
      anchor("center"),
    ]);

    controlPrompts.add([
      text("Jump", { font: "Round", size: 32 }),
      pos(-190, 100),
    ]);

    controlPrompts.add([
      text("Move", { font: "Round", size: 32 }),
      pos(130, 0),
    ]);

    this.displayBlinkingUIMessage(
      "Press [ Enter ] to Start Game",
      vec2(center().x, center().y + 300)
    );

    onKeyPress("enter", () => {
      play("confirm-ui", { speed: 1.5 });
      go("1");
    });
  }

  displayGameOverScreen() {
    add([rect(1280, 720), color(0, 0, 0)]);
    add([
      text("Game Over!", { size: 50, font: "Round" }),
      area(),
      anchor("center"),
      pos(center()),
    ]);

    this.displayBlinkingUIMessage(
      "Press [ Enter ] to Start Game",
      vec2(center().x, center().y + 100)
    );

    onKeyPress("enter", () => {
      play("confirm-ui");
      go(1);
    });
  }

  displayEndGameScreen() {
    add([rect(1280, 720), color(0, 0, 0)]);
    add([
      text("You Won! Thanks for Playing.", { size: 50, font: "Round" }),
      area(),
      anchor("center"),
      pos(center()),
    ]);

    this.displayBlinkingUIMessage(
      "Press [ Enter ] to Play Again",
      vec2(center().x, center().y + 100)
    );

    onKeyPress("enter", () => {
      play("confirm-ui");
      go(1);
    });
  }

  addDarkBg() {
    add([rect(270, 130), color(0, 0, 0), fixed()]);
  }
}

export const uiManager = new UIManager();
