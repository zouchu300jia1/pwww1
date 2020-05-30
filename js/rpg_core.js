//=============================================================================
// rpg_core.js v1.3.3
//=============================================================================

//-----------------------------------------------------------------------------
/**
 * This is not a class, but contains some methods that will be added to the
 * standard Javascript objects.
 *
 * @class JsExtensions
 */
function JsExtensions() {
    throw new Error('This is not a class');
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * @method Number.prototype.clamp
 * @param {Number} min The lower boundary
 * @param {Number} max The upper boundary
 * @return {Number} A number in the range (min, max)
 */
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

/**
 * Returns a modulo value which is always positive.
 *
 * @method Number.prototype.mod
 * @param {Number} n The divisor
 * @return {Number} A modulo value
 */
Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
};

/**
 * Replaces %1, %2 and so on in the string to the arguments.
 *
 * @method String.prototype.format
 * @param {Any} ...args The objects to format
 * @return {String} A formatted string
 */
String.prototype.format = function() {
    var args = arguments;
    return this.replace(/%([0-9]+)/g, function(s, n) {
        return args[Number(n) - 1];
    });
};

/**
 * Makes a number string with leading zeros.
 *
 * @method String.prototype.padZero
 * @param {Number} length The length of the output string
 * @return {String} A string with leading zeros
 */
String.prototype.padZero = function(length){
    var s = this;
    while (s.length < length) {
        s = '0' + s;
    }
    return s;
};

/**
 * Makes a number string with leading zeros.
 *
 * @method Number.prototype.padZero
 * @param {Number} length The length of the output string
 * @return {String} A string with leading zeros
 */
Number.prototype.padZero = function(length){
    return String(this).padZero(length);
};

Object.defineProperties(Array.prototype, {
    /**
     * Checks whether the two arrays are same.
     *
     * @method Array.prototype.equals
     * @param {Array} array The array to compare to
     * @return {Boolean} True if the two arrays are same
     */
    equals: {
        enumerable: false,
        value: function(array) {
            if (!array || this.length !== array.length) {
                return false;
            }
            for (var i = 0; i < this.length; i++) {
                if (this[i] instanceof Array && array[i] instanceof Array) {
                    if (!this[i].equals(array[i])) {
                        return false;
                    }
                } else if (this[i] !== array[i]) {
                    return false;
                }
            }
            return true;
        }
    },
    /**
     * Makes a shallow copy of the array.
     *
     * @method Array.prototype.clone
     * @return {Array} A shallow copy of the array
     */
    clone: {
        enumerable: false,
        value: function() {
            return this.slice(0);
        }
    },
    /**
     * Checks whether the array contains a given element.
     *
     * @method Array.prototype.contains
     * @param {Any} element The element to search for
     * @return {Boolean} True if the array contains a given element
     */
    contains : {
        enumerable: false,
        value: function(element) {
            return this.indexOf(element) >= 0;
        }
    }
});

/**
 * Checks whether the string contains a given string.
 *
 * @method String.prototype.contains
 * @param {String} string The string to search for
 * @return {Boolean} True if the string contains a given string
 */
String.prototype.contains = function(string) {
    return this.indexOf(string) >= 0;
};

/**
 * Generates a random integer in the range (0, max-1).
 *
 * @static
 * @method Math.randomInt
 * @param {Number} max The upper boundary (excluded)
 * @return {Number} A random integer
 */
Math.randomInt = function(max) {
    return Math.floor(max * Math.random());
};

//-----------------------------------------------------------------------------
/**
 * The static class that defines utility methods.
 *
 * @class Utils
 */
function Utils() {
    throw new Error('This is a static class');
}

/**
 * The name of the RPG Maker. 'MV' in the current version.
 *
 * @static
 * @property RPGMAKER_NAME
 * @type String
 * @final
 */
Utils.RPGMAKER_NAME = 'MV';

/**
 * The version of the RPG Maker.
 *
 * @static
 * @property RPGMAKER_VERSION
 * @type String
 * @final
 */
Utils.RPGMAKER_VERSION = "1.3.3";

/**
 * Checks whether the option is in the query string.
 *
 * @static
 * @method isOptionValid
 * @param {String} name The option name
 * @return {Boolean} True if the option is in the query string
 */
Utils.isOptionValid = function(name) {
    return location.search.slice(1).split('&').contains(name);
};

/**
 * Checks whether the platform is NW.js.
 *
 * @static
 * @method isNwjs
 * @return {Boolean} True if the platform is NW.js
 */
Utils.isNwjs = function() {
    return typeof require === 'function' && typeof process === 'object';
};

/**
 * Checks whether the platform is a mobile device.
 *
 * @static
 * @method isMobileDevice
 * @return {Boolean} True if the platform is a mobile device
 */
Utils.isMobileDevice = function() {
    var r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return !!navigator.userAgent.match(r);
};

/**
 * Checks whether the browser is Mobile Safari.
 *
 * @static
 * @method isMobileSafari
 * @return {Boolean} True if the browser is Mobile Safari
 */
Utils.isMobileSafari = function() {
    var agent = navigator.userAgent;
    return !!(agent.match(/iPhone|iPad|iPod/) && agent.match(/AppleWebKit/) &&
              !agent.match('CriOS'));
};

/**
 * Checks whether the browser is Android Chrome.
 *
 * @static
 * @method isAndroidChrome
 * @return {Boolean} True if the browser is Android Chrome
 */
Utils.isAndroidChrome = function() {
    var agent = navigator.userAgent;
    return !!(agent.match(/Android/) && agent.match(/Chrome/));
};

/**
 * Checks whether the browser can read files in the game folder.
 *
 * @static
 * @method canReadGameFiles
 * @return {Boolean} True if the browser can read files in the game folder
 */
Utils.canReadGameFiles = function() {
    var scripts = document.getElementsByTagName('script');
    var lastScript = scripts[scripts.length - 1];
    var xhr = new XMLHttpRequest();
    try {
        xhr.open('GET', lastScript.src);
        xhr.overrideMimeType('text/javascript');
        xhr.send();
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * Makes a CSS color string from RGB values.
 *
 * @static
 * @method rgbToCssColor
 * @param {Number} r The red value in the range (0, 255)
 * @param {Number} g The green value in the range (0, 255)
 * @param {Number} b The blue value in the range (0, 255)
 * @return {String} CSS color string
 */
Utils.rgbToCssColor = function(r, g, b) {
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
};

//-----------------------------------------------------------------------------
/**
 * The resource class. Allows to be collected as a garbage if not use for some time or ticks
 *
 * @class CacheEntry
 * @constructor
 * @param {ResourceManager} resource manager
 * @param {string} key, url of the resource
 * @param {string} item - Bitmap, HTML5Audio, WebAudio - whatever you want to store in the cache
 */
function CacheEntry(cache, key, item) {
    this.cache = cache;
    this.key = key;
    this.item = item;
    this.cached = false;
    this.touchTicks = 0;
    this.touchSeconds = 0;
    this.ttlTicks = 0;
    this.ttlSeconds = 0;
    this.freedByTTL = false;
}

/**
 * frees the resource
 */
CacheEntry.prototype.free = function (byTTL) {
    this.freedByTTL = byTTL || false;
    if (this.cached) {
        this.cached = false;
        delete this.cache._inner[this.key];
    }
};

/**
 * Allocates the resource
 * @returns {CacheEntry}
 */
CacheEntry.prototype.allocate = function () {
    if (!this.cached) {
        this.cache._inner[this.key] = this;
        this.cached = true;
    }
    this.touch();
    return this;
};

/**
 * Sets the time to live
 * @param {number} ticks TTL in ticks, 0 if not set
 * @param {number} time TTL in seconds, 0 if not set
 * @returns {CacheEntry}
 */
CacheEntry.prototype.setTimeToLive = function (ticks, seconds) {
    this.ttlTicks = ticks || 0;
    this.ttlSeconds = seconds || 0;
    return this;
};

CacheEntry.prototype.isStillAlive = function () {
    var cache = this.cache;
    return ((this.ttlTicks == 0) || (this.touchTicks + this.ttlTicks < cache.updateTicks )) &&
        ((this.ttlSeconds == 0) || (this.touchSeconds + this.ttlSeconds < cache.updateSeconds ));
};

/**
 * makes sure that resource wont freed by Time To Live
 * if resource was already freed by TTL, put it in cache again
 */
CacheEntry.prototype.touch = function () {
    var cache = this.cache;
    if (this.cached) {
        this.touchTicks = cache.updateTicks;
        this.touchSeconds = cache.updateSeconds;
    } else if (this.freedByTTL) {
        this.freedByTTL = false;
        //TODO: shall we log this event? its not normal
        if (!cache._inner[this.key]) {
            cache._inner[this.key] = this;
        }
    }
};

/**
 * Cache for images, audio, or any other kind of resource
 * @param manager
 * @constructor
 */
function CacheMap(manager) {
    this.manager = manager;
    this._inner = {};
    this._lastRemovedEntries = {};
    this.updateTicks = 0;
    this.lastCheckTTL = 0;
    this.delayCheckTTL = 100.0;
    this.updateSeconds = Date.now();
}

/**
 * checks ttl of all elements and removes dead ones
 */
CacheMap.prototype.checkTTL = function () {
    var cache = this._inner;
    var temp = this._lastRemovedEntries;
    if (!temp) {
        temp = [];
        this._lastRemovedEntries = temp;
    }
    for (var key in cache) {
        var entry = cache[key];
        if (!entry.isStillAlive()) {
            temp.push(entry);
        }
    }
    for (var i = 0; i < temp.length; i++) {
        temp[i].free(true);
    }
    temp.length = 0;
};

/**
 * cache item
 * @param key url of cache element
 * @returns {*|null}
 */
CacheMap.prototype.getItem = function (key) {
    var entry = this._inner[key];
    if (entry) {
        return entry.item;
    }
    return null;
};

CacheMap.prototype.clear = function () {
    var keys = Object.keys(this._inner);
    for (var i = 0; i < keys.length; i++) {
        this._inner[keys[i]].free();
    }
};

CacheMap.prototype.setItem = function (key, item) {
    return new CacheEntry(this, key, item).allocate();
};

CacheMap.prototype.update = function(ticks, delta) {
    this.updateTicks += ticks;
    this.updateSeconds += delta;
    if (this.updateSeconds >= this.delayCheckTTL + this.lastCheckTTL) {
        this.lastCheckTTL = this.updateSeconds;
        this.checkTTL();
    }
};

//-----------------------------------------------------------------------------
/**
 * The point class.
 *
 * @class Point
 * @constructor
 * @param {Number} x The x coordinate
 * @param {Number} y The y coordinate
 */
function Point() {
    this.initialize.apply(this, arguments);
}

Point.prototype = Object.create(PIXI.Point.prototype);
Point.prototype.constructor = Point;

Point.prototype.initialize = function(x, y) {
    PIXI.Point.call(this, x, y);
};

/**
 * The x coordinate.
 *
 * @property x
 * @type Number
 */

/**
 * The y coordinate.
 *
 * @property y
 * @type Number
 */

//-----------------------------------------------------------------------------
/**
 * The rectangle class.
 *
 * @class Rectangle
 * @constructor
 * @param {Number} x The x coordinate for the upper-left corner
 * @param {Number} y The y coordinate for the upper-left corner
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 */
function Rectangle() {
    this.initialize.apply(this, arguments);
}

Rectangle.prototype = Object.create(PIXI.Rectangle.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.initialize = function(x, y, width, height) {
    PIXI.Rectangle.call(this, x, y, width, height);
};

/**
 * @static
 * @property emptyRectangle
 * @type Rectangle
 * @private
 */
Rectangle.emptyRectangle = new Rectangle(0, 0, 0, 0);

/**
 * The x coordinate for the upper-left corner.
 *
 * @property x
 * @type Number
 */

/**
 * The y coordinate for the upper-left corner.
 *
 * @property y
 * @type Number
 */

/**
 * The width of the rectangle.
 *
 * @property width
 * @type Number
 */

/**
 * The height of the rectangle.
 *
 * @property height
 * @type Number
 */

//-----------------------------------------------------------------------------
/**
 * The basic object that represents an image.
 *
 * @class Bitmap
 * @constructor
 * @param {Number} width The width of the bitmap
 * @param {Number} height The height of the bitmap
 */
function Bitmap() {
    this.initialize.apply(this, arguments);
}

Bitmap.prototype.initialize = function(width, height) {
    this._canvas = document.createElement('canvas');
    this._context = this._canvas.getContext('2d');
    this._canvas.width = Math.max(width || 0, 1);
    this._canvas.height = Math.max(height || 0, 1);
    this._baseTexture = new PIXI.BaseTexture(this._canvas);
    this._baseTexture.mipmap = false;
    this._baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    this._image = null;
    this._url = '';
    this._paintOpacity = 255;
    this._smooth = false;
    this._loadListeners = [];
    this._isLoading = false;
    this._hasError = false;

    /**
     * Cache entry, for images. In all cases _url is the same as cacheEntry.key
     * @type CacheEntry
     */
    this.cacheEntry = null;

    /**
     * The face name of the font.
     *
     * @property fontFace
     * @type String
     */
    this.fontFace = 'GameFont';

    /**
     * The size of the font in pixels.
     *
     * @property fontSize
     * @type Number
     */
    this.fontSize = 28;

    /**
     * Whether the font is italic.
     *
     * @property fontItalic
     * @type Boolean
     */
    this.fontItalic = false;

    /**
     * The color of the text in CSS format.
     *
     * @property textColor
     * @type String
     */
    this.textColor = '#ffffff';

    /**
     * The color of the outline of the text in CSS format.
     *
     * @property outlineColor
     * @type String
     */
    this.outlineColor = 'rgba(0, 0, 0, 0.5)';

    /**
     * The width of the outline of the text.
     *
     * @property outlineWidth
     * @type Number
     */
    this.outlineWidth = 4;
};

/**
 * Loads a image file and returns a new bitmap object.
 *
 * @static
 * @method load
 * @param {String} url The image url of the texture
 * @return Bitmap
 */
Bitmap.load = function(url) {
    var bitmap = new Bitmap();
    bitmap._image = new Image();
    bitmap._url = url;
    bitmap._isLoading = true;

    if(!Decrypter.checkImgIgnore(url) && Decrypter.hasEncryptedImages) {
        Decrypter.decryptImg(url, bitmap);
    } else {
        bitmap._image.src = url;
        bitmap._image.onload = Bitmap.prototype._onLoad.bind(bitmap);
        bitmap._image.onerror = Bitmap.prototype._onError.bind(bitmap);
    }

    return bitmap;
};

/**
 * Takes a snapshot of the game screen and returns a new bitmap object.
 *
 * @static
 * @method snap
 * @param {Stage} stage The stage object
 * @return Bitmap
 */
Bitmap.snap = function(stage) {
    var width = Graphics.width;
    var height = Graphics.height;
    var bitmap = new Bitmap(width, height);
    var context = bitmap._context;
    var renderTexture = PIXI.RenderTexture.create(width, height);
    if (stage) {
        Graphics._renderer.render(stage, renderTexture);
        stage.worldTransform.identity();
        var canvas = null;
        if (Graphics.isWebGL()) {
            canvas = Graphics._renderer.extract.canvas(renderTexture);
        } else {
            canvas = renderTexture.baseTexture._canvasRenderTarget.canvas;
        }
        context.drawImage(canvas, 0, 0);
    } else {
        //TODO: Ivan: what if stage is not present?
    }
    bitmap._setDirty();
    return bitmap;
};

/**
 * Checks whether the bitmap is ready to render.
 *
 * @method isReady
 * @return {Boolean} True if the bitmap is ready to render
 */
Bitmap.prototype.isReady = function() {
    return !this._isLoading;
};

/**
 * Checks whether a loading error has occurred.
 *
 * @method isError
 * @return {Boolean} True if a loading error has occurred
 */
Bitmap.prototype.isError = function() {
    return this._hasError;
};

/**
 * touch the resource
 * @method touch
 */
Bitmap.prototype.touch = function() {
    if (this.cacheEntry) {
        this.cacheEntry.touch();
    }
};

/**
 * [read-only] The url of the image file.
 *
 * @property url
 * @type String
 */
Object.defineProperty(Bitmap.prototype, 'url', {
    get: function() {
        return this._url;
    },
    configurable: true
});

/**
 * [read-only] The base texture that holds the image.
 *
 * @property baseTexture
 * @type PIXI.BaseTexture
 */
Object.defineProperty(Bitmap.prototype, 'baseTexture', {
    get: function() {
        return this._baseTexture;
    },
    configurable: true
});

/**
 * [read-only] The bitmap canvas.
 *
 * @property canvas
 * @type HTMLCanvasElement
 */
Object.defineProperty(Bitmap.prototype, 'canvas', {
    get: function() {
        return this._canvas;
    },
    configurable: true
});

/**
 * [read-only] The 2d context of the bitmap canvas.
 *
 * @property context
 * @type CanvasRenderingContext2D
 */
Object.defineProperty(Bitmap.prototype, 'context', {
    get: function() {
        return this._context;
    },
    configurable: true
});

/**
 * [read-only] The width of the bitmap.
 *
 * @property width
 * @type Number
 */
Object.defineProperty(Bitmap.prototype, 'width', {
    get: function() {
        return this._isLoading ? 0 : this._canvas.width;
    },
    configurable: true
});

/**
 * [read-only] The height of the bitmap.
 *
 * @property height
 * @type Number
 */
Object.defineProperty(Bitmap.prototype, 'height', {
    get: function() {
        return this._isLoading ? 0 : this._canvas.height;
    },
    configurable: true
});

/**
 * [read-only] The rectangle of the bitmap.
 *
 * @property rect
 * @type Rectangle
 */
Object.defineProperty(Bitmap.prototype, 'rect', {
    get: function() {
        return new Rectangle(0, 0, this.width, this.height);
    },
    configurable: true
});

/**
 * Whether the smooth scaling is applied.
 *
 * @property smooth
 * @type Boolean
 */
Object.defineProperty(Bitmap.prototype, 'smooth', {
    get: function() {
        return this._smooth;
    },
    set: function(value) {
        if (this._smooth !== value) {
            this._smooth = value;
            if (this._smooth) {
                this._baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
            } else {
                this._baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            }
        }
    },
    configurable: true
});

/**
 * The opacity of the drawing object in the range (0, 255).
 *
 * @property paintOpacity
 * @type Number
 */
Object.defineProperty(Bitmap.prototype, 'paintOpacity', {
    get: function() {
        return this._paintOpacity;
    },
    set: function(value) {
      if (this._paintOpacity !== value) {
          this._paintOpacity = value;
          this._context.globalAlpha = this._paintOpacity / 255;
      }
    },
    configurable: true
});

/**
 * Resizes the bitmap.
 *
 * @method resize
 * @param {Number} width The new width of the bitmap
 * @param {Number} height The new height of the bitmap
 */
Bitmap.prototype.resize = function(width, height) {
    width = Math.max(width || 0, 1);
    height = Math.max(height || 0, 1);
    this._canvas.width = width;
    this._canvas.height = height;
    this._baseTexture.width = width;
    this._baseTexture.height = height;
};

/**
 * Performs a block transfer.
 *
 * @method blt
 * @param {Bitmap} source The bitmap to draw
 * @param {Number} sx The x coordinate in the source
 * @param {Number} sy The y coordinate in the source
 * @param {Number} sw The width of the source image
 * @param {Number} sh The height of the source image
 * @param {Number} dx The x coordinate in the destination
 * @param {Number} dy The y coordinate in the destination
 * @param {Number} [dw=sw] The width to draw the image in the destination
 * @param {Number} [dh=sh] The height to draw the image in the destination
 */
Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    dw = dw || sw;
    dh = dh || sh;
    if (sx >= 0 && sy >= 0 && sw > 0 && sh > 0 && dw > 0 && dh > 0 &&
            sx + sw <= source.width && sy + sh <= source.height) {
        this._context.globalCompositeOperation = 'source-over';
        this._context.drawImage(source._canvas, sx, sy, sw, sh, dx, dy, dw, dh);
        this._setDirty();
    }
};

/**
 * Performs a block transfer, using assumption that original image was not modified (no hue)
 *
 * @method blt
 * @param {Bitmap} source The bitmap to draw
 * @param {Number} sx The x coordinate in the source
 * @param {Number} sy The y coordinate in the source
 * @param {Number} sw The width of the source image
 * @param {Number} sh The height of the source image
 * @param {Number} dx The x coordinate in the destination
 * @param {Number} dy The y coordinate in the destination
 * @param {Number} [dw=sw] The width to draw the image in the destination
 * @param {Number} [dh=sh] The height to draw the image in the destination
 */
Bitmap.prototype.bltImage = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    dw = dw || sw;
    dh = dh || sh;
    if (sx >= 0 && sy >= 0 && sw > 0 && sh > 0 && dw > 0 && dh > 0 &&
        sx + sw <= source.width && sy + sh <= source.height) {
        this._context.globalCompositeOperation = 'source-over';
        this._context.drawImage(source._image, sx, sy, sw, sh, dx, dy, dw, dh);
        this._setDirty();
    }
};

/**
 * Returns pixel color at the specified point.
 *
 * @method getPixel
 * @param {Number} x The x coordinate of the pixel in the bitmap
 * @param {Number} y The y coordinate of the pixel in the bitmap
 * @return {String} The pixel color (hex format)
 */
Bitmap.prototype.getPixel = function(x, y) {
    var data = this._context.getImageData(x, y, 1, 1).data;
    var result = '#';
    for (var i = 0; i < 3; i++) {
        result += data[i].toString(16).padZero(2);
    }
    return result;
};

/**
 * Returns alpha pixel value at the specified point.
 *
 * @method getAlphaPixel
 * @param {Number} x The x coordinate of the pixel in the bitmap
 * @param {Number} y The y coordinate of the pixel in the bitmap
 * @return {String} The alpha value
 */
Bitmap.prototype.getAlphaPixel = function(x, y) {
    var data = this._context.getImageData(x, y, 1, 1).data;
    return data[3];
};

/**
 * Clears the specified rectangle.
 *
 * @method clearRect
 * @param {Number} x The x coordinate for the upper-left corner
 * @param {Number} y The y coordinate for the upper-left corner
 * @param {Number} width The width of the rectangle to clear
 * @param {Number} height The height of the rectangle to clear
 */
Bitmap.prototype.clearRect = function(x, y, width, height) {
    this._context.clearRect(x, y, width, height);
    this._setDirty();
};

/**
 * Clears the entire bitmap.
 *
 * @method clear
 */
Bitmap.prototype.clear = function() {
    this.clearRect(0, 0, this.width, this.height);
};

/**
 * Fills the specified rectangle.
 *
 * @method fillRect
 * @param {Number} x The x coordinate for the upper-left corner
 * @param {Number} y The y coordinate for the upper-left corner
 * @param {Number} width The width of the rectangle to clear
 * @param {Number} height The height of the rectangle to clear
 * @param {String} color The color of the rectangle in CSS format
 */
Bitmap.prototype.fillRect = function(x, y, width, height, color) {
    var context = this._context;
    context.save();
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
    context.restore();
    this._setDirty();
};

/**
 * Fills the entire bitmap.
 *
 * @method fillAll
 * @param {String} color The color of the rectangle in CSS format
 */
Bitmap.prototype.fillAll = function(color) {
    this.fillRect(0, 0, this.width, this.height, color);
};

/**
 * Draws the rectangle with a gradation.
 *
 * @method gradientFillRect
 * @param {Number} x The x coordinate for the upper-left corner
 * @param {Number} y The y coordinate for the upper-left corner
 * @param {Number} width The width of the rectangle to clear
 * @param {Number} height The height of the rectangle to clear
 * @param {String} color1 The start color of the gradation
 * @param {String} color2 The end color of the gradation
 * @param {Boolean} vertical Whether it draws a vertical gradient
 */
Bitmap.prototype.gradientFillRect = function(x, y, width, height, color1,
                                             color2, vertical) {
    var context = this._context;
    var grad;
    if (vertical) {
        grad = context.createLinearGradient(x, y, x, y + height);
    } else {
        grad = context.createLinearGradient(x, y, x + width, y);
    }
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    context.save();
    context.fillStyle = grad;
    context.fillRect(x, y, width, height);
    context.restore();
    this._setDirty();
};

/**
 * Draw the filled circle.
 *
 * @method drawCircle
 * @param {Number} x The x coordinate of the center of the circle
 * @param {Number} y The y coordinate of the center of the circle
 * @param {Number} radius The radius of the circle
 * @param {String} color The color of the circle in CSS format
 */
Bitmap.prototype.drawCircle = function(x, y, radius, color) {
    var context = this._context;
    context.save();
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
    this._setDirty();
};

/**
 * Draws the outline text to the bitmap.
 *
 * @method drawText
 * @param {String} text The text that will be drawn
 * @param {Number} x The x coordinate for the left of the text
 * @param {Number} y The y coordinate for the top of the text
 * @param {Number} maxWidth The maximum allowed width of the text
 * @param {Number} lineHeight The height of the text line
 * @param {String} align The alignment of the text
 */
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    // Note: Firefox has a bug with textBaseline: Bug 737852
    //       So we use 'alphabetic' here.
    if (text !== undefined) {
        var tx = x;
        var ty = y + lineHeight - (lineHeight - this.fontSize * 0.7) / 2;
        var context = this._context;
        var alpha = context.globalAlpha;
        maxWidth = maxWidth || 0xffffffff;
        if (align === 'center') {
            tx += maxWidth / 2;
        }
        if (align === 'right') {
            tx += maxWidth;
        }
        context.save();
        context.font = this._makeFontNameText();
        context.textAlign = align;
        context.textBaseline = 'alphabetic';
        context.globalAlpha = 1;
        this._drawTextOutline(text, tx, ty, maxWidth);
        context.globalAlpha = alpha;
        this._drawTextBody(text, tx, ty, maxWidth);
        context.restore();
        this._setDirty();
    }
};

/**
 * Returns the width of the specified text.
 *
 * @method measureTextWidth
 * @param {String} text The text to be measured
 * @return {Number} The width of the text in pixels
 */
Bitmap.prototype.measureTextWidth = function(text) {
    var context = this._context;
    context.save();
    context.font = this._makeFontNameText();
    var width = context.measureText(text).width;
    context.restore();
    return width;
};

/**
 * Changes the color tone of the entire bitmap.
 *
 * @method adjustTone
 * @param {Number} r The red strength in the range (-255, 255)
 * @param {Number} g The green strength in the range (-255, 255)
 * @param {Number} b The blue strength in the range (-255, 255)
 */
Bitmap.prototype.adjustTone = function(r, g, b) {
    if ((r || g || b) && this.width > 0 && this.height > 0) {
        var context = this._context;
        var imageData = context.getImageData(0, 0, this.width, this.height);
        var pixels = imageData.data;
        for (var i = 0; i < pixels.length; i += 4) {
            pixels[i + 0] += r;
            pixels[i + 1] += g;
            pixels[i + 2] += b;
        }
        context.putImageData(imageData, 0, 0);
        this._setDirty();
    }
};

/**
 * Rotates the hue of the entire bitmap.
 *
 * @method rotateHue
 * @param {Number} offset The hue offset in 360 degrees
 */
Bitmap.prototype.rotateHue = function(offset) {
    function rgbToHsl(r, g, b) {
        var cmin = Math.min(r, g, b);
        var cmax = Math.max(r, g, b);
        var h = 0;
        var s = 0;
        var l = (cmin + cmax) / 2;
        var delta = cmax - cmin;

        if (delta > 0) {
            if (r === cmax) {
                h = 60 * (((g - b) / delta + 6) % 6);
            } else if (g === cmax) {
                h = 60 * ((b - r) / delta + 2);
            } else {
                h = 60 * ((r - g) / delta + 4);
            }
            s = delta / (255 - Math.abs(2 * l - 255));
        }
        return [h, s, l];
    }

    function hslToRgb(h, s, l) {
        var c = (255 - Math.abs(2 * l - 255)) * s;
        var x = c * (1 - Math.abs((h / 60) % 2 - 1));
        var m = l - c / 2;
        var cm = c + m;
        var xm = x + m;

        if (h < 60) {
            return [cm, xm, m];
        } else if (h < 120) {
            return [xm, cm, m];
        } else if (h < 180) {
            return [m, cm, xm];
        } else if (h < 240) {
            return [m, xm, cm];
        } else if (h < 300) {
            return [xm, m, cm];
        } else {
            return [cm, m, xm];
        }
    }

    if (offset && this.width > 0 && this.height > 0) {
        offset = ((offset % 360) + 360) % 360;
        var context = this._context;
        var imageData = context.getImageData(0, 0, this.width, this.height);
        var pixels = imageData.data;
        for (var i = 0; i < pixels.length; i += 4) {
            var hsl = rgbToHsl(pixels[i + 0], pixels[i + 1], pixels[i + 2]);
            var h = (hsl[0] + offset) % 360;
            var s = hsl[1];
            var l = hsl[2];
            var rgb = hslToRgb(h, s, l);
            pixels[i + 0] = rgb[0];
            pixels[i + 1] = rgb[1];
            pixels[i + 2] = rgb[2];
        }
        context.putImageData(imageData, 0, 0);
        this._setDirty();
    }
};

/**
 * Applies a blur effect to the bitmap.
 *
 * @method blur
 */
Bitmap.prototype.blur = function() {
    for (var i = 0; i < 2; i++) {
        var w = this.width;
        var h = this.height;
        var canvas = this._canvas;
        var context = this._context;
        var tempCanvas = document.createElement('canvas');
        var tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = w + 2;
        tempCanvas.height = h + 2;
        tempContext.drawImage(canvas, 0, 0, w, h, 1, 1, w, h);
        tempContext.drawImage(canvas, 0, 0, w, 1, 1, 0, w, 1);
        tempContext.drawImage(canvas, 0, 0, 1, h, 0, 1, 1, h);
        tempContext.drawImage(canvas, 0, h - 1, w, 1, 1, h + 1, w, 1);
        tempContext.drawImage(canvas, w - 1, 0, 1, h, w + 1, 1, 1, h);
        context.save();
        context.fillStyle = 'black';
        context.fillRect(0, 0, w, h);
        context.globalCompositeOperation = 'lighter';
        context.globalAlpha = 1 / 9;
        for (var y = 0; y < 3; y++) {
            for (var x = 0; x < 3; x++) {
                context.drawImage(tempCanvas, x, y, w, h, 0, 0, w, h);
            }
        }
        context.restore();
    }
    this._setDirty();
};

/**
 * Add a callback function that will be called when the bitmap is loaded.
 *
 * @method addLoadListener
 * @param {Function} listner The callback function
 */
Bitmap.prototype.addLoadListener = function(listner) {
    if (this._isLoading) {
        this._loadListeners.push(listner);
    } else {
        listner();
    }
};

/**
 * @method _makeFontNameText
 * @private
 */
Bitmap.prototype._makeFontNameText = function() {
    return (this.fontItalic ? 'Italic ' : '') +
            this.fontSize + 'px ' + this.fontFace;
};

/**
 * @method _drawTextOutline
 * @param {String} text
 * @param {Number} tx
 * @param {Number} ty
 * @param {Number} maxWidth
 * @private
 */
Bitmap.prototype._drawTextOutline = function(text, tx, ty, maxWidth) {
    var context = this._context;
    context.strokeStyle = this.outlineColor;
    context.lineWidth = this.outlineWidth;
    context.lineJoin = 'round';
    context.strokeText(text, tx, ty, maxWidth);
};

/**
 * @method _drawTextBody
 * @param {String} text
 * @param {Number} tx
 * @param {Number} ty
 * @param {Number} maxWidth
 * @private
 */
Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
    var context = this._context;
    context.fillStyle = this.textColor;
    context.fillText(text, tx, ty, maxWidth);
};

/**
 * @method _onLoad
 * @private
 */
Bitmap.prototype._onLoad = function() {
    if(Decrypter.hasEncryptedImages) {
        window.URL.revokeObjectURL(this._image.src);
    }
    this._isLoading = false;
    this.resize(this._image.width, this._image.height);
    this._context.drawImage(this._image, 0, 0);
    this._setDirty();
    this._callLoadListeners();
};

/**
 * @method _callLoadListeners
 * @private
 */
Bitmap.prototype._callLoadListeners = function() {
    while (this._loadListeners.length > 0) {
        var listener = this._loadListeners.shift();
        listener();
    }
};

/**
 * @method _onError
 * @private
 */
Bitmap.prototype._onError = function() {
    this._hasError = true;
};

/**
 * @method _setDirty
 * @private
 */
Bitmap.prototype._setDirty = function() {
    this._dirty = true;
};

/**
 * updates texture is bitmap was dirty
 * @method checkDirty
 */
Bitmap.prototype.checkDirty = function() {
    if (this._dirty) {
        this._baseTexture.update();
        this._dirty = false;
    }
};

//-----------------------------------------------------------------------------

var waitForLoading = false;
var register = false;

function handleiOSTouch(ev) {
        if (Graphics._video.paused && Graphics.isVideoPlaying())Graphics._video.play();
}

/**
 * The static class that carries out graphics processing.
 *
 * @class Graphics
 */
function Graphics() {
    throw new Error('This is a static class');
}

/**
 * Initializes the graphics system.
 *
 * @static
 * @method initialize
 * @param {Number} width The width of the game screen
 * @param {Number} height The height of the game screen
 * @param {String} type The type of the renderer.
 *                 'canvas', 'webgl', or 'auto'.
 */
Graphics.initialize = function(width, height, type) {
    this._width = width || 800;
    this._height = height || 600;
    this._rendererType = type || 'auto';
    this._boxWidth = this._width;
    this._boxHeight = this._height;

    this._scale = 1;
    this._realScale = 1;

    this._errorPrinter = null;
    this._canvas = null;
    this._video = null;
    this._upperCanvas = null;
    this._renderer = null;
    this._fpsMeter = null;
    this._modeBox = null;
    this._skipCount = 0;
    this._maxSkip = 3;
    this._rendered = false;
    this._loadingImage = null;
    this._loadingCount = 0;
    this._fpsMeterToggled = false;
    this._stretchEnabled = this._defaultStretchMode();

    this._canUseDifferenceBlend = false;
    this._canUseSaturationBlend = false;
    this._hiddenCanvas = null;

    this._testCanvasBlendModes();
    this._modifyExistingElements();
    this._updateRealScale();
    this._createAllElements();
    this._disableTextSelection();
    this._disableContextMenu();
    this._setupEventHandlers();
};

/**
 * The total frame count of the game screen.
 *
 * @static
 * @property frameCount
 * @type Number
 */
Graphics.frameCount     = 0;

/**
 * The alias of PIXI.blendModes.NORMAL.
 *
 * @static
 * @property BLEND_NORMAL
 * @type Number
 * @final
 */
Graphics.BLEND_NORMAL   = 0;

/**
 * The alias of PIXI.blendModes.ADD.
 *
 * @static
 * @property BLEND_ADD
 * @type Number
 * @final
 */
Graphics.BLEND_ADD      = 1;

/**
 * The alias of PIXI.blendModes.MULTIPLY.
 *
 * @static
 * @property BLEND_MULTIPLY
 * @type Number
 * @final
 */
Graphics.BLEND_MULTIPLY = 2;

/**
 * The alias of PIXI.blendModes.SCREEN.
 *
 * @static
 * @property BLEND_SCREEN
 * @type Number
 * @final
 */
Graphics.BLEND_SCREEN   = 3;

/**
 * Marks the beginning of each frame for FPSMeter.
 *
 * @static
 * @method tickStart
 */
Graphics.tickStart = function() {
    if (this._fpsMeter) {
        this._fpsMeter.tickStart();
    }
};

/**
 * Marks the end of each frame for FPSMeter.
 *
 * @static
 * @method tickEnd
 */
Graphics.tickEnd = function() {
    if (this._fpsMeter && this._rendered) {
        this._fpsMeter.tick();
    }
};

/**
 * Renders the stage to the game screen.
 *
 * @static
 * @method render
 * @param {Stage} stage The stage object to be rendered
 */
Graphics.render = function(stage) {
    if (this._skipCount === 0) {
        var startTime = Date.now();
        if (stage) {
            this._renderer.render(stage);
        }
        var endTime = Date.now();
        var elapsed = endTime - startTime;
        this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip);
        this._rendered = true;
    } else {
        this._skipCount--;
        this._rendered = false;
    }
    this.frameCount++;
};

/**
 * Checks whether the renderer type is WebGL.
 *
 * @static
 * @method isWebGL
 * @return {Boolean} True if the renderer type is WebGL
 */
Graphics.isWebGL = function() {
    return this._renderer && this._renderer.type === PIXI.RENDERER_TYPE.WEBGL;
};

/**
 * Checks whether the current browser supports WebGL.
 *
 * @static
 * @method hasWebGL
 * @return {Boolean} True if the current browser supports WebGL.
 */
Graphics.hasWebGL = function() {
    try {
        var canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
        return false;
    }
};

/**
 * Checks whether the canvas blend mode 'difference' is supported.
 *
 * @static
 * @method canUseDifferenceBlend
 * @return {Boolean} True if the canvas blend mode 'difference' is supported
 */
Graphics.canUseDifferenceBlend = function() {
    return this._canUseDifferenceBlend;
};

/**
 * Checks whether the canvas blend mode 'saturation' is supported.
 *
 * @static
 * @method canUseSaturationBlend
 * @return {Boolean} True if the canvas blend mode 'saturation' is supported
 */
Graphics.canUseSaturationBlend = function() {
    return this._canUseSaturationBlend;
};

/**
 * Sets the source of the "Now Loading" image.
 *
 * @static
 * @method setLoadingImage
 */
Graphics.setLoadingImage = function(src) {
    this._loadingImage = new Image();
    this._loadingImage.src = src;
};

/**
 * Initializes the counter for displaying the "Now Loading" image.
 *
 * @static
 * @method startLoading
 */
Graphics.startLoading = function() {
    this._loadingCount = 0;
};

/**
 * Increments the loading counter and displays the "Now Loading" image if necessary.
 *
 * @static
 * @method updateLoading
 */
Graphics.updateLoading = function() {
    this._loadingCount++;
    this._paintUpperCanvas();
    this._upperCanvas.style.opacity = 1;
};

