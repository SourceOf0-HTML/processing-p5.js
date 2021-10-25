
function debugLog(str) {
  console.log(str);
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
  },
  
  init: function() {
    this.cellColor = color(0, 150, 100);
    this.cellLineColor = color(0, 60, 40);
    this.stoneBlackColor = color(20);
    this.stoneWhiteColor = color(250);
    
    this.playerScore = 0;
    this.upsetStonesPos = [];
    
    this.currentState = this.STATE.INTRO;
    this.nextState = this.STATE.INTRO;
    
    this.playerColor = this.STONE_STATE.NONE;
    this.comColor = this.STONE_STATE.NONE;
    this.setSize();
    
    for(let y = 0; y < this.cellNum; ++y) {
      this.stoneStates[y] = [];
      for(let x = 0; x < this.cellNum; ++x) {
        this.stoneStates[y][x] = this.STONE_STATE.NONE;
      }
    }
    let halfNum = this.cellNum/2;
    this.stoneStates[floor(halfNum-1)][floor(halfNum-1)] = GameData.STONE_STATE.BLACK;
    this.stoneStates[floor(halfNum  )][floor(halfNum  )] = GameData.STONE_STATE.BLACK;
    this.stoneStates[floor(halfNum-1)][floor(halfNum  )] = GameData.STONE_STATE.WHITE;
    this.stoneStates[floor(halfNum  )][floor(halfNum-1)] = GameData.STONE_STATE.WHITE;
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
    
    let isGameset = true;
    for(let y = 0; y < this.cellNum; ++y) {
      for(let x = 0; x < this.cellNum; ++x) {
        if(isGameset && (this.stoneStates[y][x] == this.STONE_STATE.NONE)) {
          isGameset = false;
        }
        if(this.stoneStates[y][x] == this.STONE_STATE.BLACK) {
          ++this.playerScore;
        }
      }
    }
    if(isGameset) {
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
    if(x >= 0 && x < this.cellNum && y >= 0 && y < this.cellNum) {
      let upsetStonePos = this.checkSetStone(x, y, this.playerColor);
      if(upsetStonePos.length > 0) {
        this.upsetStonesPos = upsetStonePos;
        this.stoneStates[y][x] = this.playerColor;
        this.nextState = this.STATE.SET_PLAYER;
        return;
      }
    }
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
      this.stoneStates[setY][setX] = this.comColor;
      this.upsetStonesPos = upsetStonesPos;
    }
    this.nextState = this.STATE.SET_COM;
  },
  
  onClick: function() {
    switch(this.currentState) {
      case this.STATE.INTRO:
        if(mouseButton === LEFT) {
          this.playerColor = this.STONE_STATE.BLACK;
          this.comColor = this.STONE_STATE.WHITE;
          this.nextState = this.STATE.TURN_PLAYER;
        } else if(mouseButton === CENTER) {
          this.playerColor = this.STONE_STATE.WHITE;
          this.comColor = this.STONE_STATE.BLACK;
          this.nextState = this.STATE.TURN_COM;
        }
        break;
      case this.STATE.TURN_PLAYER:
        this.setPlayerStone();
        break;
      case this.STATE.SET_PLAYER:
        break;
      case this.STATE.SKIP_PLAYER:
        this.nextState = this.STATE.TURN_COM;
        break;
      case this.STATE.TURN_COM:
        break;
      case this.STATE.SET_COM:
        break;
      case this.STATE.SKIP_COM:
        this.nextState = this.STATE.TURN_PLAYER;
        break;
      case this.STATE.SCORE:
        this.nextState = this.STATE.END;
        break;
      case this.STATE.END:
        break;
    }
  },
  
  transition: function() {
    debugLog(this.currentState + " -> " + this.nextState);
    switch(this.currentState) {
      case this.STATE.INTRO:
        this.currentState = this.nextState;
        break;
      case this.STATE.TURN_PLAYER:
        this.currentState = this.nextState;
        break;
      case this.STATE.SET_PLAYER:
        this.currentState = this.nextState;
        break;
      case this.STATE.SKIP_PLAYER:
        this.currentState = this.nextState;
        break;
      case this.STATE.TURN_COM:
        this.currentState = this.nextState;
        break;
      case this.STATE.SET_COM:
        this.currentState = this.nextState;
        break;
      case this.STATE.SKIP_COM:
        this.currentState = this.nextState;
        break;
      case this.STATE.SCORE:
        this.currentState = this.nextState;
        break;
      case this.STATE.END:
        this.currentState = this.nextState;
        break;
    }
  },
  
  update: function() {
    if(this.nextState == this.currentState) {
      switch(this.currentState) {
        case this.STATE.INTRO:
          break;
        case this.STATE.TURN_PLAYER:
          break;
        case this.STATE.SET_PLAYER:
          this.upsetStonesPos.forEach(pos=>{ this.stoneStates[pos.y][pos.x] = this.playerColor; });
          this.upsetStonesPos = [];
          this.checkGameState();
          break;
        case this.STATE.SKIP_PLAYER:
          break;
        case this.STATE.TURN_COM:
          this.setComStone();
          break;
        case this.STATE.SET_COM:
          this.upsetStonesPos.forEach(pos=>{ this.stoneStates[pos.y][pos.x] = this.comColor; });
          this.upsetStonesPos = [];
          this.checkGameState();
          break;
        case this.STATE.SKIP_COM:
          break;
        case this.STATE.SCORE:
          break;
        case this.STATE.END:
          break;
      }
    } else {
      this.transition();
    }
  },
  
  drawBoard: function() {
    let boardX = this.boardX;
    let boardY = this.boardY;
    let cellSize = this.cellSize;
    let cellNum = this.cellNum;
    
    stroke(this.cellLineColor);
    strokeWeight(this.cellWeight);
    for(let y = 0; y < cellNum; ++y) {
      for(let x = 0; x < cellNum; ++x) {
        let cellX = boardX + cellSize*x;
        let cellY = boardY + cellSize*y;
        fill(this.cellColor);
        rect(cellX, cellY, cellSize, cellSize);
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
    
    switch(this.currentState) {
      case this.STATE.INTRO:
        textSize(this.cellSize);
        textAlign(CENTER);
        fill(255);
        text("左クリック：先手\n右クリック：後手", windowWidth/2, windowHeight/2);
        break;
      case this.STATE.TURN_PLAYER:
        break;
      case this.STATE.SET_PLAYER:
        break;
      case this.STATE.SKIP_PLAYER:
        textSize(this.cellSize);
        textAlign(CENTER);
        fill(255);
        text("プレイヤースキップ", windowWidth/2, windowHeight/2);
        break;
      case this.STATE.TURN_COM:
        break;
      case this.STATE.SET_COM:
        break;
      case this.STATE.SKIP_COM:
        textSize(this.cellSize);
        textAlign(CENTER);
        fill(255);
        text("COMスキップ", windowWidth/2, windowHeight/2);
        break;
      case this.STATE.SCORE:
        textSize(this.cellSize);
        textAlign(CENTER);
        fill(255);
        text("スコア：" + this.playerScore, windowWidth/2, windowHeight/2);
        if(this.playerScore == (this.cellNum * this.cellNum) / 2) {
          text("引き分け", windowWidth/2, windowHeight/2 + this.cellSize);
        } else if(this.playerScore > (this.cellNum * this.cellNum) / 2) {
          text("勝ち", windowWidth/2, windowHeight/2 + this.cellSize);
        } else {
          text("負け", windowWidth/2, windowHeight/2 + this.cellSize);
        }
        break;
      case this.STATE.END:
        this.init();
        break;
    }
  },
};

function setup() {
  frameRate(30);
  GameData.init();
  createCanvas(windowWidth, windowHeight);
  background(50, 80, 70);
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
