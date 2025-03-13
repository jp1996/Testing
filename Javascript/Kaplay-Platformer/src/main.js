import kaplay from "kaplay";

import { uiManager } from "./utils/UIManager";
import { load } from "./utils/loader";
import { level1Layout, level1Mappings } from "./content/level1/level1Layout";
import { level2Layout, level2Mappings } from "./content/level2/level2Layout";
import { level3Layout, level3Mappings } from "./content/level3/level3Layout";
import { level1Config } from "./content/level1/config";
import { level2Config } from "./content/level2/config";
import { level3Config } from "./content/level3/config";
import { Level } from "./utils/Level";
import { Player } from "./entities/Player";
import attachCamera from "./utils/camera";
import { Spiders } from "./entities/Spiders";
import { Projectiles } from "./entities/Projectiles";
import { Axes } from "./entities/Axes";
import { Saws } from "./entities/Saws";
import { Birds } from "./entities/Birds";

kaplay({
  width: 1280,
  height: 720,
  letterbox: true,
});

load.assets();
load.fonts();
load.sounds();

const scenes = {
  menu: () => {
    uiManager.displayMainMenu();
  },
  controls: () => {
    uiManager.displayControlsMenu();
  },
  1: () => {
    const waterAmbience = play("water-ambience", { volume: 0.02, loop: true });
    onSceneLeave(() => {
      waterAmbience.paused = true;
    });

    setGravity(1400);

    const level1 = new Level();
    level1.drawBackground("forest-background");
    level1.drawMapLayout(level1Layout, level1Mappings);

    const player = new Player(
      level1Config.playerStartPosX,
      level1Config.playerStartPosY,
      level1Config.playerSpeed,
      level1Config.jumpForce,
      level1Config.nbLives,
      1,
      false
    );
    attachCamera(player.gameObj, 0, 0, null, 200);

    level1.drawWaves("water", "wave");
    player.enablePassthrough();
    player.update();
    player.enableCoinPickup();
    player.enableMobVunerability();

    const spiders = new Spiders(
      level1Config.spiderPositions.map((spiderPos) => spiderPos()),
      level1Config.spiderRanges,
      level1Config.spiderSpeeds,
      level1Config.spiderType
    );
    spiders.setMovementPattern();
    spiders.enablePassthrough();

    const fish = new Projectiles(
      level1Config.fishPositions.map((fishPos) => fishPos()),
      level1Config.fishRanges,
      level1Config.fishType
    );
    fish.setMovementPattern();

    uiManager.addDarkBg();

    uiManager.displayCoinCount();
    player.updateCoinCount(uiManager.coinCountUI);
    uiManager.displayLivesCount();
    player.updateLives(uiManager.livesCountUI);
  },
  2: () => {
    const lavaAmbience = play("lava-ambience", { volume: 0.2, loop: true });
    onSceneLeave(() => {
      lavaAmbience.paused = true;
    });

    setGravity(1400);

    const level2 = new Level();
    level2.drawBackground("castle-background");
    level2.drawMapLayout(level2Layout, level2Mappings);

    const player = new Player(
      level2Config.playerStartPosX,
      level2Config.playerStartPosY,
      level2Config.playerSpeed,
      level2Config.jumpForce,
      level2Config.nbLives,
      2,
      false
    );
    attachCamera(player.gameObj, 0, 0, null, 200);

    const spider = new Spiders(
      level2Config.spiderPositions.map((spiderPos) => spiderPos()),
      level2Config.spiderRanges,
      level2Config.spiderDurations,
      level2Config.spiderType
    );
    spider.setMovementPattern();
    spider.enablePassthrough();

    const flame = new Projectiles(
      level2Config.flamePositions.map((flamePos) => flamePos()),
      level2Config.flameRanges,
      level2Config.flameType
    );
    flame.setMovementPattern();

    const axe = new Axes(
      level2Config.axePositions.map((axePos) => axePos()),
      level2Config.axeSwingDurations
    );
    axe.setMovementPattern();

    const saw = new Saws(
      level2Config.sawPositions.map((sawPos) => sawPos()),
      level2Config.sawRanges
    );
    saw.setMovementPattern();

    level2.drawWaves("lava", "wave");
    player.enablePassthrough();
    player.update();
    player.enableCoinPickup();
    player.enableMobVunerability();

    uiManager.addDarkBg();

    uiManager.displayCoinCount();
    player.updateCoinCount(uiManager.coinCountUI);
    uiManager.displayLivesCount();
    player.updateLives(uiManager.livesCountUI);
  },
  3: () => {
    const windAmbience = play("strong-wind", { volume: 0.2, loop: true });
    onSceneLeave(() => {
      windAmbience.paused = true;
    });

    setGravity(1400);

    const level3 = new Level();
    level3.drawBackground("sky-background-0");
    level3.drawBackground("sky-background-1");
    level3.drawBackground("sky-background-2");
    level3.drawMapLayout(level3Layout, level3Mappings);

    const player = new Player(
      level3Config.playerStartPosX,
      level3Config.playerStartPosY,
      level3Config.playerSpeed,
      level3Config.jumpForce,
      level3Config.nbLives,
      3,
      true
    );
    attachCamera(player.gameObj, 0, 0, null, 200);

    level3.drawWaves("clouds", "wave");
    player.enablePassthrough();
    player.update();
    player.enableCoinPickup();
    player.enableMobVunerability();

    const bird = new Birds(
      level3Config.birdPositions.map((axePos) => axePos()),
      level3Config.birdRanges
    );
    bird.setMovementPattern();

    uiManager.addDarkBg();

    uiManager.displayCoinCount();
    player.updateCoinCount(uiManager.coinCountUI);
    uiManager.displayLivesCount();
    player.updateLives(uiManager.livesCountUI);
  },
  gameover: () => {
    uiManager.displayGameOverScreen();
  },
  end: () => {
    uiManager.displayEndGameScreen();
  },
};

for (const key in scenes) {
  scene(key, scenes[key]);
}

go("1");