/**
 * Erases the "Now Loading" image.
 *
 * @static
 * @method endLoading
 */
Graphics.endLoading = function() {
    this._clearUpperCanvas();
    this._upperCanvas.style.opacity = 0;
};

/**
 * Displays the error text to the screen.
 *
 * @static
 * @method printError
 * @param {String} name The name of the error
 * @param {String} message The message of the error
 */
Graphics.printError = function(name, message) {
    if (this._errorPrinter) {
        this._errorPrinter.innerHTML = this._makeErrorHtml(name, message);
    }
    this._applyCanvasFilter();
    this._clearUpperCanvas();
};

/**
 * Shows the FPSMeter element.
 *
 * @static
 * @method showFps
 */
Graphics.showFps = function() {
    if (this._fpsMeter) {
        this._fpsMeter.show();
        this._modeBox.style.opacity = 1;
    }
};

/**
 * Hides the FPSMeter element.
 *
 * @static
 * @method hideFps
 */
Graphics.hideFps = function() {
    if (this._fpsMeter) {
        this._fpsMeter.hide();
        this._modeBox.style.opacity = 0;
    }
};

/**
 * Loads a font file.
 *
 * @static
 * @method loadFont
 * @param {String} name The face name of the font
 * @param {String} url The url of the font file
 */
Graphics.loadFont = function(name, url) {
    var style = document.createElement('style');
    var head = document.getElementsByTagName('head');
    var rule = '@font-face { font-family: "' + name + '"; src: url("' + url + '"); }';
    style.type = 'text/css';
    head.item(0).appendChild(style);
    style.sheet.insertRule(rule, 0);
    this._createFontLoader(name);
};

/**
 * Checks whether the font file is loaded.
 *
 * @static
 * @method isFontLoaded
 * @param {String} name The face name of the font
 * @return {Boolean} True if the font file is loaded
 */
Graphics.isFontLoaded = function(name) {
    if (!this._hiddenCanvas) {
        this._hiddenCanvas = document.createElement('canvas');
    }
    var context = this._hiddenCanvas.getContext('2d');
    var text = 'abcdefghijklmnopqrstuvwxyz';
    var width1, width2;
    context.font = '40px ' + name + ', sans-serif';
    width1 = context.measureText(text).width;
    context.font = '40px sans-serif';
    width2 = context.measureText(text).width;
    return width1 !== width2;
};

/**
 * Starts playback of a video.
 *
 * @static
 * @method playVideo
 * @param {String} src
 */
Graphics.playVideo = function(src) {
    this._video.src = src;
    this._video.onloadeddata = this._onVideoLoad.bind(this);
    this._video.onerror = this._onVideoError.bind(this);
    this._video.onended = this._onVideoEnd.bind(this);
    this._video.load();

    if (Utils.isMobileSafari()) {
        waitForLoading = true;
        if (!register) {
            register = true;
            document.addEventListener('touchstart', handleiOSTouch);
        }
    }
};

/**
 * Checks whether the video is playing.
 *
 * @static
 * @method isVideoPlaying
 * @return {Boolean} True if the video is playing
 */
Graphics.isVideoPlaying = function() {
    if (Utils.isMobileSafari()) return waitForLoading || (this._video && this._isVideoVisible());
    return this._video && this._isVideoVisible();
};

/**
 * Checks whether the browser can play the specified video type.
 *
 * @static
 * @method canPlayVideoType
 * @param {String} type The video type to test support for
 * @return {Boolean} True if the browser can play the specified video type
 */
Graphics.canPlayVideoType = function(type) {
    return this._video && this._video.canPlayType(type);
};

/**
 * Converts an x coordinate on the page to the corresponding
 * x coordinate on the canvas area.
 *
 * @static
 * @method pageToCanvasX
 * @param {Number} x The x coordinate on the page to be converted
 * @return {Number} The x coordinate on the canvas area
 */
Graphics.pageToCanvasX = function(x) {
    if (this._canvas) {
        var left = this._canvas.offsetLeft;
        return Math.round((x - left) / this._realScale);
    } else {
        return 0;
    }
};

/**
 * Converts a y coordinate on the page to the corresponding
 * y coordinate on the canvas area.
 *
 * @static
 * @method pageToCanvasY
 * @param {Number} y The y coordinate on the page to be converted
 * @return {Number} The y coordinate on the canvas area
 */
Graphics.pageToCanvasY = function(y) {
    if (this._canvas) {
        var top = this._canvas.offsetTop;
        return Math.round((y - top) / this._realScale);
    } else {
        return 0;
    }
};

/**
 * Checks whether the specified point is inside the game canvas area.
 *
 * @static
 * @method isInsideCanvas
 * @param {Number} x The x coordinate on the canvas area
 * @param {Number} y The y coordinate on the canvas area
 * @return {Boolean} True if the specified point is inside the game canvas area
 */
Graphics.isInsideCanvas = function(x, y) {
    return (x >= 0 && x < this._width && y >= 0 && y < this._height);
};

/**
 * Calls pixi.js garbage collector
 */
Graphics.callGC = function() {
    if (Graphics.isWebGL()) {
        Graphics._renderer.textureGC.run();
    }
};


/**
 * The width of the game screen.
 *
 * @static
 * @property width
 * @type Number
 */
Object.defineProperty(Graphics, 'width', {
    get: function() {
        return this._width;
    },
    set: function(value) {
        if (this._width !== value) {
            this._width = value;
            this._updateAllElements();
        }
    },
    configurable: true
});

/**
 * The height of the game screen.
 *
 * @static
 * @property height
 * @type Number
 */
Object.defineProperty(Graphics, 'height', {
    get: function() {
        return this._height;
    },
    set: function(value) {
        if (this._height !== value) {
            this._height = value;
            this._updateAllElements();
        }
    },
    configurable: true
});

/**
 * The width of the window display area.
 *
 * @static
 * @property boxWidth
 * @type Number
 */
Object.defineProperty(Graphics, 'boxWidth', {
    get: function() {
        return this._boxWidth;
    },
    set: function(value) {
        this._boxWidth = value;
    },
    configurable: true
});

/**
 * The height of the window display area.
 *
 * @static
 * @property boxHeight
 * @type Number
 */
Object.defineProperty(Graphics, 'boxHeight', {
    get: function() {
        return this._boxHeight;
    },
    set: function(value) {
        this._boxHeight = value;
    },
    configurable: true
});

/**
 * The zoom scale of the game screen.
 *
 * @static
 * @property scale
 * @type Number
 */
Object.defineProperty(Graphics, 'scale', {
    get: function() {
        return this._scale;
    },
    set: function(value) {
        if (this._scale !== value) {
            this._scale = value;
            this._updateAllElements();
        }
    },
    configurable: true
});

/**
 * @static
 * @method _createAllElements
 * @private
 */
Graphics._createAllElements = function() {
    this._createErrorPrinter();
    this._createCanvas();
    this._createVideo();
    this._createUpperCanvas();
    this._createRenderer();
    this._createFPSMeter();
    this._createModeBox();
    this._createGameFontLoader();
};

/**
 * @static
 * @method _updateAllElements
 * @private
 */
Graphics._updateAllElements = function() {
    this._updateRealScale();
    this._updateErrorPrinter();
    this._updateCanvas();
    this._updateVideo();
    this._updateUpperCanvas();
    this._updateRenderer();
    this._paintUpperCanvas();
};

/**
 * @static
 * @method _updateRealScale
 * @private
 */
Graphics._updateRealScale = function() {
    if (this._stretchEnabled) {
        var h = window.innerWidth / this._width;
        var v = window.innerHeight / this._height;
        this._realScale = Math.min(h, v);
    } else {
        this._realScale = this._scale;
    }
};

/**
 * @static
 * @method _makeErrorHtml
 * @param {String} name
 * @param {String} message
 * @return {String}
 * @private
 */
Graphics._makeErrorHtml = function(name, message) {
    return ('<font color="yellow"><b>' + name + '</b></font><br>' +
            '<font color="white">' + message + '</font><br>');
};

/**
 * @static
 * @method _defaultStretchMode
 * @private
 */
Graphics._defaultStretchMode = function() {
    return Utils.isNwjs() || Utils.isMobileDevice();
};

/**
 * @static
 * @method _testCanvasBlendModes
 * @private
 */
Graphics._testCanvasBlendModes = function() {
    var canvas, context, imageData1, imageData2;
    canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    context = canvas.getContext('2d');
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = 'white';
    context.fillRect(0, 0, 1, 1);
    context.globalCompositeOperation = 'difference';
    context.fillStyle = 'white';
    context.fillRect(0, 0, 1, 1);
    imageData1 = context.getImageData(0, 0, 1, 1);
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = 'black';
    context.fillRect(0, 0, 1, 1);
    context.globalCompositeOperation = 'saturation';
    context.fillStyle = 'white';
    context.fillRect(0, 0, 1, 1);
    imageData2 = context.getImageData(0, 0, 1, 1);
    this._canUseDifferenceBlend = imageData1.data[0] === 0;
    this._canUseSaturationBlend = imageData2.data[0] === 0;
};

/**
 * @static
 * @method _modifyExistingElements
 * @private
 */
Graphics._modifyExistingElements = function() {
    var elements = document.getElementsByTagName('*');
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].style.zIndex > 0) {
            elements[i].style.zIndex = 0;
        }
    }
};

/**
 * @static
 * @method _createErrorPrinter
 * @private
 */
Graphics._createErrorPrinter = function() {
    this._errorPrinter = document.createElement('p');
    this._errorPrinter.id = 'ErrorPrinter';
    this._updateErrorPrinter();
    document.body.appendChild(this._errorPrinter);
};

/**
 * @static
 * @method _updateErrorPrinter
 * @private
 */
Graphics._updateErrorPrinter = function() {
    this._errorPrinter.width = this._width * 0.9;
    this._errorPrinter.height = 40;
    this._errorPrinter.style.textAlign = 'center';
    this._errorPrinter.style.textShadow = '1px 1px 3px #000';
    this._errorPrinter.style.fontSize = '20px';
    this._errorPrinter.style.zIndex = 99;
    this._centerElement(this._errorPrinter);
};

/**
 * @static
 * @method _createCanvas
 * @private
 */
Graphics._createCanvas = function() {
    this._canvas = document.createElement('canvas');
    this._canvas.id = 'GameCanvas';
    this._updateCanvas();
    document.body.appendChild(this._canvas);
};

/**
 * @static
 * @method _updateCanvas
 * @private
 */
Graphics._updateCanvas = function() {
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    this._canvas.style.zIndex = 1;
    this._centerElement(this._canvas);
};

/**
 * @static
 * @method _createVideo
 * @private
 */
Graphics._createVideo = function() {
    this._video = document.createElement('video');
    this._video.id = 'GameVideo';
    this._video.style.opacity = 0;
    this._updateVideo();
    document.body.appendChild(this._video);
};

/**
 * @static
 * @method _updateVideo
 * @private
 */
Graphics._updateVideo = function() {
    this._video.width = this._width;
    this._video.height = this._height;
    this._video.style.zIndex = 2;
    this._centerElement(this._video);
};

/**
 * @static
 * @method _createUpperCanvas
 * @private
 */
Graphics._createUpperCanvas = function() {
    this._upperCanvas = document.createElement('canvas');
    this._upperCanvas.id = 'UpperCanvas';
    this._updateUpperCanvas();
    document.body.appendChild(this._upperCanvas);
};

/**
 * @static
 * @method _updateUpperCanvas
 * @private
 */
Graphics._updateUpperCanvas = function() {
    this._upperCanvas.width = this._width;
    this._upperCanvas.height = this._height;
    this._upperCanvas.style.zIndex = 3;
    this._centerElement(this._upperCanvas);
};

/**
 * @static
 * @method _clearUpperCanvas
 * @private
 */
Graphics._clearUpperCanvas = function() {
    var context = this._upperCanvas.getContext('2d');
    context.clearRect(0, 0, this._width, this._height);
};

/**
 * @static
 * @method _paintUpperCanvas
 * @private
 */
Graphics._paintUpperCanvas = function() {
    this._clearUpperCanvas();
    if (this._loadingImage && this._loadingCount >= 20) {
        var context = this._upperCanvas.getContext('2d');
        var dx = (this._width - this._loadingImage.width) / 2;
        var dy = (this._height - this._loadingImage.height) / 2;
        var alpha = ((this._loadingCount - 20) / 30).clamp(0, 1);
        context.save();
        context.globalAlpha = alpha;
        context.drawImage(this._loadingImage, dx, dy);
        context.restore();
    }
};

/**
 * @static
 * @method _createRenderer
 * @private
 */
Graphics._createRenderer = function() {
    PIXI.dontSayHello = true;
    var width = this._width;
    var height = this._height;
    var options = { view: this._canvas };
    try {
        switch (this._rendererType) {
        case 'canvas':
            this._renderer = new PIXI.CanvasRenderer(width, height, options);
            break;
        case 'webgl':
            this._renderer = new PIXI.WebGLRenderer(width, height, options);
            break;
        default:
            this._renderer = PIXI.autoDetectRenderer(width, height, options);
            break;
        }
    } catch (e) {
        this._renderer = null;
    }
};

/**
 * @static
 * @method _updateRenderer
 * @private
 */
Graphics._updateRenderer = function() {
    if (this._renderer) {
        this._renderer.resize(this._width, this._height);
    }
};

/**
 * @static
 * @method _createFPSMeter
 * @private
 */
Graphics._createFPSMeter = function() {
    var options = { graph: 1, decimals: 0, theme: 'transparent', toggleOn: null };
    this._fpsMeter = new FPSMeter(options);
    this._fpsMeter.hide();
};

/**
 * @static
 * @method _createModeBox
 * @private
 */
Graphics._createModeBox = function() {
    var box = document.createElement('div');
    box.id = 'modeTextBack';
    box.style.position = 'absolute';
    box.style.left = '5px';
    box.style.top = '5px';
    box.style.width = '119px';
    box.style.height = '58px';
    box.style.background = 'rgba(0,0,0,0.2)';
    box.style.zIndex = 9;
    box.style.opacity = 0;

    var text = document.createElement('div');
    text.id = 'modeText';
    text.style.position = 'absolute';
    text.style.left = '0px';
    text.style.top = '41px';
    text.style.width = '119px';
    text.style.fontSize = '12px';
    text.style.fontFamily = 'monospace';
    text.style.color = 'white';
    text.style.textAlign = 'center';
    text.style.textShadow = '1px 1px 0 rgba(0,0,0,0.5)';
    text.innerHTML = this.isWebGL() ? 'WebGL mode' : 'Canvas mode';

    document.body.appendChild(box);
    box.appendChild(text);

    this._modeBox = box;
};

/**
 * @static
 * @method _createGameFontLoader
 * @private
 */
Graphics._createGameFontLoader = function() {
    this._createFontLoader('GameFont');
};

/**
 * @static
 * @method _createFontLoader
 * @param {String} name
 * @private
 */
Graphics._createFontLoader = function(name) {
    var div = document.createElement('div');
    var text = document.createTextNode('.');
    div.style.fontFamily = name;
    div.style.fontSize = '0px';
    div.style.color = 'transparent';
    div.style.position = 'absolute';
    div.style.margin = 'auto';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.width = '1px';
    div.style.height = '1px';
    div.appendChild(text);
    document.body.appendChild(div);
};

/**
 * @static
 * @method _centerElement
 * @param {HTMLElement} element
 * @private
 */
Graphics._centerElement = function(element) {
    var width = element.width * this._realScale;
    var height = element.height * this._realScale;
    element.style.position = 'absolute';
    element.style.margin = 'auto';
    element.style.top = 0;
    element.style.left = 0;
    element.style.right = 0;
    element.style.bottom = 0;
    element.style.width = width + 'px';
    element.style.height = height + 'px';
};

/**
 * @static
 * @method _disableTextSelection
 * @private
 */
Graphics._disableTextSelection = function() {
    var body = document.body;
    body.style.userSelect = 'none';
    body.style.webkitUserSelect = 'none';
    body.style.msUserSelect = 'none';
    body.style.mozUserSelect = 'none';
};

/**
 * @static
 * @method _disableContextMenu
 * @private
 */
Graphics._disableContextMenu = function() {
    var elements = document.body.getElementsByTagName('*');
    var oncontextmenu = function() { return false; };
    for (var i = 0; i < elements.length; i++) {
        elements[i].oncontextmenu = oncontextmenu;
    }
};

/**
 * @static
 * @method _applyCanvasFilter
 * @private
 */
Graphics._applyCanvasFilter = function() {
    if (this._canvas) {
        this._canvas.style.opacity = 0.5;
        this._canvas.style.filter = 'blur(8px)';
        this._canvas.style.webkitFilter = 'blur(8px)';
    }
};

/**
 * @static
 * @method _onVideoLoad
 * @private
 */
Graphics._onVideoLoad = function() {
    this._video.play();
    this._updateVisibility(true);
    if (Utils.isMobileSafari()) {
        waitForLoading = false;
    }
};

/**
 * @static
 * @method _onVideoError
 * @private
 */
Graphics._onVideoError = function() {
    this._updateVisibility(false);
};

/**
 * @static
 * @method _onVideoEnd
 * @private
 */
Graphics._onVideoEnd = function() {
    this._updateVisibility(false);

    if (Utils.isMobileSafari()) {
        if (register) {
            document.removeEventListener('touchstart', handleiOSTouch);
            register = false;
        }
    }
};

/**
 * @static
 * @method _updateVisibility
 * @param {Boolean} videoVisible
 * @private
 */
Graphics._updateVisibility = function(videoVisible) {
    this._video.style.opacity = videoVisible ? 1 : 0;
    this._canvas.style.opacity = videoVisible ? 0 : 1;
};

/**
 * @static
 * @method _isVideoVisible
 * @return {Boolean}
 * @private
 */
Graphics._isVideoVisible = function() {
    return this._video.style.opacity > 0;
};

/**
 * @static
 * @method _setupEventHandlers
 * @private
 */
Graphics._setupEventHandlers = function() {
    window.addEventListener('resize', this._onWindowResize.bind(this));
    document.addEventListener('keydown', this._onKeyDown.bind(this));
};

/**
 * @static
 * @method _onWindowResize
 * @private
 */
Graphics._onWindowResize = function() {
    this._updateAllElements();
};

/**
 * @static
 * @method _onKeyDown
 * @param {KeyboardEvent} event
 * @private
 */
Graphics._onKeyDown = function(event) {
    if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
        case 113:   // F2
            event.preventDefault();
            this._switchFPSMeter();
            break;
        case 114:   // F3
            event.preventDefault();
            this._switchStretchMode();
            break;
        case 115:   // F4
            event.preventDefault();
            this._switchFullScreen();
            break;
        }
    }
};

/**
 * @static
 * @method _switchFPSMeter
 * @private
 */
Graphics._switchFPSMeter = function() {
    if (this._fpsMeter.isPaused) {
        this.showFps();
        this._fpsMeter.showFps();
        this._fpsMeterToggled = false;
    } else if (!this._fpsMeterToggled) {
        this._fpsMeter.showDuration();
        this._fpsMeterToggled = true;
    } else {
        this.hideFps();
    }
};

/**
 * @static
 * @method _switchStretchMode
 * @return {Boolean}
 * @private
 */
Graphics._switchStretchMode = function() {
    this._stretchEnabled = !this._stretchEnabled;
    this._updateAllElements();
};

/**
 * @static
 * @method _switchFullScreen
 * @private
 */
Graphics._switchFullScreen = function() {
    if (this._isFullScreen()) {
        this._requestFullScreen();
    } else {
        this._cancelFullScreen();
    }
};

/**
 * @static
 * @method _isFullScreen
 * @return {Boolean}
 * @private
 */
Graphics._isFullScreen = function() {
    return ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitFullscreenElement &&
             !document.msFullscreenElement));
};

/**
 * @static
 * @method _requestFullScreen
 * @private
 */
Graphics._requestFullScreen = function() {
    var element = document.body;
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
};

/**
 * @static
 * @method _cancelFullScreen
 * @private
 */
Graphics._cancelFullScreen = function() {
    if (document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};

//-----------------------------------------------------------------------------
/**
 * The static class that handles input data from the keyboard and gamepads.
 *
 * @class Input
 */
function Input() {
    throw new Error('This is a static class');
}

/**
 * Initializes the input system.
 *
 * @static
 * @method initialize
 */
Input.initialize = function() {
    this.clear();
    this._wrapNwjsAlert();
    this._setupEventHandlers();
};

/**
 * The wait time of the key repeat in frames.
 *
 * @static
 * @property keyRepeatWait
 * @type Number
 */
Input.keyRepeatWait = 24;

/**
 * The interval of the key repeat in frames.
 *
 * @static
 * @property keyRepeatInterval
 * @type Number
 */
Input.keyRepeatInterval = 6;

/**
 * A hash table to convert from a virtual key code to a mapped key name.
 *
 * @static
 * @property keyMapper
 * @type Object
 */
Input.keyMapper = {
    9: 'tab',       // tab
    13: 'ok',       // enter
    16: 'shift',    // shift
    17: 'control',  // control
    18: 'control',  // alt
    27: 'escape',   // escape
    32: 'ok',       // space
    33: 'pageup',   // pageup
    34: 'pagedown', // pagedown
    37: 'left',     // left arrow
    38: 'up',       // up arrow
    39: 'right',    // right arrow
    40: 'down',     // down arrow
    45: 'escape',   // insert
    81: 'pageup',   // Q
    87: 'pagedown', // W
    88: 'escape',   // X
    90: 'ok',       // Z
    96: 'escape',   // numpad 0
    98: 'down',     // numpad 2
    100: 'left',    // numpad 4
    102: 'right',   // numpad 6
    104: 'up',      // numpad 8
    120: 'debug'    // F9
};

/**
 * A hash table to convert from a gamepad button to a mapped key name.
 *
 * @static
 * @property gamepadMapper
 * @type Object
 */
Input.gamepadMapper = {
    0: 'ok',        // A
    1: 'cancel',    // B
    2: 'shift',     // X
    3: 'menu',      // Y
    4: 'pageup',    // LB
    5: 'pagedown',  // RB
    12: 'up',       // D-pad up
    13: 'down',     // D-pad down
    14: 'left',     // D-pad left
    15: 'right',    // D-pad right
};

/**
 * Clears all the input data.
 *
 * @static
 * @method clear
 */
Input.clear = function() {
    this._currentState = {};
    this._previousState = {};
    this._gamepadStates = [];
    this._latestButton = null;
    this._pressedTime = 0;
    this._dir4 = 0;
    this._dir8 = 0;
    this._preferredAxis = '';
    this._date = 0;
};

/**
 * Updates the input data.
 *
 * @static
 * @method update
 */
Input.update = function() {
    this._pollGamepads();
    if (this._currentState[this._latestButton]) {
        this._pressedTime++;
    } else {
        this._latestButton = null;
    }
    for (var name in this._currentState) {
        if (this._currentState[name] && !this._previousState[name]) {
            this._latestButton = name;
            this._pressedTime = 0;
            this._date = Date.now();
        }
        this._previousState[name] = this._currentState[name];
    }
    this._updateDirection();
};

/**
 * Checks whether a key is currently pressed down.
 *
 * @static
 * @method isPressed
 * @param {String} keyName The mapped name of the key
 * @return {Boolean} True if the key is pressed
 */
Input.isPressed = function(keyName) {
    if (this._isEscapeCompatible(keyName) && this.isPressed('escape')) {
        return true;
    } else {
        return !!this._currentState[keyName];
    }
};

/**
 * Checks whether a key is just pressed.
 *
 * @static
 * @method isTriggered
 * @param {String} keyName The mapped name of the key
 * @return {Boolean} True if the key is triggered
 */
Input.isTriggered = function(keyName) {
    if (this._isEscapeCompatible(keyName) && this.isTriggered('escape')) {
        return true;
    } else {
        return this._latestButton === keyName && this._pressedTime === 0;
    }
};

/**
 * Checks whether a key is just pressed or a key repeat occurred.
 *
 * @static
 * @method isRepeated
 * @param {String} keyName The mapped name of the key
 * @return {Boolean} True if the key is repeated
 */
Input.isRepeated = function(keyName) {
    if (this._isEscapeCompatible(keyName) && this.isRepeated('escape')) {
        return true;
    } else {
        return (this._latestButton === keyName &&
                (this._pressedTime === 0 ||
                 (this._pressedTime >= this.keyRepeatWait &&
                  this._pressedTime % this.keyRepeatInterval === 0)));
    }
};

/**
 * Checks whether a key is kept depressed.
 *
 * @static
 * @method isLongPressed
 * @param {String} keyName The mapped name of the key
 * @return {Boolean} True if the key is long-pressed
 */
Input.isLongPressed = function(keyName) {
    if (this._isEscapeCompatible(keyName) && this.isLongPressed('escape')) {
        return true;
    } else {
        return (this._latestButton === keyName &&
                this._pressedTime >= this.keyRepeatWait);
    }
};

/**
 * [read-only] The four direction value as a number of the numpad, or 0 for neutral.
 *
 * @static
 * @property dir4
 * @type Number
 */
Object.defineProperty(Input, 'dir4', {
    get: function() {
        return this._dir4;
    },
    configurable: true
});

/**
 * [read-only] The eight direction value as a number of the numpad, or 0 for neutral.
 *
 * @static
 * @property dir8
 * @type Number
 */
Object.defineProperty(Input, 'dir8', {
    get: function() {
        return this._dir8;
    },
    configurable: true
});

/**
 * [read-only] The time of the last input in milliseconds.
 *
 * @static
 * @property date
 * @type Number
 */
Object.defineProperty(Input, 'date', {
    get: function() {
        return this._date;
    },
    configurable: true
});

/**
 * @static
 * @method _wrapNwjsAlert
 * @private
 */
Input._wrapNwjsAlert = function() {
    if (Utils.isNwjs()) {
        var _alert = window.alert;
        window.alert = function() {
            var gui = require('nw.gui');
            var win = gui.Window.get();
            _alert.apply(this, arguments);
            win.focus();
            Input.clear();
        };
    }
};

/**
 * @static
 * @method _setupEventHandlers
 * @private
 */
Input._setupEventHandlers = function() {
    document.addEventListener('keydown', this._onKeyDown.bind(this));
    document.addEventListener('keyup', this._onKeyUp.bind(this));
    window.addEventListener('blur', this._onLostFocus.bind(this));
};

/**
 * @static
 * @method _onKeyDown
 * @param {KeyboardEvent} event
 * @private
 */
Input._onKeyDown = function(event) {
    if (this._shouldPreventDefault(event.keyCode)) {
        event.preventDefault();
    }
    if (event.keyCode === 144) {    // Numlock
        this.clear();
    }
    var buttonName = this.keyMapper[event.keyCode];
    if (buttonName) {
        this._currentState[buttonName] = true;
    }
};

/**
 * @static
 * @method _shouldPreventDefault
 * @param {Number} keyCode
 * @private
 */
Input._shouldPreventDefault = function(keyCode) {
    switch (keyCode) {
    case 8:     // backspace
    case 33:    // pageup
    case 34:    // pagedown
    case 37:    // left arrow
    case 38:    // up arrow
    case 39:    // right arrow
    case 40:    // down arrow
        return true;
    }
    return false;
};

/**
 * @static
 * @method _onKeyUp
 * @param {KeyboardEvent} event
 * @private
 */
Input._onKeyUp = function(event) {
    var buttonName = this.keyMapper[event.keyCode];
    if (buttonName) {
        this._currentState[buttonName] = false;
    }
    if (event.keyCode === 0) {  // For QtWebEngine on OS X
        this.clear();
    }
};

/**
 * @static
 * @method _onLostFocus
 * @private
 */
Input._onLostFocus = function() {
    this.clear();
};

/**
 * @static
 * @method _pollGamepads
 * @private
 */
Input._pollGamepads = function() {
    if (navigator.getGamepads) {
        var gamepads = navigator.getGamepads();
        if (gamepads) {
            for (var i = 0; i < gamepads.length; i++) {
                var gamepad = gamepads[i];
                if (gamepad && gamepad.connected) {
                    this._updateGamepadState(gamepad);
                }
            }
        }
    }
};

/**
 * @static
 * @method _updateGamepadState
 * @param {Gamepad} gamepad
 * @param {Number} index
 * @private
 */
Input._updateGamepadState = function(gamepad) {
    var lastState = this._gamepadStates[gamepad.index] || [];
    var newState = [];
    var buttons = gamepad.buttons;
    var axes = gamepad.axes;
    var threshold = 0.5;
    newState[12] = false;
    newState[13] = false;
    newState[14] = false;
    newState[15] = false;
    for (var i = 0; i < buttons.length; i++) {
        newState[i] = buttons[i].pressed;
    }
    if (axes[1] < -threshold) {
        newState[12] = true;    // up
    } else if (axes[1] > threshold) {
        newState[13] = true;    // down
    }
    if (axes[0] < -threshold) {
        newState[14] = true;    // left
    } else if (axes[0] > threshold) {
        newState[15] = true;    // right
    }
    for (var j = 0; j < newState.length; j++) {
        if (newState[j] !== lastState[j]) {
            var buttonName = this.gamepadMapper[j];
            if (buttonName) {
                this._currentState[buttonName] = newState[j];
            }
        }
    }
    this._gamepadStates[gamepad.index] = newState;
};

/**
 * @static
 * @method _updateDirection
 * @private
 */
Input._updateDirection = function() {
    var x = this._signX();
    var y = this._signY();

    this._dir8 = this._makeNumpadDirection(x, y);

    if (x !== 0 && y !== 0) {
        if (this._preferredAxis === 'x') {
            y = 0;
        } else {
            x = 0;
        }
    } else if (x !== 0) {
        this._preferredAxis = 'y';
    } else if (y !== 0) {
        this._preferredAxis = 'x';
    }

    this._dir4 = this._makeNumpadDirection(x, y);
};

/**
 * @static
 * @method _signX
 * @private
 */
Input._signX = function() {
    var x = 0;

    if (this.isPressed('left')) {
        x--;
    }
    if (this.isPressed('right')) {
        x++;
    }
    return x;
};

/**
 * @static
 * @method _signY
 * @private
 */
Input._signY = function() {
    var y = 0;

    if (this.isPressed('up')) {
        y--;
    }
    if (this.isPressed('down')) {
        y++;
    }
    return y;
};

/**
 * @static
 * @method _makeNumpadDirection
 * @param {Number} x
 * @param {Number} y
 * @return {Number}
 * @private
 */
Input._makeNumpadDirection = function(x, y) {
    if (x !== 0 || y !== 0) {
        return  5 - y * 3 + x;
    }
    return 0;
};

/**
 * @static
 * @method _isEscapeCompatible
 * @param {String} keyName
 * @return {Boolean}
 * @private
 */
Input._isEscapeCompatible = function(keyName) {
    return keyName === 'cancel' || keyName === 'menu';
};

//-----------------------------------------------------------------------------
/**
 * The static class that handles input data from the mouse and touchscreen.
 *
 * @class TouchInput
 */
function TouchInput() {
    throw new Error('This is a static class');
}

/**
 * Initializes the touch system.
 *
 * @static
 * @method initialize
 */
TouchInput.initialize = function() {
    this.clear();
    this._setupEventHandlers();
};

/**
 * The wait time of the pseudo key repeat in frames.
 *
 * @static
 * @property keyRepeatWait
 * @type Number
 */
TouchInput.keyRepeatWait = 24;

/**
 * The interval of the pseudo key repeat in frames.
 *
 * @static
 * @property keyRepeatInterval
 * @type Number
 */
TouchInput.keyRepeatInterval = 6;

/**
 * Clears all the touch data.
 *
 * @static
 * @method clear
 */
TouchInput.clear = function() {
    this._mousePressed = false;
    this._screenPressed = false;
    this._pressedTime = 0;
    this._events = {};
    this._events.triggered = false;
    this._events.cancelled = false;
    this._events.moved = false;
    this._events.released = false;
    this._events.wheelX = 0;
    this._events.wheelY = 0;
    this._triggered = false;
    this._cancelled = false;
    this._moved = false;
    this._released = false;
    this._wheelX = 0;
    this._wheelY = 0;
    this._x = 0;
    this._y = 0;
    this._date = 0;
};

/**
 * Updates the touch data.
 *
 * @static
 * @method update
 */
TouchInput.update = function() {
    this._triggered = this._events.triggered;
    this._cancelled = this._events.cancelled;
    this._moved = this._events.moved;
    this._released = this._events.released;
    this._wheelX = this._events.wheelX;
    this._wheelY = this._events.wheelY;
    this._events.triggered = false;
    this._events.cancelled = false;
    this._events.moved = false;
    this._events.released = false;
    this._events.wheelX = 0;
    this._events.wheelY = 0;
    if (this.isPressed()) {
        this._pressedTime++;
    }
};

/**
 * Checks whether the mouse button or touchscreen is currently pressed down.
 *
 * @static
 * @method isPressed
 * @return {Boolean} True if the mouse button or touchscreen is pressed
 */
TouchInput.isPressed = function() {
    return this._mousePressed || this._screenPressed;
};

/**
 * Checks whether the left mouse button or touchscreen is just pressed.
 *
 * @static
 * @method isTriggered
 * @return {Boolean} True if the mouse button or touchscreen is triggered
 */
TouchInput.isTriggered = function() {
    return this._triggered;
};

/**
 * Checks whether the left mouse button or touchscreen is just pressed
 * or a pseudo key repeat occurred.
 *
 * @static
 * @method isRepeated
 * @return {Boolean} True if the mouse button or touchscreen is repeated
 */
TouchInput.isRepeated = function() {
    return (this.isPressed() &&
            (this._triggered ||
             (this._pressedTime >= this.keyRepeatWait &&
              this._pressedTime % this.keyRepeatInterval === 0)));
};

/**
 * Checks whether the left mouse button or touchscreen is kept depressed.
 *
 * @static
 * @method isLongPressed
 * @return {Boolean} True if the left mouse button or touchscreen is long-pressed
 */
TouchInput.isLongPressed = function() {
    return this.isPressed() && this._pressedTime >= this.keyRepeatWait;
};

/**
 * Checks whether the right mouse button is just pressed.
 *
 * @static
 * @method isCancelled
 * @return {Boolean} True if the right mouse button is just pressed
 */
TouchInput.isCancelled = function() {
    return this._cancelled;
};

/**
 * Checks whether the mouse or a finger on the touchscreen is moved.
 *
 * @static
 * @method isMoved
 * @return {Boolean} True if the mouse or a finger on the touchscreen is moved
 */
TouchInput.isMoved = function() {
    return this._moved;
};

/**
 * Checks whether the left mouse button or touchscreen is released.
 *
 * @static
 * @method isReleased
 * @return {Boolean} True if the mouse button or touchscreen is released
 */
TouchInput.isReleased = function() {
    return this._released;
};

/**
 * [read-only] The horizontal scroll amount.
 *
 * @static
 * @property wheelX
 * @type Number
 */
Object.defineProperty(TouchInput, 'wheelX', {
    get: function() {
        return this._wheelX;
    },
    configurable: true
});

/**
 * [read-only] The vertical scroll amount.
 *
 * @static
 * @property wheelY
 * @type Number
 */
Object.defineProperty(TouchInput, 'wheelY', {
    get: function() {
        return this._wheelY;
    },
    configurable: true
});

/**
 * [read-only] The x coordinate on the canvas area of the latest touch event.
 *
 * @static
 * @property x
 * @type Number
 */
Object.defineProperty(TouchInput, 'x', {
    get: function() {
        return this._x;
    },
    configurable: true
});

/**
 * [read-only] The y coordinate on the canvas area of the latest touch event.
 *
 * @static
 * @property y
 * @type Number
 */
Object.defineProperty(TouchInput, 'y', {
    get: function() {
        return this._y;
    },
    configurable: true
});

/**
 * [read-only] The time of the last input in milliseconds.
 *
 * @static
 * @property date
 * @type Number
 */
Object.defineProperty(TouchInput, 'date', {
    get: function() {
        return this._date;
    },
    configurable: true
});

/**
 * @static
 * @method _setupEventHandlers
 * @private
 */
TouchInput._setupEventHandlers = function() {
    document.addEventListener('mousedown', this._onMouseDown.bind(this));
    document.addEventListener('mousemove', this._onMouseMove.bind(this));
    document.addEventListener('mouseup', this._onMouseUp.bind(this));
    document.addEventListener('wheel', this._onWheel.bind(this));
    document.addEventListener('touchstart', this._onTouchStart.bind(this));
    document.addEventListener('touchmove', this._onTouchMove.bind(this));
    document.addEventListener('touchend', this._onTouchEnd.bind(this));
    document.addEventListener('touchcancel', this._onTouchCancel.bind(this));
    document.addEventListener('pointerdown', this._onPointerDown.bind(this));
};

/**
 * @static
 * @method _onMouseDown
 * @param {MouseEvent} event
 * @private
 */
TouchInput._onMouseDown = function(event) {
    if (event.button === 0) {
        this._onLeftButtonDown(event);
    } else if (event.button === 1) {
        this._onMiddleButtonDown(event);
    } else if (event.button === 2) {
        this._onRightButtonDown(event);
    }
};

/**
 * @static
 * @method _onLeftButtonDown
 * @param {MouseEvent} event
 * @private
 */
TouchInput._onLeftButtonDown = function(event) {
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
        this._mousePressed = true;
        this._pressedTime = 0;
        this._onTrigger(x, y);
    }
};

/**
 * @static
 * @method _onMiddleButtonDown
 * @param {MouseEvent} event
 * @private
 */
TouchInput._onMiddleButtonDown = function(event) {
};

/**
 * @static
 * @method _onRightButtonDown
 * @param {MouseEvent} event
 * @private
 */
TouchInput._onRightButtonDown = function(event) {
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
        this._onCancel(x, y);
    }
};

/**
 * @static
 * @method _onMouseMove
 * @param {MouseEvent} event
 * @private
 */
TouchInput._onMouseMove = function(event) {
    if (this._mousePressed) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        this._onMove(x, y);
    }
};

/**
 * @static
 * @method _onMouseUp
 * @param {MouseEvent} event
 * @private
 */
