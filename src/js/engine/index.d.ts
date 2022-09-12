declare module "engine.all" {
    export function setCameraScale(scale: any): void;
    /** Draw textured tile centered in world space, with color applied if using WebGL
     *  @param {Vector2} pos                                - Center of the tile in world space
     *  @param {Vector2} [size=new Vector2(1,1)]            - Size of the tile in world space, width and height
     *  @param {Number}  [tileIndex=-1]                     - Tile index to use, negative is untextured
     *  @param {Vector2} [tileSize=tileSizeDefault]         - Tile size in source pixels
     *  @param {Color}   [color=new Color(1,1,1)]           - Color to modulate with
     *  @param {Number}  [angle=0]                          - Angle to rotate by
     *  @param {Boolean} [mirror=0]                         - If true image is flipped along the Y axis
     *  @param {Color}   [additiveColor=new Color(0,0,0,0)] - Additive color to be applied
     *  @param {Boolean} [useWebGL=glEnable]                - Use accelerated WebGL rendering
     *  @memberof Draw */
    export function drawTile(pos: Vector2, size?: Vector2, tileIndex?: number, tileSize?: Vector2, color?: Color, angle?: number, mirror?: boolean, additiveColor?: Color, useWebGL?: boolean): void;
    /** Draw colored rect centered on pos
     *  @param {Vector2} pos
     *  @param {Vector2} [size=new Vector2(1,1)]
     *  @param {Color}   [color=new Color(1,1,1)]
     *  @param {Number}  [angle=0]
     *  @param {Boolean} [useWebGL=glEnable]
     *  @memberof Draw */
    export function drawRect(pos: Vector2, size?: Vector2, color?: Color, angle?: number, useWebGL?: boolean): void;
    /** Draw textured tile centered on pos in screen space
     *  @param {Vector2} pos                        - Center of the tile
     *  @param {Vector2} [size=new Vector2(1,1)]    - Size of the tile
     *  @param {Number}  [tileIndex=-1]             - Tile index to use, negative is untextured
     *  @param {Vector2} [tileSize=tileSizeDefault] - Tile size in source pixels
     *  @param {Color}   [color=new Color]
     *  @param {Number}  [angle=0]
     *  @param {Boolean} [mirror=0]
     *  @param {Color}   [additiveColor=new Color(0,0,0,0)]
     *  @param {Boolean} [useWebGL=glEnable]
     *  @memberof Draw */
    export function drawTileScreenSpace(pos: Vector2, size?: Vector2, tileIndex?: number, tileSize?: Vector2, color?: Color, angle?: number, mirror?: boolean, additiveColor?: Color, useWebGL?: boolean): void;
    /** Draw colored rectangle in screen space
     *  @param {Vector2} pos
     *  @param {Vector2} [size=new Vector2(1,1)]
     *  @param {Color}   [color=new Color(1,1,1)]
     *  @param {Number}  [angle=0]
     *  @param {Boolean} [useWebGL=glEnable]
     *  @memberof Draw */
    export function drawRectScreenSpace(pos: Vector2, size?: Vector2, color?: Color, angle?: number, useWebGL?: boolean): void;
    /** Draw colored line between two points
     *  @param {Vector2} posA
     *  @param {Vector2} posB
     *  @param {Number}  [thickness=.1]
     *  @param {Color}   [color=new Color(1,1,1)]
     *  @param {Boolean} [useWebGL=glEnable]
     *  @memberof Draw */
    export function drawLine(posA: Vector2, posB: Vector2, thickness?: number, color?: Color, useWebGL?: boolean): void;
    /** Draw directly to a 2d canvas context in world space
     *  @param {Vector2}  pos
     *  @param {Vector2}  size
     *  @param {Number}   angle
     *  @param {Boolean}  mirror
     *  @param {Function} drawFunction
     *  @param {CanvasRenderingContext2D} [context=mainContext]
     *  @memberof Draw */
    export function drawCanvas2D(pos: Vector2, size: Vector2, angle: number, mirror: boolean, drawFunction: Function, context?: CanvasRenderingContext2D): void;
    /** Enable normal or additive blend mode
     *  @param {Boolean} [additive=0]
     *  @param {Boolean} [useWebGL=glEnable]
     *  @memberof Draw */
    export function setBlendMode(additive?: boolean, useWebGL?: boolean): void;
    /** Draw text on overlay canvas in screen space
     *  Automatically splits new lines into rows
     *  @param {String}  text
     *  @param {Vector2} pos
     *  @param {Number}  [size=1]
     *  @param {Color}   [color=new Color(1,1,1)]
     *  @param {Number}  [lineWidth=0]
     *  @param {Color}   [lineColor=new Color(0,0,0)]
     *  @param {String}  [textAlign='center']
     *  @memberof Draw */
    export function drawTextScreen(text: string, pos: Vector2, size?: number, color?: Color, lineWidth?: number, lineColor?: Color, textAlign?: string, font?: string): void;
    /** Draw text on overlay canvas in world space
     *  Automatically splits new lines into rows
     *  @param {String}  text
     *  @param {Vector2} pos
     *  @param {Number}  [size=1]
     *  @param {Color}   [color=new Color(1,1,1)]
     *  @param {Number}  [lineWidth=0]
     *  @param {Color}   [lineColor=new Color(0,0,0)]
     *  @param {String}  [textAlign='center']
     *  @memberof Draw */
    export function drawText(text: string, pos: Vector2, size?: number, color?: Color, lineWidth?: number, lineColor?: Color, textAlign?: string, font: any): void;
    /** Toggle fullsceen mode
     *  @memberof Draw */
    export function toggleFullscreen(): void;
    export function inputUpdate(): void;
    export function inputUpdatePost(): void;
    export function touchGamepadCreate(): void;
    export function touchGamepadRender(): void;
    /** Play an mp3 or wav audio from a local file or url
     *  @param {String}  url - Location of sound file to play
     *  @param {Number}  [volume=1] - How much to scale volume by
     *  @param {Boolean} [loop=1] - True if the music should loop when it reaches the end
     *  @return {HTMLAudioElement} - The audio element for this sound
     *  @memberof Audio */
    export function playAudioFile(url: string, volume?: number, loop?: boolean): HTMLAudioElement;
    /** Speak text with passed in settings
     *  @param {String} text - The text to speak
     *  @param {String} [language] - The language/accent to use (examples: en, it, ru, ja, zh)
     *  @param {Number} [volume=1] - How much to scale volume by
     *  @param {Number} [rate=1] - How quickly to speak
     *  @param {Number} [pitch=1] - How much to change the pitch by
     *  @return {SpeechSynthesisUtterance} - The utterance that was spoken
     *  @memberof Audio */
    export function speak(text: string, language?: string, volume?: number, rate?: number, pitch?: number): SpeechSynthesisUtterance;
    /** Play cached audio samples with given settings
     *  @param {Array}   sampleChannels - Array of arrays of samples to play (for stereo playback)
     *  @param {Number}  [volume=1] - How much to scale volume by
     *  @param {Number}  [rate=1] - The playback rate to use
     *  @param {Number}  [pan=0] - How much to apply stereo panning
     *  @param {Boolean} [loop=0] - True if the sound should loop when it reaches the end
     *  @return {AudioBufferSourceNode} - The audio node of the sound played
     *  @memberof Audio */
    export function playSamples(sampleChannels: any[], volume?: number, rate?: number, pan?: number, loop?: boolean): AudioBufferSourceNode;
    /** Generate samples for a ZzFX sound
     *  @memberof Audio */
    export function zzfxG(volume?: number, randomness?: number, frequency?: number, attack?: number, sustain?: number, release?: number, shape?: number, shapeCurve?: number, slide?: number, deltaSlide?: number, pitchJump?: number, pitchJumpTime?: number, repeatTime?: number, noise?: number, modulation?: number, bitCrush?: number, delay?: number, sustainVolume?: number, decay?: number, tremolo?: number): number[];
    /** Generate samples for a ZzFM song with given parameters
     *  @param {Array} instruments - Array of ZzFX sound paramaters
     *  @param {Array} patterns - Array of pattern data
     *  @param {Array} sequence - Array of pattern indexes
     *  @param {Number} [BPM=125] - Playback speed of the song in BPM
     *  @returns {Array} - Left and right channel sample data
     *  @memberof Audio */
    export function zzfxM(instruments: any[], patterns: any[], sequence: any[], BPM?: number): any[];
    /** Clear and initialize tile collision
     *  @param {Vector2} size
     *  @memberof TileCollision */
    export function initTileCollision(size: Vector2): void;
    /** Check if collision with another object should occur
     *  @param {Vector2}      pos
     *  @param {Vector2}      [size=new Vector2(1,1)]
     *  @param {EngineObject} [object]
     *  @return {Boolean}
     *  @memberof TileCollision */
    export function tileCollisionTest(pos: Vector2, size?: Vector2, object?: EngineObject): boolean;
    /** Return the center of tile if any that is hit (this does not return the exact hit point)
     *  @param {Vector2}      posStart
     *  @param {Vector2}      posEnd
     *  @param {EngineObject} [object]
     *  @return {Vector2}
     *  @memberof TileCollision */
    export function tileCollisionRaycast(posStart: Vector2, posEnd: Vector2, object?: EngineObject): Vector2;
    /** Initialize medals with a save name used for storage
     *  <br> - Call this after creating all medals
     *  <br> - Checks if medals are unlocked
     *  @param {String} saveName
     *  @memberof Medals */
    export function medalsInit(saveName: string): void;
    export function medalsRender(): void;
    export function glInit(): void;
    /** Set the WebGl blend mode, normally you should call setBlendMode instead
     *  @param {Boolean} [additive=0]
     *  @memberof WebGL */
    export function glSetBlendMode(additive?: boolean): void;
    /** Set the WebGl texture, not normally necessary unless multiple tile sheets are used
     *  <br> - This may also flush the gl buffer resulting in more draw calls and worse performance
     *  @param {WebGLTexture} [texture=glTileTexture]
     *  @memberof WebGL */
    export function glSetTexture(texture?: WebGLTexture): void;
    /** Compile WebGL shader of the given type, will throw errors if in debug mode
     *  @param {String} source
     *  @param          type
     *  @return {WebGLShader}
     *  @memberof WebGL */
    export function glCompileShader(source: string, type: any): WebGLShader;
    /** Create WebGL program with given shaders
     *  @param {WebGLShader} vsSource
     *  @param {WebGLShader} fsSource
     *  @return {WebGLProgram}
     *  @memberof WebGL */
    export function glCreateProgram(vsSource: WebGLShader, fsSource: WebGLShader): WebGLProgram;
    /** Create WebGL buffer
     *  @param bufferType
     *  @param size
     *  @param usage
     *  @return {WebGLBuffer}
     *  @memberof WebGL */
    export function glCreateBuffer(bufferType: any, size: any, usage: any): WebGLBuffer;
    /** Create WebGL texture from an image and set the texture settings
     *  @param {Image} image
     *  @return {WebGLTexture}
     *  @memberof WebGL */
    export function glCreateTexture(image: new (width?: number, height?: number) => HTMLImageElement): WebGLTexture;
    export function glPreRender(width: any, height: any, cameraX: any, cameraY: any, cameraScale: any): void;
    /** Draw all sprites and clear out the buffer, called automatically by the system whenever necessary
     *  @memberof WebGL */
    export function glFlush(): void;
    /** Draw any sprites still in the buffer, copy to main canvas and clear
     *  @param {CanvasRenderingContext2D} context
     *  @param {Boolean} [forceDraw=0]
     *  @memberof WebGL */
    export function glCopyToContext(context: CanvasRenderingContext2D, forceDraw?: boolean): void;
    /** Add a sprite to the gl draw list, used by all gl draw functions
     *  @param x
     *  @param y
     *  @param sizeX
     *  @param sizeY
     *  @param angle
     *  @param uv0X
     *  @param uv0Y
     *  @param uv1X
     *  @param uv1Y
     *  @param [rgba=0xffffffff]
     *  @param [rgbaAdditive=0]
     *  @memberof WebGL */
    export function glDraw(x: any, y: any, sizeX: any, sizeY: any, angle: any, uv0X: any, uv0Y: any, uv1X: any, uv1Y: any, rgba?: number, rgbaAdditive?: number): void;
    /** Start up LittleJS engine with your callback functions
     *  @param {Function} gameInit        - Called once after the engine starts up, setup the game
     *  @param {Function} gameUpdate      - Called every frame at 60 frames per second, handle input and update the game state
     *  @param {Function} gameUpdatePost  - Called after physics and objects are updated, setup camera and prepare for render
     *  @param {Function} gameRender      - Called before objects are rendered, draw any background effects that appear behind objects
     *  @param {Function} gameRenderPost  - Called after objects are rendered, draw effects or hud that appear above all objects
     *  @param {String} [tileImageSource] - Tile image to use, everything starts when the image is finished loading
     */
    export function engineInit(gameInit: Function, gameUpdate: Function, gameUpdatePost: Function, gameRender: Function, gameRenderPost: Function, tileImageSource?: string): void;
    export function enginePreRender(): void;
    /** Calls update on each engine object (recursively if child), removes destroyed objects, and updated time */
    export function engineObjectsUpdate(): void;
    /** True if debug is enabled
     *  @default
     *  @memberof Debug */
    export const debug: 1;
    /** True if asserts are enaled
     *  @default
     *  @memberof Debug */
    export const enableAsserts: 1;
    /** Size to render debug points by default
     *  @default
     *  @memberof Debug */
    export const debugPointSize: 0.5;
    /** True if watermark with FPS should be down, false in release builds
     *  @default
     *  @memberof Debug */
    export let showWatermark: number;
    /** True if god mode is enabled, handle this however you want
     *  @default
     *  @memberof Debug */
    export let godMode: number;
    export let debugPrimitives: any[];
    export let debugOverlay: number;
    export let debugPhysics: number;
    export let debugRaycast: number;
    export let debugParticles: number;
    export let debugGamepads: number;
    export let debugMedals: number;
    export let debugTakeScreenshot: any;
    export let downloadLink: any;
    export function ASSERT(...assert: any[]): void;
    export function debugRect(pos: Vector2, size?: Vector2, color?: string, time?: number, angle?: number, fill?: boolean): void;
    export function debugCircle(pos: Vector2, radius?: number, color?: string, time?: number, fill?: boolean): void;
    export function debugPoint(pos: Vector2, color?: string, time?: number, angle?: number): void;
    export function debugLine(posA: Vector2, posB: Vector2, color?: string, thickness?: number, time?: number): void;
    export function debugAABB(pA: any, sA: any, pB: any, sB: any, color?: string): void;
    export function debugText(text: string, pos: Vector2, size?: number, color?: string, time?: number, angle?: number, font?: string): void;
    export function debugClear(): any[];
    export function debugSaveCanvas(canvas: HTMLCanvasElement, filename?: string): void;
    export function debugInit(): void;
    export function debugUpdate(): void;
    export function debugRender(): void;
    /** A shortcut to get Math.PI
     *  @const
     *  @memberof Utilities */
    export const PI: number;
    export function abs(a: any): number;
    export function min(a: any, b: any): number;
    export function max(a: any, b: any): number;
    export function sign(a: any): number;
    export function mod(a: any, b?: number): number;
    export function clamp(v: any, min?: number, max?: number): number;
    export function percent(v: any, min?: number, max?: number): number;
    export function lerp(p: any, min?: number, max?: number): number;
    export function smoothStep(p: any): number;
    export function nearestPowerOfTwo(v: any): number;
    export function isOverlapping(pA: any, sA: any, pB: any, sB: any): boolean;
    export function wave(frequency?: number, amplitude?: number, t?: number): number;
    export function formatTime(t: number): string;
    export function rand(a?: number, b?: number): number;
    export function randInt(a?: number, b?: number): number;
    export function randSign(): number;
    export function randInCircle(radius?: number, minRadius?: number): Vector2;
    export function randVector(length?: number): Vector2;
    export function randColor(cA?: Color, cB?: Color, linear?: boolean): Color;
    /** The seed used by the randSeeded function, should not be 0
     *  @memberof Random */
    export let randSeed: number;
    export function randSeeded(a?: number, b?: number): number;
    export function vec2(x?: number, y?: number): Vector2;
    /**
     * 2D Vector object with vector math library
     * <br> - Functions do not change this so they can be chained together
     * @example
     * let a = new Vector2(2, 3); // vector with coordinates (2, 3)
     * let b = new Vector2;       // vector with coordinates (0, 0)
     * let c = vec2(4, 2);        // use the vec2 function to make a Vector2
     * let d = a.add(b).scale(5); // operators can be chained
     */
    export class Vector2 {
        /** Create a 2D vector with the x and y passed in, can also be created with vec2()
         *  @param {Number} [x=0] - X axis location
         *  @param {Number} [y=0] - Y axis location */
        constructor(x?: number, y?: number);
        /** @property {Number} - X axis location */
        x: number;
        /** @property {Number} - Y axis location */
        y: number;
        /** Returns a new vector that is a copy of this
         *  @return {Vector2} */
        copy(): Vector2;
        /** Returns a copy of this vector plus the vector passed in
         *  @param {Vector2} vector
         *  @return {Vector2} */
        add(v: any): Vector2;
        /** Returns a copy of this vector minus the vector passed in
         *  @param {Vector2} vector
         *  @return {Vector2} */
        subtract(v: any): Vector2;
        /** Returns a copy of this vector times the vector passed in
         *  @param {Vector2} vector
         *  @return {Vector2} */
        multiply(v: any): Vector2;
        /** Returns a copy of this vector divided by the vector passed in
         *  @param {Vector2} vector
         *  @return {Vector2} */
        divide(v: any): Vector2;
        /** Returns a copy of this vector scaled by the vector passed in
         *  @param {Number} scale
         *  @return {Vector2} */
        scale(s: any): Vector2;
        /** Returns the length of this vector
         * @return {Number} */
        length(): number;
        /** Returns the length of this vector squared
         * @return {Number} */
        lengthSquared(): number;
        /** Returns the distance from this vector to vector passed in
         * @param {Vector2} vector
         * @return {Number} */
        distance(v: any): number;
        /** Returns the distance squared from this vector to vector passed in
         * @param {Vector2} vector
         * @return {Number} */
        distanceSquared(v: any): number;
        /** Returns a new vector in same direction as this one with the length passed in
         * @param {Number} [length=1]
         * @return {Vector2} */
        normalize(length?: number): Vector2;
        /** Returns a new vector clamped to length passed in
         * @param {Number} [length=1]
         * @return {Vector2} */
        clampLength(length?: number): Vector2;
        /** Returns the dot product of this and the vector passed in
         * @param {Vector2} vector
         * @return {Number} */
        dot(v: any): number;
        /** Returns the cross product of this and the vector passed in
         * @param {Vector2} vector
         * @return {Number} */
        cross(v: any): number;
        /** Returns the angle of this vector, up is angle 0
         * @return {Number} */
        angle(): number;
        /** Sets this vector with angle and length passed in
         * @param {Number} [angle=0]
         * @param {Number} [length=1] */
        setAngle(a?: number, length?: number): Vector2;
        /** Returns copy of this vector rotated by the angle passed in
         * @param {Number} angle
         * @return {Vector2} */
        rotate(a: any): Vector2;
        /** Returns the integer direction of this vector, corrosponding to multiples of 90 degree rotation (0-3)
         * @return {Number} */
        direction(): number;
        /** Returns a copy of this vector that has been inverted
         * @return {Vector2} */
        invert(): Vector2;
        /** Returns a copy of this vector with each axis floored
         * @return {Vector2} */
        floor(): Vector2;
        /** Returns the area this vector covers as a rectangle
         * @return {Number} */
        area(): number;
        /** Returns a new vector that is p percent between this and the vector passed in
         * @param {Vector2} vector
         * @param {Number}  percent
         * @return {Vector2} */
        lerp(v: any, p: any): Vector2;
        /** Returns true if this vector is within the bounds of an array size passed in
         * @param {Vector2} arraySize
         * @return {Boolean} */
        arrayCheck(arraySize: Vector2): boolean;
        /** Returns this vector expressed as a string
         * @param {float} digits - precision to display
         * @return {String} */
        toString(digits?: float): string;
    }
    /**
     * Color object (red, green, blue, alpha) with some helpful functions
     * @example
     * let a = new Color;             // white
     * let b = new Color(1, 0, 0);    // red
     * let c = new Color(0, 0, 0, 0); // transparent black
     */
    export class Color {
        /** Create a color with the components passed in, white by default
         *  @param {Number} [red=1]
         *  @param {Number} [green=1]
         *  @param {Number} [blue=1]
         *  @param {Number} [alpha=1] */
        constructor(r?: number, g?: number, b?: number, a?: number);
        /** @property {Number} - Red */
        r: number;
        /** @property {Number} - Green */
        g: number;
        /** @property {Number} - Blue */
        b: number;
        /** @property {Number} - Alpha */
        a: number;
        /** Returns a new color that is a copy of this
         * @return {Color} */
        copy(): Color;
        /** Returns a copy of this color plus the color passed in
         * @param {Color} color
         * @return {Color} */
        add(c: any): Color;
        /** Returns a copy of this color minus the color passed in
         * @param {Color} color
         * @return {Color} */
        subtract(c: any): Color;
        /** Returns a copy of this color times the color passed in
         * @param {Color} color
         * @return {Color} */
        multiply(c: any): Color;
        /** Returns a copy of this color divided by the color passed in
         * @param {Color} color
         * @return {Color} */
        divide(c: any): Color;
        /** Returns a copy of this color scaled by the value passed in, alpha can be scaled separately
         * @param {Number} scale
         * @param {Number} [alphaScale=scale]
         * @return {Color} */
        scale(s: any, a?: any): Color;
        /** Returns a copy of this color clamped to the valid range between 0 and 1
         * @return {Color} */
        clamp(): Color;
        /** Returns a new color that is p percent between this and the color passed in
         * @param {Color}  color
         * @param {Number} percent
         * @return {Color} */
        lerp(c: any, p: any): Color;
        /** Sets this color given a hue, saturation, lightness, and alpha
         * @param {Number} [hue=0]
         * @param {Number} [saturation=0]
         * @param {Number} [lightness=1]
         * @param {Number} [alpha=1]
         * @return {Color} */
        setHSLA(h?: number, s?: number, l?: number, a?: number): Color;
        /** Returns this color expressed in hsla format
         * @return {Array} */
        getHSLA(): any[];
        /** Returns a new color that has each component randomly adjusted
         * @param {Number} [amount=.05]
         * @param {Number} [alphaAmount=0]
         * @return {Color} */
        mutate(amount?: number, alphaAmount?: number): Color;
        /** Returns this color expressed as an CSS color value
         * @return {String} */
        toString(): string;
        /** Returns this color expressed as 32 bit integer RGBA value
         * @return {Number} */
        rgbaInt(): number;
        /** Set this color from a hex code
         * @param {String} hex - html hex code
         * @return {Color} */
        setHex(hex: string): Color;
        /** Returns this color expressed as a hex code
         * @return {String} */
        getHex(): string;
    }
    /**
     * Timer object tracks how long has passed since it was set
     * @example
     * let a = new Timer;    // creates a timer that is not set
     * a.set(3);             // sets the timer to 3 seconds
     *
     * let b = new Timer(1); // creates a timer with 1 second left
     * b.unset();            // unsets the timer
     */
    export class Timer {
        /** Create a timer object set time passed in
         *  @param {Number} [timeLeft] - How much time left before the timer elapses in seconds */
        constructor(timeLeft?: number);
        time: number;
        setTime: number;
        /** Set the timer with seconds passed in
         *  @param {Number} [timeLeft=0] - How much time left before the timer is elapsed in seconds */
        set(timeLeft?: number): void;
        /** Unset the timer */
        unset(): void;
        /** Returns true if set
         * @return {Boolean} */
        isSet(): boolean;
        /** Returns true if set and has not elapsed
         * @return {Boolean} */
        active(): boolean;
        /** Returns true if set and elapsed
         * @return {Boolean} */
        elapsed(): boolean;
        /** Get how long since elapsed, returns 0 if not set (returns negative if currently active)
         * @return {Number} */
        get(): number;
        /** Get percentage elapsed based on time it was set to, returns 0 if not set
         * @return {Number} */
        getPercent(): number;
        /** Returns this timer expressed as a string
         * @return {String} */
        toString(): string;
    }
    /** The max size of the canvas, centered if window is larger
     *  @type {Vector2}
     *  @default
     *  @memberof Settings */
    export let canvasMaxSize: Vector2;
    /** Fixed size of the canvas, if enabled canvas size never changes
     * - you may also need to set mainCanvasSize if using screen space coords in startup
     *  @type {Vector2}
     *  @default
     *  @memberof Settings */
    export let canvasFixedSize: Vector2;
    /** Disables anti aliasing for pixel art if true
     *  @default
     *  @memberof Settings */
    export let cavasPixelated: number;
    /** Default font used for text rendering
     *  @default
     *  @memberof Settings */
    export let fontDefault: string;
    /** Default size of tiles in pixels
     *  @type {Vector2}
     *  @default
     *  @memberof Settings */
    export let tileSizeDefault: Vector2;
    /** Prevent tile bleeding from neighbors in pixels
     *  @default
     *  @memberof Settings */
    export let tileFixBleedScale: number;
    /** Default size of objects
     *  @type {Vector2}
     *  @default
     *  @memberof Settings */
    export let objectDefaultSize: Vector2;
    /** Enable physics solver for collisions between objects
     *  @default
     *  @memberof Settings */
    export let enablePhysicsSolver: number;
    /** Default object mass for collison calcuations (how heavy objects are)
     *  @default
     *  @memberof Settings */
    export let objectDefaultMass: number;
    /** How much to slow velocity by each frame (0-1)
     *  @default
     *  @memberof Settings */
    export let objectDefaultDamping: number;
    /** How much to slow angular velocity each frame (0-1)
     *  @default
     *  @memberof Settings */
    export let objectDefaultAngleDamping: number;
    /** How much to bounce when a collision occurs (0-1)
     *  @default
     *  @memberof Settings */
    export let objectDefaultElasticity: number;
    /** How much to slow when touching (0-1)
     *  @default
     *  @memberof Settings */
    export let objectDefaultFriction: number;
    /** Clamp max speed to avoid fast objects missing collisions
     *  @default
     *  @memberof Settings */
    export let objectMaxSpeed: number;
    /** How much gravity to apply to objects along the Y axis, negative is down
     *  @default
     *  @memberof Settings */
    export let gravity: number;
    /** Scales emit rate of particles, useful for low graphics mode (0 disables particle emitters)
     *  @default
     *  @memberof Settings */
    export let particleEmitRateScale: number;
    /** Position of camera in world space
     *  @type {Vector2}
     *  @default
     *  @memberof Settings */
    export let cameraPos: Vector2;
    /** Scale of camera in world space
     *  @default
     *  @memberof Settings */
    export let cameraScale: number;
    /** Enable webgl rendering, webgl can be disabled and removed from build (with some features disabled)
     *  @default
     *  @memberof Settings */
    export let glEnable: number;
    /** Fixes slow rendering in some browsers by not compositing the WebGL canvas
     *  @default
     *  @memberof Settings */
    export let glOverlay: number;
    /** Should gamepads be allowed
     *  @default
     *  @memberof Settings */
    export let gamepadsEnable: number;
    /** If true, the dpad input is also routed to the left analog stick (for better accessability)
     *  @default
     *  @memberof Settings */
    export let gamepadDirectionEmulateStick: number;
    /** If true the WASD keys are also routed to the direction keys (for better accessability)
     *  @default
     *  @memberof Settings */
    export let inputWASDEmulateDirection: number;
    /** True if touch gamepad should appear on mobile devices
     *  <br> - Supports left analog stick, 4 face buttons and start button (button 9)
     *  <br> - Must be set by end of gameInit to be activated
     *  @default
     *  @memberof Settings */
    export let touchGamepadEnable: number;
    /** True if touch gamepad should be analog stick or false to use if 8 way dpad
     *  @default
     *  @memberof Settings */
    export let touchGamepadAnalog: number;
    /** Size of virutal gamepad for touch devices in pixels
     *  @default
     *  @memberof Settings */
    export let touchGamepadSize: number;
    /** Transparency of touch gamepad overlay
     *  @default
     *  @memberof Settings */
    export let touchGamepadAlpha: number;
    /** Allow vibration hardware if it exists
     *  @default
     *  @memberof Settings */
    export let vibrateEnable: number;
    /** Volume scale to apply to all sound, music and speech
     *  @default
     *  @memberof Settings */
    export let soundVolume: number;
    /** All audio code can be disabled and removed from build
     *  @default
     *  @memberof Settings */
    export let soundEnable: number;
    /** Default range where sound no longer plays
     *  @default
     *  @memberof Settings */
    export let soundDefaultRange: number;
    /** Default range percent to start tapering off sound (0-1)
     *  @default
     *  @memberof Settings */
    export let soundDefaultTaper: number;
    /** How long to show medals for in seconds
     *  @default
     *  @memberof Settings */
    export let medalDisplayTime: number;
    /** How quickly to slide on/off medals in seconds
     *  @default
     *  @memberof Settings */
    export let medalDisplaySlideTime: number;
    /** Width of medal display
     *  @default
     *  @memberof Settings */
    export let medalDisplayWidth: number;
    /** Height of medal display
     *  @default
     *  @memberof Settings */
    export let medalDisplayHeight: number;
    /** Size of icon in medal display
     *  @default
     *  @memberof Settings */
    export let medalDisplayIconSize: number;
    /**
     * LittleJS Object Base Object Class
     * <br> - Base object class used by the engine
     * <br> - Automatically adds self to object list
     * <br> - Will be updated and rendered each frame
     * <br> - Renders as a sprite from a tilesheet by default
     * <br> - Can have color and addtive color applied
     * <br> - 2d Physics and collision system
     * <br> - Sorted by renderOrder
     * <br> - Objects can have children attached
     * <br> - Parents are updated before children, and set child transform
     * <br> - Call destroy() to get rid of objects
     * <br>
     * <br>The physics system used by objects is simple and fast with some caveats...
     * <br> - Collision uses the axis aligned size, the object's rotation angle is only for rendering
     * <br> - Objects are guaranteed to not intersect tile collision from physics
     * <br> - If an object starts or is moved inside tile collision, it will not collide with that tile
     * <br> - Collision for objects can be set to be solid to block other objects
     * <br> - Objects may get pushed into overlapping other solid objects, if so they will push away
     * <br> - Solid objects are more performance intensive and should be used sparingly
     * @example
     * // create an engine object, normally you would first extend the class with your own
     * const pos = vec2(2,3);
     * const object = new EngineObject(pos);
     */
    export class EngineObject {
        /** Create an engine object and adds it to the list of objects
         *  @param {Vector2} [position=new Vector2()]    - World space position of the object
         *  @param {Vector2} [size=objectDefaultSize]    - World space size of the object
         *  @param {Number}  [tileIndex=-1]              - Tile to use to render object (-1 is untextured)
         *  @param {Vector2} [tileSize=tileSizeDefault]  - Size of tile in source pixels
         *  @param {Number}  [angle=0]                   - Angle the object is rotated by
         *  @param {Color}   [color]                     - Color to apply to tile when rendered
         *  @param {Number}  [renderOrder=0]             - Objects sorted by renderOrder before being rendered
         */
        constructor(pos?: Vector2, size?: Vector2, tileIndex?: number, tileSize?: Vector2, angle?: number, color?: Color, renderOrder?: number);
        /** @property {Vector2} - World space position of the object */
        pos: Vector2;
        /** @property {Vector2} - World space width and height of the object */
        size: Vector2;
        /** @property {Number}  - Tile to use to render object (-1 is untextured) */
        tileIndex: number;
        /** @property {Vector2} - Size of tile in source pixels */
        tileSize: Vector2;
        /** @property {Number}  - Angle to rotate the object */
        angle: number;
        /** @property {Color}   - Color to apply when rendered */
        color: Color;
        /** @property {Number} [mass=objectDefaultMass]                 - How heavy the object is, static if 0 */
        mass: number;
        /** @property {Number} [damping=objectDefaultDamping]           - How much to slow down velocity each frame (0-1) */
        damping: number;
        /** @property {Number} [angleDamping=objectDefaultAngleDamping] - How much to slow down rotation each frame (0-1) */
        angleDamping: number;
        /** @property {Number} [elasticity=objectDefaultElasticity]     - How bouncy the object is when colliding (0-1) */
        elasticity: number;
        /** @property {Number} [friction=objectDefaultFriction]         - How much friction to apply when sliding (0-1) */
        friction: number;
        /** @property {Number} [gravityScale=1]                         - How much to scale gravity by for this object */
        gravityScale: number;
        /** @property {Number} [renderOrder=0]                          - Objects are sorted by render order */
        renderOrder: number;
        /** @property {Vector2} [velocity=new Vector2()]                - Velocity of the object */
        velocity: Vector2;
        /** @property {Number} [angleVelocity=0]                        - Angular velocity of the object */
        angleVelocity: number;
        spawnTime: number;
        children: any[];
        collideTiles: number;
        /** Update the object transform and physics, called automatically by engine once each frame */
        update(): void;
        groundObject: any;
        /** Render the object, draws a tile by default, automatically called each frame, sorted by renderOrder */
        render(): void;
        /** Destroy this object, destroy it's children, detach it's parent, and mark it for removal */
        destroy(): void;
        destroyed: number;
        /** Called to check if a tile collision should be resolved
         *  @param {Number}  tileData - the value of the tile at the position
         *  @param {Vector2} pos      - tile where the collision occured
         *  @return {Boolean}         - true if the collision should be resolved */
        collideWithTile(tileData: number, pos: Vector2): boolean;
        /** Called to check if a tile raycast hit
         *  @param {Number}  tileData - the value of the tile at the position
         *  @param {Vector2} pos      - tile where the raycast is
         *  @return {Boolean}         - true if the raycast should hit */
        collideWithTileRaycast(tileData: number, pos: Vector2): boolean;
        /** Called to check if a tile raycast hit
         *  @param {EngineObject} object - the object to test against
         *  @return {Boolean}            - true if the collision should be resolved
         */
        collideWithObject(o: any): boolean;
        /** How long since the object was created
         *  @return {Number} */
        getAliveTime(): number;
        /** Apply acceleration to this object (adjust velocity, not affected by mass)
         *  @param {Vector2} acceleration */
        applyAcceleration(a: any): void;
        /** Apply force to this object (adjust velocity, affected by mass)
         *  @param {Vector2} force */
        applyForce(force: Vector2): void;
        /** Get the direction of the mirror
         *  @return {Number} -1 if this.mirror is true, or 1 if not mirrored */
        getMirrorSign(): number;
        /** Attaches a child to this with a given local transform
         *  @param {EngineObject} child
         *  @param {Vector2}      [localPos=new Vector2]
         *  @param {Number}       [localAngle=0] */
        addChild(child: EngineObject, localPos?: Vector2, localAngle?: number): void;
        /** Removes a child from this one
         *  @param {EngineObject} child */
        removeChild(child: EngineObject): void;
        /** Set how this object collides
         *  @param {boolean} [collideSolidObjects=0] - Does it collide with solid objects
         *  @param {boolean} [isSolid=0]             - Does it collide with and block other objects (expensive in large numbers)
         *  @param {boolean} [collideTiles=1]        - Does it collide with the tile collision */
        setCollision(collideSolidObjects?: boolean, isSolid?: boolean, collideTiles?: boolean): void;
        collideSolidObjects: boolean;
        isSolid: boolean;
        toString(): string;
    }
    /** Tile sheet for batch rendering system
     *  @type {Image}
     *  @memberof Draw */
    export const tileImage: new (width?: number, height?: number) => HTMLImageElement;
    /** The primary 2D canvas visible to the user
     *  @type {HTMLCanvasElement}
     *  @memberof Draw */
    export let mainCanvas: HTMLCanvasElement;
    /** 2d context for mainCanvas
     *  @type {CanvasRenderingContext2D}
     *  @memberof Draw */
    export let mainContext: CanvasRenderingContext2D;
    /** A canvas that appears on top of everything the same size as mainCanvas
     *  @type {HTMLCanvasElement}
     *  @memberof Draw */
    export let overlayCanvas: HTMLCanvasElement;
    /** 2d context for overlayCanvas
     *  @type {CanvasRenderingContext2D}
     *  @memberof Draw */
    export let overlayContext: CanvasRenderingContext2D;
    /** The size of the main canvas (and other secondary canvases)
     *  @type {Vector2}
     *  @memberof Draw */
    export let mainCanvasSize: Vector2;
    export function screenToWorld(screenPos: Vector2): Vector2;
    export function worldToScreen(worldPos: Vector2): Vector2;
    /**
     * Font Image Object - Draw text on a 2D canvas by using characters in an image
     * <br> - 96 characters (from space to tilde) are stored in an image
     * <br> - Uses a default 8x8 font if none is supplied
     * <br> - You can also use fonts from the main tile sheet
     * @example
     * // use built in font
     * const font = new ImageFont;
     *
     * // draw text
     * font.drawTextScreen("LittleJS\nHello World!", vec2(200, 50));
     */
    export let engineFontImage: any;
    export class FontImage {
        /** Create an image font
         *  @param {Image}   [image] - The image the font is stored in, if undefined the default font is used
         *  @param {Vector2} [tileSize=vec2(8)] - The size of the font source tiles
         *  @param {Vector2} [paddingSize=vec2(0,1)] - How much extra space to add between characters
         *  @param {Number}  [startTileIndex=0] - Tile index in image where font starts
         *  @param {CanvasRenderingContext2D} [context=overlayContext] - context to draw to
         */
        constructor(image?: new (width?: number, height?: number) => HTMLImageElement, tileSize?: Vector2, paddingSize?: Vector2, startTileIndex?: number, context?: CanvasRenderingContext2D);
        image: any;
        tileSize: Vector2;
        paddingSize: Vector2;
        startTileIndex: number;
        context: CanvasRenderingContext2D;
        /** Draw text in screen space using the image font
         *  @param {String}  text
         *  @param {Vector2} pos
         *  @param {Number}  [scale=4]
         *  @param {Boolean} [center]
         */
        drawTextScreen(text: string, pos: Vector2, scale?: number, center?: boolean): void;
        /** Draw text in world space using the image font
         *  @param {String}  text
         *  @param {Vector2} pos
         *  @param {Number}  [scale=.25]
         *  @param {Boolean} [center]
         */
        drawText(text: string, pos: Vector2, scale?: number, center?: boolean): void;
    }
    export function isFullscreen(): boolean;
    export function keyIsDown(key: number, device?: number): boolean;
    export function keyWasPressed(key: number, device?: number): boolean;
    export function keyWasReleased(key: number, device?: number): boolean;
    export function clearInput(): any[][];
    export function mouseIsDown(key: number, device?: number): boolean;
    export function mouseWasPressed(key: number, device?: number): boolean;
    export function mouseWasReleased(key: number, device?: number): boolean;
    /** Mouse pos in world space
     *  @type {Vector2}
     *  @memberof Input */
    export let mousePos: Vector2;
    /** Mouse pos in screen space
     *  @type {Vector2}
     *  @memberof Input */
    export let mousePosScreen: Vector2;
    /** Mouse wheel delta this frame
     *  @memberof Input */
    export let mouseWheel: number;
    /** Returns true if user is using gamepad (has more recently pressed a gamepad button)
     *  @memberof Input */
    export let isUsingGamepad: number;
    /** Prevents input continuing to the default browser handling (false by default)
     *  @memberof Input */
    export let preventDefaultInput: number;
    export function gamepadIsDown(button: number, gamepad?: number): boolean;
    export function gamepadWasPressed(button: number, gamepad?: number): boolean;
    export function gamepadWasReleased(button: number, gamepad?: number): boolean;
    export function gamepadStick(stick: number, gamepad?: number): Vector2;
    export let inputData: any[][];
    export function remapKeyCode(c: any): any;
    export function mouseToScreen(mousePos: any): Vector2;
    export const stickData: any[];
    export function vibrate(pattern?: number): any;
    export function vibrateStop(): any;
    /** True if a touch device has been detected
     *  @const {boolean}
     *  @memberof Input */
    export const isTouchDevice: boolean;
    export let touchGamepadTimer: Timer;
    export let touchGamepadButtons: any[];
    export let touchGamepadStick: Vector2;
    /**
     * Sound Object - Stores a zzfx sound for later use and can be played positionally
     * <br>
     * <br><b><a href=https://killedbyapixel.github.io/ZzFX/>Create sounds using the ZzFX Sound Designer.</a></b>
     * @example
     * // create a sound
     * const sound_example = new Sound([.5,.5]);
     *
     * // play the sound
     * sound_example.play();
     */
    export class Sound {
        /** Create a sound object and cache the zzfx samples for later use
         *  @param {Array}  zzfxSound - Array of zzfx parameters, ex. [.5,.5]
         *  @param {Number} [range=soundDefaultRange] - World space max range of sound, will not play if camera is farther away
         *  @param {Number} [taper=soundDefaultTaper] - At what percentage of range should it start tapering off
         */
        constructor(zzfxSound: any[], range?: number, taper?: number);
        /** @property {Number} - World space max range of sound, will not play if camera is farther away */
        range: number;
        /** @property {Number} - At what percentage of range should it start tapering off */
        taper: number;
        randomness: any;
        cachedSamples: number[];
        /** Play the sound
         *  @param {Vector2} [pos] - World space position to play the sound, sound is not attenuated if null
         *  @param {Number}  [volume=1] - How much to scale volume by (in addition to range fade)
         *  @param {Number}  [pitch=1] - How much to scale pitch by (also adjusted by this.randomness)
         *  @param {Number}  [randomnessScale=1] - How much to scale randomness
         *  @return {AudioBufferSourceNode} - The audio, can be used to stop sound later
         */
        play(pos?: Vector2, volume?: number, pitch?: number, randomnessScale?: number): AudioBufferSourceNode;
        /** Play the sound as a note with a semitone offset
         *  @param {Number}  semitoneOffset - How many semitones to offset pitch
         *  @param {Vector2} [pos] - World space position to play the sound, sound is not attenuated if null
         *  @param {Number}  [volume=1] - How much to scale volume by (in addition to range fade)
         *  @return {AudioBufferSourceNode} - The audio, can be used to stop sound later
         */
        playNote(semitoneOffset: number, pos?: Vector2, volume?: number): AudioBufferSourceNode;
    }
    /**
     * Music Object - Stores a zzfx music track for later use
     * <br>
     * <br><b><a href=https://keithclark.github.io/ZzFXM/>Create music with the ZzFXM tracker.</a></b>
     * @example
     * // create some music
     * const music_example = new Music(
     * [
     *     [                         // instruments
     *       [,0,400]                // simple note
     *     ],
     *     [                         // patterns
     *         [                     // pattern 1
     *             [                 // channel 0
     *                 0, -1,        // instrument 0, left speaker
     *                 1, 0, 9, 1    // channel notes
     *             ],
     *             [                 // channel 1
     *                 0, 1,         // instrument 1, right speaker
     *                 0, 12, 17, -1 // channel notes
     *             ]
     *         ],
     *     ],
     *     [0, 0, 0, 0], // sequence, play pattern 0 four times
     *     90            // BPM
     * ]);
     *
     * // play the music
     * music_example.play();
     */
    export class Music {
        /** Create a music object and cache the zzfx music samples for later use
         *  @param {Array} zzfxMusic - Array of zzfx music parameters
         */
        constructor(zzfxMusic: any[]);
        cachedSamples: any[];
        /** Play the music
         *  @param {Number}  [volume=1] - How much to scale volume by
         *  @param {Boolean} [loop=1] - True if the music should loop when it reaches the end
         *  @return {AudioBufferSourceNode} - The audio node, can be used to stop sound later
         */
        play(volume?: number, loop?: boolean): AudioBufferSourceNode;
    }
    export function speakStop(): void;
    export function getNoteFrequency(semitoneOffset: number, rootFrequency?: number): number;
    /** Audio context used by the engine
     *  @memberof Audio */
    export let audioContext: any;
    export function zzfx(...zzfxSound: any[]): any[];
    /** Sample rate used for all ZzFX sounds
     *  @default 44100
     *  @memberof Audio */
    export const zzfxR: 44100;
    /** The tile collision layer array, use setTileCollisionData and getTileCollisionData to access
     *  @memberof TileCollision */
    export let tileCollision: any[];
    /** Size of the tile collision layer
     *  @type {Vector2}
     *  @memberof TileCollision */
    export let tileCollisionSize: Vector2;
    export function setTileCollisionData(pos: Vector2, data?: number): number;
    export function getTileCollisionData(pos: Vector2): number;
    /**
     * Tile layer data object stores info about how to render a tile
     * @example
     * // create tile layer data with tile index 0 and random orientation and color
     * const tileIndex = 0;
     * const direction = randInt(4)
     * const mirror = randInt(2);
     * const color = randColor();
     * const data = new TileLayerData(tileIndex, direction, mirror, color);
     */
    export class TileLayerData {
        /** Create a tile layer data object, one for each tile in a TileLayer
         *  @param {Number}  [tile]                   - The tile to use, untextured if undefined
         *  @param {Number}  [direction=0]            - Integer direction of tile, in 90 degree increments
         *  @param {Boolean} [mirror=0]               - If the tile should be mirrored along the x axis
         *  @param {Color}   [color=new Color(1,1,1)] - Color of the tile */
        constructor(tile?: number, direction?: number, mirror?: boolean, color?: Color);
        /** @property {Number}  - The tile to use, untextured if undefined */
        tile: number;
        /** @property {Number}  - Integer direction of tile, in 90 degree increments */
        direction: number;
        /** @property {Boolean} - If the tile should be mirrored along the x axis */
        mirror: boolean;
        /** @property {Color}   - Color of the tile */
        color: Color;
        /** Set this tile to clear, it will not be rendered */
        clear(): void;
    }
    /**
     * Tile layer object - cached rendering system for tile layers
     * <br> - Each Tile layer is rendered to an off screen canvas
     * <br> - To allow dynamic modifications, layers are rendered using canvas 2d
     * <br> - Some devices like mobile phones are limited to 4k texture resolution
     * <br> - So with 16x16 tiles this limits layers to 256x256 on mobile devices
     * @extends EngineObject
     * @example
     * // create tile collision and visible tile layer
     * initTileCollision(vec2(200,100));
     * const tileLayer = new TileLayer();
     */
    export class TileLayer extends EngineObject {
        /** Create a tile layer object
            *  @param {Vector2} [position=new Vector2()]   - World space position
            *  @param {Vector2} [size=tileCollisionSize]   - World space size
            *  @param {Vector2} [tileSize=tileSizeDefault] - Size of tiles in source pixels
            *  @param {Vector2} [scale=new Vector2(1,1)]   - How much to scale this layer when rendered
            *  @param {Number}  [renderOrder=0]            - Objects sorted by renderOrder before being rendered
            */
        constructor(pos: any, size?: Vector2, tileSize?: Vector2, scale?: Vector2, renderOrder?: number);
        /** @property {HTMLCanvasElement}        - The canvas used by this tile layer */
        canvas: HTMLCanvasElement;
        /** @property {CanvasRenderingContext2D} - The 2D canvas context used by this tile layer */
        context: CanvasRenderingContext2D;
        /** @property {Vector2}                  - How much to scale this layer when rendered */
        scale: Vector2;
        data: TileLayerData[];
        /** Set data at a given position in the array
         *  @param {Vector2}       position   - Local position in array
         *  @param {TileLayerData} data       - Data to set
         *  @param {Boolean}       [redraw=0] - Force the tile to redraw if true */
        setData(layerPos: any, data: TileLayerData, redraw?: boolean): void;
        /** Get data at a given position in the array
         *  @param {Vector2} layerPos - Local position in array
         *  @return {TileLayerData} */
        getData(layerPos: Vector2): TileLayerData;
        /** Draw all the tile data to an offscreen canvas
         *  - This may be slow in some browsers
        */
        redraw(): void;
        /** Call to start the redraw process
         *  @param {Boolean} [clear=0] - Should it clear the canvas before drawing */
        redrawStart(clear?: boolean): void;
        savedRenderSettings: (number | HTMLCanvasElement | CanvasRenderingContext2D | Vector2)[];
        /** Call to end the redraw process */
        redrawEnd(): void;
        /** Draw the tile at a given position
         *  @param {Vector2} layerPos */
        drawTileData(layerPos: Vector2): void;
        /** Draw all the tiles in this layer */
        drawAllTileData(): void;
        /** Draw directly to the 2D canvas in world space (bipass webgl)
         *  @param {Vector2}  pos
         *  @param {Vector2}  size
         *  @param {Number}   [angle=0]
         *  @param {Boolean}  [mirror=0]
         *  @param {Function} drawFunction */
        drawCanvas2D(pos: Vector2, size: Vector2, angle?: number, mirror?: boolean, drawFunction: Function): void;
        /** Draw a tile directly onto the layer canvas
         *  @param {Vector2} pos
         *  @param {Vector2} [size=new Vector2(1,1)]
         *  @param {Number}  [tileIndex=-1]
         *  @param {Vector2} [tileSize=tileSizeDefault]
         *  @param {Color}   [color=new Color(1,1,1)]
         *  @param {Number}  [angle=0]
         *  @param {Boolean} [mirror=0] */
        drawTile(pos: Vector2, size?: Vector2, tileIndex?: number, tileSize?: Vector2, color?: Color, angle?: number, mirror?: boolean): void;
        /** Draw a rectangle directly onto the layer canvas
         *  @param {Vector2} pos
         *  @param {Vector2} [size=new Vector2(1,1)]
         *  @param {Color}   [color=new Color(1,1,1)]
         *  @param {Number}  [angle=0] */
        drawRect(pos: Vector2, size?: Vector2, color?: Color, angle?: number): void;
    }
    /**
     * Particle Emitter - Spawns particles with the given settings
     * @extends EngineObject
     * @example
     * // create a particle emitter
     * let pos = vec2(2,3);
     * let particleEmiter = new ParticleEmitter
     * (
     *     pos, 0, 1, 0, 500, PI,  // pos, angle, emitSize, emitTime, emitRate, emiteCone
     *     0, vec2(16),                            // tileIndex, tileSize
     *     new Color(1,1,1),   new Color(0,0,0),   // colorStartA, colorStartB
     *     new Color(1,1,1,0), new Color(0,0,0,0), // colorEndA, colorEndB
     *     2, .2, .2, .1, .05,  // particleTime, sizeStart, sizeEnd, particleSpeed, particleAngleSpeed
     *     .99, 1, 1, PI, .05,  // damping, angleDamping, gravityScale, particleCone, fadeRate,
     *     .5, 1                // randomness, collide, additive, randomColorLinear, renderOrder
     * );
     */
    export class ParticleEmitter extends EngineObject {
        /** Create a particle system with the given settings
         *  @param {Vector2} position           - World space position of the emitter
         *  @param {Number}  [angle=0]          - Angle to emit the particles
         *  @param {Number}  [emitSize=0]       - World space size of the emitter (float for circle diameter, vec2 for rect)
         *  @param {Number}  [emitTime=0]       - How long to stay alive (0 is forever)
         *  @param {Number}  [emitRate=100]     - How many particles per second to spawn, does not emit if 0
         *  @param {Number}  [emitConeAngle=PI] - Local angle to apply velocity to particles from emitter
         *  @param {Number}  [tileIndex=-1]     - Index into tile sheet, if <0 no texture is applied
         *  @param {Number}  [tileSize=tileSizeDefault]     - Tile size for particles
         *  @param {Color}   [colorStartA=new Color(1,1,1)] - Color at start of life 1, randomized between start colors
         *  @param {Color}   [colorStartB=new Color(1,1,1)] - Color at start of life 2, randomized between start colors
         *  @param {Color}   [colorEndA=new Color(1,1,1,0)] - Color at end of life 1, randomized between end colors
         *  @param {Color}   [colorEndB=new Color(1,1,1,0)] - Color at end of life 2, randomized between end colors
         *  @param {Number}  [particleTime=.5]      - How long particles live
         *  @param {Number}  [sizeStart=.1]         - How big are particles at start
         *  @param {Number}  [sizeEnd=1]            - How big are particles at end
         *  @param {Number}  [speed=.1]             - How fast are particles when spawned
         *  @param {Number}  [angleSpeed=.05]       - How fast are particles rotating
         *  @param {Number}  [damping=1]            - How much to dampen particle speed
         *  @param {Number}  [angleDamping=1]       - How much to dampen particle angular speed
         *  @param {Number}  [gravityScale=0]       - How much does gravity effect particles
         *  @param {Number}  [particleConeAngle=PI] - Cone for start particle angle
         *  @param {Number}  [fadeRate=.1]          - How quick to fade in particles at start/end in percent of life
         *  @param {Number}  [randomness=.2]        - Apply extra randomness percent
         *  @param {Boolean} [collideTiles=0]       - Do particles collide against tiles
         *  @param {Boolean} [additive=0]           - Should particles use addtive blend
         *  @param {Boolean} [randomColorLinear=1]  - Should color be randomized linearly or across each component
         *  @param {Number}  [renderOrder=0]        - Render order for particles (additive is above other stuff by default)
         */
        constructor(pos: any, angle?: number, emitSize?: number, emitTime?: number, emitRate?: number, emitConeAngle?: number, tileIndex?: number, tileSize?: number, colorStartA?: Color, colorStartB?: Color, colorEndA?: Color, colorEndB?: Color, particleTime?: number, sizeStart?: number, sizeEnd?: number, speed?: number, angleSpeed?: number, damping?: number, angleDamping?: number, gravityScale?: number, particleConeAngle?: number, fadeRate?: number, randomness?: number, collideTiles?: boolean, additive?: boolean, randomColorLinear?: boolean, renderOrder?: number);
        /** @property {Number} - World space size of the emitter (float for circle diameter, vec2 for rect) */
        emitSize: number;
        /** @property {Number} - How long to stay alive (0 is forever) */
        emitTime: number;
        /** @property {Number} - How many particles per second to spawn, does not emit if 0 */
        emitRate: number;
        /** @property {Number} - Local angle to apply velocity to particles from emitter */
        emitConeAngle: number;
        /** @property {Color} - Color at start of life 1, randomized between start colors */
        colorStartA: Color;
        /** @property {Color} - Color at start of life 2, randomized between start colors */
        colorStartB: Color;
        /** @property {Color} - Color at end of life 1, randomized between end colors */
        colorEndA: Color;
        /** @property {Color} - Color at end of life 2, randomized between end colors */
        colorEndB: Color;
        /** @property {Boolean} - Should color be randomized linearly or across each component */
        randomColorLinear: boolean;
        /** @property {Number} - How long particles live */
        particleTime: number;
        /** @property {Number} - How big are particles at start */
        sizeStart: number;
        /** @property {Number} - How big are particles at end */
        sizeEnd: number;
        /** @property {Number} - How fast are particles when spawned */
        speed: number;
        /** @property {Number} - How fast are particles rotating */
        angleSpeed: number;
        /** @property {Number} - Cone for start particle angle */
        particleConeAngle: number;
        /** @property {Number} - How quick to fade in particles at start/end in percent of life */
        fadeRate: number;
        /** @property {Number} - Apply extra randomness percent */
        randomness: number;
        /** @property {Number} - Do particles collide against tiles */
        collideTiles: boolean;
        /** @property {Number} - Should particles use addtive blend */
        additive: boolean;
        /** @property {Number} - If set the partile is drawn as a trail, stretched in the drection of velocity */
        trailScale: number;
        emitTimeBuffer: number;
        /** Spawn one particle
         *  @return {Particle} */
        emitParticle(): Particle;
    }
    /**
     * Particle Object - Created automatically by Particle Emitters
     * @extends EngineObject
     */
    export class Particle extends EngineObject {
        /**
         * Create a particle with the given settings
         * @param {Vector2} position                   - World space position of the particle
         * @param {Number}  [tileIndex=-1]             - Tile to use to render, untextured if -1
         * @param {Vector2} [tileSize=tileSizeDefault] - Size of tile in source pixels
         * @param {Number}  [angle=0]                  - Angle to rotate the particle
         */
        constructor(pos: any, tileIndex?: number, tileSize?: Vector2, angle?: number);
    }
    /** List of all medals
     *  @memberof Medals */
    export const medals: any[];
    /** Set to stop medals from being unlockable (like if cheats are enabled)
     *  @memberof Medals */
    export let medalsPreventUnlock: any;
    /** This can used to enable Newgrounds functionality
     *  @type {Newgrounds}
     *  @memberof Medals */
    export let newgrounds: Newgrounds;
    export let medalsDisplayQueue: any[];
    export let medalsSaveName: any;
    export let medalsDisplayTimeLast: any;
    /**
     * Medal Object - Tracks an unlockable medal
     * @example
     * // create a medal
     * const medal_example = new Medal(0, 'Example Medal', 'More info about the medal goes here.', '🎖️');
     *
     * // initialize medals
     * medalsInit('Example Game');
     *
     * // unlock the medal
     * medal_example.unlock();
     */
    export class Medal {
        /** Create an medal object and adds it to the list of medals
         *  @param {Number} id            - The unique identifier of the medal
         *  @param {String} name          - Name of the medal
         *  @param {String} [description] - Description of the medal
         *  @param {String} [icon='🏆']  - Icon for the medal
         *  @param {String} [src]         - Image location for the medal
         */
        constructor(id: number, name: string, description?: string, icon?: string, src?: string);
        id: number;
        name: string;
        description: string;
        icon: string;
        image: HTMLImageElement;
        /** Unlocks a medal if not already unlocked */
        unlock(): void;
        unlocked: number;
        /** Render a medal
         *  @param {Number} [hidePercent=0] - How much to slide the medal off screen
         */
        render(hidePercent?: number): void;
        /** Render the icon for a medal
         *  @param {Number} x - Screen space X position
         *  @param {Number} y - Screen space Y position
         *  @param {Number} [size=medalDisplayIconSize] - Screen space size
         */
        renderIcon(x: number, y: number, size?: number): void;
        storageKey(): string;
    }
    /**
     * Newgrounds API wrapper object
     * @example
     * // create a newgrounds object, replace the app id and cipher with your own
     * const app_id = '53123:1ZuSTQ9l';
     * const cipher = 'enF0vGH@Mj/FRASKL23Q==';
     * newgrounds = new Newgrounds(app_id, cipher);
     */
    export class Newgrounds {
        /** Create a newgrounds object
         *  @param {Number} app_id   - The newgrounds App ID
         *  @param {String} [cipher] - The encryption Key (AES-128/Base64) */
        constructor(app_id: number, cipher?: string);
        app_id: number;
        cipher: string;
        host: string;
        cryptoJS: any;
        session_id: string | number;
        medals: any;
        scoreboards: any;
        /** Send message to unlock a medal by id
         * @param {Number} id - The medal id */
        unlockMedal(id: number): any;
        /** Send message to post score
         * @param {Number} id    - The scoreboard id
         * @param {Number} value - The score value */
        postScore(id: number, value: number): any;
        /** Get scores from a scoreboard
         * @param {Number} id         - The scoreboard id
         * @param {String} [user=0]   - A user's id or name
         * @param {Number} [social=0] - If true, only social scores will be loaded
         * @param {Number} [skip=0]   - Number of scores to skip before start
         * @param {Number} [limit=10] - Number of scores to include in the list
         * @return {Object}           - The response JSON object
         */
        getScores(id: number, user?: string, social?: number, skip?: number, limit?: number): any;
        /** Send message to log a view */
        logView(): any;
        /** Send a message to call a component of the Newgrounds API
         * @param {String}  component      - Name of the component
         * @param {Object}  [parameters=0] - Parameters to use for call
         * @param {Boolean} [async=0]      - If true, don't wait for response before continuing (avoid stall)
         * @return {Object}                - The response JSON object
         */
        call(component: string, parameters?: any, async?: boolean): any;
    }
    export function CryptoJS(): any;
    /** The WebGL canvas which appears above the main canvas and below the overlay canvas
     *  @type {HTMLCanvasElement}
     *  @memberof WebGL */
    export let glCanvas: HTMLCanvasElement;
    /** 2d context for glCanvas
     *  @type {WebGLRenderingContext}
     *  @memberof WebGL */
    export let glContext: WebGLRenderingContext;
    /** Main tile sheet texture automatically loaded by engine
     *  @type {WebGLTexture}
     *  @memberof WebGL */
    export let glTileTexture: WebGLTexture;
    export let glActiveTexture: any;
    export let glShader: any;
    export let glPositionData: any;
    export let glColorData: any;
    export let glBatchCount: any;
    export let glBatchAdditive: any;
    export let glAdditive: any;
    export const gl_ONE: 1;
    export const gl_TRIANGLES: 4;
    export const gl_SRC_ALPHA: 770;
    export const gl_ONE_MINUS_SRC_ALPHA: 771;
    export const gl_BLEND: 3042;
    export const gl_TEXTURE_2D: 3553;
    export const gl_UNSIGNED_BYTE: 5121;
    export const gl_FLOAT: 5126;
    export const gl_RGBA: 6408;
    export const gl_NEAREST: 9728;
    export const gl_LINEAR: 9729;
    export const gl_TEXTURE_MAG_FILTER: 10240;
    export const gl_TEXTURE_MIN_FILTER: 10241;
    export const gl_TEXTURE_WRAP_S: 10242;
    export const gl_TEXTURE_WRAP_T: 10243;
    export const gl_COLOR_BUFFER_BIT: 16384;
    export const gl_CLAMP_TO_EDGE: 33071;
    export const gl_ARRAY_BUFFER: 34962;
    export const gl_DYNAMIC_DRAW: 35048;
    export const gl_FRAGMENT_SHADER: 35632;
    export const gl_VERTEX_SHADER: 35633;
    export const gl_COMPILE_STATUS: 35713;
    export const gl_LINK_STATUS: 35714;
    export const gl_VERTICES_PER_QUAD: 6;
    export const gl_INDICIES_PER_VERT: 6;
    export const gl_MAX_BATCH: number;
    export const gl_VERTEX_BYTE_STRIDE: number;
    /** Name of engine */
    export const engineName: "LittleJS";
    /** Version of engine */
    export const engineVersion: "1.3.8";
    /** Frames per second to update objects
     *  @default */
    export const frameRate: 60;
    /** How many seconds each frame lasts, engine uses a fixed time step
     *  @default 1/60 */
    export const timeDelta: number;
    /** Array containing all engine objects */
    export let engineObjects: any[];
    /** Array containing only objects that are set to collide with other objects this frame (for optimization) */
    export let engineObjectsCollide: any[];
    /** Current update frame, used to calculate time */
    export let frame: number;
    /** Current engine time since start in seconds, derived from frame */
    export let time: number;
    /** Actual clock time since start in seconds (not affected by pause or frame rate clamping) */
    export let timeReal: number;
    /** Is the game paused? Causes time and objects to not be updated. */
    export let paused: number;
    export let frameTimeLastMS: number;
    export let frameTimeBufferMS: number;
    export let tileImageSize: any;
    export let tileImageFixBleed: any;
    export let averageFPS: any;
    export let drawCount: any;
    export const styleBody: string;
    export const styleCanvas: "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)";
}
