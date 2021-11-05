window.WebFontConfig = {
  google: { families: ["Kosugi Maru"] },
  active: function() {
    sessionStorage.fonts = true;
  }
};
(function() {
  let wf = document.createElement("script");
  wf.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
  wf.type = "text/javascript";
  wf.async = "true";
  let s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(wf, s);
})();


function debugLog(str) {
  //console.log(str);
}

class Text {
  constructor(str, x, y) {
    this.str = str;
    this.setSize(x, y);
  }
  setSize(x, y) {
    this.x = x;
    this.y = y;
    this.size = GameData.boardSize*0.1;
    this.lineSize = GameData.boardSize*0.02;
  }
  draw() {
    fill(255);
    stroke(0, 60, 40);
    textAlign(CENTER);
    textSize(this.size);
    strokeWeight(this.lineSize);
    text(this.str, this.x, this.y);
  }
}

class TextButton extends Text {
  constructor(str, x, y) {
    super(str, x, y);
    this.setSize(x, y);
  }
  setSize(x, y) {
    super.setSize(x, y);
    textSize(this.size);
    
    let w = textWidth(this.str);
    this.bgX = this.x - (w + this.size)/2;
    this.bgY = this.y - this.size * 1.2;
    this.bgW = w + this.size;
    this.bgH = this.size * 1.7;
  }
  isHit() {
    return mouseX > this.bgX && mouseX < this.bgX+this.bgW && mouseY > this.bgY && mouseY < this.bgY+this.bgH;
  }
  draw() {
    if(this.isHit()) {
      fill(150, 250, 200);
      stroke(70, 170, 120);
    } else {
      fill(70, 170, 120);
      stroke(0, 60, 40);
    }
    strokeWeight(this.lineSize);
    rect(this.bgX, this.bgY, this.bgW, this.bgH, this.size);
    textAlign(CENTER);
    fill(255);
    stroke(0, 60, 40);
    strokeWeight(this.lineSize);
    textSize(this.size);
    text(this.str, this.x, this.y);
  }
}