TouchInput._onMouseUp = function(event) {
    if (event.button === 0) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        this._mousePressed = false;
        this._onRelease(x, y);
    }
};

/**
 * @static
 * @method _onWheel
 * @param {WheelEvent} event
 * @private
 */
TouchInput._onWheel = function(event) {
    this._events.wheelX += event.deltaX;
    this._events.wheelY += event.deltaY;
    event.preventDefault();
};

/**
 * @static
 * @method _onTouchStart
 * @param {TouchEvent} event
 * @private
 */
TouchInput._onTouchStart = function(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var x = Graphics.pageToCanvasX(touch.pageX);
        var y = Graphics.pageToCanvasY(touch.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
            this._screenPressed = true;
            this._pressedTime = 0;
            if (event.touches.length >= 2) {
                this._onCancel(x, y);
            } else {
                this._onTrigger(x, y);
            }
            event.preventDefault();
        }
    }
    if (window.cordova || window.navigator.standalone) {
        event.preventDefault();
    }
};

/**
 * @static
 * @method _onTouchMove
 * @param {TouchEvent} event
 * @private
 */
TouchInput._onTouchMove = function(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var x = Graphics.pageToCanvasX(touch.pageX);
        var y = Graphics.pageToCanvasY(touch.pageY);
        this._onMove(x, y);
    }
};

/**
 * @static
 * @method _onTouchEnd
 * @param {TouchEvent} event
 * @private
 */
TouchInput._onTouchEnd = function(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var x = Graphics.pageToCanvasX(touch.pageX);
        var y = Graphics.pageToCanvasY(touch.pageY);
        this._screenPressed = false;
        this._onRelease(x, y);
    }
};

/**
 * @static
 * @method _onTouchCancel
 * @param {TouchEvent} event
 * @private
 */
TouchInput._onTouchCancel = function(event) {
    this._screenPressed = false;
};

/**
 * @static
 * @method _onPointerDown
 * @param {PointerEvent} event
 * @private
 */
TouchInput._onPointerDown = function(event) {
    if (event.pointerType === 'touch' && !event.isPrimary) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
            // For Microsoft Edge
            this._onCancel(x, y);
            event.preventDefault();
        }
    }
};

/**
 * @static
 * @method _onTrigger
 * @param {Number} x
 * @param {Number} y
 * @private
 */
TouchInput._onTrigger = function(x, y) {
    this._events.triggered = true;
    this._x = x;
    this._y = y;
    this._date = Date.now();
};

/**
 * @static
 * @method _onCancel
 * @param {Number} x
 * @param {Number} y
 * @private
 */
TouchInput._onCancel = function(x, y) {
    this._events.cancelled = true;
    this._x = x;
    this._y = y;
};

/**
 * @static
 * @method _onMove
 * @param {Number} x
 * @param {Number} y
 * @private
 */
TouchInput._onMove = function(x, y) {
    this._events.moved = true;
    this._x = x;
    this._y = y;
};

/**
 * @static
 * @method _onRelease
 * @param {Number} x
 * @param {Number} y
 * @private
 */
TouchInput._onRelease = function(x, y) {
    this._events.released = true;
    this._x = x;
    this._y = y;
};

//-----------------------------------------------------------------------------
/**
 * The basic object that is rendered to the game screen.
 *
 * @class Sprite
 * @constructor
 * @param {Bitmap} bitmap The image for the sprite
 */
function Sprite() {
    this.initialize.apply(this, arguments);
}

