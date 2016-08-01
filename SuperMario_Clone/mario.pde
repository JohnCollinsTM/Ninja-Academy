final int screenWidth = 800;
final int screenHeight = 432;

float DOWN_FORCE = 2;
float ACCELERATION = 1.3;
float DAMPENING = 0.75;

void initialize() {
  frameRate(30);
  addScreen("level", new MarioLevel(10*width, height));
}

class MarioLevel extends Level {
  MarioLevel(float levelWidth, float levelHeight) {
    super(levelWidth, levelHeight);
    addLevelLayer("layer", new MarioLayer(this));
    setViewBox(0,0,screenWidth,screenHeight);
  }
}

class MarioLayer extends LevelLayer {
  Mario mario;
  MarioLayer(Level owner) {
    super(owner);
    setBackgroundColor(color(0, 100, 190));
    addBackgroundSprite(new TilingSprite(new Sprite("graphics/backgrounds/level_1.gif"),0,0,width,height));
    addBoundary(new Boundary(0,height-48,width,height-48));
    addBoundary(new Boundary(-1,0, -1,height));
    addBoundary(new Boundary(width+1,height, width+1,0));
    showBoundaries = true;
    mario = new Mario(650, height/2);
    addPlayer(mario);

    addGround("ground", -32,height-48, width+32,height);

        // add a few slanted hills
        // addSlant(600, height-48);
       // addSlant(200, height-48);
        // addSlant(1350, height-48);

        //add some ground platforms

        addGroundPlatform("ground", 350, height-97, 250, 40);
        addGroundPlatform("ground", 750, height-113, 120, 60);

        // add some bushes
        addFourSmallBushes(200, height-48);
        addSmallBushes(48,height-48);
        addBigBushes(200,height-48);



  }

    void addSlant(float x, float y) {
      Sprite groundslant = new Sprite("graphics/backgrounds/ground-slant.gif");
      groundslant.align(LEFT, BOTTOM);
      groundslant.setPosition(x, y);
      addBackgroundSprite(groundslant);
      addBoundary(new Boundary(x, y + 48 - groundslant.height, x + 48, y - groundslant.height));
    }

    /**
     * Add a platform with solid ground underneath.
     */
    void addGroundPlatform(String tileset, float x, float y, float w, float h) {
      // top layer
      Sprite lc = new Sprite("graphics/backgrounds/"+tileset+"-corner-left.gif");
      lc.align(LEFT, TOP);
      lc.setPosition(x, y);
      Sprite tp = new Sprite("graphics/backgrounds/"+tileset+"-top.gif");
      Sprite rc = new Sprite("graphics/backgrounds/"+tileset+"-corner-right.gif");
      rc.align(LEFT, TOP);
      rc.setPosition(x+w-rc.width, y);
      TilingSprite toprow = new TilingSprite(tp, x+lc.width, y, x+(w-rc.width), y+tp.height);

      addBackgroundSprite(lc);
      addBackgroundSprite(toprow);
      addBackgroundSprite(rc);

      // sides/filler
      TilingSprite sideleft  = new TilingSprite(new Sprite("graphics/backgrounds/"+tileset+"-side-left.gif"),  x,            y+tp.height, x+lc.width,     y+h);
      TilingSprite filler    = new TilingSprite(new Sprite("graphics/backgrounds/"+tileset+"-filler.gif"),     x+lc.width,   y+tp.height, x+(w-rc.width), y+h);
      TilingSprite sideright = new TilingSprite(new Sprite("graphics/backgrounds/"+tileset+"-side-right.gif"), x+w-rc.width, y+tp.height, x+w,            y+h);

      addBackgroundSprite(sideleft);
      addBackgroundSprite(filler);
      addBackgroundSprite(sideright);

      // boundary to walk on
      addBoundary(new Boundary(x, y, x+w, y));
    }