let GameData = {
  STATE: {
    INTRO: "INTRO",
    TURN_PLAYER: "TURN_PLAYER",
    SET_PLAYER: "SET_PLAYER",
    SKIP_PLAYER: "SKIP_PLAYER",
    TURN_COM: "TURN_COM",
    SET_COM: "SET_COM",
    SKIP_COM: "SKIP_COM",
    SCORE: "SCORE",
    END: "END",
  },
  
  STONE_STATE: {
    NONE: "NONE",
    BLACK: "BLACK",
    WHITE: "WHITE",
  },

  cellNum: 8,
  stoneStates: [],
  
  setSize: function() {
    if(windowWidth > windowHeight) {
      this.viewSize = windowHeight;
    } else {
      this.viewSize = windowWidth;
    }
    
    this.boardSize = this.viewSize * 0.5;
    this.stoneSize = this.boardSize * 0.9;
    this.cellSize = this.boardSize/this.cellNum;
    this.cellWeight = this.cellSize * 0.1;
    this.boardX = (windowWidth - this.boardSize) / 2;
    this.boardY = (windowHeight - this.boardSize) / 2;
    
    Object.keys(this.stateList).forEach(k=> {
      this.stateList[k].setSize();
    });
  },
  
  init: function() {
    this.noise = new p5.Noise();
    this.noise.amp(0);
    this.noise.start();
    this.env = new p5.Env();
    this.env.setADSR(0.00025, 0.025, 0.05, 0.025);
    this.env.setRange(0.2, 0);
  
    noSmooth();
    this.cellColor = color(0, 150, 100);
    this.foucsCellColor = color(180, 180, 0);
    this.cellLineColor = color(0, 60, 40);
    this.foucsCellLineColor = color(80, 80, 0);
    this.stoneBlackColor = color(20);
    this.stoneWhiteColor = color(250);
    
    this.focusCell = {x:-1, y:-1};
    
    this.playerScore = 0;
    this.comScore = 0;
    this.upsetStonesPos = [];
    
    this.currentState = this.STATE.INTRO;
    this.nextState = this.STATE.INTRO;
    
    this.playerColor = this.STONE_STATE.NONE;
    this.comColor = this.STONE_STATE.NONE;
    
    this.stateList = {};
    this.stateList[this.STATE.INTRO] = new IntroState();
    this.stateList[this.STATE.TURN_PLAYER] = new TurnPlayerState();
    this.stateList[this.STATE.SET_PLAYER] = new SetPlayerState();
    this.stateList[this.STATE.SKIP_PLAYER] = new SkipPlayerState();
    this.stateList[this.STATE.TURN_COM] = new TurnComState();
    this.stateList[this.STATE.SET_COM] = new SetComState();
    this.stateList[this.STATE.SKIP_COM] = new SkipComState();
    this.stateList[this.STATE.SCORE] = new ScoreState();
    this.stateList[this.STATE.END] = new EndState();
    this.setSize();
    
    for(let y = 0; y < this.cellNum; ++y) {
      this.stoneStates[y] = [];
      for(let x = 0; x < this.cellNum; ++x) {
        this.stoneStates[y][x] = this.STONE_STATE.NONE;
      }
    }
    let halfNum = this.cellNum/2;
    this.stoneStates[floor(halfNum-1)][floor(halfNum-1)] = this.STONE_STATE.BLACK;
    this.stoneStates[floor(halfNum  )][floor(halfNum  )] = this.STONE_STATE.BLACK;
    this.stoneStates[floor(halfNum-1)][floor(halfNum  )] = this.STONE_STATE.WHITE;
    this.stoneStates[floor(halfNum  )][floor(halfNum-1)] = this.STONE_STATE.WHITE;
  },
  
  debugPrintBoard: function() {
    for(let y = 0; y < this.cellNum; ++y) {
      let rowStr = "";
      for(let x = 0; x < this.cellNum; ++x) {
        switch(this.stoneStates[y][x]) {
          case this.STONE_STATE.NONE:
            rowStr += "□";
            break;
          case this.STONE_STATE.BLACK:
            rowStr += "●";
            break;
          case this.STONE_STATE.WHITE:
            rowStr += "*";
            break;
        }
      }
      debugLog(rowStr);
    }
    debugLog("--");
  },
  
  checkSetStone: function(setX, setY, setColor) {
    if(this.stoneStates[setY][setX] != this.STONE_STATE.NONE) { return []; }
    //debugLog(setX + ", " + setY + " : " + setColor);
    let cellNum = this.cellNum;
    let upsetStonesPos = [];
    
    for(let y = setY - 1; y <= setY + 1; ++y) {
      if(y < 0 || y >= cellNum) { continue; }
      for(let x = setX - 1; x <= setX + 1; ++x) {
        if(x < 0 || x >= cellNum) { continue; }
        if(x == setX && y == setY) { continue; }
        if(this.stoneStates[y][x] == this.STONE_STATE.NONE) { continue; }
        if(this.stoneStates[y][x] == setColor) { continue; }
        
        let diffX = x - setX;
        let diffY = y - setY;
        let checkX = x + diffX;
        let checkY = y + diffY;
        let targetStones = [{x, y}];
        while(true) {
          //debugLog(checkX + ", " + checkY);
          if(diffX < 0) {
            if(checkX < 0) { break; }
          } else if(diffX > 0) {
            if(checkX >= cellNum) { break; }
          }
          if(diffY < 0) {
            if(checkY < 0) { break; }
          } else if(diffY > 0) {
            if(checkY >= cellNum) { break; }
          }
          if(this.stoneStates[checkY][checkX] == this.STONE_STATE.NONE) { break; }
          if(this.stoneStates[checkY][checkX] == setColor) {
            upsetStonesPos = upsetStonesPos.concat(targetStones);
            break;
          }
          targetStones.push({x:checkX, y:checkY});
          checkX += diffX;
          checkY += diffY;
        }
      }
    }
    //debugLog("--");
    return upsetStonesPos;
  },
  
  canSetStone: function(targetColor) {
    //this.debugPrintBoard();
    for(let y = 0; y < this.cellNum; ++y) {
      for(let x = 0; x < this.cellNum; ++x) {
        if(this.checkSetStone(x, y, targetColor).length > 0) {
          debugLog(x + ", " + y);
          return true;
        }
      }
    }
    return false;
  },
  
  checkGameState: function() {
    this.playerScore = 0;
    this.comScore = 0;
    
    let isGameset = true;
    for(let y = 0; y < this.cellNum; ++y) {
      for(let x = 0; x < this.cellNum; ++x) {
        if(isGameset && (this.stoneStates[y][x] == this.STONE_STATE.NONE)) {
          isGameset = false;
        }
        if(this.stoneStates[y][x] == this.playerColor) {
          ++this.playerScore;
        } else {
          ++this.comScore;
        }
      }
    }
    if(isGameset || this.playerScore == 0 || this.comScore == 0) {
      this.nextState = this.STATE.SCORE;
    } else if(this.currentState == this.STATE.SET_PLAYER) {
      if(this.canSetStone(this.comColor)) {
        this.nextState = this.STATE.TURN_COM;
      } else {
        this.nextState = this.STATE.SKIP_COM;
      }
    } else {
      if(this.canSetStone(this.playerColor)) {
        this.nextState = this.STATE.TURN_PLAYER;
      } else {
        this.nextState = this.STATE.SKIP_PLAYER;
      }
    }
  },
  
  setPlayerStone: function() {
    let x = floor((mouseX - this.boardX) / this.cellSize);
    let y = floor((mouseY - this.boardY) / this.cellSize);
    this.focusCell.x = x;
    this.focusCell.y = y;
    if(x >= 0 && x < this.cellNum && y >= 0 && y < this.cellNum) {
      let upsetStonePos = this.checkSetStone(x, y, this.playerColor);
      if(upsetStonePos.length > 0) {
        this.upsetStonesPos = upsetStonePos;
        this.stoneStates[y][x] = this.playerColor;
        this.nextState = this.STATE.SET_PLAYER;
        return true;
      }
    }
    return false;
  },
  
  setComStone: function() {
    let maxStoneNum = 0;
    let setX = 0;
    let setY = 0;
    let upsetStonesPos = [];
    for(let y = 0; y < this.cellNum; ++y) {
      for(let x = 0; x < this.cellNum; ++x) {
        let targetStones = this.checkSetStone(x, y, this.comColor);
        if(targetStones.length > maxStoneNum) {
          maxStoneNum = targetStones.length;
          upsetStonesPos = targetStones;
          setX = x;
          setY = y;
        }
      }
    }
    if(maxStoneNum > 0) {
      this.focusCell.x = setX;
      this.focusCell.y = setY;
      this.stoneStates[setY][setX] = this.comColor;
      this.upsetStonesPos = upsetStonesPos;
    }
    this.nextState = this.STATE.SET_COM;
  },
  
  onClick: function() {
    this.stateList[this.currentState].onClick();
  },
  
  update: function() {
    if(this.nextState == this.currentState) {
      this.stateList[this.currentState].update();
    } else {
      debugLog(this.currentState + " -> " + this.nextState);
      this.stateList[this.currentState].transition();
    }
  },
  
  drawBoard: function() {
    let boardX = this.boardX;
    let boardY = this.boardY;
    let cellSize = this.cellSize;
    let cellNum = this.cellNum;
    
    strokeWeight(this.cellWeight);
    for(let y = 0; y < cellNum; ++y) {
      for(let x = 0; x < cellNum; ++x) {
        let cellX = boardX + cellSize*x;
        let cellY = boardY + cellSize*y;
        if(x == this.focusCell.x && y == this.focusCell.y) {
          stroke(this.cellLineColor);
          fill(this.foucsCellColor);
          rect(cellX, cellY, cellSize, cellSize);
          stroke(this.foucsCellLineColor);
        } else {
          stroke(this.cellLineColor);
          fill(this.cellColor);
          rect(cellX, cellY, cellSize, cellSize);
        }
        switch(this.stoneStates[y][x]) {
          case this.STONE_STATE.BLACK:
            fill(this.stoneBlackColor);
            break;
          case this.STONE_STATE.WHITE:
            fill(this.stoneWhiteColor);
            break;
        }
        if(this.stoneStates[y][x] != this.STONE_STATE.NONE) {
          circle(cellX + cellSize/2, cellY + cellSize/2, cellSize*0.8);
        }
      }
    }
  },
  
  draw: function() {
    GameData.drawBoard();
    this.stateList[this.currentState].draw();
  },
};