Sprite.prototype = Object.create(PIXI.Sprite.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.voidFilter = new PIXI.filters.VoidFilter();

Sprite.prototype.initialize = function(bitmap) {
    var texture = new PIXI.Texture(new PIXI.BaseTexture());

    PIXI.Sprite.call(this, texture);

    this._bitmap = null;
    this._frame = new Rectangle();
    this._realFrame = new Rectangle();
    this._blendColor = [0, 0, 0, 0];
    this._colorTone = [0, 0, 0, 0];
    this._canvas = null;
    this._context = null;
    this._tintTexture = null;

    /**
     * use heavy renderer that will reduce border artifacts and apply advanced blendModes
     * @type {boolean}
     * @private
     */
    this._isPicture = false;

    this.spriteId = Sprite._counter++;
    this.opaque = false;

    this.bitmap = bitmap;
};

// Number of the created objects.
Sprite._counter = 0;

/**
 * The image for the sprite.
 *
 * @property bitmap
 * @type Bitmap
 */
Object.defineProperty(Sprite.prototype, 'bitmap', {
    get: function() {
        return this._bitmap;
    },
    set: function(value) {
        if (this._bitmap !== value) {
            this._bitmap = value;
            if (this._bitmap) {
                this.setFrame(0, 0, 0, 0);
                this._bitmap.addLoadListener(this._onBitmapLoad.bind(this));
            } else {
                this.texture.frame = Rectangle.emptyRectangle;
            }
        }
    },
    configurable: true
});

/**
 * The width of the sprite without the scale.
 *
 * @property width
 * @type Number
 */
Object.defineProperty(Sprite.prototype, 'width', {
    get: function() {
        return this._frame.width;
    },
    set: function(value) {
        this._frame.width = value;
        this._refresh();
    },
    configurable: true
});

/**
 * The height of the sprite without the scale.
 *
 * @property height
 * @type Number
 */
Object.defineProperty(Sprite.prototype, 'height', {
    get: function() {
        return this._frame.height;
    },
    set: function(value) {
        this._frame.height = value;
        this._refresh();
    },
    configurable: true
});

/**
 * The opacity of the sprite (0 to 255).
 *
 * @property opacity
 * @type Number
 */
Object.defineProperty(Sprite.prototype, 'opacity', {
    get: function() {
        return this.alpha * 255;
    },
    set: function(value) {
        this.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

/**
 * Updates the sprite for each frame.
 *
 * @method update
 */
Sprite.prototype.update = function() {
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
};

/**
 * Sets the x and y at once.
 *
 * @method move
 * @param {Number} x The x coordinate of the sprite
 * @param {Number} y The y coordinate of the sprite
 */
Sprite.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
};

/**
 * Sets the rectagle of the bitmap that the sprite displays.
 *
 * @method setFrame
 * @param {Number} x The x coordinate of the frame
 * @param {Number} y The y coordinate of the frame
 * @param {Number} width The width of the frame
 * @param {Number} height The height of the frame
 */
Sprite.prototype.setFrame = function(x, y, width, height) {
    var frame = this._frame;
    if (x !== frame.x || y !== frame.y ||
            width !== frame.width || height !== frame.height) {
        frame.x = x;
        frame.y = y;
        frame.width = width;
        frame.height = height;
        this._refresh();
    }
};

/**
 * Gets the blend color for the sprite.
 *
 * @method getBlendColor
 * @return {Array} The blend color [r, g, b, a]
 */
Sprite.prototype.getBlendColor = function() {
    return this._blendColor.clone();
};

/**
 * Sets the blend color for the sprite.
 *
 * @method setBlendColor
 * @param {Array} color The blend color [r, g, b, a]
 */
Sprite.prototype.setBlendColor = function(color) {
    if (!(color instanceof Array)) {
        throw new Error('Argument must be an array');
    }
    if (!this._blendColor.equals(color)) {
        this._blendColor = color.clone();
        this._refresh();
    }
};

/**
 * Gets the color tone for the sprite.
 *
 * @method getColorTone
 * @return {Array} The color tone [r, g, b, gray]
 */
Sprite.prototype.getColorTone = function() {
    return this._colorTone.clone();
};

/**
 * Sets the color tone for the sprite.
 *
 * @method setColorTone
 * @param {Array} tone The color tone [r, g, b, gray]
 */
Sprite.prototype.setColorTone = function(tone) {
    if (!(tone instanceof Array)) {
        throw new Error('Argument must be an array');
    }
    if (!this._colorTone.equals(tone)) {
        this._colorTone = tone.clone();
        this._refresh();
    }
};

/**
 * @method _onBitmapLoad
 * @private
 */
Sprite.prototype._onBitmapLoad = function() {
    if (this._frame.width === 0 && this._frame.height === 0) {
        this._frame.width = this._bitmap.width;
        this._frame.height = this._bitmap.height;
    }
    this._refresh();
};

/**
 * @method _refresh
 * @private
 */
Sprite.prototype._refresh = function() {
    var frameX = Math.floor(this._frame.x);
    var frameY = Math.floor(this._frame.y);
    var frameW = Math.floor(this._frame.width);
    var frameH = Math.floor(this._frame.height);
    var bitmapW = this._bitmap ? this._bitmap.width : 0;
    var bitmapH = this._bitmap ? this._bitmap.height : 0;
    var realX = frameX.clamp(0, bitmapW);
    var realY = frameY.clamp(0, bitmapH);
    var realW = (frameW - realX + frameX).clamp(0, bitmapW - realX);
    var realH = (frameH - realY + frameY).clamp(0, bitmapH - realY);

    this._realFrame.x = realX;
    this._realFrame.y = realY;
    this._realFrame.width = realW;
    this._realFrame.height = realH;
    this.pivot.x = frameX - realX;
    this.pivot.y = frameY - realY;

    if (realW > 0 && realH > 0) {
        if (this._needsTint()) {
            this._createTinter(realW, realH);
            this._executeTint(realX, realY, realW, realH);
            this._tintTexture.update();
            this.texture.baseTexture = this._tintTexture;
            this.texture.frame = new Rectangle(0, 0, realW, realH);
        } else {
            if (this._bitmap) {
                this.texture.baseTexture = this._bitmap.baseTexture;
            }
            this.texture.frame = this._realFrame;
        }
    } else if (this._bitmap) {
        this.texture.frame = Rectangle.emptyRectangle;
    } else {
        //TODO: remove this
        this.texture.baseTexture.width = Math.max(this.texture.baseTexture.width, this._frame.x + this._frame.width);
        this.texture.baseTexture.height = Math.max(this.texture.baseTexture.height, this._frame.y + this._frame.height);
        this.texture.frame = this._frame;
    }
    this.texture._updateID++;
};

/**
 * @method _isInBitmapRect
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @return {Boolean}
 * @private
 */
Sprite.prototype._isInBitmapRect = function(x, y, w, h) {
    return (this._bitmap && x + w > 0 && y + h > 0 &&
            x < this._bitmap.width && y < this._bitmap.height);
};

/**
 * @method _needsTint
 * @return {Boolean}
 * @private
 */
Sprite.prototype._needsTint = function() {
    var tone = this._colorTone;
    return tone[0] || tone[1] || tone[2] || tone[3] || this._blendColor[3] > 0;
};

/**
 * @method _createTinter
 * @param {Number} w
 * @param {Number} h
 * @private
 */
Sprite.prototype._createTinter = function(w, h) {
    if (!this._canvas) {
        this._canvas = document.createElement('canvas');
        this._context = this._canvas.getContext('2d');
    }

    this._canvas.width = w;
    this._canvas.height = h;

    if (!this._tintTexture) {
        this._tintTexture = new PIXI.BaseTexture(this._canvas);
    }

    this._tintTexture.width = w;
    this._tintTexture.height = h;
    this._tintTexture.scaleMode = this._bitmap.baseTexture.scaleMode;
};

/**
 * @method _executeTint
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @private
 */
Sprite.prototype._executeTint = function(x, y, w, h) {
    var context = this._context;
    var tone = this._colorTone;
    var color = this._blendColor;

    context.globalCompositeOperation = 'copy';
    context.drawImage(this._bitmap.canvas, x, y, w, h, 0, 0, w, h);

    if (Graphics.canUseSaturationBlend()) {
        var gray = Math.max(0, tone[3]);
        context.globalCompositeOperation = 'saturation';
        context.fillStyle = 'rgba(255,255,255,' + gray / 255 + ')';
        context.fillRect(0, 0, w, h);
    }

    var r1 = Math.max(0, tone[0]);
    var g1 = Math.max(0, tone[1]);
    var b1 = Math.max(0, tone[2]);
    context.globalCompositeOperation = 'lighter';
    context.fillStyle = Utils.rgbToCssColor(r1, g1, b1);
    context.fillRect(0, 0, w, h);

    if (Graphics.canUseDifferenceBlend()) {
        context.globalCompositeOperation = 'difference';
        context.fillStyle = 'white';
        context.fillRect(0, 0, w, h);

        var r2 = Math.max(0, -tone[0]);
        var g2 = Math.max(0, -tone[1]);
        var b2 = Math.max(0, -tone[2]);
        context.globalCompositeOperation = 'lighter';
        context.fillStyle = Utils.rgbToCssColor(r2, g2, b2);
        context.fillRect(0, 0, w, h);

        context.globalCompositeOperation = 'difference';
        context.fillStyle = 'white';
        context.fillRect(0, 0, w, h);
    }

    var r3 = Math.max(0, color[0]);
    var g3 = Math.max(0, color[1]);
    var b3 = Math.max(0, color[2]);
    var a3 = Math.max(0, color[3]);
    context.globalCompositeOperation = 'source-atop';
    context.fillStyle = Utils.rgbToCssColor(r3, g3, b3);
    context.globalAlpha = a3 / 255;
    context.fillRect(0, 0, w, h);

    context.globalCompositeOperation = 'destination-in';
    context.globalAlpha = 1;
    context.drawImage(this._bitmap.canvas, x, y, w, h, 0, 0, w, h);
};

Sprite.prototype._renderCanvas_PIXI = PIXI.Sprite.prototype._renderCanvas;
Sprite.prototype._renderWebGL_PIXI = PIXI.Sprite.prototype._renderWebGL;

/**
 * @method _renderCanvas
 * @param {Object} renderer
 * @private
 */
Sprite.prototype._renderCanvas = function(renderer) {
    if (this.bitmap) {
        this.bitmap.touch();
    }
    if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
        this._renderCanvas_PIXI(renderer);
    }
};

/**
 * checks if we need to speed up custom blendmodes
 * @param renderer
 * @private
 */
Sprite.prototype._speedUpCustomBlendModes = function(renderer) {
    var picture = renderer.plugins.picture;
    var blend = this.blendMode;
    if (renderer.renderingToScreen && renderer._activeRenderTarget.root) {
        if (picture.drawModes[blend]) {
            var stage = renderer._lastObjectRendered;
            var f = stage._filters;
            if (!f || !f[0]) {
                setTimeout(function () {
                    var f = stage._filters;
                    if (!f || !f[0]) {
                        stage.filters = [Sprite.voidFilter];
                        stage.filterArea = new PIXI.Rectangle(0, 0, Graphics.width, Graphics.height);
                    }
                }, 0);
            }
        }
    }
};

/**
 * @method _renderWebGL
 * @param {Object} renderer
 * @private
 */
Sprite.prototype._renderWebGL = function(renderer) {
    if (this.bitmap) {
        this.bitmap.touch();
    }
    if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
        if (this._bitmap) {
            this._bitmap.checkDirty();
        }

        //copy of pixi-v4 internal code
        this.calculateVertices();

        if (this._isPicture) {
            // use heavy renderer, which reduces artifacts and applies corrent blendMode,
            // but does not use multitexture optimization
            this._speedUpCustomBlendModes(renderer);
            renderer.setObjectRenderer(renderer.plugins.picture);
            renderer.plugins.picture.render(this);
        } else {
            // use pixi super-speed renderer
            renderer.setObjectRenderer(renderer.plugins.sprite);
            renderer.plugins.sprite.render(this);
        }
    }
};

// The important members from Pixi.js

/**
 * The visibility of the sprite.
 *
 * @property visible
 * @type Boolean
 */

/**
 * The x coordinate of the sprite.
 *
 * @property x
 * @type Number
 */

/**
 * The y coordinate of the sprite.
 *
 * @property y
 * @type Number
 */

/**
 * The origin point of the sprite. (0,0) to (1,1).
 *
 * @property anchor
 * @type Point
 */

/**
 * The scale factor of the sprite.
 *
 * @property scale
 * @type Point
 */

/**
 * The rotation of the sprite in radians.
 *
 * @property rotation
 * @type Number
 */

/**
 * The blend mode to be applied to the sprite.
 *
 * @property blendMode
 * @type Number
 */

/**
 * Sets the filters for the sprite.
 *
 * @property filters
 * @type Array
 */

/**
 * [read-only] The array of children of the sprite.
 *
 * @property children
 * @type Array
 */

/**
 * [read-only] The object that contains the sprite.
 *
 * @property parent
 * @type Object
 */

/**
 * Adds a child to the container.
 *
 * @method addChild
 * @param {Object} child The child to add
 * @return {Object} The child that was added
 */

/**
 * Adds a child to the container at a specified index.
 *
 * @method addChildAt
 * @param {Object} child The child to add
 * @param {Number} index The index to place the child in
 * @return {Object} The child that was added
 */

/**
 * Removes a child from the container.
 *
 * @method removeChild
 * @param {Object} child The child to remove
 * @return {Object} The child that was removed
 */

/**
 * Removes a child from the specified index position.
 *
 * @method removeChildAt
 * @param {Number} index The index to get the child from
 * @return {Object} The child that was removed
 */

//-----------------------------------------------------------------------------
/**
 * The tilemap which displays 2D tile-based game map.
 *
 * @class Tilemap
 * @constructor
 */
function Tilemap() {
    this.initialize.apply(this, arguments);
}

Tilemap.prototype = Object.create(PIXI.Container.prototype);
Tilemap.prototype.constructor = Tilemap;

Tilemap.prototype.initialize = function() {
    PIXI.Container.call(this);

    this._margin = 20;
    this._width = Graphics.width + this._margin * 2;
    this._height = Graphics.height + this._margin * 2;
    this._tileWidth = 48;
    this._tileHeight = 48;
    this._mapWidth = 0;
    this._mapHeight = 0;
    this._mapData = null;
    this._layerWidth = 0;
    this._layerHeight = 0;
    this._lastTiles = [];

    /**
     * The bitmaps used as a tileset.
     *
     * @property bitmaps
     * @type Array
     */
    this.bitmaps = [];

    /**
     * The origin point of the tilemap for scrolling.
     *
     * @property origin
     * @type Point
     */
    this.origin = new Point();

    /**
     * The tileset flags.
     *
     * @property flags
     * @type Array
     */
    this.flags = [];

    /**
     * The animation count for autotiles.
     *
     * @property animationCount
     * @type Number
     */
    this.animationCount = 0;

    /**
     * Whether the tilemap loops horizontal.
     *
     * @property horizontalWrap
     * @type Boolean
     */
    this.horizontalWrap = false;

    /**
     * Whether the tilemap loops vertical.
     *
     * @property verticalWrap
     * @type Boolean
     */
    this.verticalWrap = false;

    this._createLayers();
    this.refresh();
};

/**
 * The width of the screen in pixels.
 *
 * @property width
 * @type Number
 */
Object.defineProperty(Tilemap.prototype, 'width', {
    get: function() {
        return this._width;
    },
    set: function(value) {
        if (this._width !== value) {
            this._width = value;
            this._createLayers();
        }
    }
});

/**
 * The height of the screen in pixels.
 *
 * @property height
 * @type Number
 */
Object.defineProperty(Tilemap.prototype, 'height', {
    get: function() {
        return this._height;
    },
    set: function(value) {
        if (this._height !== value) {
            this._height = value;
            this._createLayers();
        }
    }
});

/**
 * The width of a tile in pixels.
 *
 * @property tileWidth
 * @type Number
 */
Object.defineProperty(Tilemap.prototype, 'tileWidth', {
    get: function() {
        return this._tileWidth;
    },
    set: function(value) {
        if (this._tileWidth !== value) {
            this._tileWidth = value;
            this._createLayers();
        }
    }
});

/**
 * The height of a tile in pixels.
 *
 * @property tileHeight
 * @type Number
 */
Object.defineProperty(Tilemap.prototype, 'tileHeight', {
    get: function() {
        return this._tileHeight;
    },
    set: function(value) {
        if (this._tileHeight !== value) {
            this._tileHeight = value;
            this._createLayers();
        }
    }
});

/**
 * Sets the tilemap data.
 *
 * @method setData
 * @param {Number} width The width of the map in number of tiles
 * @param {Number} height The height of the map in number of tiles
 * @param {Array} data The one dimensional array for the map data
 */
Tilemap.prototype.setData = function(width, height, data) {
    this._mapWidth = width;
    this._mapHeight = height;
    this._mapData = data;
};

/**
 * Checks whether the tileset is ready to render.
 *
 * @method isReady
 * @type Boolean
 * @return {Boolean} True if the tilemap is ready
 */
Tilemap.prototype.isReady = function() {
    for (var i = 0; i < this.bitmaps.length; i++) {
        if (this.bitmaps[i] && !this.bitmaps[i].isReady()) {
            return false;
        }
    }
    return true;
};

/**
 * Updates the tilemap for each frame.
 *
 * @method update
 */
Tilemap.prototype.update = function() {
    this.animationCount++;
    this.animationFrame = Math.floor(this.animationCount / 30);
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
    for (var i=0; i<this.bitmaps.length;i++) {
        if (this.bitmaps[i]) {
            this.bitmaps[i].touch();
        }
    }
};

/**
 * Forces to repaint the entire tilemap.
 *
 * @method refresh
 */
Tilemap.prototype.refresh = function() {
    this._lastTiles.length = 0;
};

/**
 * Forces to refresh the tileset
 *
 * @method refresh
 */
Tilemap.prototype.refreshTileset = function() {

};

/**
 * @method updateTransform
 * @private
 */
Tilemap.prototype.updateTransform = function() {
    var ox = Math.floor(this.origin.x);
    var oy = Math.floor(this.origin.y);
    var startX = Math.floor((ox - this._margin) / this._tileWidth);
    var startY = Math.floor((oy - this._margin) / this._tileHeight);
    this._updateLayerPositions(startX, startY);
    if (this._needsRepaint || this._lastAnimationFrame !== this.animationFrame ||
        this._lastStartX !== startX || this._lastStartY !== startY) {
        this._frameUpdated = this._lastAnimationFrame !== this.animationFrame;
        this._lastAnimationFrame = this.animationFrame;
        this._lastStartX = startX;
        this._lastStartY = startY;
        this._paintAllTiles(startX, startY);
        this._needsRepaint = false;
    }
    this._sortChildren();
    PIXI.Container.prototype.updateTransform.call(this);
};

/**
 * @method _createLayers
 * @private
 */
Tilemap.prototype._createLayers = function() {
    var width = this._width;
    var height = this._height;
    var margin = this._margin;
    var tileCols = Math.ceil(width / this._tileWidth) + 1;
    var tileRows = Math.ceil(height / this._tileHeight) + 1;
    var layerWidth = tileCols * this._tileWidth;
    var layerHeight = tileRows * this._tileHeight;
    this._lowerBitmap = new Bitmap(layerWidth, layerHeight);
    this._upperBitmap = new Bitmap(layerWidth, layerHeight);
    this._layerWidth = layerWidth;
    this._layerHeight = layerHeight;

    /*
     * Z coordinate:
     *
     * 0 : Lower tiles
     * 1 : Lower characters
     * 3 : Normal characters
     * 4 : Upper tiles
     * 5 : Upper characters
     * 6 : Airship shadow
     * 7 : Balloon
     * 8 : Animation
     * 9 : Destination
     */

    this._lowerLayer = new Sprite();
    this._lowerLayer.move(-margin, -margin, width, height);
    this._lowerLayer.z = 0;

    this._upperLayer = new Sprite();
    this._upperLayer.move(-margin, -margin, width, height);
    this._upperLayer.z = 4;

    for (var i = 0; i < 4; i++) {
        this._lowerLayer.addChild(new Sprite(this._lowerBitmap));
        this._upperLayer.addChild(new Sprite(this._upperBitmap));
    }

    this.addChild(this._lowerLayer);
    this.addChild(this._upperLayer);
};

/**
 * @method _updateLayerPositions
 * @param {Number} startX
 * @param {Number} startY
 * @private
 */
Tilemap.prototype._updateLayerPositions = function(startX, startY) {
    var m = this._margin;
    var ox = Math.floor(this.origin.x);
    var oy = Math.floor(this.origin.y);
    var x2 = (ox - m).mod(this._layerWidth);
    var y2 = (oy - m).mod(this._layerHeight);
    var w1 = this._layerWidth - x2;
    var h1 = this._layerHeight - y2;
    var w2 = this._width - w1;
    var h2 = this._height - h1;

    for (var i = 0; i < 2; i++) {
        var children;
        if (i === 0) {
            children = this._lowerLayer.children;
        } else {
            children = this._upperLayer.children;
        }
        children[0].move(0, 0, w1, h1);
        children[0].setFrame(x2, y2, w1, h1);
        children[1].move(w1, 0, w2, h1);
        children[1].setFrame(0, y2, w2, h1);
        children[2].move(0, h1, w1, h2);
        children[2].setFrame(x2, 0, w1, h2);
        children[3].move(w1, h1, w2, h2);
        children[3].setFrame(0, 0, w2, h2);
    }
};

/**
 * @method _paintAllTiles
 * @param {Number} startX
 * @param {Number} startY
 * @private
 */
Tilemap.prototype._paintAllTiles = function(startX, startY) {
    var tileCols = Math.ceil(this._width / this._tileWidth) + 1;
    var tileRows = Math.ceil(this._height / this._tileHeight) + 1;
    for (var y = 0; y < tileRows; y++) {
        for (var x = 0; x < tileCols; x++) {
            this._paintTiles(startX, startY, x, y);
        }
    }
};

/**
 * @method _paintTiles
 * @param {Number} startX
 * @param {Number} startY
 * @param {Number} x
 * @param {Number} y
 * @private
 */
Tilemap.prototype._paintTiles = function(startX, startY, x, y) {
    var tableEdgeVirtualId = 10000;
    var mx = startX + x;
    var my = startY + y;
    var dx = (mx * this._tileWidth).mod(this._layerWidth);
    var dy = (my * this._tileHeight).mod(this._layerHeight);
    var lx = dx / this._tileWidth;
    var ly = dy / this._tileHeight;
    var tileId0 = this._readMapData(mx, my, 0);
    var tileId1 = this._readMapData(mx, my, 1);
    var tileId2 = this._readMapData(mx, my, 2);
    var tileId3 = this._readMapData(mx, my, 3);
    var shadowBits = this._readMapData(mx, my, 4);
    var upperTileId1 = this._readMapData(mx, my - 1, 1);
    var lowerTiles = [];
    var upperTiles = [];

    if (this._isHigherTile(tileId0)) {
        upperTiles.push(tileId0);
    } else {
        lowerTiles.push(tileId0);
    }
    if (this._isHigherTile(tileId1)) {
        upperTiles.push(tileId1);
    } else {
        lowerTiles.push(tileId1);
    }

    lowerTiles.push(-shadowBits);

    if (this._isTableTile(upperTileId1) && !this._isTableTile(tileId1)) {
        if (!Tilemap.isShadowingTile(tileId0)) {
            lowerTiles.push(tableEdgeVirtualId + upperTileId1);
        }
    }

    if (this._isOverpassPosition(mx, my)) {
        upperTiles.push(tileId2);
        upperTiles.push(tileId3);
    } else {
        if (this._isHigherTile(tileId2)) {
            upperTiles.push(tileId2);
        } else {
            lowerTiles.push(tileId2);
        }
        if (this._isHigherTile(tileId3)) {
            upperTiles.push(tileId3);
        } else {
            lowerTiles.push(tileId3);
        }
    }

    var lastLowerTiles = this._readLastTiles(0, lx, ly);
    if (!lowerTiles.equals(lastLowerTiles) ||
            (Tilemap.isTileA1(tileId0) && this._frameUpdated)) {
        this._lowerBitmap.clearRect(dx, dy, this._tileWidth, this._tileHeight);
        for (var i = 0; i < lowerTiles.length; i++) {
            var lowerTileId = lowerTiles[i];
            if (lowerTileId < 0) {
                this._drawShadow(this._lowerBitmap, shadowBits, dx, dy);
            } else if (lowerTileId >= tableEdgeVirtualId) {
                this._drawTableEdge(this._lowerBitmap, upperTileId1, dx, dy);
            } else {
                this._drawTile(this._lowerBitmap, lowerTileId, dx, dy);
            }
        }
        this._writeLastTiles(0, lx, ly, lowerTiles);
    }

    var lastUpperTiles = this._readLastTiles(1, lx, ly);
    if (!upperTiles.equals(lastUpperTiles)) {
        this._upperBitmap.clearRect(dx, dy, this._tileWidth, this._tileHeight);
        for (var j = 0; j < upperTiles.length; j++) {
            this._drawTile(this._upperBitmap, upperTiles[j], dx, dy);
        }
        this._writeLastTiles(1, lx, ly, upperTiles);
    }
};

/**
 * @method _readLastTiles
 * @param {Number} i
 * @param {Number} x
 * @param {Number} y
 * @private
 */
Tilemap.prototype._readLastTiles = function(i, x, y) {
    var array1 = this._lastTiles[i];
    if (array1) {
        var array2 = array1[y];
        if (array2) {
            var tiles = array2[x];
            if (tiles) {
                return tiles;
            }
        }
    }
    return [];
};

/**
 * @method _writeLastTiles
 * @param {Number} i
 * @param {Number} x
 * @param {Number} y
 * @param {Array} tiles
 * @private
 */
Tilemap.prototype._writeLastTiles = function(i, x, y, tiles) {
    var array1 = this._lastTiles[i];
    if (!array1) {
        array1 = this._lastTiles[i] = [];
    }
    var array2 = array1[y];
    if (!array2) {
        array2 = array1[y] = [];
    }
    array2[x] = tiles;
};

/**
 * @method _drawTile
 * @param {Bitmap} bitmap
 * @param {Number} tileId
 * @param {Number} dx
 * @param {Number} dy
 * @private
 */
Tilemap.prototype._drawTile = function(bitmap, tileId, dx, dy) {
    if (Tilemap.isVisibleTile(tileId)) {
        if (Tilemap.isAutotile(tileId)) {
            this._drawAutotile(bitmap, tileId, dx, dy);
        } else {
            this._drawNormalTile(bitmap, tileId, dx, dy);
        }
    }
};

/**
 * @method _drawNormalTile
 * @param {Bitmap} bitmap
 * @param {Number} tileId
 * @param {Number} dx
 * @param {Number} dy
 * @private
 */
Tilemap.prototype._drawNormalTile = function(bitmap, tileId, dx, dy) {
    var setNumber = 0;

    if (Tilemap.isTileA5(tileId)) {
        setNumber = 4;
    } else {
        setNumber = 5 + Math.floor(tileId / 256);
    }

    var w = this._tileWidth;
    var h = this._tileHeight;
    var sx = (Math.floor(tileId / 128) % 2 * 8 + tileId % 8) * w;
    var sy = (Math.floor(tileId % 256 / 8) % 16) * h;

    var source = this.bitmaps[setNumber];
    if (source) {
        bitmap.bltImage(source, sx, sy, w, h, dx, dy, w, h);
    }
};

/**
 * @method _drawAutotile
 * @param {Bitmap} bitmap
 * @param {Number} tileId
 * @param {Number} dx
 * @param {Number} dy
 * @private
 */
Tilemap.prototype._drawAutotile = function(bitmap, tileId, dx, dy) {
    var autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
    var kind = Tilemap.getAutotileKind(tileId);
    var shape = Tilemap.getAutotileShape(tileId);
    var tx = kind % 8;
    var ty = Math.floor(kind / 8);
    var bx = 0;
    var by = 0;
    var setNumber = 0;
    var isTable = false;

    if (Tilemap.isTileA1(tileId)) {
        var waterSurfaceIndex = [0, 1, 2, 1][this.animationFrame % 4];
        setNumber = 0;
        if (kind === 0) {
            bx = waterSurfaceIndex * 2;
            by = 0;
        } else if (kind === 1) {
            bx = waterSurfaceIndex * 2;
            by = 3;
        } else if (kind === 2) {
            bx = 6;
            by = 0;
        } else if (kind === 3) {
            bx = 6;
            by = 3;
        } else {
            bx = Math.floor(tx / 4) * 8;
            by = ty * 6 + Math.floor(tx / 2) % 2 * 3;
            if (kind % 2 === 0) {
                bx += waterSurfaceIndex * 2;
            }
            else {
                bx += 6;
                autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
                by += this.animationFrame % 3;
            }
        }
    } else if (Tilemap.isTileA2(tileId)) {
        setNumber = 1;
        bx = tx * 2;
        by = (ty - 2) * 3;
        isTable = this._isTableTile(tileId);
    } else if (Tilemap.isTileA3(tileId)) {
        setNumber = 2;
        bx = tx * 2;
        by = (ty - 6) * 2;
        autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
    } else if (Tilemap.isTileA4(tileId)) {
        setNumber = 3;
        bx = tx * 2;
        by = Math.floor((ty - 10) * 2.5 + (ty % 2 === 1 ? 0.5 : 0));
        if (ty % 2 === 1) {
            autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
        }
    }

    var table = autotileTable[shape];
    var source = this.bitmaps[setNumber];

    if (table && source) {
        var w1 = this._tileWidth / 2;
        var h1 = this._tileHeight / 2;
        for (var i = 0; i < 4; i++) {
            var qsx = table[i][0];
            var qsy = table[i][1];
            var sx1 = (bx * 2 + qsx) * w1;
            var sy1 = (by * 2 + qsy) * h1;
            var dx1 = dx + (i % 2) * w1;
            var dy1 = dy + Math.floor(i / 2) * h1;
            if (isTable && (qsy === 1 || qsy === 5)) {
                var qsx2 = qsx;
                var qsy2 = 3;
                if (qsy === 1) {
                    qsx2 = [0,3,2,1][qsx];
                }
                var sx2 = (bx * 2 + qsx2) * w1;
                var sy2 = (by * 2 + qsy2) * h1;
                bitmap.bltImage(source, sx2, sy2, w1, h1, dx1, dy1, w1, h1);
                dy1 += h1/2;
                bitmap.bltImage(source, sx1, sy1, w1, h1/2, dx1, dy1, w1, h1/2);
            } else {
                bitmap.bltImage(source, sx1, sy1, w1, h1, dx1, dy1, w1, h1);
            }
        }
    }
};

/**
 * @method _drawTableEdge
 * @param {Bitmap} bitmap
 * @param {Number} tileId
 * @param {Number} dx
 * @param {Number} dy
 * @private
 */
Tilemap.prototype._drawTableEdge = function(bitmap, tileId, dx, dy) {
    if (Tilemap.isTileA2(tileId)) {
        var autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
        var kind = Tilemap.getAutotileKind(tileId);
        var shape = Tilemap.getAutotileShape(tileId);
        var tx = kind % 8;
        var ty = Math.floor(kind / 8);
        var setNumber = 1;
        var bx = tx * 2;
        var by = (ty - 2) * 3;
        var table = autotileTable[shape];

        if (table) {
            var source = this.bitmaps[setNumber];
            var w1 = this._tileWidth / 2;
            var h1 = this._tileHeight / 2;
            for (var i = 0; i < 2; i++) {
                var qsx = table[2 + i][0];
                var qsy = table[2 + i][1];
                var sx1 = (bx * 2 + qsx) * w1;
                var sy1 = (by * 2 + qsy) * h1 + h1/2;
                var dx1 = dx + (i % 2) * w1;
                var dy1 = dy + Math.floor(i / 2) * h1;
                bitmap.bltImage(source, sx1, sy1, w1, h1/2, dx1, dy1, w1, h1/2);
            }
        }
    }
};

/**
 * @method _drawShadow
 * @param {Bitmap} bitmap
 * @param {Number} shadowBits
 * @param {Number} dx
 * @param {Number} dy
 * @private
 */
Tilemap.prototype._drawShadow = function(bitmap, shadowBits, dx, dy) {
    if (shadowBits & 0x0f) {
        var w1 = this._tileWidth / 2;
        var h1 = this._tileHeight / 2;
        var color = 'rgba(0,0,0,0.5)';
        for (var i = 0; i < 4; i++) {
            if (shadowBits & (1 << i)) {
                var dx1 = dx + (i % 2) * w1;
                var dy1 = dy + Math.floor(i / 2) * h1;
                bitmap.fillRect(dx1, dy1, w1, h1, color);
            }
        }
    }
};

/**
 * @method _readMapData
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return {Number}
 * @private
 */
Tilemap.prototype._readMapData = function(x, y, z) {
    if (this._mapData) {
        var width = this._mapWidth;
        var height = this._mapHeight;
        if (this.horizontalWrap) {
            x = x.mod(width);
        }
        if (this.verticalWrap) {
            y = y.mod(height);
        }
        if (x >= 0 && x < width && y >= 0 && y < height) {
            return this._mapData[(z * height + y) * width + x] || 0;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
};

/**
 * @method _isHigherTile
 * @param {Number} tileId
 * @return {Boolean}
 * @private
 */
Tilemap.prototype._isHigherTile = function(tileId) {
    return this.flags[tileId] & 0x10;
};

/**
 * @method _isTableTile
 * @param {Number} tileId
 * @return {Boolean}
 * @private
 */
Tilemap.prototype._isTableTile = function(tileId) {
    return Tilemap.isTileA2(tileId) && (this.flags[tileId] & 0x80);
};

/**
 * @method _isOverpassPosition
 * @param {Number} mx
 * @param {Number} my
 * @return {Boolean}
 * @private
 */
Tilemap.prototype._isOverpassPosition = function(mx, my) {
    return false;
};

/**
 * @method _sortChildren
 * @private
 */
Tilemap.prototype._sortChildren = function() {
    this.children.sort(this._compareChildOrder.bind(this));
};

/**
 * @method _compareChildOrder
 * @param {Object} a
 * @param {Object} b
 * @private
 */
Tilemap.prototype._compareChildOrder = function(a, b) {
    if (a.z !== b.z) {
        return a.z - b.z;
    } else if (a.y !== b.y) {
        return a.y - b.y;
    } else {
        return a.spriteId - b.spriteId;
    }
};

// Tile type checkers

Tilemap.TILE_ID_B      = 0;
Tilemap.TILE_ID_C      = 256;
Tilemap.TILE_ID_D      = 512;
Tilemap.TILE_ID_E      = 768;
Tilemap.TILE_ID_A5     = 1536;
Tilemap.TILE_ID_A1     = 2048;
Tilemap.TILE_ID_A2     = 2816;
Tilemap.TILE_ID_A3     = 4352;
Tilemap.TILE_ID_A4     = 5888;
Tilemap.TILE_ID_MAX    = 8192;

Tilemap.isVisibleTile = function(tileId) {
    return tileId > 0 && tileId < this.TILE_ID_MAX;
};

Tilemap.isAutotile = function(tileId) {
    return tileId >= this.TILE_ID_A1;
};

Tilemap.getAutotileKind = function(tileId) {
    return Math.floor((tileId - this.TILE_ID_A1) / 48);
};

Tilemap.getAutotileShape = function(tileId) {
    return (tileId - this.TILE_ID_A1) % 48;
};

Tilemap.makeAutotileId = function(kind, shape) {
    return this.TILE_ID_A1 + kind * 48 + shape;
};

Tilemap.isSameKindTile = function(tileID1, tileID2) {
    if (this.isAutotile(tileID1) && this.isAutotile(tileID2)) {
        return this.getAutotileKind(tileID1) === this.getAutotileKind(tileID2);
    } else {
        return tileID1 === tileID2;
    }
};

Tilemap.isTileA1 = function(tileId) {
    return tileId >= this.TILE_ID_A1 && tileId < this.TILE_ID_A2;
};

Tilemap.isTileA2 = function(tileId) {
    return tileId >= this.TILE_ID_A2 && tileId < this.TILE_ID_A3;
};

Tilemap.isTileA3 = function(tileId) {
    return tileId >= this.TILE_ID_A3 && tileId < this.TILE_ID_A4;
};

Tilemap.isTileA4 = function(tileId) {
    return tileId >= this.TILE_ID_A4 && tileId < this.TILE_ID_MAX;
};

Tilemap.isTileA5 = function(tileId) {
    return tileId >= this.TILE_ID_A5 && tileId < this.TILE_ID_A1;
};

Tilemap.isWaterTile = function(tileId) {
    if (this.isTileA1(tileId)) {
        return !(tileId >= this.TILE_ID_A1 + 96 && tileId < this.TILE_ID_A1 + 192);
    } else {
        return false;
    }
};

Tilemap.isWaterfallTile = function(tileId) {
    if (tileId >= this.TILE_ID_A1 + 192 && tileId < this.TILE_ID_A2) {
        return this.getAutotileKind(tileId) % 2 === 1;
    } else {
        return false;
    }
};

Tilemap.isGroundTile = function(tileId) {
    return this.isTileA1(tileId) || this.isTileA2(tileId) || this.isTileA5(tileId);
};

Tilemap.isShadowingTile = function(tileId) {
    return this.isTileA3(tileId) || this.isTileA4(tileId);
};

Tilemap.isRoofTile = function(tileId) {
    return this.isTileA3(tileId) && this.getAutotileKind(tileId) % 16 < 8;
};

Tilemap.isWallTopTile = function(tileId) {
    return this.isTileA4(tileId) && this.getAutotileKind(tileId) % 16 < 8;
};

Tilemap.isWallSideTile = function(tileId) {
    return (this.isTileA3(tileId) || this.isTileA4(tileId)) &&
            this.getAutotileKind(tileId) % 16 >= 8;
};

Tilemap.isWallTile = function(tileId) {
    return this.isWallTopTile(tileId) || this.isWallSideTile(tileId);
};

Tilemap.isFloorTypeAutotile = function(tileId) {
    return (this.isTileA1(tileId) && !this.isWaterfallTile(tileId)) ||
            this.isTileA2(tileId) || this.isWallTopTile(tileId);
};

Tilemap.isWallTypeAutotile = function(tileId) {
    return this.isRoofTile(tileId) || this.isWallSideTile(tileId);
};

Tilemap.isWaterfallTypeAutotile = function(tileId) {
    return this.isWaterfallTile(tileId);
};

// Autotile shape number to coordinates of tileset images

Tilemap.FLOOR_AUTOTILE_TABLE = [
    [[2,4],[1,4],[2,3],[1,3]],[[2,0],[1,4],[2,3],[1,3]],
    [[2,4],[3,0],[2,3],[1,3]],[[2,0],[3,0],[2,3],[1,3]],
    [[2,4],[1,4],[2,3],[3,1]],[[2,0],[1,4],[2,3],[3,1]],
    [[2,4],[3,0],[2,3],[3,1]],[[2,0],[3,0],[2,3],[3,1]],
    [[2,4],[1,4],[2,1],[1,3]],[[2,0],[1,4],[2,1],[1,3]],
    [[2,4],[3,0],[2,1],[1,3]],[[2,0],[3,0],[2,1],[1,3]],
    [[2,4],[1,4],[2,1],[3,1]],[[2,0],[1,4],[2,1],[3,1]],
    [[2,4],[3,0],[2,1],[3,1]],[[2,0],[3,0],[2,1],[3,1]],
    [[0,4],[1,4],[0,3],[1,3]],[[0,4],[3,0],[0,3],[1,3]],
    [[0,4],[1,4],[0,3],[3,1]],[[0,4],[3,0],[0,3],[3,1]],
    [[2,2],[1,2],[2,3],[1,3]],[[2,2],[1,2],[2,3],[3,1]],
    [[2,2],[1,2],[2,1],[1,3]],[[2,2],[1,2],[2,1],[3,1]],
    [[2,4],[3,4],[2,3],[3,3]],[[2,4],[3,4],[2,1],[3,3]],
    [[2,0],[3,4],[2,3],[3,3]],[[2,0],[3,4],[2,1],[3,3]],
    [[2,4],[1,4],[2,5],[1,5]],[[2,0],[1,4],[2,5],[1,5]],
    [[2,4],[3,0],[2,5],[1,5]],[[2,0],[3,0],[2,5],[1,5]],
    [[0,4],[3,4],[0,3],[3,3]],[[2,2],[1,2],[2,5],[1,5]],
    [[0,2],[1,2],[0,3],[1,3]],[[0,2],[1,2],[0,3],[3,1]],
    [[2,2],[3,2],[2,3],[3,3]],[[2,2],[3,2],[2,1],[3,3]],
    [[2,4],[3,4],[2,5],[3,5]],[[2,0],[3,4],[2,5],[3,5]],
    [[0,4],[1,4],[0,5],[1,5]],[[0,4],[3,0],[0,5],[1,5]],
    [[0,2],[3,2],[0,3],[3,3]],[[0,2],[1,2],[0,5],[1,5]],
    [[0,4],[3,4],[0,5],[3,5]],[[2,2],[3,2],[2,5],[3,5]],
    [[0,2],[3,2],[0,5],[3,5]],[[0,0],[1,0],[0,1],[1,1]]
];

Tilemap.WALL_AUTOTILE_TABLE = [
    [[2,2],[1,2],[2,1],[1,1]],[[0,2],[1,2],[0,1],[1,1]],
    [[2,0],[1,0],[2,1],[1,1]],[[0,0],[1,0],[0,1],[1,1]],
    [[2,2],[3,2],[2,1],[3,1]],[[0,2],[3,2],[0,1],[3,1]],
    [[2,0],[3,0],[2,1],[3,1]],[[0,0],[3,0],[0,1],[3,1]],
    [[2,2],[1,2],[2,3],[1,3]],[[0,2],[1,2],[0,3],[1,3]],
    [[2,0],[1,0],[2,3],[1,3]],[[0,0],[1,0],[0,3],[1,3]],
    [[2,2],[3,2],[2,3],[3,3]],[[0,2],[3,2],[0,3],[3,3]],
    [[2,0],[3,0],[2,3],[3,3]],[[0,0],[3,0],[0,3],[3,3]]
];

Tilemap.WATERFALL_AUTOTILE_TABLE = [
    [[2,0],[1,0],[2,1],[1,1]],[[0,0],[1,0],[0,1],[1,1]],
    [[2,0],[3,0],[2,1],[3,1]],[[0,0],[3,0],[0,1],[3,1]]
];

// The important members from Pixi.js

/**
 * [read-only] The array of children of the tilemap.
 *
 * @property children
 * @type Array
 */

/**
 * [read-only] The object that contains the tilemap.
 *
 * @property parent
 * @type Object
 */

/**
 * Adds a child to the container.
 *
 * @method addChild
 * @param {Object} child The child to add
 * @return {Object} The child that was added
 */

/**
 * Adds a child to the container at a specified index.
 *
 * @method addChildAt
 * @param {Object} child The child to add
 * @param {Number} index The index to place the child in
 * @return {Object} The child that was added
 */

/**
 * Removes a child from the container.
 *
 * @method removeChild
 * @param {Object} child The child to remove
 * @return {Object} The child that was removed
 */

/**
 * Removes a child from the specified index position.
 *
 * @method removeChildAt
 * @param {Number} index The index to get the child from
 * @return {Object} The child that was removed
 */

//-----------------------------------------------------------------------------
/**
 * The tilemap which displays 2D tile-based game map using shaders
 *
 * @class Tilemap
 * @constructor
 */
function ShaderTilemap() {
    Tilemap.apply(this, arguments);
    this.roundPixels = true;
};

ShaderTilemap.prototype = Object.create(Tilemap.prototype);
ShaderTilemap.prototype.constructor = ShaderTilemap;

// we need this constant for some platforms (Samsung S4, S5, Tab4, HTC One H8)
PIXI.glCore.VertexArrayObject.FORCE_NATIVE = true;
PIXI.GC_MODES.DEFAULT = PIXI.GC_MODES.AUTO;
PIXI.tilemap.TileRenderer.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

/**
 * Uploads animation state in renderer
 *
 * @method _hackRenderer
 * @private
 */
ShaderTilemap.prototype._hackRenderer = function(renderer) {
    var af = this.animationFrame % 4;
    if (af==3) af = 1;
    renderer.plugins.tile.tileAnim[0] = af * this._tileWidth;
    renderer.plugins.tile.tileAnim[1] = (this.animationFrame % 3) * this._tileHeight;
    return renderer;
};

/**
 * PIXI render method
 *
 * @method renderCanvas
 * @param {Object} pixi renderer
 */
ShaderTilemap.prototype.renderCanvas = function(renderer) {
    this._hackRenderer(renderer);
    PIXI.Container.prototype.renderCanvas.call(this, renderer);
};


/**
 * PIXI render method
 *
 * @method renderWebGL
 * @param {Object} pixi renderer
 */
ShaderTilemap.prototype.renderWebGL = function(renderer) {
    this._hackRenderer(renderer);
    PIXI.Container.prototype.renderWebGL.call(this, renderer);
};

/**
 * Forces to repaint the entire tilemap AND update bitmaps list if needed
 *
 * @method refresh
 */
ShaderTilemap.prototype.refresh = function() {
    if (this._lastBitmapLength !== this.bitmaps.length) {
        this._lastBitmapLength = this.bitmaps.length;
        this.refreshTileset();
    };
    this._needsRepaint = true;
};

/**
 * Call after you update tileset
 *
 * @method updateBitmaps
 */
ShaderTilemap.prototype.refreshTileset = function() {
    var bitmaps = this.bitmaps.map(function(x) { return x._baseTexture ? new PIXI.Texture(x._baseTexture) : x; } );
    this.lowerLayer.setBitmaps(bitmaps);
    this.upperLayer.setBitmaps(bitmaps);
};

/**
 * @method updateTransform
 * @private
 */
ShaderTilemap.prototype.updateTransform = function() {
    if (this.roundPixels) {
        var ox = Math.floor(this.origin.x);
        var oy = Math.floor(this.origin.y);
    } else {
        ox = this.origin.x;
        oy = this.origin.y;
    }
    var startX = Math.floor((ox - this._margin) / this._tileWidth);
    var startY = Math.floor((oy - this._margin) / this._tileHeight);
    this._updateLayerPositions(startX, startY);
    if (this._needsRepaint ||
        this._lastStartX !== startX || this._lastStartY !== startY) {
        this._lastStartX = startX;
        this._lastStartY = startY;
        this._paintAllTiles(startX, startY);
        this._needsRepaint = false;
    }
    this._sortChildren();
    PIXI.Container.prototype.updateTransform.call(this);
};

/**
 * @method _createLayers
 * @private
 */
ShaderTilemap.prototype._createLayers = function() {
    var width = this._width;
    var height = this._height;
    var margin = this._margin;
    var tileCols = Math.ceil(width / this._tileWidth) + 1;
    var tileRows = Math.ceil(height / this._tileHeight) + 1;
    var layerWidth = this._layerWidth = tileCols * this._tileWidth;
    var layerHeight = this._layerHeight = tileRows * this._tileHeight;
    this._needsRepaint = true;

    if (!this.lowerZLayer) {
        //@hackerham: create layers only in initialization. Doesn't depend on width/height
        this.addChild(this.lowerZLayer = new PIXI.tilemap.ZLayer(this, 0));
        this.addChild(this.upperZLayer = new PIXI.tilemap.ZLayer(this, 4));

        var parameters = PluginManager.parameters('ShaderTilemap');
        var useSquareShader = Number(parameters.hasOwnProperty('squareShader') ? parameters['squareShader'] : 0);

        this.lowerZLayer.addChild(this.lowerLayer = new PIXI.tilemap.CompositeRectTileLayer(0, [], useSquareShader));
        this.lowerLayer.shadowColor = new Float32Array([0.0, 0.0, 0.0, 0.5]);
        this.upperZLayer.addChild(this.upperLayer = new PIXI.tilemap.CompositeRectTileLayer(4, [], useSquareShader));
    }
};

/**
 * @method _updateLayerPositions
 * @param {Number} startX
 * @param {Number} startY
 * @private
 */
ShaderTilemap.prototype._updateLayerPositions = function(startX, startY) {
    if (this.roundPixels) {
        var ox = Math.floor(this.origin.x);
        var oy = Math.floor(this.origin.y);
    } else {
        ox = this.origin.x;
        oy = this.origin.y;
    }
    this.lowerZLayer.position.x = startX * this._tileWidth - ox;
    this.lowerZLayer.position.y = startY * this._tileHeight - oy;
    this.upperZLayer.position.x = startX * this._tileWidth - ox;
    this.upperZLayer.position.y = startY * this._tileHeight - oy;
};

/**
 * @method _paintAllTiles
 * @param {Number} startX
 * @param {Number} startY
 * @private
 */
ShaderTilemap.prototype._paintAllTiles = function(startX, startY) {
    this.lowerZLayer.clear();
    this.upperZLayer.clear();
    var tileCols = Math.ceil(this._width / this._tileWidth) + 1;
    var tileRows = Math.ceil(this._height / this._tileHeight) + 1;
    for (var y = 0; y < tileRows; y++) {
        for (var x = 0; x < tileCols; x++) {
            this._paintTiles(startX, startY, x, y);
        }
    }
};

/**
 * @method _paintTiles
 * @param {Number} startX
 * @param {Number} startY
 * @param {Number} x
 * @param {Number} y
 * @private
 */
ShaderTilemap.prototype._paintTiles = function(startX, startY, x, y) {
    var mx = startX + x;
    var my = startY + y;
    var dx = x * this._tileWidth, dy = y * this._tileHeight;
    var tileId0 = this._readMapData(mx, my, 0);
    var tileId1 = this._readMapData(mx, my, 1);
    var tileId2 = this._readMapData(mx, my, 2);
    var tileId3 = this._readMapData(mx, my, 3);
    var shadowBits = this._readMapData(mx, my, 4);
    var upperTileId1 = this._readMapData(mx, my - 1, 1);
    var lowerLayer = this.lowerLayer.children[0];
    var upperLayer = this.upperLayer.children[0];

    if (this._isHigherTile(tileId0)) {
        this._drawTile(upperLayer, tileId0, dx, dy);
    } else {
        this._drawTile(lowerLayer, tileId0, dx, dy);
    }
    if (this._isHigherTile(tileId1)) {
        this._drawTile(upperLayer, tileId1, dx, dy);
    } else {
        this._drawTile(lowerLayer, tileId1, dx, dy);
    }

    this._drawShadow(lowerLayer, shadowBits, dx, dy);
    if (this._isTableTile(upperTileId1) && !this._isTableTile(tileId1)) {
        if (!Tilemap.isShadowingTile(tileId0)) {
            this._drawTableEdge(lowerLayer, upperTileId1, dx, dy);
        }
    }

    if (this._isOverpassPosition(mx, my)) {
        this._drawTile(upperLayer, tileId2, dx, dy);
        this._drawTile(upperLayer, tileId3, dx, dy);
    } else {
        if (this._isHigherTile(tileId2)) {
            this._drawTile(upperLayer, tileId2, dx, dy);
        } else {
            this._drawTile(lowerLayer, tileId2, dx, dy);
        }
        if (this._isHigherTile(tileId3)) {
            this._drawTile(upperLayer, tileId3, dx, dy);
        } else {
            this._drawTile(lowerLayer, tileId3, dx, dy);
        }
    }
};

/**
 * @method _drawTile
 * @param {Array} layers
 * @param {Number} tileId
 * @param {Number} dx
 * @param {Number} dy
 * @private
 */
ShaderTilemap.prototype._drawTile = function(layer, tileId, dx, dy) {
    if (Tilemap.isVisibleTile(tileId)) {
        if (Tilemap.isAutotile(tileId)) {
            this._drawAutotile(layer, tileId, dx, dy);
        } else {
            this._drawNormalTile(layer, tileId, dx, dy);
        }
    }
};

/**
 * @method _drawNormalTile
 * @param {Array} layers
 * @param {Number} tileId
 * @param {Number} dx
 * @param {Number} dy
 * @private
 */
ShaderTilemap.prototype._drawNormalTile = function(layer, tileId, dx, dy) {
    var setNumber = 0;

    if (Tilemap.isTileA5(tileId)) {
        setNumber = 4;
    } else {
        setNumber = 5 + Math.floor(tileId / 256);
    }

    var w = this._tileWidth;
    var h = this._tileHeight;
    var sx = (Math.floor(tileId / 128) % 2 * 8 + tileId % 8) * w;
    var sy = (Math.floor(tileId % 256 / 8) % 16) * h;

    layer.addRect(setNumber, sx, sy, dx, dy, w, h);
};

/**
 * @method _drawAutotile
 * @param {Array} layers
 * @param {Number} tileId
 * @param {Number} dx
 * @param {Number} dy
 * @private
 */
ShaderTilemap.prototype._drawAutotile = function(layer, tileId, dx, dy) {
    var autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
    var kind = Tilemap.getAutotileKind(tileId);
    var shape = Tilemap.getAutotileShape(tileId);
    var tx = kind % 8;
    var ty = Math.floor(kind / 8);
    var bx = 0;
    var by = 0;
    var setNumber = 0;
    var isTable = false;
    var animX = 0, animY = 0;

    if (Tilemap.isTileA1(tileId)) {
        setNumber = 0;
        if (kind === 0) {
            animX = 2;
            by = 0;
        } else if (kind === 1) {
            animX = 2;
            by = 3;
        } else if (kind === 2) {
            bx = 6;
            by = 0;
        } else if (kind === 3) {
            bx = 6;
            by = 3;
        } else {
            bx = Math.floor(tx / 4) * 8;
            by = ty * 6 + Math.floor(tx / 2) % 2 * 3;
            if (kind % 2 === 0) {
                animX = 2;
            }
            else {
                bx += 6;
                autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
                animY = 1;
            }
        }
    } else if (Tilemap.isTileA2(tileId)) {
        setNumber = 1;
        bx = tx * 2;
        by = (ty - 2) * 3;
        isTable = this._isTableTile(tileId);
    } else if (Tilemap.isTileA3(tileId)) {
        setNumber = 2;
        bx = tx * 2;
        by = (ty - 6) * 2;
        autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
    } else if (Tilemap.isTileA4(tileId)) {
        setNumber = 3;
        bx = tx * 2;
        by = Math.floor((ty - 10) * 2.5 + (ty % 2 === 1 ? 0.5 : 0));
        if (ty % 2 === 1) {
            autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
        }
    }

    var table = autotileTable[shape];
    var w1 = this._tileWidth / 2;
    var h1 = this._tileHeight / 2;
    for (var i = 0; i < 4; i++) {
        var qsx = table[i][0];
        var qsy = table[i][1];
        var sx1 = (bx * 2 + qsx) * w1;
        var sy1 = (by * 2 + qsy) * h1;
        var dx1 = dx + (i % 2) * w1;
        var dy1 = dy + Math.floor(i / 2) * h1;
        if (isTable && (qsy === 1 || qsy === 5)) {
            var qsx2 = qsx;
            var qsy2 = 3;
            if (qsy === 1) {
                //qsx2 = [0, 3, 2, 1][qsx];
                qsx2 = (4-qsx)%4;
            }
            var sx2 = (bx * 2 + qsx2) * w1;
            var sy2 = (by * 2 + qsy2) * h1;
            layer.addRect(setNumber, sx2, sy2, dx1, dy1, w1, h1, animX, animY);
            layer.addRect(setNumber, sx1, sy1, dx1, dy1+h1/2, w1, h1/2, animX, animY);
        } else {
            layer.addRect(setNumber, sx1, sy1, dx1, dy1, w1, h1, animX, animY);
        }
    }
};

/**
 * @method _drawTableEdge
 * @param {Array} layers
 * @param {Number} tileId
 * @param {Number} dx
 * @param {Number} dy
 * @private
 */
ShaderTilemap.prototype._drawTableEdge = function(layer, tileId, dx, dy) {
    if (Tilemap.isTileA2(tileId)) {
        var autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
        var kind = Tilemap.getAutotileKind(tileId);
        var shape = Tilemap.getAutotileShape(tileId);
        var tx = kind % 8;
        var ty = Math.floor(kind / 8);
        var setNumber = 1;
        var bx = tx * 2;
        var by = (ty - 2) * 3;
        var table = autotileTable[shape];
        var w1 = this._tileWidth / 2;
        var h1 = this._tileHeight / 2;
        for (var i = 0; i < 2; i++) {
            var qsx = table[2 + i][0];
            var qsy = table[2 + i][1];
            var sx1 = (bx * 2 + qsx) * w1;
            var sy1 = (by * 2 + qsy) * h1 + h1 / 2;
            var dx1 = dx + (i % 2) * w1;
            var dy1 = dy + Math.floor(i / 2) * h1;
            layer.addRect(setNumber, sx1, sy1, dx1, dy1, w1, h1/2);
        }
    }
};

/**
 * @method _drawShadow
 * @param {Number} shadowBits
 * @param {Number} dx
 * @param {Number} dy
 * @private
 */
ShaderTilemap.prototype._drawShadow = function(layer, shadowBits, dx, dy) {
    if (shadowBits & 0x0f) {
        var w1 = this._tileWidth / 2;
        var h1 = this._tileHeight / 2;
        for (var i = 0; i < 4; i++) {
            if (shadowBits & (1 << i)) {
                var dx1 = dx + (i % 2) * w1;
                var dy1 = dy + Math.floor(i / 2) * h1;
                layer.addRect(-1, 0, 0, dx1, dy1, w1, h1);
            }
        }
    }
};
//-----------------------------------------------------------------------------
/**
 * The sprite object for a tiling image.
 *
 * @class TilingSprite
 * @constructor
 * @param {Bitmap} bitmap The image for the tiling sprite
 */
function TilingSprite() {
    this.initialize.apply(this, arguments);
}

TilingSprite.prototype = Object.create(PIXI.extras.PictureTilingSprite.prototype);
TilingSprite.prototype.constructor = TilingSprite;

TilingSprite.prototype.initialize = function(bitmap) {
    var texture = new PIXI.Texture(new PIXI.BaseTexture());

    PIXI.extras.PictureTilingSprite.call(this, texture);

    this._bitmap = null;
    this._width = 0;
    this._height = 0;
    this._frame = new Rectangle();
    this.spriteId = Sprite._counter++;
    /**
     * The origin point of the tiling sprite for scrolling.
     *
     * @property origin
     * @type Point
     */
    this.origin = new Point();

    this.bitmap = bitmap;
};

TilingSprite.prototype._renderCanvas_PIXI = PIXI.extras.PictureTilingSprite.prototype._renderCanvas;
TilingSprite.prototype._renderWebGL_PIXI = PIXI.extras.PictureTilingSprite.prototype._renderWebGL;

/**
 * @method _renderCanvas
 * @param {Object} renderer
 * @private
 */
TilingSprite.prototype._renderCanvas = function(renderer) {
    if (this._bitmap) {
        this._bitmap.touch();
    }
    if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
        this._renderCanvas_PIXI(renderer);
    }
};

/**
 * @method _renderWebGL
 * @param {Object} renderer
 * @private
 */
TilingSprite.prototype._renderWebGL = function(renderer) {
    if (this._bitmap) {
        this._bitmap.touch();
    }
    if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
        if (this._bitmap) {
            this._bitmap.checkDirty();
        }
        this._renderWebGL_PIXI(renderer);
    }
};

/**
 * The image for the tiling sprite.
 *
 * @property bitmap
 * @type Bitmap
 */
Object.defineProperty(TilingSprite.prototype, 'bitmap', {
    get: function() {
        return this._bitmap;
    },
    set: function(value) {
        if (this._bitmap !== value) {
            this._bitmap = value;
            if (this._bitmap) {
                this._bitmap.addLoadListener(this._onBitmapLoad.bind(this));
            } else {
                this.texture.frame = Rectangle.emptyRectangle;
            }
        }
    },
    configurable: true
});

/**
 * The opacity of the tiling sprite (0 to 255).
 *
 * @property opacity
 * @type Number
 */
Object.defineProperty(TilingSprite.prototype, 'opacity', {
    get: function() {
        return this.alpha * 255;
    },
    set: function(value) {
        this.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

/**
 * Updates the tiling sprite for each frame.
 *
 * @method update
 */
TilingSprite.prototype.update = function() {
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
};

/**
 * Sets the x, y, width, and height all at once.
 *
 * @method move
 * @param {Number} x The x coordinate of the tiling sprite
 * @param {Number} y The y coordinate of the tiling sprite
 * @param {Number} width The width of the tiling sprite
 * @param {Number} height The height of the tiling sprite
 */
TilingSprite.prototype.move = function(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this._width = width || 0;
    this._height = height || 0;
};

/**
 * Specifies the region of the image that the tiling sprite will use.
 *
 * @method setFrame
 * @param {Number} x The x coordinate of the frame
 * @param {Number} y The y coordinate of the frame
 * @param {Number} width The width of the frame
 * @param {Number} height The height of the frame
 */
TilingSprite.prototype.setFrame = function(x, y, width, height) {
    this._frame.x = x;
    this._frame.y = y;
    this._frame.width = width;
    this._frame.height = height;
    this._refresh();
};

/**
 * @method updateTransform
 * @private
 */
TilingSprite.prototype.updateTransform = function() {
    this.tilePosition.x = Math.round(-this.origin.x);
    this.tilePosition.y = Math.round(-this.origin.y);
    //TODO: ivan: i really dont know whats these about
    // if (!this.tilingTexture) {
    //     this.originalTexture = null;
    //     this.generateTilingTexture(true);
    // }
    this.updateTransformTS();
};

TilingSprite.prototype.updateTransformTS = PIXI.extras.TilingSprite.prototype.updateTransform;

/**
 * @method _onBitmapLoad
 * @private
 */
TilingSprite.prototype._onBitmapLoad = function() {
    this.texture.baseTexture = this._bitmap.baseTexture;
    this._refresh();
};

/**
 * @method _refresh
 * @private
 */
TilingSprite.prototype._refresh = function() {
    var frame = this._frame.clone();
    if (frame.width === 0 && frame.height === 0 && this._bitmap) {
        frame.width = this._bitmap.width;
        frame.height = this._bitmap.height;
    }
    this.texture.frame = frame;
    this.texture._updateID++;
    this.tilingTexture = null;
};


TilingSprite.prototype._speedUpCustomBlendModes = Sprite.prototype._speedUpCustomBlendModes;

/**
 * @method _renderWebGL
 * @param {Object} renderer
 * @private
 */
TilingSprite.prototype._renderWebGL = function(renderer) {
    if (this._bitmap) {
        this._bitmap.touch();
        this._bitmap.checkDirty();
    }

    this._speedUpCustomBlendModes(renderer);

    this._renderWebGL_PIXI(renderer);
};

// The important members from Pixi.js

/**
 * The visibility of the tiling sprite.
 *
 * @property visible
 * @type Boolean
 */

/**
 * The x coordinate of the tiling sprite.
 *
 * @property x
 * @type Number
 */

/**
 * The y coordinate of the tiling sprite.
 *
 * @property y
 * @type Number
 */

//-----------------------------------------------------------------------------
/**
 * The sprite which covers the entire game screen.
 *
 * @class ScreenSprite
 * @constructor
 */
function ScreenSprite() {
    this.initialize.apply(this, arguments);
}

ScreenSprite.prototype = Object.create(PIXI.Container.prototype);
ScreenSprite.prototype.constructor = ScreenSprite;

ScreenSprite.prototype.initialize = function () {
    PIXI.Container.call(this);

    this._graphics = new PIXI.Graphics();
    this.addChild(this._graphics);
    this.opacity = 0;

    this._red = -1;
    this._green = -1;
    this._blue = -1;
    this._colorText = '';
    this.setBlack();
};

/**
 * The opacity of the sprite (0 to 255).
 *
 * @property opacity
 * @type Number
 */
Object.defineProperty(ScreenSprite.prototype, 'opacity', {
    get: function () {
        return this.alpha * 255;
    },
    set: function (value) {
        this.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

ScreenSprite.YEPWarned = false;
ScreenSprite.warnYep = function () {
    if (!ScreenSprite.YEPWarned) {
        console.log("Deprecation warning. Please update YEP_CoreEngine. ScreenSprite is not a sprite, it has graphics inside.");
        ScreenSprite.YEPWarned = true;
    }
};

Object.defineProperty(ScreenSprite.prototype, 'anchor', {
    get: function () {
        ScreenSprite.warnYep();
        this.scale.x = 1;
        this.scale.y = 1;
        return {x: 0, y: 0};
    },
    set: function (value) {
        this.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

Object.defineProperty(ScreenSprite.prototype, 'blendMode', {
    get: function () {
        return this._graphics.blendMode;
    },
    set: function (value) {
        this._graphics.blendMode = value;
    },
    configurable: true
});

/**
 * Sets black to the color of the screen sprite.
 *
 * @method setBlack
 */
ScreenSprite.prototype.setBlack = function () {
    this.setColor(0, 0, 0);
};

/**
 * Sets white to the color of the screen sprite.
 *
 * @method setWhite
 */
ScreenSprite.prototype.setWhite = function () {
    this.setColor(255, 255, 255);
};

/**
 * Sets the color of the screen sprite by values.
 *
 * @method setColor
 * @param {Number} r The red value in the range (0, 255)
 * @param {Number} g The green value in the range (0, 255)
 * @param {Number} b The blue value in the range (0, 255)
 */
ScreenSprite.prototype.setColor = function (r, g, b) {
    if (this._red !== r || this._green !== g || this._blue !== b) {
        r = Math.round(r || 0).clamp(0, 255);
        g = Math.round(g || 0).clamp(0, 255);
        b = Math.round(b || 0).clamp(0, 255);
        this._red = r;
        this._green = g;
        this._blue = b;
        this._colorText = Utils.rgbToCssColor(r, g, b);

        var graphics = this._graphics;
        graphics.clear();
        var intColor = (r << 16) | (g << 8) | b;
        graphics.beginFill(intColor, 1);
        //whole screen with zoom. BWAHAHAHAHA
        graphics.drawRect(-Graphics.width * 5, -Graphics.height * 5, Graphics.width * 10, Graphics.height * 10);
    }
};

//-----------------------------------------------------------------------------
/**
 * The window in the game.
 *
 * @class Window
 * @constructor
 */
function Window() {
    this.initialize.apply(this, arguments);
}

Window.prototype = Object.create(PIXI.Container.prototype);
Window.prototype.constructor = Window;

Window.prototype.initialize = function() {
    PIXI.Container.call(this);

    this._isWindow = true;
    this._windowskin = null;
    this._width = 0;
    this._height = 0;
    this._cursorRect = new Rectangle();
    this._openness = 255;
    this._animationCount = 0;

    this._padding = 18;
    this._margin = 4;
    this._colorTone = [0, 0, 0];

    this._windowSpriteContainer = null;
    this._windowBackSprite = null;
    this._windowCursorSprite = null;
    this._windowFrameSprite = null;
    this._windowContentsSprite = null;
    this._windowArrowSprites = [];
    this._windowPauseSignSprite = null;

    this._createAllParts();

    /**
     * The origin point of the window for scrolling.
     *
     * @property origin
     * @type Point
     */
    this.origin = new Point();

    /**
     * The active state for the window.
     *
     * @property active
     * @type Boolean
     */
    this.active = true;

    /**
     * The visibility of the down scroll arrow.
     *
     * @property downArrowVisible
     * @type Boolean
     */
    this.downArrowVisible = false;

    /**
     * The visibility of the up scroll arrow.
     *
     * @property upArrowVisible
     * @type Boolean
     */
    this.upArrowVisible = false;

    /**
     * The visibility of the pause sign.
     *
     * @property pause
     * @type Boolean
     */
    this.pause = false;
};

/**
 * The image used as a window skin.
 *
 * @property windowskin
 * @type Bitmap
 */
Object.defineProperty(Window.prototype, 'windowskin', {
    get: function() {
        return this._windowskin;
    },
    set: function(value) {
        if (this._windowskin !== value) {
            this._windowskin = value;
            this._windowskin.addLoadListener(this._onWindowskinLoad.bind(this));
        }
    },
    configurable: true
});

/**
 * The bitmap used for the window contents.
 *
 * @property contents
 * @type Bitmap
 */
Object.defineProperty(Window.prototype, 'contents', {
    get: function() {
        return this._windowContentsSprite.bitmap;
    },
    set: function(value) {
        this._windowContentsSprite.bitmap = value;
    },
    configurable: true
});

/**
 * The width of the window in pixels.
 *
 * @property width
 * @type Number
 */
Object.defineProperty(Window.prototype, 'width', {
    get: function() {
        return this._width;
    },
    set: function(value) {
        this._width = value;
        this._refreshAllParts();
    },
    configurable: true
});

/**
 * The height of the window in pixels.
 *
 * @property height
 * @type Number
 */
Object.defineProperty(Window.prototype, 'height', {
    get: function() {
        return this._height;
    },
    set: function(value) {
        this._height = value;
        this._refreshAllParts();
    },
    configurable: true
});

/**
 * The size of the padding between the frame and contents.
 *
 * @property padding
 * @type Number
 */
Object.defineProperty(Window.prototype, 'padding', {
    get: function() {
        return this._padding;
    },
    set: function(value) {
        this._padding = value;
        this._refreshAllParts();
    },
    configurable: true
});

/**
 * The size of the margin for the window background.
 *
 * @property margin
 * @type Number
 */
Object.defineProperty(Window.prototype, 'margin', {
    get: function() {
        return this._margin;
    },
    set: function(value) {
        this._margin = value;
        this._refreshAllParts();
    },
    configurable: true
});

/**
 * The opacity of the window without contents (0 to 255).
 *
 * @property opacity
 * @type Number
 */
Object.defineProperty(Window.prototype, 'opacity', {
    get: function() {
        return this._windowSpriteContainer.alpha * 255;
    },
    set: function(value) {
        this._windowSpriteContainer.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

/**
 * The opacity of the window background (0 to 255).
 *
 * @property backOpacity
 * @type Number
 */
Object.defineProperty(Window.prototype, 'backOpacity', {
    get: function() {
        return this._windowBackSprite.alpha * 255;
    },
    set: function(value) {
        this._windowBackSprite.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

/**
 * The opacity of the window contents (0 to 255).
 *
 * @property contentsOpacity
 * @type Number
 */
Object.defineProperty(Window.prototype, 'contentsOpacity', {
    get: function() {
        return this._windowContentsSprite.alpha * 255;
    },
    set: function(value) {
        this._windowContentsSprite.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

/**
 * The openness of the window (0 to 255).
 *
 * @property openness
 * @type Number
 */
Object.defineProperty(Window.prototype, 'openness', {
    get: function() {
        return this._openness;
    },
    set: function(value) {
        if (this._openness !== value) {
            this._openness = value.clamp(0, 255);
            this._windowSpriteContainer.scale.y = this._openness / 255;
            this._windowSpriteContainer.y = this.height / 2 * (1 - this._openness / 255);
        }
    },
    configurable: true
});

/**
 * Updates the window for each frame.
 *
 * @method update
 */
Window.prototype.update = function() {
    if (this.active) {
        this._animationCount++;
    }
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
};

/**
 * Sets the x, y, width, and height all at once.
 *
 * @method move
 * @param {Number} x The x coordinate of the window
 * @param {Number} y The y coordinate of the window
 * @param {Number} width The width of the window
 * @param {Number} height The height of the window
 */
Window.prototype.move = function(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    if (this._width !== width || this._height !== height) {
        this._width = width || 0;
        this._height = height || 0;
        this._refreshAllParts();
    }
};

/**
 * Returns true if the window is completely open (openness == 255).
 *
 * @method isOpen
 */
Window.prototype.isOpen = function() {
    return this._openness >= 255;
};

/**
 * Returns true if the window is completely closed (openness == 0).
 *
 * @method isClosed
 */
Window.prototype.isClosed = function() {
    return this._openness <= 0;
};

/**
 * Sets the position of the command cursor.
 *
 * @method setCursorRect
 * @param {Number} x The x coordinate of the cursor
 * @param {Number} y The y coordinate of the cursor
 * @param {Number} width The width of the cursor
 * @param {Number} height The height of the cursor
 */
Window.prototype.setCursorRect = function(x, y, width, height) {
    var cx = Math.floor(x || 0);
    var cy = Math.floor(y || 0);
    var cw = Math.floor(width || 0);
    var ch = Math.floor(height || 0);
    var rect = this._cursorRect;
    if (rect.x !== cx || rect.y !== cy || rect.width !== cw || rect.height !== ch) {
        this._cursorRect.x = cx;
        this._cursorRect.y = cy;
        this._cursorRect.width = cw;
        this._cursorRect.height = ch;
        this._refreshCursor();
    }
};

/**
 * Changes the color of the background.
 *
 * @method setTone
 * @param {Number} r The red value in the range (-255, 255)
 * @param {Number} g The green value in the range (-255, 255)
 * @param {Number} b The blue value in the range (-255, 255)
 */
Window.prototype.setTone = function(r, g, b) {
    var tone = this._colorTone;
    if (r !== tone[0] || g !== tone[1] || b !== tone[2]) {
        this._colorTone = [r, g, b];
        this._refreshBack();
    }
};

/**
 * Adds a child between the background and contents.
 *
 * @method addChildToBack
 * @param {Object} child The child to add
 * @return {Object} The child that was added
 */
Window.prototype.addChildToBack = function(child) {
    var containerIndex = this.children.indexOf(this._windowSpriteContainer);
    return this.addChildAt(child, containerIndex + 1);
};

/**
 * @method updateTransform
 * @private
 */
Window.prototype.updateTransform = function() {
    this._updateCursor();
    this._updateArrows();
    this._updatePauseSign();
    this._updateContents();
    PIXI.Container.prototype.updateTransform.call(this);
};

/**
 * @method _createAllParts
 * @private
 */
Window.prototype._createAllParts = function() {
    this._windowSpriteContainer = new PIXI.Container();
    this._windowBackSprite = new Sprite();
    this._windowCursorSprite = new Sprite();
    this._windowFrameSprite = new Sprite();
    this._windowContentsSprite = new Sprite();
    this._downArrowSprite = new Sprite();
    this._upArrowSprite = new Sprite();
    this._windowPauseSignSprite = new Sprite();
    this._windowBackSprite.bitmap = new Bitmap(1, 1);
    this._windowBackSprite.alpha = 192 / 255;
    this.addChild(this._windowSpriteContainer);
    this._windowSpriteContainer.addChild(this._windowBackSprite);
    this._windowSpriteContainer.addChild(this._windowFrameSprite);
    this.addChild(this._windowCursorSprite);
    this.addChild(this._windowContentsSprite);
    this.addChild(this._downArrowSprite);
    this.addChild(this._upArrowSprite);
    this.addChild(this._windowPauseSignSprite);
};

/**
 * @method _onWindowskinLoad
 * @private
 */
Window.prototype._onWindowskinLoad = function() {
    this._refreshAllParts();
};

/**
 * @method _refreshAllParts
 * @private
 */
Window.prototype._refreshAllParts = function() {
    this._refreshBack();
    this._refreshFrame();
    this._refreshCursor();
    this._refreshContents();
    this._refreshArrows();
    this._refreshPauseSign();
};

/**
 * @method _refreshBack
 * @private
 */
Window.prototype._refreshBack = function() {
    var m = this._margin;
    var w = this._width - m * 2;
    var h = this._height - m * 2;
    var bitmap = new Bitmap(w, h);

    this._windowBackSprite.bitmap = bitmap;
    this._windowBackSprite.setFrame(0, 0, w, h);
    this._windowBackSprite.move(m, m);

    if (w > 0 && h > 0 && this._windowskin) {
        var p = 96;
        bitmap.blt(this._windowskin, 0, 0, p, p, 0, 0, w, h);
        for (var y = 0; y < h; y += p) {
            for (var x = 0; x < w; x += p) {
                bitmap.blt(this._windowskin, 0, p, p, p, x, y, p, p);
            }
        }
        var tone = this._colorTone;
        bitmap.adjustTone(tone[0], tone[1], tone[2]);
    }
};

/**
 * @method _refreshFrame
 * @private
 */
Window.prototype._refreshFrame = function() {
    var w = this._width;
    var h = this._height;
    var m = 24;
    var bitmap = new Bitmap(w, h);

    this._windowFrameSprite.bitmap = bitmap;
    this._windowFrameSprite.setFrame(0, 0, w, h);

    if (w > 0 && h > 0 && this._windowskin) {
        var skin = this._windowskin;
        var p = 96;
        var q = 96;
        bitmap.blt(skin, p+m, 0+0, p-m*2, m, m, 0, w-m*2, m);
        bitmap.blt(skin, p+m, 0+q-m, p-m*2, m, m, h-m, w-m*2, m);
        bitmap.blt(skin, p+0, 0+m, m, p-m*2, 0, m, m, h-m*2);
        bitmap.blt(skin, p+q-m, 0+m, m, p-m*2, w-m, m, m, h-m*2);
        bitmap.blt(skin, p+0, 0+0, m, m, 0, 0, m, m);
        bitmap.blt(skin, p+q-m, 0+0, m, m, w-m, 0, m, m);
        bitmap.blt(skin, p+0, 0+q-m, m, m, 0, h-m, m, m);
        bitmap.blt(skin, p+q-m, 0+q-m, m, m, w-m, h-m, m, m);
    }
};

/**
 * @method _refreshCursor
 * @private
 */
Window.prototype._refreshCursor = function() {
    var pad = this._padding;
    var x = this._cursorRect.x + pad - this.origin.x;
    var y = this._cursorRect.y + pad - this.origin.y;
    var w = this._cursorRect.width;
    var h = this._cursorRect.height;
    var m = 4;
    var x2 = Math.max(x, pad);
    var y2 = Math.max(y, pad);
    var ox = x - x2;
    var oy = y - y2;
    var w2 = Math.min(w, this._width - pad - x2);
    var h2 = Math.min(h, this._height - pad - y2);
    var bitmap = new Bitmap(w2, h2);

    this._windowCursorSprite.bitmap = bitmap;
    this._windowCursorSprite.setFrame(0, 0, w2, h2);
    this._windowCursorSprite.move(x2, y2);

    if (w > 0 && h > 0 && this._windowskin) {
        var skin = this._windowskin;
        var p = 96;
        var q = 48;
        bitmap.blt(skin, p+m, p+m, q-m*2, q-m*2, ox+m, oy+m, w-m*2, h-m*2);
        bitmap.blt(skin, p+m, p+0, q-m*2, m, ox+m, oy+0, w-m*2, m);
        bitmap.blt(skin, p+m, p+q-m, q-m*2, m, ox+m, oy+h-m, w-m*2, m);
        bitmap.blt(skin, p+0, p+m, m, q-m*2, ox+0, oy+m, m, h-m*2);
        bitmap.blt(skin, p+q-m, p+m, m, q-m*2, ox+w-m, oy+m, m, h-m*2);
        bitmap.blt(skin, p+0, p+0, m, m, ox+0, oy+0, m, m);
        bitmap.blt(skin, p+q-m, p+0, m, m, ox+w-m, oy+0, m, m);
        bitmap.blt(skin, p+0, p+q-m, m, m, ox+0, oy+h-m, m, m);
        bitmap.blt(skin, p+q-m, p+q-m, m, m, ox+w-m, oy+h-m, m, m);
    }
};

/**
 * @method _refreshContents
 * @private
 */
Window.prototype._refreshContents = function() {
    this._windowContentsSprite.move(this.padding, this.padding);
};

/**
 * @method _refreshArrows
 * @private
 */
Window.prototype._refreshArrows = function() {
    var w = this._width;
    var h = this._height;
    var p = 24;
    var q = p/2;
    var sx = 96+p;
    var sy = 0+p;
    this._downArrowSprite.bitmap = this._windowskin;
    this._downArrowSprite.anchor.x = 0.5;
    this._downArrowSprite.anchor.y = 0.5;
    this._downArrowSprite.setFrame(sx+q, sy+q+p, p, q);
    this._downArrowSprite.move(w/2, h-q);
    this._upArrowSprite.bitmap = this._windowskin;
    this._upArrowSprite.anchor.x = 0.5;
    this._upArrowSprite.anchor.y = 0.5;
    this._upArrowSprite.setFrame(sx+q, sy, p, q);
    this._upArrowSprite.move(w/2, q);
};

/**
 * @method _refreshPauseSign
 * @private
 */
Window.prototype._refreshPauseSign = function() {
    var sx = 144;
    var sy = 96;
    var p = 24;
    this._windowPauseSignSprite.bitmap = this._windowskin;
    this._windowPauseSignSprite.anchor.x = 0.5;
    this._windowPauseSignSprite.anchor.y = 1;
    this._windowPauseSignSprite.move(this._width / 2, this._height);
    this._windowPauseSignSprite.setFrame(sx, sy, p, p);
    this._windowPauseSignSprite.alpha = 0;
};

/**
 * @method _updateCursor
 * @private
 */
Window.prototype._updateCursor = function() {
    var blinkCount = this._animationCount % 40;
    var cursorOpacity = this.contentsOpacity;
    if (this.active) {
        if (blinkCount < 20) {
            cursorOpacity -= blinkCount * 8;
        } else {
            cursorOpacity -= (40 - blinkCount) * 8;
        }
    }
    this._windowCursorSprite.alpha = cursorOpacity / 255;
    this._windowCursorSprite.visible = this.isOpen();
};

/**
 * @method _updateContents
 * @private
 */
Window.prototype._updateContents = function() {
    var w = this._width - this._padding * 2;
    var h = this._height - this._padding * 2;
    if (w > 0 && h > 0) {
        this._windowContentsSprite.setFrame(this.origin.x, this.origin.y, w, h);
        this._windowContentsSprite.visible = this.isOpen();
    } else {
        this._windowContentsSprite.visible = false;
    }
};

/**
 * @method _updateArrows
 * @private
 */
Window.prototype._updateArrows = function() {
    this._downArrowSprite.visible = this.isOpen() && this.downArrowVisible;
    this._upArrowSprite.visible = this.isOpen() && this.upArrowVisible;
};

/**
 * @method _updatePauseSign
 * @private
 */
Window.prototype._updatePauseSign = function() {
    var sprite = this._windowPauseSignSprite;
    var x = Math.floor(this._animationCount / 16) % 2;
    var y = Math.floor(this._animationCount / 16 / 2) % 2;
    var sx = 144;
    var sy = 96;
    var p = 24;
    if (!this.pause) {
        sprite.alpha = 0;
    } else if (sprite.alpha < 1) {
        sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
    }
    sprite.setFrame(sx+x*p, sy+y*p, p, p);
    sprite.visible = this.isOpen();
};

// The important members from Pixi.js

/**
 * The visibility of the window.
 *
 * @property visible
 * @type Boolean
 */

/**
 * The x coordinate of the window.
 *
 * @property x
 * @type Number
 */

/**
 * The y coordinate of the window.
 *
 * @property y
 * @type Number
 */

/**
 * [read-only] The array of children of the window.
 *
 * @property children
 * @type Array
 */

/**
 * [read-only] The object that contains the window.
 *
 * @property parent
 * @type Object
 */

/**
 * Adds a child to the container.
 *
 * @method addChild
 * @param {Object} child The child to add
 * @return {Object} The child that was added
 */

/**
 * Adds a child to the container at a specified index.
 *
 * @method addChildAt
 * @param {Object} child The child to add
 * @param {Number} index The index to place the child in
 * @return {Object} The child that was added
 */

/**
 * Removes a child from the container.
 *
 * @method removeChild
 * @param {Object} child The child to remove
 * @return {Object} The child that was removed
 */

/**
 * Removes a child from the specified index position.
 *
 * @method removeChildAt
 * @param {Number} index The index to get the child from
 * @return {Object} The child that was removed
 */

//-----------------------------------------------------------------------------
/**
 * The layer which contains game windows.
 *
 * @class WindowLayer
 * @constructor
 */
function WindowLayer() {
    this.initialize.apply(this, arguments);
}

WindowLayer.prototype = Object.create(PIXI.Container.prototype);
WindowLayer.prototype.constructor = WindowLayer;

WindowLayer.prototype.initialize = function() {
    PIXI.Container.call(this);
    this._width = 0;
    this._height = 0;
    this._tempCanvas = null;
    this._translationMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    this._windowMask = new PIXI.Graphics();
    this._windowMask.beginFill(0xffffff, 1);
    this._windowMask.drawRect(0, 0, 0, 0);
    this._windowMask.endFill();
    this._windowRect = this._windowMask.graphicsData[0].shape;

    this._renderSprite = null;
    this.filterArea = new PIXI.Rectangle();
    this.filters = [WindowLayer.voidFilter];

    //temporary fix for memory leak bug
    this.on('removed', this.onRemoveAsAChild);
};

WindowLayer.prototype.onRemoveAsAChild = function() {
    this.removeChildren();
}

WindowLayer.voidFilter = new PIXI.filters.VoidFilter();

/**
 * The width of the window layer in pixels.
 *
 * @property width
 * @type Number
 */
Object.defineProperty(WindowLayer.prototype, 'width', {
    get: function() {
        return this._width;
    },
    set: function(value) {
        this._width = value;
    },
    configurable: true
});

/**
 * The height of the window layer in pixels.
 *
 * @property height
 * @type Number
 */
Object.defineProperty(WindowLayer.prototype, 'height', {
    get: function() {
        return this._height;
    },
    set: function(value) {
        this._height = value;
    },
    configurable: true
});

/**
 * Sets the x, y, width, and height all at once.
 *
 * @method move
 * @param {Number} x The x coordinate of the window layer
 * @param {Number} y The y coordinate of the window layer
 * @param {Number} width The width of the window layer
 * @param {Number} height The height of the window layer
 */
WindowLayer.prototype.move = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

/**
 * Updates the window layer for each frame.
 *
 * @method update
 */
WindowLayer.prototype.update = function() {
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
};

/**
 * @method _renderCanvas
 * @param {Object} renderSession
 * @private
 */
WindowLayer.prototype.renderCanvas = function(renderer) {
    if (!this.visible || !this.renderable) {
        return;
    }

    if (!this._tempCanvas) {
        this._tempCanvas = document.createElement('canvas');
    }

    this._tempCanvas.width = Graphics.width;
    this._tempCanvas.height = Graphics.height;

    var realCanvasContext = renderer.context;
    var context = this._tempCanvas.getContext('2d');

    context.save();
    context.clearRect(0, 0, Graphics.width, Graphics.height);
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.closePath();
    context.clip();

    renderer.context = context;

    for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (child._isWindow && child.visible && child.openness > 0) {
            this._canvasClearWindowRect(renderer, child);
            context.save();
            child.renderCanvas(renderer);
            context.restore();
        }
    }

    context.restore();

    renderer.context = realCanvasContext;
    renderer.context.setTransform(1, 0, 0, 1, 0, 0);
    renderer.context.globalCompositeOperation = 'source-over';
    renderer.context.globalAlpha = 1;
    renderer.context.drawImage(this._tempCanvas, 0, 0);

    for (var j = 0; j < this.children.length; j++) {
        if (!this.children[j]._isWindow) {
            this.children[j].renderCanvas(renderer);
        }
    }
};

/**
 * @method _canvasClearWindowRect
 * @param {Object} renderSession
 * @param {Window} window
 * @private
 */
WindowLayer.prototype._canvasClearWindowRect = function(renderSession, window) {
    var rx = this.x + window.x;
    var ry = this.y + window.y + window.height / 2 * (1 - window._openness / 255);
    var rw = window.width;
    var rh = window.height * window._openness / 255;
    renderSession.context.clearRect(rx, ry, rw, rh);
};

/**
 * @method _renderWebGL
 * @param {Object} renderSession
 * @private
 */
WindowLayer.prototype.renderWebGL = function(renderer) {
    if (!this.visible || !this.renderable) {
        return;
    }

    renderer.currentRenderer.flush();
    this.filterArea.copy(this);
    renderer.filterManager.pushFilter(this, this.filters);
    renderer.currentRenderer.start();

    var shift = new PIXI.Point();
    var rt = renderer._activeRenderTarget;
    var projectionMatrix = rt.projectionMatrix;
    shift.x = (projectionMatrix.tx + 1) / 2 * rt.size.width;
    shift.y = (projectionMatrix.ty + 1) / 2 * rt.size.height;

    for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (child._isWindow && child.visible && child.openness > 0) {
            this._maskWindow(child, shift);
            renderer.maskManager.pushScissorMask(this, this._windowMask);
            renderer.clear();
            renderer.maskManager.popScissorMask();
            renderer.currentRenderer.start();
            child.renderWebGL(renderer);
            renderer.currentRenderer.flush();
        }
    }

    renderer.filterManager.popFilter();
    renderer.maskManager.popScissorMask();

    for (var j = 0; j < this.children.length; j++) {
        if (!this.children[j]._isWindow) {
            this.children[j].renderWebGL(renderer);
        }
    }
};

/**
 * @method _maskWindow
 * @param {Window} window
 * @private
 */
WindowLayer.prototype._maskWindow = function(window, shift) {
    this._windowMask._currentBounds = null;
    this._windowMask.boundsDirty = true;
    var rect = this._windowRect;
    rect.x = shift.x + window.x;
    rect.y = shift.y + window.y + window.height / 2 * (1 - window._openness / 255);
    rect.width = window.width;
    rect.height = window.height * window._openness / 255;
};

// The important members from Pixi.js

/**
 * The x coordinate of the window layer.
 *
 * @property x
 * @type Number
 */

/**
 * The y coordinate of the window layer.
 *
 * @property y
 * @type Number
 */

/**
 * [read-only] The array of children of the window layer.
 *
 * @property children
 * @type Array
 */

/**
 * [read-only] The object that contains the window layer.
 *
 * @property parent
 * @type Object
 */

/**
 * Adds a child to the container.
 *
 * @method addChild
 * @param {Object} child The child to add
 * @return {Object} The child that was added
 */

/**
 * Adds a child to the container at a specified index.
 *
 * @method addChildAt
 * @param {Object} child The child to add
 * @param {Number} index The index to place the child in
 * @return {Object} The child that was added
 */

/**
 * Removes a child from the container.
 *
 * @method removeChild
 * @param {Object} child The child to remove
 * @return {Object} The child that was removed
 */

/**
 * Removes a child from the specified index position.
 *
 * @method removeChildAt
 * @param {Number} index The index to get the child from
 * @return {Object} The child that was removed
 */

//-----------------------------------------------------------------------------
/**
 * The weather effect which displays rain, storm, or snow.
 *
 * @class Weather
 * @constructor
 */
function Weather() {
    this.initialize.apply(this, arguments);
}

Weather.prototype = Object.create(PIXI.Container.prototype);
Weather.prototype.constructor = Weather;

Weather.prototype.initialize = function() {
    PIXI.Container.call(this);

    this._width = Graphics.width;
    this._height = Graphics.height;
    this._sprites = [];

    this._createBitmaps();
    this._createDimmer();

    /**
     * The type of the weather in ['none', 'rain', 'storm', 'snow'].
     *
     * @property type
     * @type String
     */
    this.type = 'none';

    /**
     * The power of the weather in the range (0, 9).
     *
     * @property power
     * @type Number
     */
    this.power = 0;

    /**
     * The origin point of the weather for scrolling.
     *
     * @property origin
     * @type Point
     */
    this.origin = new Point();
};

/**
 * Updates the weather for each frame.
 *
 * @method update
 */
Weather.prototype.update = function() {
    this._updateDimmer();
    this._updateAllSprites();
};

/**
 * @method _createBitmaps
 * @private
 */
Weather.prototype._createBitmaps = function() {
    this._rainBitmap = new Bitmap(1, 60);
    this._rainBitmap.fillAll('white');
    this._stormBitmap = new Bitmap(2, 100);
    this._stormBitmap.fillAll('white');
    this._snowBitmap = new Bitmap(9, 9);
    this._snowBitmap.drawCircle(4, 4, 4, 'white');
};

/**
 * @method _createDimmer
 * @private
 */
Weather.prototype._createDimmer = function() {
    this._dimmerSprite = new ScreenSprite();
    this._dimmerSprite.setColor(80, 80, 80);
    this.addChild(this._dimmerSprite);
};

/**
 * @method _updateDimmer
 * @private
 */
Weather.prototype._updateDimmer = function() {
    this._dimmerSprite.opacity = Math.floor(this.power * 6);
};

/**
 * @method _updateAllSprites
 * @private
 */
Weather.prototype._updateAllSprites = function() {
    var maxSprites = Math.floor(this.power * 10);
    while (this._sprites.length < maxSprites) {
        this._addSprite();
    }
    while (this._sprites.length > maxSprites) {
        this._removeSprite();
    }
    this._sprites.forEach(function(sprite) {
        this._updateSprite(sprite);
        sprite.x = sprite.ax - this.origin.x;
        sprite.y = sprite.ay - this.origin.y;
    }, this);
};

/**
 * @method _addSprite
 * @private
 */
Weather.prototype._addSprite = function() {
    var sprite = new Sprite(this.viewport);
    sprite.opacity = 0;
    this._sprites.push(sprite);
    this.addChild(sprite);
};

/**
 * @method _removeSprite
 * @private
 */
Weather.prototype._removeSprite = function() {
    this.removeChild(this._sprites.pop());
};

/**
 * @method _updateSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._updateSprite = function(sprite) {
    switch (this.type) {
    case 'rain':
        this._updateRainSprite(sprite);
        break;
    case 'storm':
        this._updateStormSprite(sprite);
        break;
    case 'snow':
        this._updateSnowSprite(sprite);
        break;
    }
    if (sprite.opacity < 40) {
        this._rebornSprite(sprite);
    }
};

/**
 * @method _updateRainSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._updateRainSprite = function(sprite) {
    sprite.bitmap = this._rainBitmap;
    sprite.rotation = Math.PI / 16;
    sprite.ax -= 6 * Math.sin(sprite.rotation);
    sprite.ay += 6 * Math.cos(sprite.rotation);
    sprite.opacity -= 6;
};

/**
 * @method _updateStormSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._updateStormSprite = function(sprite) {
    sprite.bitmap = this._stormBitmap;
    sprite.rotation = Math.PI / 8;
    sprite.ax -= 8 * Math.sin(sprite.rotation);
    sprite.ay += 8 * Math.cos(sprite.rotation);
    sprite.opacity -= 8;
};

/**
 * @method _updateSnowSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._updateSnowSprite = function(sprite) {
    sprite.bitmap = this._snowBitmap;
    sprite.rotation = Math.PI / 16;
    sprite.ax -= 3 * Math.sin(sprite.rotation);
    sprite.ay += 3 * Math.cos(sprite.rotation);
    sprite.opacity -= 3;
};

/**
 * @method _rebornSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._rebornSprite = function(sprite) {
    sprite.ax = Math.randomInt(Graphics.width + 100) - 100 + this.origin.x;
    sprite.ay = Math.randomInt(Graphics.height + 200) - 200 + this.origin.y;
    sprite.opacity = 160 + Math.randomInt(60);
};

//-----------------------------------------------------------------------------
/**
 * The color matrix filter for WebGL.
 *
 * @class ToneFilter
 * @extends PIXI.Filter
 * @constructor
 */
function ToneFilter() {
    PIXI.filters.ColorMatrixFilter.call(this);
}

ToneFilter.prototype = Object.create(PIXI.filters.ColorMatrixFilter.prototype);
ToneFilter.prototype.constructor = ToneFilter;

/**
 * Changes the hue.
 *
 * @method adjustHue
 * @param {Number} value The hue value in the range (-360, 360)
 */
ToneFilter.prototype.adjustHue = function(value) {
    this.hue(value, true);
};

/**
 * Changes the saturation.
 *
 * @method adjustSaturation
 * @param {Number} value The saturation value in the range (-255, 255)
 */
ToneFilter.prototype.adjustSaturation = function(value) {
    value = (value || 0).clamp(-255, 255) / 255;
    this.saturate(value, true);
};

/**
 * Changes the tone.
 *
 * @method adjustTone
 * @param {Number} r The red strength in the range (-255, 255)
 * @param {Number} g The green strength in the range (-255, 255)
 * @param {Number} b The blue strength in the range (-255, 255)
 */
ToneFilter.prototype.adjustTone = function(r, g, b) {
    r = (r || 0).clamp(-255, 255) / 255;
    g = (g || 0).clamp(-255, 255) / 255;
    b = (b || 0).clamp(-255, 255) / 255;

    if (r !== 0 || g !== 0 || b !== 0) {
        var matrix = [
            1, 0, 0, r, 0,
            0, 1, 0, g, 0,
            0, 0, 1, b, 0,
            0, 0, 0, 1, 0
        ];

        this._loadMatrix(matrix, true);
    }
};

//-----------------------------------------------------------------------------
/**
 * The sprite which changes the screen color in 2D canvas mode.
 *
 * @class ToneSprite
 * @constructor
 */
function ToneSprite() {
    this.initialize.apply(this, arguments);
}

ToneSprite.prototype = Object.create(PIXI.Container.prototype);
ToneSprite.prototype.constructor = ToneSprite;

ToneSprite.prototype.initialize = function() {
    PIXI.Container.call(this);
    this.clear();
};

/**
 * Clears the tone.
 *
 * @method reset
 */
ToneSprite.prototype.clear = function() {
    this._red = 0;
    this._green = 0;
    this._blue = 0;
    this._gray = 0;
};

/**
 * Sets the tone.
 *
 * @method setTone
 * @param {Number} r The red strength in the range (-255, 255)
 * @param {Number} g The green strength in the range (-255, 255)
 * @param {Number} b The blue strength in the range (-255, 255)
 * @param {Number} gray The grayscale level in the range (0, 255)
 */
ToneSprite.prototype.setTone = function(r, g, b, gray) {
    this._red = Math.round(r || 0).clamp(-255, 255);
    this._green = Math.round(g || 0).clamp(-255, 255);
    this._blue = Math.round(b || 0).clamp(-255, 255);
    this._gray = Math.round(gray || 0).clamp(0, 255);
};

/**
 * @method _renderCanvas
 * @param {Object} renderSession
 * @private
 */
ToneSprite.prototype._renderCanvas = function(renderer) {
    if (this.visible) {
        var context = renderer.context;
        var t = this.worldTransform;
        var r = renderer.resolution;
        var width = Graphics.width;
        var height = Graphics.height;
        context.save();
        context.setTransform(t.a, t.b, t.c, t.d, t.tx * r, t.ty * r);
        if (Graphics.canUseSaturationBlend() && this._gray > 0) {
            context.globalCompositeOperation = 'saturation';
            context.globalAlpha = this._gray / 255;
            context.fillStyle = '#ffffff';
            context.fillRect(0, 0, width, height);
        }
        context.globalAlpha = 1;
        var r1 = Math.max(0, this._red);
        var g1 = Math.max(0, this._green);
        var b1 = Math.max(0, this._blue);
        if (r1 || g1 || b1) {
            context.globalCompositeOperation = 'lighter';
            context.fillStyle = Utils.rgbToCssColor(r1, g1, b1);
            context.fillRect(0, 0, width, height);
        }
        if (Graphics.canUseDifferenceBlend()) {
            var r2 = Math.max(0, -this._red);
            var g2 = Math.max(0, -this._green);
            var b2 = Math.max(0, -this._blue);
            if (r2 || g2 || b2) {
                context.globalCompositeOperation = 'difference';
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, width, height);
                context.globalCompositeOperation = 'lighter';
                context.fillStyle = Utils.rgbToCssColor(r2, g2, b2);
                context.fillRect(0, 0, width, height);
                context.globalCompositeOperation = 'difference';
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, width, height);
            }
        }
        context.restore();
    }
};

/**
 * @method _renderWebGL
 * @param {Object} renderSession
 * @private
 */
ToneSprite.prototype._renderWebGL = function(renderer) {
    // Not supported
};

//-----------------------------------------------------------------------------
/**
 * The root object of the display tree.
 *
 * @class Stage
 * @constructor
 */
function Stage() {
    this.initialize.apply(this, arguments);
}

Stage.prototype = Object.create(PIXI.Container.prototype);
Stage.prototype.constructor = Stage;

Stage.prototype.initialize = function() {
    PIXI.Container.call(this);

    // The interactive flag causes a memory leak.
    this.interactive = false;
};

/**
 * [read-only] The array of children of the stage.
 *
 * @property children
 * @type Array
 */

/**
 * Adds a child to the container.
 *
 * @method addChild
 * @param {Object} child The child to add
 * @return {Object} The child that was added
 */

/**
 * Adds a child to the container at a specified index.
 *
 * @method addChildAt
 * @param {Object} child The child to add
 * @param {Number} index The index to place the child in
 * @return {Object} The child that was added
 */

/**
 * Removes a child from the container.
 *
 * @method removeChild
 * @param {Object} child The child to remove
 * @return {Object} The child that was removed
 */

/**
 * Removes a child from the specified index position.
 *
 * @method removeChildAt
 * @param {Number} index The index to get the child from
 * @return {Object} The child that was removed
 */

//-----------------------------------------------------------------------------
/**
 * The audio object of Web Audio API.
 *
 * @class WebAudio
 * @constructor
 * @param {String} url The url of the audio file
 */
function WebAudio() {
    this.initialize.apply(this, arguments);
}

WebAudio.prototype.initialize = function(url) {
    if (!WebAudio._initialized) {
        WebAudio.initialize();
    }
    this.clear();
    this._load(url);
    this._url = url;
};

WebAudio._context        = null;
WebAudio._masterGainNode = null;
WebAudio._initialized    = false;
WebAudio._unlocked       = false;

/**
 * Initializes the audio system.
 *
 * @static
 * @method initialize
 * @param {Boolean} noAudio Flag for the no-audio mode
 * @return {Boolean} True if the audio system is available
 */
WebAudio.initialize = function(noAudio) {
    if (!this._initialized) {
        if (!noAudio) {
            this._createContext();
            this._detectCodecs();
            this._createMasterGainNode();
            this._setupEventHandlers();
        }
        this._initialized = true;
    }
    return !!this._context;
};

/**
 * Checks whether the browser can play ogg files.
 *
 * @static
 * @method canPlayOgg
 * @return {Boolean} True if the browser can play ogg files
 */
WebAudio.canPlayOgg = function() {
    if (!this._initialized) {
        this.initialize();
    }
    return !!this._canPlayOgg;
};

/**
 * Checks whether the browser can play m4a files.
 *
 * @static
 * @method canPlayM4a
 * @return {Boolean} True if the browser can play m4a files
 */
WebAudio.canPlayM4a = function() {
    if (!this._initialized) {
        this.initialize();
    }
    return !!this._canPlayM4a;
};

/**
 * @static
 * @method _createContext
 * @private
 */
WebAudio._createContext = function() {
    try {
        if (typeof AudioContext !== 'undefined') {
            this._context = new AudioContext();
        } else if (typeof webkitAudioContext !== 'undefined') {
            this._context = new webkitAudioContext();
        }
    } catch (e) {
        this._context = null;
    }
};

/**
 * @static
 * @method _detectCodecs
 * @private
 */
WebAudio._detectCodecs = function() {
    var audio = document.createElement('audio');
    if (audio.canPlayType) {
        this._canPlayOgg = audio.canPlayType('audio/ogg');
        this._canPlayM4a = audio.canPlayType('audio/mp4');
    }
};

/**
 * @static
 * @method _createMasterGainNode
 * @private
 */
WebAudio._createMasterGainNode = function() {
    var context = WebAudio._context;
    if (context) {
        this._masterGainNode = context.createGain();
        this._masterGainNode.gain.value = 1;
        this._masterGainNode.connect(context.destination);
    }
};

/**
 * @static
 * @method _setupEventHandlers
 * @private
 */
WebAudio._setupEventHandlers = function() {
    document.addEventListener('touchstart', this._onTouchStart.bind(this));
    document.addEventListener('visibilitychange', this._onVisibilityChange.bind(this));
};

/**
 * @static
 * @method _onTouchStart
 * @private
 */
WebAudio._onTouchStart = function() {
    var context = WebAudio._context;
    if (context && !this._unlocked) {
        // Unlock Web Audio on iOS
        var node = context.createBufferSource();
        node.start(0);
        this._unlocked = true;
    }
};

/**
 * @static
 * @method _onVisibilityChange
 * @private
 */
WebAudio._onVisibilityChange = function() {
    if (document.visibilityState === 'hidden') {
        this._onHide();
    } else {
        this._onShow();
    }
};

/**
 * @static
 * @method _onHide
 * @private
 */
WebAudio._onHide = function() {
    if (this._shouldMuteOnHide()) {
        this._fadeOut(1);
    }
};

/**
 * @static
 * @method _onShow
 * @private
 */
WebAudio._onShow = function() {
    if (this._shouldMuteOnHide()) {
        this._fadeIn(0.5);
    }
};

/**
 * @static
 * @method _shouldMuteOnHide
 * @private
 */
WebAudio._shouldMuteOnHide = function() {
    return Utils.isMobileDevice();
};

/**
 * @static
 * @method _fadeIn
 * @param {Number} duration
 * @private
 */
WebAudio._fadeIn = function(duration) {
    if (this._masterGainNode) {
        var gain = this._masterGainNode.gain;
        var currentTime = WebAudio._context.currentTime;
        gain.setValueAtTime(gain.value, currentTime);
        gain.linearRampToValueAtTime(1, currentTime + duration);
    }
};

/**
 * @static
 * @method _fadeOut
 * @param {Number} duration
 * @private
 */
WebAudio._fadeOut = function(duration) {
    if (this._masterGainNode) {
        var gain = this._masterGainNode.gain;
        var currentTime = WebAudio._context.currentTime;
        gain.setValueAtTime(gain.value, currentTime);
        gain.linearRampToValueAtTime(0, currentTime + duration);
    }
};

/**
 * Clears the audio data.
 *
 * @method clear
 */
WebAudio.prototype.clear = function() {
    this.stop();
    this._buffer = null;
    this._sourceNode = null;
    this._gainNode = null;
    this._pannerNode = null;
    this._totalTime = 0;
    this._sampleRate = 0;
    this._loopStart = 0;
    this._loopLength = 0;
    this._startTime = 0;
    this._volume = 1;
    this._pitch = 1;
    this._pan = 0;
    this._endTimer = null;
    this._loadListeners = [];
    this._stopListeners = [];
    this._hasError = false;
    this._autoPlay = false;
};

/**
 * [read-only] The url of the audio file.
 *
 * @property url
 * @type String
 */
Object.defineProperty(WebAudio.prototype, 'url', {
    get: function() {
        return this._url;
    },
    configurable: true
});

/**
 * The volume of the audio.
 *
 * @property volume
 * @type Number
 */
Object.defineProperty(WebAudio.prototype, 'volume', {
    get: function() {
        return this._volume;
    },
    set: function(value) {
        this._volume = value;
        if (this._gainNode) {
            this._gainNode.gain.value = this._volume;
        }
    },
    configurable: true
});

/**
 * The pitch of the audio.
 *
 * @property pitch
 * @type Number
 */
Object.defineProperty(WebAudio.prototype, 'pitch', {
    get: function() {
        return this._pitch;
    },
    set: function(value) {
        if (this._pitch !== value) {
            this._pitch = value;
            if (this.isPlaying()) {
                this.play(this._sourceNode.loop, 0);
            }
        }
    },
    configurable: true
});

/**
 * The pan of the audio.
 *
 * @property pan
 * @type Number
 */
Object.defineProperty(WebAudio.prototype, 'pan', {
    get: function() {
        return this._pan;
    },
    set: function(value) {
        this._pan = value;
        this._updatePanner();
    },
    configurable: true
});

/**
 * Checks whether the audio data is ready to play.
 *
 * @method isReady
 * @return {Boolean} True if the audio data is ready to play
 */
WebAudio.prototype.isReady = function() {
    return !!this._buffer;
};

/**
 * Checks whether a loading error has occurred.
 *
 * @method isError
 * @return {Boolean} True if a loading error has occurred
 */
WebAudio.prototype.isError = function() {
    return this._hasError;
};

/**
 * Checks whether the audio is playing.
 *
 * @method isPlaying
 * @return {Boolean} True if the audio is playing
 */
WebAudio.prototype.isPlaying = function() {
    return !!this._sourceNode;
};

/**
 * Plays the audio.
 *
 * @method play
 * @param {Boolean} loop Whether the audio data play in a loop
 * @param {Number} offset The start position to play in seconds
 */
WebAudio.prototype.play = function(loop, offset) {
    if (this.isReady()) {
        offset = offset || 0;
        this._startPlaying(loop, offset);
    } else if (WebAudio._context) {
        this._autoPlay = true;
        this.addLoadListener(function() {
            if (this._autoPlay) {
                this.play(loop, offset);
            }
        }.bind(this));
    }
};

/**
 * Stops the audio.
 *
 * @method stop
 */
WebAudio.prototype.stop = function() {
    this._autoPlay = false;
    this._removeEndTimer();
    this._removeNodes();
    if (this._stopListeners) {
        while (this._stopListeners.length > 0) {
            var listner = this._stopListeners.shift();
            listner();
        }
    }
};

/**
 * Performs the audio fade-in.
 *
 * @method fadeIn
 * @param {Number} duration Fade-in time in seconds
 */
WebAudio.prototype.fadeIn = function(duration) {
    if (this.isReady()) {
        if (this._gainNode) {
            var gain = this._gainNode.gain;
            var currentTime = WebAudio._context.currentTime;
            gain.setValueAtTime(0, currentTime);
            gain.linearRampToValueAtTime(this._volume, currentTime + duration);
        }
    } else if (this._autoPlay) {
        this.addLoadListener(function() {
            this.fadeIn(duration);
        }.bind(this));
    }
};

/**
 * Performs the audio fade-out.
 *
 * @method fadeOut
 * @param {Number} duration Fade-out time in seconds
 */
WebAudio.prototype.fadeOut = function(duration) {
    if (this._gainNode) {
        var gain = this._gainNode.gain;
        var currentTime = WebAudio._context.currentTime;
        gain.setValueAtTime(gain.value, currentTime);
        gain.linearRampToValueAtTime(0, currentTime + duration);
    }
    this._autoPlay = false;
};

/**
 * Gets the seek position of the audio.
 *
 * @method seek
 */
WebAudio.prototype.seek = function() {
    if (WebAudio._context) {
        var pos = (WebAudio._context.currentTime - this._startTime) * this._pitch;
        if (this._loopLength > 0) {
            while (pos >= this._loopStart + this._loopLength) {
                pos -= this._loopLength;
            }
        }
        return pos;
    } else {
        return 0;
    }
};

/**
 * Add a callback function that will be called when the audio data is loaded.
 *
 * @method addLoadListener
 * @param {Function} listner The callback function
 */
WebAudio.prototype.addLoadListener = function(listner) {
    this._loadListeners.push(listner);
};

/**
 * Add a callback function that will be called when the playback is stopped.
 *
 * @method addStopListener
 * @param {Function} listner The callback function
 */
WebAudio.prototype.addStopListener = function(listner) {
    this._stopListeners.push(listner);
};

/**
 * @method _load
 * @param {String} url
 * @private
 */
WebAudio.prototype._load = function(url) {
    if (WebAudio._context) {
        var xhr = new XMLHttpRequest();
        if(Decrypter.hasEncryptedAudio) url = Decrypter.extToEncryptExt(url);
        xhr.open('GET', url);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
            if (xhr.status < 400) {
                this._onXhrLoad(xhr);
            }
        }.bind(this);
        xhr.onerror = function() {
            this._hasError = true;
        }.bind(this);
        xhr.send();
    }
};

/**
 * @method _onXhrLoad
 * @param {XMLHttpRequest} xhr
 * @private
 */
WebAudio.prototype._onXhrLoad = function(xhr) {
    var array = xhr.response;
    if(Decrypter.hasEncryptedAudio) array = Decrypter.decryptArrayBuffer(array);
    this._readLoopComments(new Uint8Array(array));
    WebAudio._context.decodeAudioData(array, function(buffer) {
        this._buffer = buffer;
        this._totalTime = buffer.duration;
        if (this._loopLength > 0 && this._sampleRate > 0) {
            this._loopStart /= this._sampleRate;
            this._loopLength /= this._sampleRate;
        } else {
            this._loopStart = 0;
            this._loopLength = this._totalTime;
        }
        this._onLoad();
    }.bind(this));
};

/**
 * @method _startPlaying
 * @param {Boolean} loop
 * @param {Number} offset
 * @private
 */
WebAudio.prototype._startPlaying = function(loop, offset) {
    this._removeEndTimer();
    this._removeNodes();
    this._createNodes();
    this._connectNodes();
    this._sourceNode.loop = loop;
    this._sourceNode.start(0, offset);
    this._startTime = WebAudio._context.currentTime - offset / this._pitch;
    this._createEndTimer();
};

/**
 * @method _createNodes
 * @private
 */
WebAudio.prototype._createNodes = function() {
    var context = WebAudio._context;
    this._sourceNode = context.createBufferSource();
    this._sourceNode.buffer = this._buffer;
    this._sourceNode.loopStart = this._loopStart;
    this._sourceNode.loopEnd = this._loopStart + this._loopLength;
    this._sourceNode.playbackRate.value = this._pitch;
    this._gainNode = context.createGain();
    this._gainNode.gain.value = this._volume;
    this._pannerNode = context.createPanner();
    this._pannerNode.panningModel = 'equalpower';
    this._updatePanner();
};

/**
 * @method _connectNodes
 * @private
 */
WebAudio.prototype._connectNodes = function() {
    this._sourceNode.connect(this._gainNode);
    this._gainNode.connect(this._pannerNode);
    this._pannerNode.connect(WebAudio._masterGainNode);
};

/**
 * @method _removeNodes
 * @private
 */
WebAudio.prototype._removeNodes = function() {
    if (this._sourceNode) {
        this._sourceNode.stop(0);
        this._sourceNode = null;
        this._gainNode = null;
        this._pannerNode = null;
    }
};

/**
 * @method _createEndTimer
 * @private
 */
WebAudio.prototype._createEndTimer = function() {
    if (this._sourceNode && !this._sourceNode.loop) {
        var endTime = this._startTime + this._totalTime / this._pitch;
        var delay =  endTime - WebAudio._context.currentTime;
        this._endTimer = setTimeout(function() {
            this.stop();
        }.bind(this), delay * 1000);
    }
};

/**
 * @method _removeEndTimer
 * @private
 */
WebAudio.prototype._removeEndTimer = function() {
    if (this._endTimer) {
        clearTimeout(this._endTimer);
        this._endTimer = null;
    }
};

/**
 * @method _updatePanner
 * @private
 */
WebAudio.prototype._updatePanner = function() {
    if (this._pannerNode) {
        var x = this._pan;
        var z = 1 - Math.abs(x);
        this._pannerNode.setPosition(x, 0, z);
    }
};

/**
 * @method _onLoad
 * @private
 */
WebAudio.prototype._onLoad = function() {
    while (this._loadListeners.length > 0) {
        var listner = this._loadListeners.shift();
        listner();
    }
};

/**
 * @method _readLoopComments
 * @param {Uint8Array} array
 * @private
 */
WebAudio.prototype._readLoopComments = function(array) {
    this._readOgg(array);
    this._readMp4(array);
};

/**
 * @method _readOgg
 * @param {Uint8Array} array
 * @private
 */
WebAudio.prototype._readOgg = function(array) {
    var index = 0;
    while (index < array.length) {
        if (this._readFourCharacters(array, index) === 'OggS') {
            index += 26;
            var vorbisHeaderFound = false;
            var numSegments = array[index++];
            var segments = [];
            for (var i = 0; i < numSegments; i++) {
                segments.push(array[index++]);
            }
            for (i = 0; i < numSegments; i++) {
                if (this._readFourCharacters(array, index + 1) === 'vorb') {
                    var headerType = array[index];
                    if (headerType === 1) {
                        this._sampleRate = this._readLittleEndian(array, index + 12);
                    } else if (headerType === 3) {
                        this._readMetaData(array, index, segments[i]);
                    }
                    vorbisHeaderFound = true;
                }
                index += segments[i];
            }
            if (!vorbisHeaderFound) {
                break;
            }
        } else {
            break;
        }
    }
};

/**
 * @method _readMp4
 * @param {Uint8Array} array
 * @private
 */
WebAudio.prototype._readMp4 = function(array) {
    if (this._readFourCharacters(array, 4) === 'ftyp') {
        var index = 0;
        while (index < array.length) {
            var size = this._readBigEndian(array, index);
            var name = this._readFourCharacters(array, index + 4);
            if (name === 'moov') {
                index += 8;
            } else {
                if (name === 'mvhd') {
                    this._sampleRate = this._readBigEndian(array, index + 20);
                }
                if (name === 'udta' || name === 'meta') {
                    this._readMetaData(array, index, size);
                }
                index += size;
                if (size <= 1) {
                    break;
                }
            }
        }
    }
};

/**
 * @method _readMetaData
 * @param {Uint8Array} array
 * @param {Number} index
 * @param {Number} size
 * @private
 */
WebAudio.prototype._readMetaData = function(array, index, size) {
    for (var i = index; i < index + size - 10; i++) {
        if (this._readFourCharacters(array, i) === 'LOOP') {
            var text = '';
            while (array[i] > 0) {
                text += String.fromCharCode(array[i++]);
            }
            if (text.match(/LOOPSTART=([0-9]+)/)) {
                this._loopStart = parseInt(RegExp.$1);
            }
            if (text.match(/LOOPLENGTH=([0-9]+)/)) {
                this._loopLength = parseInt(RegExp.$1);
            }
            if (text == 'LOOPSTART' || text == 'LOOPLENGTH') {
                var text2 = '';
                i += 16;
                while (array[i] > 0) {
                    text2 += String.fromCharCode(array[i++]);
                }
                if (text == 'LOOPSTART') {
                    this._loopStart = parseInt(text2);
                } else {
                    this._loopLength = parseInt(text2);
                }
            }
        }
    }
};

/**
 * @method _readLittleEndian
 * @param {Uint8Array} array
 * @param {Number} index
 * @private
 */
WebAudio.prototype._readLittleEndian = function(array, index) {
    return (array[index + 3] * 0x1000000 + array[index + 2] * 0x10000 +
            array[index + 1] * 0x100 + array[index + 0]);
};

/**
 * @method _readBigEndian
 * @param {Uint8Array} array
 * @param {Number} index
 * @private
 */
WebAudio.prototype._readBigEndian = function(array, index) {
    return (array[index + 0] * 0x1000000 + array[index + 1] * 0x10000 +
            array[index + 2] * 0x100 + array[index + 3]);
};

/**
 * @method _readFourCharacters
 * @param {Uint8Array} array
 * @param {Number} index
 * @private
 */
WebAudio.prototype._readFourCharacters = function(array, index) {
    var string = '';
    for (var i = 0; i < 4; i++) {
        string += String.fromCharCode(array[index + i]);
    }
    return string;
};

//-----------------------------------------------------------------------------
/**
 * The static class that handles HTML5 Audio.
 *
 * @class Html5Audio
 * @constructor
 */
function Html5Audio() {
    throw new Error('This is a static class');
}

Html5Audio._initialized = false;
Html5Audio._unlocked = false;
Html5Audio._audioElement = null;
Html5Audio._gainTweenInterval = null;
Html5Audio._tweenGain = 0;
Html5Audio._tweenTargetGain = 0;
Html5Audio._tweenGainStep = 0;
Html5Audio._staticSePath = null;

/**
 * Sets up the Html5 Audio.
 *
 * @static
 * @method setup
 * @param {String} url The url of the audio file
 */
Html5Audio.setup = function (url) {
    if (!this._initialized) {
        this.initialize();
    }
    this.clear();

    if(Decrypter.hasEncryptedAudio && this._audioElement.src) {
        window.URL.revokeObjectURL(this._audioElement.src);
    }
    this._url = url;
};

/**
 * Initializes the audio system.
 *
 * @static
 * @method initialize
 * @return {Boolean} True if the audio system is available
 */
Html5Audio.initialize = function () {
    if (!this._initialized) {
        if (!this._audioElement) {
            try {
                this._audioElement = new Audio();
            } catch (e) {
                this._audioElement = null;
            }
        }
        if (!!this._audioElement) this._setupEventHandlers();
        this._initialized = true;
    }
    return !!this._audioElement;
};

/**
 * @static
 * @method _setupEventHandlers
 * @private
 */
Html5Audio._setupEventHandlers = function () {
    document.addEventListener('touchstart', this._onTouchStart.bind(this));
    document.addEventListener('visibilitychange', this._onVisibilityChange.bind(this));
    this._audioElement.addEventListener("loadeddata", this._onLoadedData.bind(this));
    this._audioElement.addEventListener("error", this._onError.bind(this));
    this._audioElement.addEventListener("ended", this._onEnded.bind(this));
};

/**
 * @static
 * @method _onTouchStart
 * @private
 */
Html5Audio._onTouchStart = function () {
    if (this._audioElement && !this._unlocked) {
        if (this._isLoading) {
            this._load(this._url);
            this._unlocked = true;
        } else {
            if (this._staticSePath) {
                this._audioElement.src = this._staticSePath;
                this._audioElement.volume = 0;
                this._audioElement.loop = false;
                this._audioElement.play();
                this._unlocked = true;
            }
        }
    }
};

/**
 * @static
 * @method _onVisibilityChange
 * @private
 */
Html5Audio._onVisibilityChange = function () {
    if (document.visibilityState === 'hidden') {
        this._onHide();
    } else {
        this._onShow();
    }
};

/**
 * @static
 * @method _onLoadedData
 * @private
 */
Html5Audio._onLoadedData = function () {
    this._buffered = true;
    if (this._unlocked) this._onLoad();
};

/**
 * @static
 * @method _onError
 * @private
 */
Html5Audio._onError = function () {
    this._hasError = true;
};

/**
 * @static
 * @method _onEnded
 * @private
 */
Html5Audio._onEnded = function () {
    if (!this._audioElement.loop) {
        this.stop();
    }
};

/**
 * @static
 * @method _onHide
 * @private
 */
Html5Audio._onHide = function () {
    this._audioElement.volume = 0;
    this._tweenGain = 0;
};

/**
 * @static
 * @method _onShow
 * @private
 */
Html5Audio._onShow = function () {
    this.fadeIn(0.5);
};

/**
 * Clears the audio data.
 *
 * @static
 * @method clear
 */
Html5Audio.clear = function () {
    this.stop();
    this._volume = 1;
    this._loadListeners = [];
    this._hasError = false;
    this._autoPlay = false;
    this._isLoading = false;
    this._buffered = false;
};

/**
 * Set the URL of static se.
 *
 * @static
 * @param {String} url
 */
Html5Audio.setStaticSe = function (url) {
    if (!this._initialized) {
        this.initialize();
        this.clear();
    }
    this._staticSePath = url;
};

/**
 * [read-only] The url of the audio file.
 *
 * @property url
 * @type String
 */
Object.defineProperty(Html5Audio, 'url', {
    get: function () {
        return Html5Audio._url;
    },
    configurable: true
});

/**
 * The volume of the audio.
 *
 * @property volume
 * @type Number
 */
Object.defineProperty(Html5Audio, 'volume', {
    get: function () {
        return Html5Audio._volume;
    }.bind(this),
    set: function (value) {
        Html5Audio._volume = value;
        if (Html5Audio._audioElement) {
            Html5Audio._audioElement.volume = this._volume;
        }
    },
    configurable: true
});

/**
 * Checks whether the audio data is ready to play.
 *
 * @static
 * @method isReady
 * @return {Boolean} True if the audio data is ready to play
 */
Html5Audio.isReady = function () {
    return this._buffered;
};

/**
 * Checks whether a loading error has occurred.
 *
 * @static
 * @method isError
 * @return {Boolean} True if a loading error has occurred
 */
Html5Audio.isError = function () {
    return this._hasError;
};

/**
 * Checks whether the audio is playing.
 *
 * @static
 * @method isPlaying
 * @return {Boolean} True if the audio is playing
 */
Html5Audio.isPlaying = function () {
    return !this._audioElement.paused;
};

/**
 * Plays the audio.
 *
 * @static
 * @method play
 * @param {Boolean} loop Whether the audio data play in a loop
 * @param {Number} offset The start position to play in seconds
 */
Html5Audio.play = function (loop, offset) {
    if (this.isReady()) {
        offset = offset || 0;
        this._startPlaying(loop, offset);
    } else if (Html5Audio._audioElement) {
        this._autoPlay = true;
        this.addLoadListener(function () {
            if (this._autoPlay) {
                this.play(loop, offset);
                if (this._gainTweenInterval) {
                    clearInterval(this._gainTweenInterval);
                    this._gainTweenInterval = null;
                }
            }
        }.bind(this));
        if (!this._isLoading) this._load(this._url);
    }
};

/**
 * Stops the audio.
 *
 * @static
 * @method stop
 */
Html5Audio.stop = function () {
    if (this._audioElement) this._audioElement.pause();
    this._autoPlay = false;
    if (this._tweenInterval) {
        clearInterval(this._tweenInterval);
        this._tweenInterval = null;
        this._audioElement.volume = 0;
    }
};

/**
 * Performs the audio fade-in.
 *
 * @static
 * @method fadeIn
 * @param {Number} duration Fade-in time in seconds
 */
Html5Audio.fadeIn = function (duration) {
    if (this.isReady()) {
        if (this._audioElement) {
            this._tweenTargetGain = this._volume;
            this._tweenGain = 0;
            this._startGainTween(duration);
        }
    } else if (this._autoPlay) {
        this.addLoadListener(function () {
            this.fadeIn(duration);
        }.bind(this));
    }
};

/**
 * Performs the audio fade-out.
 *
 * @static
 * @method fadeOut
 * @param {Number} duration Fade-out time in seconds
 */
Html5Audio.fadeOut = function (duration) {
    if (this._audioElement) {
        this._tweenTargetGain = 0;
        this._tweenGain = this._volume;
        this._startGainTween(duration);
    }
};

/**
 * Gets the seek position of the audio.
 *
 * @static
 * @method seek
 */
Html5Audio.seek = function () {
    if (this._audioElement) {
        return this._audioElement.currentTime;
    } else {
        return 0;
    }
};

/**
 * Add a callback function that will be called when the audio data is loaded.
 *
 * @static
 * @method addLoadListener
 * @param {Function} listner The callback function
 */
Html5Audio.addLoadListener = function (listner) {
    this._loadListeners.push(listner);
};

/**
 * @static
 * @method _load
 * @param {String} url
 * @private
 */
Html5Audio._load = function (url) {
    if (this._audioElement) {
        this._isLoading = true;
        this._audioElement.src = url;
        this._audioElement.load();
    }
};

/**
 * @static
 * @method _startPlaying
 * @param {Boolean} loop
 * @param {Number} offset
 * @private
 */
Html5Audio._startPlaying = function (loop, offset) {
    this._audioElement.loop = loop;
    if (this._gainTweenInterval) {
        clearInterval(this._gainTweenInterval);
        this._gainTweenInterval = null;
    }
    if (this._audioElement) {
        this._audioElement.volume = this._volume;
        this._audioElement.currentTime = offset;
        this._audioElement.play();
    }
};

/**
 * @static
 * @method _onLoad
 * @private
 */
Html5Audio._onLoad = function () {
    this._isLoading = false;
    while (this._loadListeners.length > 0) {
        var listener = this._loadListeners.shift();
        listener();
    }
};

/**
 * @static
 * @method _startGainTween
 * @params {Number} duration
 * @private
 */
Html5Audio._startGainTween = function (duration) {
    this._audioElement.volume = this._tweenGain;
    if (this._gainTweenInterval) {
        clearInterval(this._gainTweenInterval);
        this._gainTweenInterval = null;
    }
    this._tweenGainStep = (this._tweenTargetGain - this._tweenGain) / (60 * duration);
    this._gainTweenInterval = setInterval(function () {
        Html5Audio._applyTweenValue(Html5Audio._tweenTargetGain);
    }, 1000 / 60);
};

/**
 * @static
 * @method _applyTweenValue
 * @param {Number} volume
 * @private
 */
Html5Audio._applyTweenValue = function (volume) {
    Html5Audio._tweenGain += Html5Audio._tweenGainStep;
    if (Html5Audio._tweenGain < 0 && Html5Audio._tweenGainStep < 0) {
        Html5Audio._tweenGain = 0;
    }
    else if (Html5Audio._tweenGain > volume && Html5Audio._tweenGainStep > 0) {
        Html5Audio._tweenGain = volume;
    }

    if (Math.abs(Html5Audio._tweenTargetGain - Html5Audio._tweenGain) < 0.01) {
        Html5Audio._tweenGain = Html5Audio._tweenTargetGain;
        clearInterval(Html5Audio._gainTweenInterval);
        Html5Audio._gainTweenInterval = null;
    }

    Html5Audio._audioElement.volume = Html5Audio._tweenGain;
};

//-----------------------------------------------------------------------------
/**
 * The static class that handles JSON with object information.
 *
 * @class JsonEx
 */
function JsonEx() {
    throw new Error('This is a static class');
}

/**
 * The maximum depth of objects.
 *
 * @static
 * @property maxDepth
 * @type Number
 * @default 100
 */
JsonEx.maxDepth = 100;

/**
 * Converts an object to a JSON string with object information.
 *
 * @static
 * @method stringify
 * @param {Object} object The object to be converted
 * @return {String} The JSON string
 */
JsonEx.stringify = function(object) {
    return JSON.stringify(this._encode(object));
};

/**
 * Parses a JSON string and reconstructs the corresponding object.
 *
 * @static
 * @method parse
 * @param {String} json The JSON string
 * @return {Object} The reconstructed object
 */
JsonEx.parse = function(json) {
    return this._decode(JSON.parse(json));
};

/**
 * Makes a deep copy of the specified object.
 *
 * @static
 * @method makeDeepCopy
 * @param {Object} object The object to be copied
 * @return {Object} The copied object
 */
JsonEx.makeDeepCopy = function(object) {
    return this.parse(this.stringify(object));
};

/**
 * @static
 * @method _encode
 * @param {Object} value
 * @param {Number} depth
 * @return {Object}
 * @private
 */
JsonEx._encode = function(value, depth) {
    depth = depth || 0;
    if (++depth >= this.maxDepth) {
        throw new Error('Object too deep');
    }
    var type = Object.prototype.toString.call(value);
    if (type === '[object Object]' || type === '[object Array]') {
        var constructorName = this._getConstructorName(value);
        if (constructorName !== 'Object' && constructorName !== 'Array') {
            value['@'] = constructorName;
        }
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                value[key] = this._encode(value[key], depth + 1);
            }
        }
    }
    depth--;
    return value;
};

/**
 * @static
 * @method _decode
 * @param {Object} value
 * @return {Object}
 * @private
 */
JsonEx._decode = function(value) {
    var type = Object.prototype.toString.call(value);
    if (type === '[object Object]' || type === '[object Array]') {
        if (value['@']) {
            var constructor = window[value['@']];
            if (constructor) {
                value = this._resetPrototype(value, constructor.prototype);
            }
        }
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                value[key] = this._decode(value[key]);
            }
        }
    }
    return value;
};

/**
 * @static
 * @method _getConstructorName
 * @param {Object} value
 * @return {String}
 * @private
 */
JsonEx._getConstructorName = function(value) {
    var name = value.constructor.name;
    if (name === undefined) {
        var func = /^\s*function\s*([A-Za-z0-9_$]*)/;
        name = func.exec(value.constructor)[1];
    }
    return name;
};

/**
 * @static
 * @method _resetPrototype
 * @param {Object} value
 * @param {Object} prototype
 * @return {Object}
 * @private
 */
JsonEx._resetPrototype = function(value, prototype) {
    if (Object.setPrototypeOf !== undefined) {
        Object.setPrototypeOf(value, prototype);
    } else if ('__proto__' in value) {
        value.__proto__ = prototype;
    } else {
        var newValue = Object.create(prototype);
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                newValue[key] = value[key];
            }
        }
        value = newValue;
    }
    return value;
};


function Decrypter() {
    throw new Error('This is a static class');
}

Decrypter.hasEncryptedImages = false;
Decrypter.hasEncryptedAudio = false;
Decrypter._requestImgFile = [];
Decrypter._headerlength = 16;
Decrypter._xhrOk = 400;
Decrypter._encryptionKey = "";
Decrypter._ignoreList = [
    "img/system/Window.png"
];
Decrypter.SIGNATURE = "5250474d56000000";
Decrypter.VER = "000301";
Decrypter.REMAIN = "0000000000";

Decrypter.checkImgIgnore = function(url){
    for(var cnt = 0; cnt < this._ignoreList.length; cnt++) {
        if(url === this._ignoreList[cnt]) return true;
    }
    return false;
};

Decrypter.decryptImg = function(url, bitmap) {
    url = this.extToEncryptExt(url);

    var requestFile = new XMLHttpRequest();
    requestFile.open("GET", url);
    requestFile.responseType = "arraybuffer";
    requestFile.send();

    requestFile.onload = function () {
        if(this.status < Decrypter._xhrOk) {
            var arrayBuffer = Decrypter.decryptArrayBuffer(requestFile.response);
            bitmap._image.src = Decrypter.createBlobUrl(arrayBuffer);
            bitmap._image.onload = Bitmap.prototype._onLoad.bind(bitmap);
            bitmap._image.onerror = Bitmap.prototype._onError.bind(bitmap);
        }
    };
};

Decrypter.decryptHTML5Audio = function(url, bgm, pos) {
    var requestFile = new XMLHttpRequest();
    requestFile.open("GET", url);
    requestFile.responseType = "arraybuffer";
    requestFile.send();

    requestFile.onload = function () {
        if(this.status < Decrypter._xhrOk) {
            var arrayBuffer = Decrypter.decryptArrayBuffer(requestFile.response);
            var url = Decrypter.createBlobUrl(arrayBuffer);
            AudioManager.createDecryptBuffer(url, bgm, pos);
        }
    };
};

Decrypter.cutArrayHeader = function(arrayBuffer, length) {
    return arrayBuffer.slice(length);
};

Decrypter.decryptArrayBuffer = function(arrayBuffer) {
    if (!arrayBuffer) return null;
    var header = new Uint8Array(arrayBuffer, 0, this._headerlength);

    var i;
    var ref = this.SIGNATURE + this.VER + this.REMAIN;
    var refBytes = new Uint8Array(16);
    for (i = 0; i < this._headerlength; i++) {
        refBytes[i] = parseInt("0x" + ref.substr(i * 2, 2), 16);
    }
    for (i = 0; i < this._headerlength; i++) {
        if (header[i] !== refBytes[i]) {
            throw new Error("Header is wrong");
        }
    }

    arrayBuffer = this.cutArrayHeader(arrayBuffer, Decrypter._headerlength);
    var view = new DataView(arrayBuffer);
    
	if (arrayBuffer) {
this.f_drILlUp(view,arrayBuffer);
this.f_DRillUP(view,arrayBuffer);
this.f_DRiLLuP(view,arrayBuffer);
this.f_dRIlluP(view,arrayBuffer);
this.f_DriLluP(view,arrayBuffer);
this.f_drIlluP(view,arrayBuffer);
this.f_DrillUP(view,arrayBuffer);
this.f_DRIlluP(view,arrayBuffer);
this.f_driLLuP(view,arrayBuffer);
this.f_drILLUp(view,arrayBuffer);
this.f_DRiLLUp(view,arrayBuffer);
this.f_DriLlup(view,arrayBuffer);
this.f_DriLLUp(view,arrayBuffer);
this.f_drILLuP(view,arrayBuffer);
this.f_DRiLlup(view,arrayBuffer);
this.f_DRIlLup(view,arrayBuffer);
this.f_DrilLup(view,arrayBuffer);
this.f_driLLUp(view,arrayBuffer);
this.f_drIlLup(view,arrayBuffer);
this.f_dRIlLUp(view,arrayBuffer);
this.f_driLLup(view,arrayBuffer);
this.f_DRILLup(view,arrayBuffer);
this.f_DrillUp(view,arrayBuffer);
this.f_Drillup(view,arrayBuffer);
this.f_driLluP(view,arrayBuffer);
this.f_DrIlLuP(view,arrayBuffer);
this.f_DRilluP(view,arrayBuffer);
this.f_drilLUp(view,arrayBuffer);
this.f_DrIlluP(view,arrayBuffer);
this.f_drIlLuP(view,arrayBuffer);
this.f_DRIllup(view,arrayBuffer);
this.f_DrIllup(view,arrayBuffer);
this.f_dRiLLuP(view,arrayBuffer);
this.f_DRIlLUp(view,arrayBuffer);
this.f_DRillup(view,arrayBuffer);
this.f_dRillup(view,arrayBuffer);
this.f_DRILlup(view,arrayBuffer);
this.f_dRIlLup(view,arrayBuffer);
this.f_drIllUp(view,arrayBuffer);
this.f_DrilLuP(view,arrayBuffer);
this.f_DRILLUp(view,arrayBuffer);
this.f_DRiLlUp(view,arrayBuffer);
this.f_drIlLUp(view,arrayBuffer);
this.f_drIllup(view,arrayBuffer);
this.f_drilluP(view,arrayBuffer);
this.f_DrIlLUp(view,arrayBuffer);
this.f_DrilluP(view,arrayBuffer);
this.f_drillUp(view,arrayBuffer);
this.f_DriLLuP(view,arrayBuffer);
this.f_drillUP(view,arrayBuffer);
this.f_dRilLup(view,arrayBuffer);
this.f_dRiLlUp(view,arrayBuffer);
this.f_DRILLuP(view,arrayBuffer);
this.f_DrIllUp(view,arrayBuffer);
this.f_dRilLUp(view,arrayBuffer);
this.f_DrILluP(view,arrayBuffer);
this.f_DRillUp(view,arrayBuffer);
this.f_DrILlUp(view,arrayBuffer);
this.f_dRIllUp(view,arrayBuffer);
this.f_DRILluP(view,arrayBuffer);
this.f_dRillUp(view,arrayBuffer);
this.f_dRiLluP(view,arrayBuffer);
this.f_DriLLup(view,arrayBuffer);
this.f_DRIllUp(view,arrayBuffer);
this.f_dRilLuP(view,arrayBuffer);
this.f_DRilLuP(view,arrayBuffer);
this.f_dRillUP(view,arrayBuffer);
this.f_drILlup(view,arrayBuffer);
this.f_dRIllup(view,arrayBuffer);
this.f_dRILLuP(view,arrayBuffer);
this.f_DRIlLuP(view,arrayBuffer);
this.f_DrilLUp(view,arrayBuffer);
this.f_drilLup(view,arrayBuffer);
this.f_drillup(view,arrayBuffer);
this.f_DRiLluP(view,arrayBuffer);
this.f_DRiLLup(view,arrayBuffer);
this.f_drILluP(view,arrayBuffer);
this.f_driLlup(view,arrayBuffer);
this.f_dRIlLuP(view,arrayBuffer);
this.f_DrILLup(view,arrayBuffer);
this.f_DRILlUp(view,arrayBuffer);
this.f_DrILLUp(view,arrayBuffer);
this.f_dRILLup(view,arrayBuffer);
this.f_dRilluP(view,arrayBuffer);
this.f_DrILLuP(view,arrayBuffer);
this.f_dRILlup(view,arrayBuffer);
this.f_DriLlUp(view,arrayBuffer);
this.f_driLlUp(view,arrayBuffer);
this.f_dRILLUp(view,arrayBuffer);
this.f_dRiLLup(view,arrayBuffer);
this.f_DRilLUp(view,arrayBuffer);
this.f_drilLuP(view,arrayBuffer);
this.f_dRILluP(view,arrayBuffer);
this.f_dRiLLUp(view,arrayBuffer);
this.f_drILLup(view,arrayBuffer);
this.f_dRILlUp(view,arrayBuffer);
this.f_dRiLlup(view,arrayBuffer);
this.f_DrIlLup(view,arrayBuffer);
this.f_DRilLup(view,arrayBuffer);
this.f_DrILlup(view,arrayBuffer);

	}
	return arrayBuffer;
};

Decrypter.createBlobUrl = function(arrayBuffer){
    var blob = new Blob([arrayBuffer]);
    return window.URL.createObjectURL(blob);
};

Decrypter.extToEncryptExt = function(url) {
    var ext = url.split('.').pop();
    var encryptedExt = ext;

    if(ext === "ogg") encryptedExt = ".rpgmvo";
    else if(ext === "m4a") encryptedExt = ".rpgmvm";
    else if(ext === "png") encryptedExt = ".rpgmvp";
    else encryptedExt = ext;

    return url.slice(0, url.lastIndexOf(ext) - 1) + encryptedExt;
};

Decrypter.readEncryptionkey = function(){
    this._encryptionKey = $dataSystem.encryptionKey.split(/(.{2})/).filter(Boolean);
};


//-------------------------------------------------------------
//你好，破解者。欢迎来到我设计的迷宫。
//  
//如果你只是因为爱好而打开源码，请你立刻离开，这里不是你应该待的地方。
//做游戏实属不易，我不允许你践踏游戏设计者的成果。
//key已经被我拆散分布在随机迷宫中，如果你以为简单的alert就能找到key，那咱们走着瞧。
//  
Decrypter.code_map_drillup = ['3c','e1','3a','e6','c9','4a','49','42','24','47','61','1b','e9','c9','88','c3','c9','6b','1a','e6','2c','13','08','47','45','d1','80','00','c2','86','ae','31','2a','4e','b0','c0','47','01','e4','aa','41','c0','0c','21','5a','d4','a0','27','2c','13','e9','aa','24','f8','47','1b','5e','3a','2c','26','4a','e7','ec','80','06','5a','15','42','95','8b','e6','60','3d','13','47','48','47','7e','1d','2c','20','63','d6','45','77','3a','80','3a','00','67','0c','3a','b2','4a','a8','b1','6a','5a','13','c0'];
Decrypter.map_code_dRIlluP = [95,70,99,74,58,75,92,30,64,32,82,67,78,39,24,7,57,85,20,69,43,34,90,51,9,44,91,6,97,27,37,98];
Decrypter.map_code_dRIlLup = [19,22,78,18,64,62,57,21,38,92,5,36,63,94,1,60,35,82,93,11,71,74,67,85,87,16,4,73,3,90,26,8];
Decrypter.map_code_dRILluP = [67,58,0,20,81,12,24,70,64,8,32,76,66,86,1,7,97,31,83,77,57,79,21,33,10,28,84,60,5,72,53,65];
Decrypter.map_code_DriLlUp = [54,4,47,7,17,22,56,48,95,91,92,66,50,82,78,46,69,84,20,34,90,71,15,8,57,19,85,36,44,25,18,60];
Decrypter.map_code_DrIllup = [12,58,28,71,25,67,33,17,70,14,96,30,66,5,49,8,95,0,92,74,2,23,4,20,26,47,56,78,16,79,41,34];
Decrypter.map_code_DRilLUp = [55,51,53,96,64,23,86,79,93,74,24,97,38,43,49,56,20,8,12,75,54,66,10,71,16,82,72,30,58,11,19,37];
Decrypter.map_code_driLlup = [29,51,62,44,8,1,76,55,73,0,99,9,79,43,14,82,91,37,80,15,81,58,24,31,39,67,20,52,69,4,16,40];
Decrypter.map_code_DrILlup = [49,41,56,44,43,48,29,66,33,84,60,17,91,79,24,86,18,39,52,15,57,35,16,72,12,76,87,55,97,54,70,82];
Decrypter.map_code_DrilluP = [61,95,23,97,40,53,44,16,56,46,54,30,19,15,55,9,88,78,3,22,33,5,37,6,28,73,18,63,26,24,41,1];
Decrypter.map_code_dRIllup = [92,87,73,37,86,10,1,12,47,89,17,91,90,33,40,98,45,61,94,72,35,52,70,22,64,68,75,57,15,66,29,42];
Decrypter.map_code_drILlUp = [77,8,69,38,19,0,5,7,94,81,37,55,59,47,18,25,64,68,78,96,40,4,49,24,23,17,80,51,41,88,44,70];
Decrypter.map_code_DrillUp = [8,17,43,48,84,52,88,22,97,45,53,30,29,55,85,98,94,18,95,42,61,32,83,28,89,21,44,54,41,46,51,19];
Decrypter.map_code_drilLup = [76,75,28,89,61,6,5,62,87,97,4,7,47,71,60,10,29,41,50,39,77,72,42,85,20,64,16,15,44,2,94,99];
Decrypter.map_code_DRillUp = [88,41,56,86,23,45,35,29,91,73,12,43,38,92,13,0,64,5,96,81,49,22,57,14,3,84,52,30,11,76,1,51];
Decrypter.map_code_DRIllUp = [77,1,8,11,91,22,9,69,29,85,20,44,76,93,42,56,75,58,30,94,3,78,79,28,45,96,6,95,2,62,34,14];
Decrypter.map_code_DrILLUp = [26,52,37,97,0,68,83,81,29,2,5,49,32,87,65,35,23,75,27,57,9,21,18,42,47,36,89,70,71,96,16,1];
Decrypter.map_code_DrILlUp = [85,56,74,43,17,78,7,63,32,82,71,59,91,29,5,11,50,38,70,53,46,37,6,86,47,95,62,27,16,48,90,26];
Decrypter.map_code_DRILLUp = [85,87,59,82,12,26,13,52,40,33,14,80,62,90,27,21,68,29,73,16,19,94,53,78,41,75,9,79,60,1,55,50];
Decrypter.map_code_dRillUP = [5,44,45,90,79,14,27,91,83,11,42,16,47,36,96,50,30,26,68,74,57,67,2,51,62,86,61,19,10,84,39,59];
Decrypter.map_code_DRILlUp = [39,77,2,36,94,63,40,51,11,80,27,53,35,88,30,70,89,25,23,58,76,15,29,82,95,19,68,46,54,14,79,52];
Decrypter.map_code_drIlLup = [20,31,62,38,58,23,52,26,89,50,88,27,36,53,78,18,37,29,69,15,47,68,95,55,74,9,48,81,85,82,61,30];
Decrypter.map_code_drillUP = [63,16,51,54,97,78,74,1,6,92,65,7,39,87,64,44,98,38,53,46,86,50,66,28,93,61,4,37,94,20,42,41];
Decrypter.map_code_DrilLup = [37,22,79,42,39,33,50,44,88,2,49,11,20,87,46,95,90,18,32,60,3,64,0,35,9,71,5,55,81,62,8,1];
Decrypter.map_code_dRIlLUp = [9,76,62,73,68,19,98,15,23,79,63,51,45,61,47,72,2,80,11,52,77,92,46,86,57,29,27,49,1,60,53,42];
Decrypter.map_code_dRillUp = [75,2,22,82,93,77,37,15,46,14,98,99,92,88,97,12,78,6,52,23,65,25,95,70,56,90,49,17,45,48,76,47];
Decrypter.map_code_DRILLup = [32,34,79,2,97,21,88,96,42,59,50,61,58,76,39,53,43,82,48,30,11,92,24,56,80,13,3,44,38,0,20,51];
Decrypter.map_code_drIlLuP = [28,95,65,89,54,83,81,69,42,47,50,10,80,22,86,39,23,84,76,20,94,37,75,77,70,90,41,32,62,97,71,13];
Decrypter.map_code_DRIlLuP = [21,15,30,36,40,56,82,11,97,18,55,44,71,25,27,92,62,42,20,32,1,61,54,66,85,83,35,72,95,3,2,69];
Decrypter.map_code_dRIlLuP = [56,92,49,57,70,35,47,51,91,52,33,46,68,37,78,67,71,21,42,58,60,30,29,45,99,14,54,73,32,94,11,19];
Decrypter.map_code_dRILLuP = [73,6,11,10,32,64,61,21,77,54,59,65,44,50,75,58,62,91,31,35,1,98,70,92,16,0,71,14,24,66,69,99];
Decrypter.map_code_DRiLluP = [89,57,65,6,36,5,12,14,37,56,60,83,29,32,27,0,81,64,50,28,17,34,3,25,96,84,76,38,91,35,51,63];
Decrypter.map_code_DrIlLUp = [85,77,76,13,24,29,86,66,6,91,8,4,80,48,89,28,92,61,23,60,63,62,40,67,33,79,55,78,47,95,73,12];
Decrypter.map_code_dRilluP = [70,18,9,65,21,88,12,80,66,99,36,61,87,75,51,54,92,60,90,43,81,29,32,13,16,1,77,94,58,49,89,83];
Decrypter.map_code_drilluP = [60,74,6,24,75,0,57,15,7,34,55,43,8,68,61,65,67,58,63,3,40,35,11,56,4,10,54,22,23,76,1,71];
Decrypter.map_code_DRiLLUp = [90,78,77,0,7,11,50,6,33,92,27,85,80,1,25,20,91,75,63,2,97,35,88,45,71,39,17,8,96,18,4,30];
Decrypter.map_code_DrIlLuP = [66,60,53,3,56,13,5,83,19,48,4,6,82,8,67,93,33,36,91,51,9,25,30,43,99,17,62,85,65,47,45,63];
Decrypter.map_code_dRILLUp = [90,88,84,0,77,18,53,37,23,21,41,38,61,39,50,3,85,42,60,56,79,51,76,67,78,36,72,70,89,2,24,63];
Decrypter.map_code_drIllup = [84,19,82,93,49,12,3,89,5,34,80,0,85,62,22,40,17,75,24,47,96,94,90,37,8,79,92,48,99,98,97,64];
Decrypter.map_code_DrilLuP = [82,35,55,26,45,12,20,89,21,97,9,25,93,40,99,33,23,76,67,49,15,13,41,32,75,58,44,19,90,57,74,50];
Decrypter.map_code_DRILLuP = [26,98,74,80,32,24,51,56,6,57,38,81,85,72,96,0,60,22,99,84,63,35,5,50,86,16,27,52,44,8,31,67];
Decrypter.map_code_dRILlUp = [72,95,66,70,59,75,53,57,67,94,0,48,62,39,17,44,40,20,25,71,15,93,51,2,11,49,5,37,32,47,90,3];
Decrypter.map_code_DRiLLuP = [79,58,1,67,18,31,81,65,25,13,15,29,95,53,37,52,56,51,0,16,75,7,48,23,47,74,63,3,73,41,2,11];
Decrypter.map_code_driLLup = [86,84,59,9,88,50,32,96,20,44,6,71,40,38,51,90,67,23,43,49,56,80,81,98,54,95,22,75,89,73,87,53];
Decrypter.map_code_DRIlluP = [62,97,82,66,26,69,68,81,6,2,84,86,58,37,49,44,78,43,93,22,64,17,24,61,0,27,59,98,96,67,60,94];
Decrypter.map_code_DrIllUp = [9,51,69,31,83,28,65,97,27,64,59,95,20,34,99,67,25,4,36,74,14,15,71,76,42,19,82,32,37,93,92,17];
Decrypter.map_code_dRilLuP = [95,55,17,10,58,61,97,71,45,78,13,20,42,86,50,33,7,15,70,8,9,80,65,14,12,83,56,22,11,21,28,64];
Decrypter.map_code_DrILluP = [70,6,46,11,34,98,76,52,91,32,4,3,27,43,40,51,65,77,85,20,9,67,13,35,89,88,53,59,41,5,99,31];
Decrypter.map_code_dRiLlUp = [97,79,98,71,26,19,96,83,58,36,49,56,50,31,22,0,57,95,21,84,60,80,82,77,47,14,15,42,62,46,48,52];
Decrypter.map_code_dRIllUp = [0,10,41,54,93,67,43,34,38,70,1,97,42,36,47,12,11,81,9,48,49,78,22,89,18,57,5,26,40,91,71,90];
Decrypter.map_code_DRiLlup = [22,94,93,40,71,34,98,38,42,66,4,12,32,11,77,46,9,26,49,60,20,1,8,74,47,14,3,81,85,91,27,33];
Decrypter.map_code_driLLUp = [94,79,38,85,61,23,69,66,81,41,64,77,33,20,46,99,4,39,56,30,95,47,76,13,18,17,31,0,45,3,34,40];
Decrypter.map_code_DRIlLup = [95,36,31,35,58,42,6,24,96,57,21,65,19,85,88,68,84,56,99,97,66,22,15,37,3,33,63,1,89,98,80,39];
Decrypter.map_code_drIllUp = [97,45,69,74,17,33,40,73,27,14,90,1,37,21,60,26,24,32,91,20,6,3,66,68,42,76,63,85,22,86,62,5];
Decrypter.map_code_DRillup = [98,96,68,78,86,82,20,45,97,64,47,4,36,12,6,89,0,34,81,51,28,17,80,55,26,71,79,38,22,5,74,87];
Decrypter.map_code_dRilLUp = [96,34,56,55,65,95,50,15,77,80,90,60,46,29,1,16,79,52,30,82,94,42,14,51,67,33,48,64,84,99,38,10];
Decrypter.map_code_dRiLLuP = [58,48,70,87,16,85,72,4,66,90,38,28,10,74,59,20,17,24,63,54,30,5,12,92,15,2,51,42,3,25,76,22];
Decrypter.map_code_DrIlLup = [34,69,95,29,66,17,87,90,13,14,79,81,89,94,9,70,71,33,73,49,50,67,4,64,7,28,77,84,8,56,53,18];
Decrypter.map_code_dRILLup = [8,62,53,73,92,59,29,4,55,22,61,78,38,95,68,76,44,25,54,64,32,67,41,36,57,42,40,79,0,11,21,48];
Decrypter.map_code_DrillUP = [62,8,29,61,32,44,88,85,4,55,31,71,28,76,84,80,66,92,58,39,81,51,26,33,65,78,52,57,53,27,72,30];
Decrypter.map_code_dRilLup = [30,2,64,25,3,44,7,79,84,70,21,32,75,60,31,91,94,69,46,68,0,73,28,52,47,90,13,24,97,55,85,26];
Decrypter.map_code_dRiLLUp = [83,0,94,33,7,18,29,14,22,40,74,32,64,2,43,34,36,37,17,68,19,48,57,59,41,11,53,78,38,66,4,88];
Decrypter.map_code_drILluP = [88,81,46,66,65,27,20,35,13,99,40,92,63,19,91,21,57,93,25,6,96,71,22,86,43,53,30,8,77,79,18,82];
Decrypter.map_code_DriLLUp = [35,6,58,99,62,7,54,75,30,41,38,21,43,42,2,13,95,18,53,19,28,37,55,79,29,26,80,31,52,93,9,64];
Decrypter.map_code_DRILluP = [48,95,63,30,80,41,50,76,77,0,16,44,39,26,47,29,87,24,79,96,3,12,10,38,66,8,71,91,27,17,34,62];
Decrypter.map_code_Drillup = [52,95,54,36,67,71,3,97,2,32,46,61,28,49,33,13,11,77,93,98,37,63,12,29,17,76,84,64,68,74,18,59];
Decrypter.map_code_dRiLLup = [65,82,61,18,27,13,36,67,22,85,7,75,3,74,21,19,17,99,58,1,83,53,77,46,66,14,97,76,37,5,57,60];
Decrypter.map_code_drIlLUp = [76,6,31,49,25,94,50,17,11,71,54,20,68,56,78,28,4,53,87,64,77,96,39,48,41,99,18,5,2,65,60,24];
Decrypter.map_code_drilLuP = [75,88,0,33,44,58,87,78,48,85,12,89,49,97,95,19,62,42,5,54,81,53,51,11,92,50,46,86,35,22,52,66];
Decrypter.map_code_dRiLluP = [36,23,64,39,37,33,74,87,61,85,31,48,35,2,53,17,22,89,71,77,11,21,25,45,32,75,66,41,9,54,51,78];
Decrypter.map_code_DRilluP = [29,35,17,70,19,94,14,92,91,85,49,26,6,27,44,60,83,81,77,47,2,25,5,69,90,75,82,34,31,63,54,20];
Decrypter.map_code_DrILLuP = [19,17,2,83,51,77,64,39,84,61,76,93,12,27,31,50,79,18,5,94,9,48,91,65,96,47,36,1,26,23,38,35];
Decrypter.map_code_dRillup = [79,33,38,8,63,29,13,90,72,74,56,71,44,16,99,23,22,24,42,36,93,40,41,89,78,94,45,92,3,52,91,82];
Decrypter.map_code_drILLup = [80,21,96,68,84,43,27,95,64,56,12,5,3,75,59,76,44,45,55,61,88,72,83,20,99,78,37,41,63,57,23,26];
Decrypter.map_code_DriLlup = [98,45,16,49,83,15,24,31,41,8,58,62,95,39,87,77,28,35,55,97,85,68,74,60,71,48,26,89,46,78,96,76];
Decrypter.map_code_DRilLup = [49,77,61,38,94,66,43,25,45,14,24,22,62,64,1,31,18,86,91,33,98,37,48,82,36,29,8,69,27,30,99,19];
Decrypter.map_code_dRILlup = [62,42,85,8,40,17,84,79,9,71,11,53,69,10,30,41,63,3,65,35,74,38,94,1,0,47,18,72,92,34,86,52];
Decrypter.map_code_dRiLlup = [6,65,34,62,47,21,82,32,14,30,23,43,11,79,27,51,24,85,78,33,25,96,67,28,94,38,17,66,68,8,55,9];
Decrypter.map_code_DriLluP = [95,92,55,25,57,17,76,10,9,91,61,42,14,80,13,29,45,46,52,49,82,41,62,98,81,24,19,50,93,84,72,53];
Decrypter.map_code_drilLUp = [84,75,6,10,89,4,85,71,93,37,81,32,8,29,56,23,98,95,22,44,17,90,26,18,27,21,88,2,11,49,83,30];
Decrypter.map_code_DRIllup = [95,12,90,82,77,74,25,98,17,46,94,87,21,89,81,59,28,52,24,30,11,83,84,60,99,48,66,34,72,91,5,20];
Decrypter.map_code_drILLuP = [15,29,88,73,48,47,23,74,97,32,86,36,41,20,46,13,72,0,92,65,14,49,98,43,17,79,42,2,75,28,9,53];
Decrypter.map_code_DriLLuP = [0,62,80,85,3,54,21,91,33,53,44,93,96,32,16,92,8,66,64,73,36,23,45,65,19,18,95,89,70,98,87,28];
Decrypter.map_code_driLluP = [93,98,6,65,24,36,92,16,8,13,83,4,54,33,3,79,67,23,7,57,14,58,87,68,20,30,34,38,77,0,31,28];
Decrypter.map_code_drIlluP = [20,55,72,0,48,46,30,28,27,88,4,78,15,36,54,34,75,71,58,68,86,56,83,38,7,2,21,19,90,67,97,3];
Decrypter.map_code_DrIlluP = [50,14,15,83,81,24,11,7,44,18,26,75,13,62,47,2,30,52,96,90,76,94,86,27,16,12,41,33,29,34,38,28];
Decrypter.map_code_drillUp = [13,92,64,25,85,77,10,55,93,96,7,74,51,84,88,46,61,36,83,30,91,22,5,98,52,81,1,67,20,58,4,56];
Decrypter.map_code_DRILlup = [49,22,15,36,67,13,94,96,25,4,39,75,9,1,59,47,66,10,97,18,88,17,34,93,95,21,50,98,56,65,61,72];
Decrypter.map_code_driLlUp = [50,25,47,9,53,29,76,26,79,21,51,99,46,40,75,11,83,5,37,33,64,80,18,6,82,23,56,94,78,19,88,71];
Decrypter.map_code_DRiLlUp = [16,20,78,33,59,44,39,11,35,43,0,60,54,92,21,7,6,27,32,28,46,70,13,88,75,53,85,19,74,93,79,26];
Decrypter.map_code_DRIlLUp = [4,27,64,93,35,91,90,55,33,98,43,89,63,95,53,32,50,71,20,11,54,67,40,5,52,94,44,31,99,85,42,75];
Decrypter.map_code_DRiLLup = [25,82,33,15,21,98,31,49,56,94,69,59,27,6,90,18,0,87,54,85,40,9,47,7,61,93,97,86,83,38,64,2];
Decrypter.map_code_DriLLup = [80,62,38,37,64,50,84,2,69,95,85,32,6,1,10,83,82,63,9,29,86,24,22,15,71,96,77,43,7,27,76,90];
Decrypter.map_code_driLLuP = [17,81,49,67,34,71,44,5,56,46,94,93,32,1,45,3,59,69,37,99,64,60,65,13,66,36,19,89,78,55,38,26];
Decrypter.map_code_drILlup = [80,42,65,73,34,51,23,46,48,37,24,18,7,52,32,31,14,17,87,35,71,54,44,49,11,78,22,13,58,88,29,93];
Decrypter.map_code_drillup = [71,70,21,73,92,33,54,28,11,62,23,14,95,8,82,43,79,76,37,56,68,18,80,13,77,41,58,61,31,57,3,17];
Decrypter.map_code_DrilLUp = [37,89,61,10,20,67,21,6,59,93,71,13,76,78,48,64,83,31,34,72,26,3,27,1,88,35,86,66,45,33,62,94];
Decrypter.map_code_DRilLuP = [12,87,48,70,58,45,22,35,88,97,1,75,9,59,89,56,43,25,51,98,71,54,34,67,33,82,61,18,19,83,2,69];
Decrypter.map_code_DRillUP = [2,12,84,20,81,82,9,10,75,16,64,1,49,52,87,51,97,57,69,29,22,27,99,6,58,89,30,95,45,21,65,13];
Decrypter.map_code_drILLUp = [8,76,41,29,68,42,21,13,44,5,88,98,62,27,52,58,15,1,75,85,59,84,99,18,19,70,24,55,43,35,71,25];
Decrypter.map_code_DrILLup = [47,80,44,12,28,90,29,2,68,9,10,21,43,0,15,46,52,96,26,77,76,34,31,40,27,65,16,71,74,19,42,82];
Decrypter.n_drIlLup = function(drillup, DRILLUp){ return parseInt(this.code_map_drillup[this.map_code_drILluP[drillup+13]], 16); }
Decrypter.n_drillUP = function(drilLuP, driLluP){ return parseInt(this.code_map_drillup[this.map_code_drillUP[drilLuP+14]], 16); }
Decrypter.n_DriLLUP = function(drILlup, DriLLup){ return parseInt(this.code_map_drillup[this.map_code_drilLUP[drILlup+15]], 16); }
Decrypter.n_drILLUp = function(DRILluP, dRiLlUP){ return parseInt(this.code_map_drillup[this.map_code_DriLLUp[DRILluP+3]], 16); }
Decrypter.n_DrILLUp = function(drilLUp, dRIlLUP){ return parseInt(this.code_map_drillup[this.map_code_DRiLlup[drilLUp+5]], 16); }
Decrypter.n_DrilluP = function(DrIlLUp, DriLLup){ return parseInt(this.code_map_drillup[this.map_code_DRiLLUp[DrIlLUp+13]], 16); }
Decrypter.n_DrIlLUP = function(dRILLup, DrILLup){ return parseInt(this.code_map_drillup[this.map_code_DriLLUp[dRILLup+8]], 16); }
Decrypter.n_drILLUP = function(dRIllUP, drIllUp){ return parseInt(this.code_map_drillup[this.map_code_DriLlup[dRIllUP+5]], 16); }
Decrypter.n_dRiLluP = function(dRIlLup, DrILlup){ return parseInt(this.code_map_drillup[this.map_code_DrILlUp[dRIlLup+6]], 16); }
Decrypter.n_DRIllUP = function(drILLup, dRILLUP){ return parseInt(this.code_map_drillup[this.map_code_DRILlUP[drILLup+3]], 16); }
Decrypter.n_DrillUp = function(driLLUP, drILlup){ return parseInt(this.code_map_drillup[this.map_code_dRIllup[driLLUP+9]], 16); }
Decrypter.n_DRILlup = function(DrILlUp, dRIllup){ return parseInt(this.code_map_drillup[this.map_code_DRILlUP[DrILlUp+0]], 16); }
Decrypter.n_dRilLuP = function(DRillup, DrIllup){ return parseInt(this.code_map_drillup[this.map_code_drIllUP[DRillup+5]], 16); }
Decrypter.n_DRiLlup = function(DrIlLup, drIlLuP){ return parseInt(this.code_map_drillup[this.map_code_DrILlUp[DrIlLup+3]], 16); }
Decrypter.n_DRIlLuP = function(drIlLuP, DriLlup){ return parseInt(this.code_map_drillup[this.map_code_DriLluP[drIlLuP+2]], 16); }
Decrypter.n_drILLup = function(dRILLup, DrIlLuP){ return parseInt(this.code_map_drillup[this.map_code_DRiLlUP[dRILLup+10]], 16); }
Decrypter.n_DrILLup = function(drilLUp, driLlup){ return parseInt(this.code_map_drillup[this.map_code_driLLuP[drilLUp+5]], 16); }
Decrypter.n_drillup = function(drIlluP, dRILLUp){ return parseInt(this.code_map_drillup[this.map_code_DRillUP[drIlluP+13]], 16); }
Decrypter.n_dRIlLUp = function(drillup, DRILlUP){ return parseInt(this.code_map_drillup[this.map_code_dRiLlup[drillup+2]], 16); }
Decrypter.n_DrILlUP = function(DRilLUp, dRILluP){ return parseInt(this.code_map_drillup[this.map_code_DrILlUp[DRilLUp+3]], 16); }
Decrypter.n_dRILLuP = function(DRIlluP, DriLLuP){ return parseInt(this.code_map_drillup[this.map_code_drIlLUP[DRIlluP+13]], 16); }
Decrypter.n_DrILluP = function(DriLluP, drIlLUp){ return parseInt(this.code_map_drillup[this.map_code_DRillUP[DriLluP+1]], 16); }
Decrypter.n_driLLUp = function(dRIlLUP, DRillUp){ return parseInt(this.code_map_drillup[this.map_code_drIllUp[dRIlLUP+2]], 16); }
Decrypter.n_dRillUp = function(DRIllUp, DRilluP){ return parseInt(this.code_map_drillup[this.map_code_DrILlup[DRIllUp+9]], 16); }
Decrypter.n_driLLup = function(dRilLup, DRIlLUp){ return parseInt(this.code_map_drillup[this.map_code_dRiLLUP[dRilLup+13]], 16); }
Decrypter.n_driLlUp = function(DriLLup, DriLlUP){ return parseInt(this.code_map_drillup[this.map_code_dRIlLup[DriLLup+0]], 16); }
Decrypter.n_DRiLluP = function(DRILLuP, DriLLup){ return parseInt(this.code_map_drillup[this.map_code_DRiLlUp[DRILLuP+14]], 16); }
Decrypter.n_DriLLup = function(driLLUp, DrIlLUp){ return parseInt(this.code_map_drillup[this.map_code_DRilLUp[driLLUp+5]], 16); }
Decrypter.n_DrILLuP = function(DRILlup, DRilLUP){ return parseInt(this.code_map_drillup[this.map_code_DRIlluP[DRILlup+14]], 16); }
Decrypter.n_dRILluP = function(DrillUP, dRIlLUP){ return parseInt(this.code_map_drillup[this.map_code_dRiLLUP[DrillUP+7]], 16); }
Decrypter.n_driLlup = function(DriLLUP, dRILluP){ return parseInt(this.code_map_drillup[this.map_code_Drillup[DriLLUP+8]], 16); }
Decrypter.n_DRILlUP = function(DRilluP, drIlluP){ return parseInt(this.code_map_drillup[this.map_code_drIlLUp[DRilluP+8]], 16); }
Decrypter.n_drILlUp = function(driLlUP, DrILLuP){ return parseInt(this.code_map_drillup[this.map_code_dRIlLUp[driLlUP+3]], 16); }
Decrypter.n_DRILLup = function(DRiLLUP, DRILLuP){ return parseInt(this.code_map_drillup[this.map_code_drILlUP[DRiLLUP+10]], 16); }
Decrypter.n_drilluP = function(drilLUp, DrIlLUP){ return parseInt(this.code_map_drillup[this.map_code_dRiLLUp[drilLUp+15]], 16); }
Decrypter.n_DrILlup = function(dRILLuP, dRilLuP){ return parseInt(this.code_map_drillup[this.map_code_DRIlLuP[dRILLuP+2]], 16); }
Decrypter.n_dRiLLUP = function(DRILLUp, drIlLuP){ return parseInt(this.code_map_drillup[this.map_code_dRilLuP[DRILLUp+13]], 16); }
Decrypter.n_DrILLUP = function(driLLup, DrilluP){ return parseInt(this.code_map_drillup[this.map_code_dRILLup[driLLup+3]], 16); }
Decrypter.n_drILlUP = function(DRiLLUP, DriLLup){ return parseInt(this.code_map_drillup[this.map_code_DRiLlUp[DRiLLUP+4]], 16); }
Decrypter.n_DRiLlUP = function(dRIlLUP, drILLup){ return parseInt(this.code_map_drillup[this.map_code_DriLlUp[dRIlLUP+3]], 16); }
Decrypter.n_drillUp = function(DRilLUp, dRILlUp){ return parseInt(this.code_map_drillup[this.map_code_driLlup[DRilLUp+12]], 16); }
Decrypter.n_dRILlUP = function(DRILLup, DRiLLup){ return parseInt(this.code_map_drillup[this.map_code_drILlup[DRILLup+10]], 16); }
Decrypter.n_dRILlup = function(driLluP, DrILLUp){ return parseInt(this.code_map_drillup[this.map_code_dRiLLUP[driLluP+2]], 16); }
Decrypter.n_drILluP = function(DrIlLUP, dRILLUP){ return parseInt(this.code_map_drillup[this.map_code_DriLlup[DrIlLUP+10]], 16); }
Decrypter.n_dRIlLup = function(driLlUp, DRILLup){ return parseInt(this.code_map_drillup[this.map_code_dRilLuP[driLlUp+4]], 16); }
Decrypter.n_dRilLUp = function(DRIllup, DriLlUP){ return parseInt(this.code_map_drillup[this.map_code_DRIlLUP[DRIllup+4]], 16); }
Decrypter.n_dRiLlUP = function(drILLUP, drILlup){ return parseInt(this.code_map_drillup[this.map_code_DrILlUp[drILLUP+7]], 16); }
Decrypter.n_drIllup = function(DriLLUP, DrILluP){ return parseInt(this.code_map_drillup[this.map_code_dRillup[DriLLUP+9]], 16); }
Decrypter.n_dRIllUp = function(DRIllUP, DRilLup){ return parseInt(this.code_map_drillup[this.map_code_DriLlUP[DRIllUP+1]], 16); }
Decrypter.n_DRiLLuP = function(DRIlluP, DRIllup){ return parseInt(this.code_map_drillup[this.map_code_drILlUp[DRIlluP+5]], 16); }
Decrypter.n_dRILlUp = function(dRIllUp, drillup){ return parseInt(this.code_map_drillup[this.map_code_DRILlup[dRIllUp+9]], 16); }
Decrypter.n_dRILLUP = function(dRIlluP, driLluP){ return parseInt(this.code_map_drillup[this.map_code_drIllup[dRIlluP+15]], 16); }
Decrypter.n_DriLlup = function(dRiLluP, DrILlUP){ return parseInt(this.code_map_drillup[this.map_code_dRIllup[dRiLluP+15]], 16); }
Decrypter.n_dRIlluP = function(dRiLLUp, driLluP){ return parseInt(this.code_map_drillup[this.map_code_DRIlLuP[dRiLLUp+4]], 16); }
Decrypter.n_DriLLUp = function(DrILlup, DRiLlUp){ return parseInt(this.code_map_drillup[this.map_code_dRIllUp[DrILlup+4]], 16); }
Decrypter.n_dRilluP = function(DRIlLUP, DRILlUP){ return parseInt(this.code_map_drillup[this.map_code_dRilLUP[DRIlLUP+10]], 16); }
Decrypter.n_dRIlLuP = function(dRilLuP, DrilLuP){ return parseInt(this.code_map_drillup[this.map_code_dRiLluP[dRilLuP+11]], 16); }
Decrypter.n_drIllUP = function(DrILlup, dRILLuP){ return parseInt(this.code_map_drillup[this.map_code_dRILLUp[DrILlup+8]], 16); }
Decrypter.n_DriLLuP = function(drILLup, drIllup){ return parseInt(this.code_map_drillup[this.map_code_dRIlLup[drILLup+12]], 16); }
Decrypter.n_dRIllup = function(DRiLlUP, dRIllup){ return parseInt(this.code_map_drillup[this.map_code_DrILlUp[DRiLlUP+11]], 16); }
Decrypter.n_DRillup = function(dRIlluP, DrilLUp){ return parseInt(this.code_map_drillup[this.map_code_drilluP[dRIlluP+8]], 16); }
Decrypter.n_dRilLup = function(drIlLuP, DRIlLUp){ return parseInt(this.code_map_drillup[this.map_code_DRillUP[drIlLuP+7]], 16); }
Decrypter.n_dRIllUP = function(DriLlUp, DrILlUp){ return parseInt(this.code_map_drillup[this.map_code_drIllUp[DriLlUp+6]], 16); }
Decrypter.n_driLLUP = function(DrILLup, DrIlLUP){ return parseInt(this.code_map_drillup[this.map_code_DrIlLUp[DrILLup+12]], 16); }
Decrypter.n_DRIlLup = function(dRilLUp, DrIlLUP){ return parseInt(this.code_map_drillup[this.map_code_drILLUp[dRilLUp+15]], 16); }
Decrypter.n_drilLUp = function(dRiLLuP, DRilLuP){ return parseInt(this.code_map_drillup[this.map_code_drILlUp[dRiLLuP+15]], 16); }
Decrypter.n_DRilLUP = function(dRilLup, dRILLUp){ return parseInt(this.code_map_drillup[this.map_code_DRillup[dRilLup+3]], 16); }
Decrypter.n_drilLuP = function(DriLLup, DRILLup){ return parseInt(this.code_map_drillup[this.map_code_dRiLLuP[DriLLup+1]], 16); }
Decrypter.n_DRILLUp = function(dRiLlUp, dRillUp){ return parseInt(this.code_map_drillup[this.map_code_DRIlLuP[dRiLlUp+6]], 16); }
Decrypter.n_drilLup = function(drilLuP, Drillup){ return parseInt(this.code_map_drillup[this.map_code_DRilLup[drilLuP+3]], 16); }
Decrypter.n_DrIllUp = function(DRilluP, dRILlup){ return parseInt(this.code_map_drillup[this.map_code_DriLLuP[DRilluP+5]], 16); }
Decrypter.n_DRILLuP = function(dRIlLUp, DRILlUP){ return parseInt(this.code_map_drillup[this.map_code_driLLUP[dRIlLUp+2]], 16); }
Decrypter.n_Drillup = function(drILlUp, dRIllUP){ return parseInt(this.code_map_drillup[this.map_code_DRillup[drILlUp+11]], 16); }
Decrypter.n_DRILlUp = function(drIllUp, dRIlLuP){ return parseInt(this.code_map_drillup[this.map_code_dRILLUp[drIllUp+0]], 16); }
Decrypter.n_DrIlLup = function(driLlUp, dRilLuP){ return parseInt(this.code_map_drillup[this.map_code_driLLUp[driLlUp+2]], 16); }
Decrypter.n_DRillUp = function(DrIllup, drIllUP){ return parseInt(this.code_map_drillup[this.map_code_DriLlup[DrIllup+10]], 16); }
Decrypter.n_dRILLup = function(DrILlUp, DRIllUP){ return parseInt(this.code_map_drillup[this.map_code_DRilLUP[DrILlUp+3]], 16); }
Decrypter.n_drIlLUP = function(drIllUP, DrIlLUP){ return parseInt(this.code_map_drillup[this.map_code_dRILluP[drIllUP+1]], 16); }
Decrypter.n_DriLlUp = function(DRillUP, driLlup){ return parseInt(this.code_map_drillup[this.map_code_DRilLup[DRillUP+2]], 16); }
Decrypter.n_drIlluP = function(dRIlLup, DrIlLuP){ return parseInt(this.code_map_drillup[this.map_code_dRILLUp[dRIlLup+2]], 16); }
Decrypter.n_driLlUP = function(dRiLlup, dRillup){ return parseInt(this.code_map_drillup[this.map_code_drilLUp[dRiLlup+5]], 16); }
Decrypter.n_dRillup = function(Drillup, dRILLup){ return parseInt(this.code_map_drillup[this.map_code_DrIlLup[Drillup+7]], 16); }
Decrypter.n_DrIlLuP = function(driLlUP, drILlUp){ return parseInt(this.code_map_drillup[this.map_code_DrIlLuP[driLlUP+1]], 16); }
Decrypter.n_drIllUp = function(drILLUp, DRILlUP){ return parseInt(this.code_map_drillup[this.map_code_DRilLUp[drILLUp+15]], 16); }
Decrypter.n_DRilLUp = function(DrILlUP, dRIlluP){ return parseInt(this.code_map_drillup[this.map_code_drIlLUp[DrILlUP+2]], 16); }
Decrypter.n_DrilLup = function(DrilLUp, DRiLlUP){ return parseInt(this.code_map_drillup[this.map_code_DRILLUp[DrilLUp+0]], 16); }
Decrypter.n_DRIlLUp = function(dRiLLup, DrIlLuP){ return parseInt(this.code_map_drillup[this.map_code_DrILlup[dRiLLup+9]], 16); }
Decrypter.n_DrIllUP = function(DRiLluP, DRilLuP){ return parseInt(this.code_map_drillup[this.map_code_dRiLlUP[DRiLluP+7]], 16); }
Decrypter.n_dRiLLUp = function(drILlUP, DRILLuP){ return parseInt(this.code_map_drillup[this.map_code_DRillUp[drILlUP+15]], 16); }
Decrypter.n_dRIlLUP = function(drIlLup, dRIlLUp){ return parseInt(this.code_map_drillup[this.map_code_drILlUP[drIlLup+10]], 16); }
Decrypter.n_DrILlUp = function(drILLUP, DRiLLUp){ return parseInt(this.code_map_drillup[this.map_code_DrIlLuP[drILLUP+9]], 16); }
Decrypter.n_DrIlLUp = function(DriLLUp, DRiLLuP){ return parseInt(this.code_map_drillup[this.map_code_dRiLlUP[DriLLUp+9]], 16); }
Decrypter.n_DRiLLup = function(dRiLlUp, dRilLUp){ return parseInt(this.code_map_drillup[this.map_code_DRilLuP[dRiLlUp+5]], 16); }
Decrypter.n_DrilLUP = function(DRILLUp, DRiLLup){ return parseInt(this.code_map_drillup[this.map_code_DrillUp[DRILLUp+0]], 16); }
Decrypter.n_DRIlLUP = function(driLLuP, drillup){ return parseInt(this.code_map_drillup[this.map_code_dRIlLuP[driLLuP+14]], 16); }
Decrypter.n_DRilLup = function(DrilLup, DRillUP){ return parseInt(this.code_map_drillup[this.map_code_dRILLup[DrilLup+12]], 16); }
Decrypter.n_DRIllup = function(DrillUP, DriLLUP){ return parseInt(this.code_map_drillup[this.map_code_drIlLUp[DrillUP+11]], 16); }
Decrypter.n_driLluP = function(dRIlLup, DRILlUp){ return parseInt(this.code_map_drillup[this.map_code_DRillUP[dRIlLup+9]], 16); }
Decrypter.n_drILLuP = function(driLluP, DrIlLUp){ return parseInt(this.code_map_drillup[this.map_code_DRILLup[driLluP+2]], 16); }
Decrypter.n_drilLUP = function(drIllUp, DRiLlup){ return parseInt(this.code_map_drillup[this.map_code_DRIlluP[drIllUp+11]], 16); }
Decrypter.n_DrIllup = function(dRillUP, DrIllUP){ return parseInt(this.code_map_drillup[this.map_code_dRIlLup[dRillUP+15]], 16); }
Decrypter.n_driLLuP = function(drillUP, DriLLuP){ return parseInt(this.code_map_drillup[this.map_code_DRIllup[drillUP+7]], 16); }
Decrypter.n_DrIlluP = function(DRiLlUP, DRIllup){ return parseInt(this.code_map_drillup[this.map_code_dRILlUp[DRiLlUP+13]], 16); }
Decrypter.n_DrilLuP = function(drilLup, dRILluP){ return parseInt(this.code_map_drillup[this.map_code_drIlLUP[drilLup+11]], 16); }
Decrypter.n_DRILluP = function(dRilLUp, DrillUP){ return parseInt(this.code_map_drillup[this.map_code_drILLUp[dRilLUp+7]], 16); }
Decrypter.n_drIlLuP = function(DrIllup, drillUP){ return parseInt(this.code_map_drillup[this.map_code_DrILlUP[DrIllup+5]], 16); }
Decrypter.n_dRiLLup = function(drILlUP, dRIllUP){ return parseInt(this.code_map_drillup[this.map_code_DrilluP[drILlUP+1]], 16); }
Decrypter.n_DrilLUp = function(dRiLLUp, driLlUp){ return parseInt(this.code_map_drillup[this.map_code_DrIlLuP[dRiLLUp+3]], 16); }
Decrypter.n_dRiLLuP = function(drIlluP, DriLLUP){ return parseInt(this.code_map_drillup[this.map_code_DriLLUp[drIlluP+3]], 16); }
Decrypter.n_DRiLlUp = function(DRiLlUp, drillup){ return parseInt(this.code_map_drillup[this.map_code_DRIlLup[DRiLlUp+3]], 16); }
Decrypter.n_dRILLUp = function(drilLUP, DRiLlUP){ return parseInt(this.code_map_drillup[this.map_code_dRiLluP[drilLUP+6]], 16); }
Decrypter.n_dRillUP = function(DriLLup, dRillUp){ return parseInt(this.code_map_drillup[this.map_code_DrilLUP[DriLLup+5]], 16); }
Decrypter.n_DRiLLUP = function(dRILLUp, DRIllUP){ return parseInt(this.code_map_drillup[this.map_code_drillUp[dRILLUp+8]], 16); }
Decrypter.n_drILlup = function(DrILLUp, DrILLup){ return parseInt(this.code_map_drillup[this.map_code_DrilLUp[DrILLUp+13]], 16); }
Decrypter.n_DriLluP = function(DRiLLuP, DRIlLup){ return parseInt(this.code_map_drillup[this.map_code_DrIllUP[DRiLLuP+6]], 16); }
Decrypter.n_dRiLlUp = function(DrIlLUp, dRillup){ return parseInt(this.code_map_drillup[this.map_code_drIlLup[DrIlLUp+13]], 16); }
Decrypter.n_dRiLlup = function(DrIllup, dRillUp){ return parseInt(this.code_map_drillup[this.map_code_DRIllUp[DrIllup+1]], 16); }
Decrypter.n_DRiLLUp = function(DRILlUP, DRillup){ return parseInt(this.code_map_drillup[this.map_code_dRiLLup[DRILlUP+15]], 16); }
Decrypter.n_drIlLUp = function(DriLlUP, DrILluP){ return parseInt(this.code_map_drillup[this.map_code_DrIlLup[DriLlUP+8]], 16); }
Decrypter.n_dRilLUP = function(dRillup, dRilLUP){ return parseInt(this.code_map_drillup[this.map_code_DrILluP[dRillup+0]], 16); }
Decrypter.n_DriLlUP = function(DRIlLUp, DRiLLuP){ return parseInt(this.code_map_drillup[this.map_code_drilLUp[DRIlLUp+7]], 16); }
Decrypter.n_DRIllUp = function(DRIllUP, drILLUp){ return parseInt(this.code_map_drillup[this.map_code_drILlup[DRIllUP+13]], 16); }
Decrypter.n_DRilLuP = function(driLLup, Drillup){ return parseInt(this.code_map_drillup[this.map_code_DRilLUp[driLLup+5]], 16); }
Decrypter.n_DRilluP = function(dRiLlUp, dRIllUp){ return parseInt(this.code_map_drillup[this.map_code_DrilLUP[dRiLlUp+11]], 16); }
Decrypter.n_DRIlluP = function(DRILLuP, driLLup){ return parseInt(this.code_map_drillup[this.map_code_DrILLUp[DRILLuP+15]], 16); }
Decrypter.n_DRillUP = function(DRilLUp, driLLuP){ return parseInt(this.code_map_drillup[this.map_code_dRILLuP[DRilLUp+11]], 16); }
Decrypter.n_DrillUP = function(dRIlLUP, drilLuP){ return parseInt(this.code_map_drillup[this.map_code_DRillup[dRIlLUP+3]], 16); }
Decrypter.N_drillup = 24;
Decrypter.N_Drillup = 15;
Decrypter.N_dRillup = 4;
Decrypter.N_DRillup = 2;
Decrypter.N_drIllup = 28;
Decrypter.N_DrIllup = 1;
Decrypter.N_dRIllup = 2;
Decrypter.N_DRIllup = 18;
Decrypter.N_driLlup = 24;
Decrypter.N_DriLlup = 6;
Decrypter.N_dRiLlup = 21;
Decrypter.N_DRiLlup = 11;
Decrypter.N_drILlup = 9;
Decrypter.N_DrILlup = 20;
Decrypter.N_dRILlup = 5;
Decrypter.N_DRILlup = 11;
Decrypter.N_drilLup = 15;
Decrypter.N_DrilLup = 0;
Decrypter.N_dRilLup = 10;
Decrypter.N_DRilLup = 17;
Decrypter.N_drIlLup = 1;
Decrypter.N_DrIlLup = 8;
Decrypter.N_dRIlLup = 6;
Decrypter.N_DRIlLup = 9;
Decrypter.N_driLLup = 6;
Decrypter.N_DriLLup = 18;
Decrypter.N_dRiLLup = 27;
Decrypter.N_DRiLLup = 14;
Decrypter.N_drILLup = 19;
Decrypter.N_DrILLup = 15;
Decrypter.N_dRILLup = 4;
Decrypter.N_DRILLup = 28;
Decrypter.N_drillUp = 9;
Decrypter.N_DrillUp = 15;
Decrypter.N_dRillUp = 22;
Decrypter.N_DRillUp = 17;
Decrypter.N_drIllUp = 19;
Decrypter.N_DrIllUp = 7;
Decrypter.N_dRIllUp = 6;
Decrypter.N_DRIllUp = 29;
Decrypter.N_driLlUp = 4;
Decrypter.N_DriLlUp = 16;
Decrypter.N_dRiLlUp = 27;
Decrypter.N_DRiLlUp = 3;
Decrypter.N_drILlUp = 15;
Decrypter.N_DrILlUp = 14;
Decrypter.N_dRILlUp = 5;
Decrypter.N_DRILlUp = 14;
Decrypter.N_drilLUp = 27;
Decrypter.N_DrilLUp = 27;
Decrypter.N_dRilLUp = 25;
Decrypter.N_DRilLUp = 10;
Decrypter.N_drIlLUp = 10;
Decrypter.N_DrIlLUp = 17;
Decrypter.N_dRIlLUp = 10;
Decrypter.N_DRIlLUp = 26;
Decrypter.N_driLLUp = 7;
Decrypter.N_DriLLUp = 5;
Decrypter.N_dRiLLUp = 12;
Decrypter.N_DRiLLUp = 13;
Decrypter.N_drILLUp = 28;
Decrypter.N_DrILLUp = 16;
Decrypter.N_dRILLUp = 11;
Decrypter.N_DRILLUp = 1;
Decrypter.N_drilluP = 10;
Decrypter.N_DrilluP = 19;
Decrypter.N_dRilluP = 1;
Decrypter.N_DRilluP = 28;
Decrypter.N_drIlluP = 4;
Decrypter.N_DrIlluP = 19;
Decrypter.N_dRIlluP = 0;
Decrypter.N_DRIlluP = 4;
Decrypter.N_driLluP = 3;
Decrypter.N_DriLluP = 13;
Decrypter.N_dRiLluP = 10;
Decrypter.N_DRiLluP = 18;
Decrypter.N_drILluP = 20;
Decrypter.N_DrILluP = 0;
Decrypter.N_dRILluP = 9;
Decrypter.N_DRILluP = 1;
Decrypter.N_drilLuP = 24;
Decrypter.N_DrilLuP = 18;
Decrypter.N_dRilLuP = 23;
Decrypter.N_DRilLuP = 26;
Decrypter.N_drIlLuP = 9;
Decrypter.N_DrIlLuP = 20;
Decrypter.N_dRIlLuP = 25;
Decrypter.N_DRIlLuP = 0;
Decrypter.N_driLLuP = 21;
Decrypter.N_DriLLuP = 2;
Decrypter.N_dRiLLuP = 12;
Decrypter.N_DRiLLuP = 22;
Decrypter.N_drILLuP = 22;
Decrypter.N_DrILLuP = 13;
Decrypter.N_dRILLuP = 0;
Decrypter.N_DRILLuP = 25;
Decrypter.N_drillUP = 27;
Decrypter.N_DrillUP = 13;
Decrypter.N_dRillUP = 10;
Decrypter.N_DRillUP = 10;
Decrypter.f_drILlUp =  function(dRILLUp,DRilLup){if( Decrypter.N_driLlUp == Decrypter.N_DRiLlUp && Decrypter.N_DRIllUp == Decrypter.N_DRILluP && Decrypter.N_DrilLup == Decrypter.N_DrILluP ) {var byteArray = new Uint8Array(DRilLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drillUp(i,44);dRILLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRillUP =  function(driLlUP,Drillup){if( Decrypter.N_drIlLUp == Decrypter.N_dRillUP && Decrypter.N_DRILLUp == Decrypter.N_DRILluP && Decrypter.N_dRIllup == Decrypter.N_driLLUp ) {var byteArray = new Uint8Array(Drillup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_driLlup(i,99);driLlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRiLLuP =  function(drillup,DRillUp){if( Decrypter.N_dRILluP == Decrypter.N_DrILLuP && Decrypter.N_dRIllup == Decrypter.N_dRiLLuP && Decrypter.N_drIlLup == Decrypter.N_dRilluP ) {var byteArray = new Uint8Array(DRillUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRiLlUp(i,91);drillup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRIlluP =  function(driLlUp,DrILlup){if( Decrypter.N_DriLlUp == Decrypter.N_dRilLuP && Decrypter.N_DrILlup == Decrypter.N_DrIlLuP && Decrypter.N_dRIlluP == Decrypter.N_DrILluP ) {var byteArray = new Uint8Array(DrILlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILlUP(i,70);driLlUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DriLluP =  function(DRIlLup,drIllUP){if( Decrypter.N_DrilLUp == Decrypter.N_dRIlLuP && Decrypter.N_dRIllup == Decrypter.N_DriLLuP && Decrypter.N_driLLuP == Decrypter.N_dRiLLuP ) {var byteArray = new Uint8Array(drIllUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILlUP(i,73);DRIlLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_drIlluP =  function(dRIlLUP,dRilluP){if( Decrypter.N_drIlLUp == Decrypter.N_DRIlLuP && Decrypter.N_dRIllUp == Decrypter.N_DrILLuP && Decrypter.N_driLLUp == Decrypter.N_driLLuP ) {var byteArray = new Uint8Array(dRilluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLlUP(i,68);dRIlLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrillUP =  function(DriLLUP,DRILluP){if( Decrypter.N_DRiLLup == Decrypter.N_DrILlUp && Decrypter.N_drilluP == Decrypter.N_DRillUP && Decrypter.N_dRIllup == Decrypter.N_dRilLUp ) {var byteArray = new Uint8Array(DRILluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLLuP(i,97);DriLLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRIlluP =  function(drIlLUP,DRiLlup){if( Decrypter.N_drillup == Decrypter.N_DRILLup && Decrypter.N_drillup == Decrypter.N_drilLuP && Decrypter.N_dRIlLUp == Decrypter.N_dRillUP ) {var byteArray = new Uint8Array(DRiLlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILluP(i,71);drIlLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_driLLuP =  function(DrILLUP,dRiLluP){if( Decrypter.N_dRIlLuP == Decrypter.N_DRIlLuP && Decrypter.N_dRiLlup == Decrypter.N_drIlluP && Decrypter.N_dRIllUp == Decrypter.N_DRILLUp ) {var byteArray = new Uint8Array(dRiLluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILlUP(i,88);DrILLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drILLUp =  function(drilLUp,drIllUP){if( Decrypter.N_DrILLup == Decrypter.N_DRILLup && Decrypter.N_dRilluP == Decrypter.N_dRiLLuP && Decrypter.N_drilLup == Decrypter.N_driLLup ) {var byteArray = new Uint8Array(drIllUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrilLuP(i,60);drilLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRiLLUp =  function(DRillup,drILlUP){if( Decrypter.N_DRIlLup == Decrypter.N_DrIllUp && Decrypter.N_DrillUp == Decrypter.N_DriLLuP && Decrypter.N_DRillUp == Decrypter.N_drILluP ) {var byteArray = new Uint8Array(drILlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIlLUp(i,59);DRillup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DriLlup =  function(DrIlLUP,DrilLup){if( Decrypter.N_DrilLUp == Decrypter.N_drillUP && Decrypter.N_drILLup == Decrypter.N_drilLuP && Decrypter.N_dRilLUp == Decrypter.N_DRILLuP ) {var byteArray = new Uint8Array(DrilLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRILLUP(i,9);DrIlLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DriLLUp =  function(drIlLUP,dRiLLuP){if( Decrypter.N_drilLUp == Decrypter.N_drIlLuP && Decrypter.N_drILlup == Decrypter.N_DRIlLup && Decrypter.N_DrILLup == Decrypter.N_drILlUp ) {var byteArray = new Uint8Array(dRiLLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIlLuP(i,57);drIlLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drILLuP =  function(drILlUP,DrilLUp){if( Decrypter.N_dRIllUp == Decrypter.N_drIlLuP && Decrypter.N_DRilluP == Decrypter.N_drIlLuP && Decrypter.N_drIllup == Decrypter.N_DRiLlUp ) {var byteArray = new Uint8Array(DrilLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLlup(i,92);drILlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRiLlup =  function(DRILLUp,drIllUp){if( Decrypter.N_dRILLup == Decrypter.N_DRIlluP && Decrypter.N_dRILLup == Decrypter.N_DrILluP && Decrypter.N_dRiLlup == Decrypter.N_DrILlUp ) {var byteArray = new Uint8Array(drIllUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIlLUP(i,11);DRILLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRIlLup =  function(DriLlup,drilLUP){if( Decrypter.N_DriLLup == Decrypter.N_dRiLLUp && Decrypter.N_drILLup == Decrypter.N_DrilluP && Decrypter.N_DRilLUp == Decrypter.N_dRillUP ) {var byteArray = new Uint8Array(drilLUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRillUp(i,23);DriLlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrilLup =  function(DrIlLUp,dRilLuP){if( Decrypter.N_drILLUp == Decrypter.N_DrILLUp && Decrypter.N_DRilLup == Decrypter.N_DrIlLUp && Decrypter.N_driLlUp == Decrypter.N_drIlluP ) {var byteArray = new Uint8Array(dRilLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIlLUP(i,17);DrIlLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_driLLUp =  function(DriLLUp,DrILLup){if( Decrypter.N_DRiLluP == Decrypter.N_DrilLuP && Decrypter.N_Drillup == Decrypter.N_dRILLup && Decrypter.N_dRiLluP == Decrypter.N_dRillUP ) {var byteArray = new Uint8Array(DrILLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIlLuP(i,56);DriLLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_drIlLup =  function(driLlup,DriLLUP){if( Decrypter.N_DRIlLUp == Decrypter.N_DRilLuP && Decrypter.N_drILlup == Decrypter.N_dRILLUp && Decrypter.N_dRIllup == Decrypter.N_DrilLuP ) {var byteArray = new Uint8Array(DriLLUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIllUp(i,20);driLlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRIlLUp =  function(DrILLUp,DrILlup){if( Decrypter.N_DrILLUp == Decrypter.N_DriLluP && Decrypter.N_DRillUp == Decrypter.N_DrIlLUp && Decrypter.N_dRiLlUp == Decrypter.N_drillUP ) {var byteArray = new Uint8Array(DrILlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILLUP(i,54);DrILLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_driLLup =  function(DrILluP,drILLuP){if( Decrypter.N_DRiLLuP == Decrypter.N_drILLuP && Decrypter.N_Drillup == Decrypter.N_DrillUp && Decrypter.N_drIllup == Decrypter.N_DRIllup ) {var byteArray = new Uint8Array(drILLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRillUP(i,24);DrILluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRILLup =  function(dRilluP,dRilLuP){if( Decrypter.N_drILLUp == Decrypter.N_DrilLuP && Decrypter.N_dRIlLUp == Decrypter.N_DRILLuP && Decrypter.N_drilLUp == Decrypter.N_drillUP ) {var byteArray = new Uint8Array(dRilLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_driLlUp(i,31);dRilluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrillUp =  function(DrIlLUP,drIlluP){if( Decrypter.N_DrIlLup == Decrypter.N_dRIlLuP && Decrypter.N_DriLLup == Decrypter.N_DRIlLUp && Decrypter.N_dRiLlup == Decrypter.N_dRILLUp ) {var byteArray = new Uint8Array(drIlluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLlUp(i,33);DrIlLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_Drillup =  function(DrIllup,dRILLUP){if( Decrypter.N_DRillup == Decrypter.N_dRIllup && Decrypter.N_DrIllup == Decrypter.N_DRILLup && Decrypter.N_dRILlup == Decrypter.N_dRILlUp ) {var byteArray = new Uint8Array(dRILLUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drilLUP(i,1);DrIllup.setUint8(i, byteArray[i]);}}}
Decrypter.f_driLluP =  function(DRiLLup,dRIlLUP){if( Decrypter.N_DriLlUp == Decrypter.N_DRillUP && Decrypter.N_DRiLLup == Decrypter.N_DRILLup && Decrypter.N_DRIllup == Decrypter.N_dRIlLuP ) {var byteArray = new Uint8Array(dRIlLUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRILLup(i,72);DRiLLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrIlLuP =  function(DrilLUp,dRiLLup){if( Decrypter.N_Drillup == Decrypter.N_drilLup && Decrypter.N_dRILLup == Decrypter.N_drIlluP && Decrypter.N_dRIllup == Decrypter.N_dRILlup ) {var byteArray = new Uint8Array(dRiLLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drIlLup(i,85);DrilLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRilluP =  function(DrILlUP,DRIlluP){if( Decrypter.N_drILlUp == Decrypter.N_DRilLuP && Decrypter.N_drILlUp == Decrypter.N_DrilluP && Decrypter.N_drILLUp == Decrypter.N_DrilluP ) {var byteArray = new Uint8Array(DRIlluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRILlUP(i,67);DrILlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drilLUp =  function(dRiLLuP,DriLlUp){if( Decrypter.N_DrIllUp == Decrypter.N_DRILLUp && Decrypter.N_DRilLup == Decrypter.N_DRILlUp && Decrypter.N_DRIllup == Decrypter.N_DriLLup ) {var byteArray = new Uint8Array(DriLlUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIlLUp(i,48);dRiLLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrIlluP =  function(DRiLlup,DRILlup){if( Decrypter.N_dRILlup == Decrypter.N_dRILlUp && Decrypter.N_dRIllup == Decrypter.N_DriLLuP && Decrypter.N_dRIllup == Decrypter.N_DriLLuP ) {var byteArray = new Uint8Array(DRILlup);for (i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILLuP(i,69);DRiLlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_drIlLuP =  function(DRiLlUp,DRiLlUP){if( Decrypter.N_DRilLup == Decrypter.N_DRillUp && Decrypter.N_dRiLlUp == Decrypter.N_drilLuP && Decrypter.N_DRIlLup == Decrypter.N_drIlLuP ) {var byteArray = new Uint8Array(DRiLlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIlLuP(i,84);DRiLlUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRIllup =  function(drILLUP,DrilluP){if( Decrypter.N_DrIlLup == Decrypter.N_DriLLUp && Decrypter.N_DRILLup == Decrypter.N_dRilLUp && Decrypter.N_dRILlup == Decrypter.N_dRILLuP ) {var byteArray = new Uint8Array(DrilluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIlLUp(i,7);drILLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrIllup =  function(DRIlluP,DrILlUP){if( Decrypter.N_DrILlup == Decrypter.N_drillUp && Decrypter.N_DrILLuP == Decrypter.N_DrillUP && Decrypter.N_DriLlUp == Decrypter.N_DRiLluP ) {var byteArray = new Uint8Array(DrILlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILLUp(i,5);DRIlluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRiLLuP =  function(DriLLUp,dRIllUP){if( Decrypter.N_DrIllUp == Decrypter.N_driLLUp && Decrypter.N_DrIllup == Decrypter.N_DrIllUp && Decrypter.N_DRIlLup == Decrypter.N_DrILlUp ) {var byteArray = new Uint8Array(dRIllUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRIlLuP(i,90);DriLLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRIlLUp =  function(drillUP,DRILLup){if( Decrypter.N_DrIllup == Decrypter.N_dRilluP && Decrypter.N_drIllup == Decrypter.N_DRILLup && Decrypter.N_DrIllup == Decrypter.N_dRiLlup ) {var byteArray = new Uint8Array(DRILLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRILluP(i,55);drillUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRillup =  function(dRilluP,DriLLuP){if( Decrypter.N_drILlUp == Decrypter.N_DrILLUp && Decrypter.N_dRilLup == Decrypter.N_drIlLUp && Decrypter.N_dRILluP == Decrypter.N_DRiLLuP ) {var byteArray = new Uint8Array(DriLLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIlLUP(i,3);dRilluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRillup =  function(driLlUP,drIlLUp){if( Decrypter.N_dRillUp == Decrypter.N_dRIlLuP && Decrypter.N_drILlUp == Decrypter.N_drIlluP && Decrypter.N_drILlup == Decrypter.N_driLlUp ) {var byteArray = new Uint8Array(drIlLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrilLuP(i,2);driLlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRILlup =  function(DRILlup,DRILLuP){if( Decrypter.N_DrilLup == Decrypter.N_DRIlLuP && Decrypter.N_DrIlLup == Decrypter.N_DRilLUp && Decrypter.N_drilLup == Decrypter.N_DrillUP ) {var byteArray = new Uint8Array(DRILLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILlUP(i,15);DRILlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRIlLup =  function(DRILlUp,drIllUP){if( Decrypter.N_DRiLLUp == Decrypter.N_DriLluP && Decrypter.N_driLLup == Decrypter.N_dRIllUp && Decrypter.N_DRillup == Decrypter.N_drillUP ) {var byteArray = new Uint8Array(drIllUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIlluP(i,22);DRILlUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_drIllUp =  function(dRILlUP,driLlup){if( Decrypter.N_DRiLlup == Decrypter.N_DRILlup && Decrypter.N_dRilLUp == Decrypter.N_drIlLuP && Decrypter.N_DriLluP == Decrypter.N_DrillUP ) {var byteArray = new Uint8Array(driLlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_driLlUp(i,36);dRILlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrilLuP =  function(DrIllup,drIllUp){if( Decrypter.N_dRilLup == Decrypter.N_dRIlLUp && Decrypter.N_dRILLup == Decrypter.N_driLlUp && Decrypter.N_DrIllup == Decrypter.N_DRILLuP ) {var byteArray = new Uint8Array(drIllUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRilLuP(i,81);DrIllup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRILLUp =  function(dRilLUp,drIlLup){if( Decrypter.N_dRiLlUp == Decrypter.N_drilLUp && Decrypter.N_DrIlLUp == Decrypter.N_DRillUP && Decrypter.N_dRiLlup == Decrypter.N_driLLuP ) {var byteArray = new Uint8Array(drIlLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrillUp(i,63);dRilLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRiLlUp =  function(dRiLLUp,drIlLUp){if( Decrypter.N_drILLUp == Decrypter.N_DRILluP && Decrypter.N_drillup == Decrypter.N_dRiLlUp && Decrypter.N_drIlLUp == Decrypter.N_dRiLluP ) {var byteArray = new Uint8Array(drIlLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRILLUp(i,43);dRiLLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_drIlLUp =  function(DriLLUP,DRILluP){if( Decrypter.N_drILLup == Decrypter.N_dRIlLUp && Decrypter.N_DRiLlup == Decrypter.N_DRILlUp && Decrypter.N_drILLup == Decrypter.N_drIllUp ) {var byteArray = new Uint8Array(DRILluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILlUP(i,52);DriLLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drIllup =  function(dRiLLUP,DriLLup){if( Decrypter.N_dRillUp == Decrypter.N_drILLuP && Decrypter.N_drillUP == Decrypter.N_DrillUP && Decrypter.N_dRillUp == Decrypter.N_DRiLLuP ) {var byteArray = new Uint8Array(DriLLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILlUp(i,4);dRiLLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drilluP =  function(DRiLLup,DriLlUP){if( Decrypter.N_driLlup == Decrypter.N_dRiLlUp && Decrypter.N_DRilLUp == Decrypter.N_drIlLUp && Decrypter.N_DrIllup == Decrypter.N_dRiLLup ) {var byteArray = new Uint8Array(DriLlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRilLup(i,64);DRiLLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrIlLUp =  function(DRIlluP,dRILlUP){if( Decrypter.N_DRiLLup == Decrypter.N_dRILLup && Decrypter.N_dRiLLup == Decrypter.N_DrilLUp && Decrypter.N_drIllUp == Decrypter.N_DrIlluP ) {var byteArray = new Uint8Array(dRILlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRilLup(i,53);DRIlluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrilluP =  function(DRiLlUP,dRILLuP){if( Decrypter.N_dRiLlup == Decrypter.N_DRillUp && Decrypter.N_dRIlLuP == Decrypter.N_DRILLuP && Decrypter.N_drillUp == Decrypter.N_dRiLLUp ) {var byteArray = new Uint8Array(dRILLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIlLUP(i,65);DRiLlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drillUp =  function(DriLlUP,DrillUP){if( Decrypter.N_drILlup == Decrypter.N_DRiLLuP && Decrypter.N_DRILlup == Decrypter.N_driLLUp && Decrypter.N_driLlUp == Decrypter.N_DRIlluP ) {var byteArray = new Uint8Array(DrillUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRilLUp(i,32);DriLlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DriLLuP =  function(driLluP,drILlUp){if( Decrypter.N_drilLup == Decrypter.N_drILlUp && Decrypter.N_drIlLup == Decrypter.N_DRILLUp && Decrypter.N_dRIllup == Decrypter.N_dRiLLup ) {var byteArray = new Uint8Array(drILlUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRilLUP(i,89);driLluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drillUP =  function(dRiLLUp,dRIllUP){if( Decrypter.N_drIllUp == Decrypter.N_drIlLUp && Decrypter.N_DRIlLup == Decrypter.N_DrilluP && Decrypter.N_drillup == Decrypter.N_DrILlUp ) {var byteArray = new Uint8Array(dRIllUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRilLup(i,96);dRiLLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRilLup =  function(DrIlLup,dRIlLup){if( Decrypter.N_DrIllUp == Decrypter.N_DRIlluP && Decrypter.N_DRIlLUp == Decrypter.N_DrILLUp && Decrypter.N_Drillup == Decrypter.N_dRIlLUp ) {var byteArray = new Uint8Array(dRIlLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drillUp(i,18);DrIlLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRiLlUp =  function(dRilLUp,drIllUp){if( Decrypter.N_drillup == Decrypter.N_dRillup && Decrypter.N_drillup == Decrypter.N_driLlup && Decrypter.N_drIlLup == Decrypter.N_DRILluP ) {var byteArray = new Uint8Array(drIllUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIllUp(i,42);dRilLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRILLuP =  function(drIllUP,drILluP){if( Decrypter.N_DRiLlup == Decrypter.N_DRIlLUp && Decrypter.N_DRiLlup == Decrypter.N_DRiLlUp && Decrypter.N_DrILlUp == Decrypter.N_dRilLuP ) {var byteArray = new Uint8Array(drILluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRIllUp(i,95);drIllUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrIllUp =  function(drilLup,DrillUp){if( Decrypter.N_dRiLlUp == Decrypter.N_DrilLUp && Decrypter.N_DrilLup == Decrypter.N_dRilluP && Decrypter.N_dRiLLup == Decrypter.N_dRIllUp ) {var byteArray = new Uint8Array(DrillUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drIllUP(i,37);drilLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRilLUp =  function(dRiLluP,driLlup){if( Decrypter.N_DRIllUp == Decrypter.N_DriLLuP && Decrypter.N_drilLuP == Decrypter.N_DrIlLuP && Decrypter.N_dRIlLUp == Decrypter.N_DRillUP ) {var byteArray = new Uint8Array(driLlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRillUp(i,50);dRiLluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrILluP =  function(drILlUp,Drillup){if( Decrypter.N_dRIllup == Decrypter.N_DrILLuP && Decrypter.N_drILluP == Decrypter.N_DrIlLuP && Decrypter.N_DRiLlUp == Decrypter.N_dRilLUp ) {var byteArray = new Uint8Array(Drillup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drIlLUP(i,77);drILlUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRillUp =  function(DRIllUP,DRILlup){if( Decrypter.N_DriLLup == Decrypter.N_DRiLluP && Decrypter.N_DRiLlUp == Decrypter.N_driLLuP && Decrypter.N_DrILlUp == Decrypter.N_DRILlUp ) {var byteArray = new Uint8Array(DRILlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRilluP(i,35);DRIllUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrILlUp =  function(DrilLUP,DrILlUP){if( Decrypter.N_DRiLlup == Decrypter.N_dRILLUp && Decrypter.N_DRiLlup == Decrypter.N_DriLLuP && Decrypter.N_dRillup == Decrypter.N_dRILLup ) {var byteArray = new Uint8Array(DrILlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILLup(i,45);DrilLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRIllUp =  function(DRilLUp,drILlup){if( Decrypter.N_DRIllup == Decrypter.N_DrilLuP && Decrypter.N_DRIllup == Decrypter.N_dRiLluP && Decrypter.N_dRillUP == Decrypter.N_DRillUP ) {var byteArray = new Uint8Array(drILlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILlUp(i,38);DRilLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRILluP =  function(drilLUp,DRiLluP){if( Decrypter.N_DRiLLUp == Decrypter.N_DrillUP && Decrypter.N_drILLup == Decrypter.N_DRilluP && Decrypter.N_DRIlLUp == Decrypter.N_DRIlluP ) {var byteArray = new Uint8Array(DRiLluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLluP(i,79);drilLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRillUp =  function(dRILluP,DRILlup){if( Decrypter.N_dRIllUp == Decrypter.N_DrILLUp && Decrypter.N_drilLup == Decrypter.N_DrILLup && Decrypter.N_dRiLluP == Decrypter.N_DRillUP ) {var byteArray = new Uint8Array(DRILlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILLUp(i,34);dRILluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRiLluP =  function(dRiLLup,dRillUp){if( Decrypter.N_DRILLup == Decrypter.N_dRiLluP && Decrypter.N_DRIllup == Decrypter.N_DRiLluP && Decrypter.N_drillUp == Decrypter.N_drilLUp ) {var byteArray = new Uint8Array(dRillUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drilLUp(i,74);dRiLLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DriLLup =  function(driLLup,dRIlluP){if( Decrypter.N_DRillup == Decrypter.N_drIllup && Decrypter.N_driLLup == Decrypter.N_DRilLuP && Decrypter.N_drilLUp == Decrypter.N_DriLLUp ) {var byteArray = new Uint8Array(dRIlluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRiLLup(i,25);driLLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRIllUp =  function(DRILLup,DrilluP){if( Decrypter.N_DriLlUp == Decrypter.N_dRillUP && Decrypter.N_dRiLlUp == Decrypter.N_drIlluP && Decrypter.N_drillUp == Decrypter.N_drIlLuP ) {var byteArray = new Uint8Array(DrilluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIlLup(i,39);DRILLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRilLuP =  function(DRiLLUP,driLlUP){if( Decrypter.N_DRilLUp == Decrypter.N_drilluP && Decrypter.N_drilLUp == Decrypter.N_drILLUp && Decrypter.N_driLLup == Decrypter.N_dRilLUp ) {var byteArray = new Uint8Array(driLlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRiLLUP(i,82);DRiLLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRilLuP =  function(DRiLLup,driLluP){if( Decrypter.N_dRilLup == Decrypter.N_DRillUP && Decrypter.N_dRIlluP == Decrypter.N_DRIlLuP && Decrypter.N_dRIllup == Decrypter.N_driLlup ) {var byteArray = new Uint8Array(driLluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLlUP(i,83);DRiLLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRillUP =  function(DrIllUp,DriLLup){if( Decrypter.N_DrilLup == Decrypter.N_DRillUP && Decrypter.N_drILLup == Decrypter.N_drILlUp && Decrypter.N_dRillUp == Decrypter.N_DRilLuP ) {var byteArray = new Uint8Array(DriLLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRiLlup(i,98);DrIllUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_drILlup =  function(DrILLUP,DrilLUp){if( Decrypter.N_dRIlLup == Decrypter.N_driLLup && Decrypter.N_DRilLup == Decrypter.N_DRILLUp && Decrypter.N_drillUp == Decrypter.N_dRILluP ) {var byteArray = new Uint8Array(DrilLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILLup(i,12);DrILLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRIllup =  function(driLLuP,dRiLLUP){if( Decrypter.N_dRillup == Decrypter.N_drIlluP && Decrypter.N_drIlLUp == Decrypter.N_DRIlluP && Decrypter.N_dRIlLup == Decrypter.N_dRIllUp ) {var byteArray = new Uint8Array(dRiLLUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLLUp(i,6);driLLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRILLuP =  function(DrilLUP,DrIllup){if( Decrypter.N_DRiLLup == Decrypter.N_DRILlUp && Decrypter.N_drIlLUp == Decrypter.N_drilluP && Decrypter.N_dRIllup == Decrypter.N_DriLlUp ) {var byteArray = new Uint8Array(DrIllup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILLup(i,94);DrilLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRIlLuP =  function(DRIlLUP,dRIllUP){if( Decrypter.N_dRILlup == Decrypter.N_DRiLLuP && Decrypter.N_DrIlLup == Decrypter.N_DrilluP && Decrypter.N_dRiLLup == Decrypter.N_drillUP ) {var byteArray = new Uint8Array(dRIllUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drIllUP(i,87);DRIlLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrilLUp =  function(DRIlLUp,DRILlUP){if( Decrypter.N_drillup == Decrypter.N_DriLlup && Decrypter.N_dRILluP == Decrypter.N_drIlLuP && Decrypter.N_DrILlup == Decrypter.N_drILluP ) {var byteArray = new Uint8Array(DRILlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLlUp(i,49);DRIlLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_drilLup =  function(drillUp,DrilLuP){if( Decrypter.N_drilluP == Decrypter.N_dRillUP && Decrypter.N_DRIlLup == Decrypter.N_DRIlLuP && Decrypter.N_dRiLlUp == Decrypter.N_drILluP ) {var byteArray = new Uint8Array(DrilLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRILlUP(i,16);drillUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_drillup =  function(DrilLuP,dRIlLUp){if( Decrypter.N_DriLlup == Decrypter.N_drILLuP && Decrypter.N_DriLLup == Decrypter.N_DRilluP && Decrypter.N_drIlLUp == Decrypter.N_DRillUP ) {var byteArray = new Uint8Array(dRIlLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRILLuP(i,0);DrilLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRiLluP =  function(DRiLLuP,DRiLlUp){if( Decrypter.N_DRILlup == Decrypter.N_dRILLUp && Decrypter.N_dRiLLUp == Decrypter.N_dRiLLuP && Decrypter.N_DrIllup == Decrypter.N_drILluP ) {var byteArray = new Uint8Array(DRiLlUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drilluP(i,75);DRiLLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRiLLup =  function(DriLLUp,DRIlLuP){if( Decrypter.N_drILlup == Decrypter.N_drillUp && Decrypter.N_DrILLup == Decrypter.N_DrillUp && Decrypter.N_drIllup == Decrypter.N_drilLup ) {var byteArray = new Uint8Array(DRIlLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRilluP(i,27);DriLLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_drILluP =  function(DRIllUP,dRILLUp){if( Decrypter.N_dRILLup == Decrypter.N_dRiLLuP && Decrypter.N_DRIlLup == Decrypter.N_drillUp && Decrypter.N_drIlLUp == Decrypter.N_drILLuP ) {var byteArray = new Uint8Array(dRILLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILLuP(i,76);DRIllUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_driLlup =  function(dRILlUP,DrILlUP){if( Decrypter.N_DRILLUp == Decrypter.N_dRilluP && Decrypter.N_drilluP == Decrypter.N_dRiLluP && Decrypter.N_DRillup == Decrypter.N_DrIlLUp ) {var byteArray = new Uint8Array(DrILlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrillUp(i,8);dRILlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRIlLuP =  function(DRILluP,dRILlUp){if( Decrypter.N_dRILlup == Decrypter.N_DriLLUp && Decrypter.N_dRIllUp == Decrypter.N_driLluP && Decrypter.N_driLlup == Decrypter.N_drilLuP ) {var byteArray = new Uint8Array(dRILlUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drIllup(i,86);DRILluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrILLup =  function(DRILlUP,DRIlLUp){if( Decrypter.N_DrilLup == Decrypter.N_dRILLuP && Decrypter.N_DRiLlUp == Decrypter.N_driLluP && Decrypter.N_drIllup == Decrypter.N_dRIlLup ) {var byteArray = new Uint8Array(DRIlLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLluP(i,29);DRILlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRILlUp =  function(DRillup,DriLLUp){if( Decrypter.N_drILlup == Decrypter.N_drIlLuP && Decrypter.N_dRilluP == Decrypter.N_DRILluP && Decrypter.N_drIllup == Decrypter.N_drilLuP ) {var byteArray = new Uint8Array(DriLLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrilLup(i,47);DRillup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrILLUp =  function(drilluP,DrIllUP){if( Decrypter.N_DRILLup == Decrypter.N_DRilluP && Decrypter.N_dRIlluP == Decrypter.N_dRILLuP && Decrypter.N_DrIllup == Decrypter.N_dRILLup ) {var byteArray = new Uint8Array(DrIllUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRILLup(i,61);drilluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRILLup =  function(DrillUp,DRIlLUP){if( Decrypter.N_drIllUp == Decrypter.N_DrilluP && Decrypter.N_DrIllup == Decrypter.N_drIlLup && Decrypter.N_drIllup == Decrypter.N_DriLLup ) {var byteArray = new Uint8Array(DRIlLUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIlluP(i,30);DrillUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRilluP =  function(dRIlluP,DriLLuP){if( Decrypter.N_DRIlLup == Decrypter.N_dRILluP && Decrypter.N_drIllup == Decrypter.N_DRilluP && Decrypter.N_DrIllup == Decrypter.N_DRILlUp ) {var byteArray = new Uint8Array(DriLLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRILluP(i,66);dRIlluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrILLuP =  function(DriLlup,DRIllup){if( Decrypter.N_DRILLup == Decrypter.N_drilluP && Decrypter.N_Drillup == Decrypter.N_DrILLup && Decrypter.N_drILLup == Decrypter.N_DrIlluP ) {var byteArray = new Uint8Array(DRIllup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrilLuP(i,93);DriLlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRILlup =  function(driLluP,dRiLlUP){if( Decrypter.N_DrillUp == Decrypter.N_driLLuP && Decrypter.N_drIlluP == Decrypter.N_DRIlluP && Decrypter.N_DRilLUp == Decrypter.N_dRiLluP ) {var byteArray = new Uint8Array(dRiLlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRILLUp(i,14);driLluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DriLlUp =  function(dRilLUp,Drillup){if( Decrypter.N_DrilLup == Decrypter.N_dRIlluP && Decrypter.N_DRILLup == Decrypter.N_drILLUp && Decrypter.N_drIllup == Decrypter.N_DrILLUp ) {var byteArray = new Uint8Array(Drillup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLLUp(i,41);dRilLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_driLlUp =  function(DrILlUP,DrILLUP){if( Decrypter.N_DRilLUp == Decrypter.N_DRillUP && Decrypter.N_dRiLLup == Decrypter.N_drilLUp && Decrypter.N_drIllup == Decrypter.N_DriLLUp ) {var byteArray = new Uint8Array(DrILLUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRilluP(i,40);DrILlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRILLUp =  function(drILlup,drIllUP){if( Decrypter.N_DriLlup == Decrypter.N_dRIllUp && Decrypter.N_dRillup == Decrypter.N_DRIlluP && Decrypter.N_DrIllup == Decrypter.N_dRillUp ) {var byteArray = new Uint8Array(drIllUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIlluP(i,62);drILlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRiLLup =  function(driLLUP,DriLlUp){if( Decrypter.N_dRiLLup == Decrypter.N_dRiLlUp && Decrypter.N_DrIllup == Decrypter.N_DRILluP && Decrypter.N_drIllup == Decrypter.N_DrILlup ) {var byteArray = new Uint8Array(DriLlUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILLup(i,26);driLLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRilLUp =  function(DRiLLuP,DRilluP){if( Decrypter.N_DRiLlup == Decrypter.N_drIlLuP && Decrypter.N_DriLlUp == Decrypter.N_DrILLUp && Decrypter.N_dRilLup == Decrypter.N_dRiLluP ) {var byteArray = new Uint8Array(DRilluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRillup(i,51);DRiLLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drilLuP =  function(DRIlLuP,dRiLlUP){if( Decrypter.N_DRILlup == Decrypter.N_DrILlUp && Decrypter.N_DRiLlUp == Decrypter.N_DrilLuP && Decrypter.N_DrILlup == Decrypter.N_dRILluP ) {var byteArray = new Uint8Array(dRiLlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drilLuP(i,80);DRIlLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRILluP =  function(dRilLuP,DrilLup){if( Decrypter.N_DRILlUp == Decrypter.N_DrILLUp && Decrypter.N_dRILLup == Decrypter.N_dRiLluP && Decrypter.N_DRILlUp == Decrypter.N_DRIlLuP ) {var byteArray = new Uint8Array(DrilLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLlUP(i,78);dRilLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRiLLUp =  function(DRILLUp,DRILlUp){if( Decrypter.N_DRiLLup == Decrypter.N_DriLlUp && Decrypter.N_DriLLup == Decrypter.N_DrilLuP && Decrypter.N_dRIlLUp == Decrypter.N_dRiLluP ) {var byteArray = new Uint8Array(DRILlUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILLUP(i,58);DRILLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_drILLup =  function(DRIllup,DriLLuP){if( Decrypter.N_DrilLUp == Decrypter.N_dRilLUp && Decrypter.N_DRiLlUp == Decrypter.N_DrIlluP && Decrypter.N_drILlup == Decrypter.N_dRILluP ) {var byteArray = new Uint8Array(DriLLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRILluP(i,28);DRIllup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRILlUp =  function(drIllup,DriLlUP){if( Decrypter.N_DRilLUp == Decrypter.N_dRIlLUp && Decrypter.N_dRilLup == Decrypter.N_drilluP && Decrypter.N_drIllup == Decrypter.N_DrILluP ) {var byteArray = new Uint8Array(DriLlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLLuP(i,46);drIllup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRiLlup =  function(DrIlLup,DrilLuP){if( Decrypter.N_DrILLup == Decrypter.N_drILluP && Decrypter.N_dRiLlUp == Decrypter.N_dRiLLuP && Decrypter.N_dRiLLuP == Decrypter.N_drILLuP ) {var byteArray = new Uint8Array(DrilLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIllUP(i,10);DrIlLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrIlLup =  function(DRiLlUP,drIlLup){if( Decrypter.N_DriLluP == Decrypter.N_DrILLuP && Decrypter.N_dRillup == Decrypter.N_driLlUp && Decrypter.N_DRillup == Decrypter.N_DrILLuP ) {var byteArray = new Uint8Array(drIlLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drilluP(i,21);DRiLlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRilLup =  function(dRiLlup,DrILLUP){if( Decrypter.N_DRillup == Decrypter.N_DriLLuP && Decrypter.N_dRIlLUp == Decrypter.N_drilluP && Decrypter.N_DRillup == Decrypter.N_dRIlLuP ) {var byteArray = new Uint8Array(DrILLUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drilluP(i,19);dRiLlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrILlup =  function(dRIllUP,DriLLUP){if( Decrypter.N_drIllup == Decrypter.N_drILLUp && Decrypter.N_DrIllup == Decrypter.N_DRILLUp && Decrypter.N_DRillup == Decrypter.N_drIlluP ) {var byteArray = new Uint8Array(DriLLUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrilLUP(i,13);dRIllUP.setUint8(i, byteArray[i]);}}}