     void addFourSmallBushes(float x, float y) {
        // one bush, composed of four segments (sprites 1, 3, 4 and 5)
        int[] bush = {
          1,3,4,5
        };

          Sprite sprite_0 = new Sprite("graphics/backgrounds/bush-0"+bush[0]+".gif");
          Sprite sprite_1 = new Sprite("graphics/backgrounds/bush-0"+bush[1]+".gif");
          Sprite sprite_2 = new Sprite("graphics/backgrounds/bush-0"+bush[2]+".gif");
          Sprite sprite_3 = new Sprite("graphics/backgrounds/bush-0"+bush[3]+".gif");

          sprite_0.align(CENTER, BOTTOM);
          sprite_0.setPosition(x, y);
          addForegroundSprite(sprite_0);

          sprite_1.align(CENTER, BOTTOM);
          sprite_1.setPosition(x+16, y);
          addForegroundSprite(sprite_1);

          sprite_2.align(CENTER, BOTTOM);
          sprite_2.setPosition(x+24, y);
          addForegroundSprite(sprite_2);;

          sprite_3.align(CENTER, BOTTOM);
          sprite_3.setPosition(x+32, y);
          addForegroundSprite(sprite_3);
        }

     void addSmallBushes(float x, float y) {

        int[] bush = {
          7
        };
        int[] berrie ={
        1,2
        };

          Sprite sprite_0 = new Sprite("graphics/backgrounds/bush-0"+bush[0]+".gif");
          Sprite sprite_1 = new Sprite("graphics/backgrounds/berries-01.gif");

          sprite_1.align(CENTER, BOTTOM);
          sprite_1.setPosition(x+680, y);
          addForegroundSprite(sprite_1);

          sprite_0.align(CENTER, BOTTOM);
          sprite_0.setPosition(x, y);
          addBackgroundSprite(sprite_0);


        }


     void addBigBushes(float x, float y) {
        // one bush, composed of four segments (sprites 1, 3, 4 and 5)
        int[] bush = {
          6
        };

          Sprite sprite_0 = new Sprite("graphics/backgrounds/bush-0"+bush[0]+".gif");
         // Sprite sprite_1 = new Sprite("graphics/backgrounds/bush-0"+bush[1]+".gif");


          sprite_0.align(CENTER, BOTTOM);
          sprite_0.setPosition(x, y);
          addForegroundSprite(sprite_0);

         // sprite_1.align(CENTER, BOTTOM);
         // sprite_1.setPosition(x+16, y);
         // addForegroundSprite(sprite_1);

        }



  void addGround(String tileset, float x1, float y1, float x2, float y2) {
    TilingSprite groundline = new TilingSprite(new Sprite("graphics/backgrounds/"+tileset+"-top.gif"), x1,y1,x2,y1+16);
    addBackgroundSprite(groundline);
    TilingSprite groundfiller = new TilingSprite(new Sprite("graphics/backgrounds/"+tileset+"-filler.gif"), x1,y1+16,x2,y2);
    addBackgroundSprite(groundfiller);
    addBoundary(new Boundary(x1,y1,x2,y1));
  }


  void draw() {
    super.draw();
    viewbox.track(parent, mario);
  }
}

class Mario extends Player {
  float speed = 2;
  Mario(float x, float y) {
    super("Mario");
    setupStates();
    setPosition(x,y);
    handleKey('32');
    handleKey('A');
    handleKey('D');
    setForces(0,DOWN_FORCE);
    setAcceleration(0,ACCELERATION);
    setImpulseCoefficients(DAMPENING,DAMPENING);
  }
  void setupStates() {
    addState(new State("idle", "graphics/mario/small/Standing-mario.gif"));
    addState(new State("running", "graphics/mario/small/Running-mario.gif", 1, 4));

    State dead = new State("dead", "graphics/mario/small/Dead-mario.gif", 1, 2);
    dead.setAnimationSpeed(0.25);
    dead.setDuration(100);
    addState(dead);

    State jumping = new State("jumping", "graphics/mario/small/Jumping-mario.gif");
    jumping.setDuration(15);
    addState(jumping);

    setCurrentState("idle");
  }
  void handleStateFinished(State which) {
    setCurrentState("idle");
  }
  void handleInput() {
    if(isKeyDown('A') || isKeyDown('D')) {
      if (isKeyDown('A')) {
        setHorizontalFlip(true);
        addImpulse(-speed, 0);
      }
      if (isKeyDown('D')) {
        setHorizontalFlip(false);
        addImpulse(speed, 0);
      }
    }

    if(isKeyDown('32') && active.name!="jumping" && boundaries.size()>0) {
      addImpulse(0,-40);
      setCurrentState("jumping");
    }

    if (active.mayChange()) {
      if(isKeyDown('A') || isKeyDown('D')) {
        setCurrentState("running");
      }
      else { setCurrentState("idle"); }
    }
  }

}