// States

class BaseState {
  constructor() {}
  onClick() {}
  transition() {
    GameData.currentState = GameData.nextState;
  }
  setSize() {}
  update() {}
  draw() {}
}

class IntroState extends BaseState {
  constructor() {
    super();
    this.selectText = new Text("選んでください");
    this.selectBlackText = new TextButton("先攻");
    this.selectWhiteText = new TextButton("後攻");
  }
  setSize() {
    this.selectText.setSize(windowWidth/2, windowHeight*0.1);
    this.selectBlackText.setSize(windowWidth/2 - GameData.cellSize*2, windowHeight*0.19);
    this.selectWhiteText.setSize(windowWidth/2 + GameData.cellSize*2, windowHeight*0.19);
  }
  onClick() {
    userStartAudio();
    if(this.selectBlackText.isHit()) {
      GameData.playerColor = GameData.STONE_STATE.BLACK;
      GameData.comColor = GameData.STONE_STATE.WHITE;
      GameData.nextState = GameData.STATE.TURN_PLAYER;
    } else if(this.selectWhiteText.isHit()) {
      GameData.playerColor = GameData.STONE_STATE.WHITE;
      GameData.comColor = GameData.STONE_STATE.BLACK;
      GameData.nextState = GameData.STATE.TURN_COM;
    }
  }
  draw() {
    this.selectText.draw();
    this.selectBlackText.draw();
    this.selectWhiteText.draw();
  }
}

class TurnPlayerState extends BaseState {
  constructor() {
    super();
    this.telopCount = 0;
    this.animeCount = -5;
    this.text = new Text("プレイヤーのターン");
    this.warnText = new Text("そこには置けません");
  }
  setSize() {
    this.text.setSize(windowWidth/2, GameData.boardY - GameData.cellSize);
    this.warnText.setSize(windowWidth/2, windowHeight*0.52);
  }
  transition() {
    if(GameData.upsetStonesPos.length == 0) {
      this.animeCount = -5;
      GameData.currentState = GameData.nextState;
      return;
    }
    if(this.animeCount == 5) {
      let pos = GameData.upsetStonesPos.shift();
      GameData.stoneStates[pos.y][pos.x] = GameData.playerColor;
      this.animeCount = 0;
    }
    ++this.animeCount;
  }
  onClick() {
    if(GameData.currentState == GameData.nextState && !GameData.setPlayerStone()) {
      this.telopCount = 30;
    } else {
      GameData.env.play(GameData.noise);
      this.telopCount = 0;
    }
  }
  draw() {
    this.text.draw();
    if(this.telopCount > 0) {
      this.warnText.draw();
      --this.telopCount;
    }
  }
}

class SetPlayerState extends BaseState {
  update() {
    GameData.checkGameState();
  }
}

class SkipPlayerState extends BaseState {
  constructor() {
    super();
    this.text = new Text("プレイヤースキップ");
  }
  setSize() {
    this.text.setSize(windowWidth/2, windowHeight/2);
  }
  onClick() {
    GameData.nextState = GameData.STATE.TURN_COM;
  }
  draw() {
    this.text.draw();
  }
}

class TurnComState extends BaseState {
  constructor() {
    super();
    this.animeCount = 0;
    this.text = new Text("COMのターン");
  }
  setSize() {
    this.text.setSize(windowWidth/2, GameData.boardY - GameData.cellSize);
  }
  transition() {
    if(GameData.upsetStonesPos.length == 0) {
      this.animeCount = 0;
      GameData.currentState = GameData.nextState;
      return;
    }
    if(this.animeCount == 5) {
      let pos = GameData.upsetStonesPos.shift();
      GameData.stoneStates[pos.y][pos.x] = GameData.comColor;
      this.animeCount = 0;
    }
    ++this.animeCount;
  }
  update() {
    ++this.animeCount;
    if(this.animeCount == 15) {
      GameData.setComStone();
      GameData.env.play(GameData.noise);
      this.animeCount = -5;
    }
  }
  draw() {
    this.text.draw();
  }
}

class SetComState extends BaseState {
  update() {
    GameData.checkGameState();
  }
}

class SkipComState extends BaseState {
  constructor() {
    super();
    this.text = new Text("COMスキップ");
  }
  setSize() {
    this.text.setSize(windowWidth/2, windowHeight/2);
  }
  onClick() {
    GameData.nextState = GameData.STATE.TURN_PLAYER;
  }
  draw() {
    this.text.draw();
  }
}

class ScoreState extends BaseState {
  constructor() {
    super();
    this.scoreText = new Text("");
    this.text = new Text("");
  }
  setSize() {
    this.scoreText.setSize(windowWidth/2, windowHeight/2);
    this.text.setSize(windowWidth/2, windowHeight/2 + GameData.cellSize);
  }
  onClick() {
    GameData.nextState = GameData.STATE.END;
  }
  draw() {
    this.scoreText.str = "スコア：" + GameData.playerScore;
    this.scoreText.draw();
    if(GameData.playerScore == (GameData.cellNum * GameData.cellNum) / 2) {
      this.text.str = "引き分け";
    } else if(GameData.playerScore > (GameData.cellNum * GameData.cellNum) / 2) {
      this.text.str = "勝ち";
    } else {
      this.text.str = "負け";
    }
    this.text.draw();
  }
}

class EndState extends BaseState {
  update() {
    GameData.init();
  }
}

// p5.js func

function setup() {
  frameRate(30);
  getAudioContext().suspend();
  
  GameData.init();
  createCanvas(windowWidth, windowHeight);
  background(50, 80, 70);
  textFont("Kosugi Maru");
}

function draw() {
  clear();
  GameData.update();
  GameData.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  GameData.setSize();
}

function mousePressed() {
  GameData.onClick();
}
