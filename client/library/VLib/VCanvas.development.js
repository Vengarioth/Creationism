// Input 0
var VCanvas = {Node:{}};
VCanvas.RenderTarget = new Class({width:0, height:0, getContext:function() {
}});
VCanvas.Drawable = new Class({width:0, height:0, getImage:function() {
}, update:function(delta) {
}, draw:function(renderTarget, offset) {
}});
VCanvas.Animation = new Class({Implements:[VCanvas.Drawable], sprite:null, animations:null, frames:null, width:0, height:0, animationTime:0, animationDelta:0, currentAnimation:0, currentFrame:0, initialize:function(sprite, animationTime) {
  this.sprite = sprite;
  this.animations = sprite.animations;
  this.frames = sprite.frames;
  this.animationTime = animationTime;
  this.width = sprite.width;
  this.height = sprite.height
}, changeAnimation:function(row) {
  this.currentAnimation = row
}, update:function(delta) {
  this.animationDelta += delta;
  if(this.animationDelta > this.animationTime) {
    ++this.currentFrame;
    this.currentFrame %= this.frames;
    this.animationDelta %= this.animationTime
  }
}, draw:function(renderTarget, offset) {
  var w = this.width;
  var h = this.height;
  var a = this.currentAnimation;
  var f = this.currentFrame;
  renderTarget.getContext().drawImage(this.sprite.getImage(), a * w, h * f, w, h, offset.x, offset.y, w, h)
}});
VCanvas.AssetManager = new Class({assets:{}, loading:{}, loadingCallbacks:{}, initialize:function() {
}, load:function(src, callback) {
  if(typeof this.assets[src] === "undefined") {
    if(typeof this.loading[src] === "undefined") {
      var image = this.loading[src] = new Image;
      this.loadingCallbacks[src] = [];
      this.loadingCallbacks[src].push(callback);
      var self = this;
      image.onload = function() {
        self.assets[src] = image;
        for(var i = 0;i < self.loadingCallbacks[src].length;i++) {
          self.loadingCallbacks[src][i](self.assets[src])
        }
        delete self.loading[src];
        delete self.loadingCallbacks[src]
      };
      image.src = src
    }else {
      this.loadingCallbacks[src].push(callback)
    }
  }else {
    callback(this.assets[src])
  }
}});
VCanvas.Cache = new Class({Implements:[VCanvas.Drawable, VCanvas.RenderTarget], width:0, height:0, canvas:null, context:null, initialize:function(width, height) {
  this.canvas = $("<canvas>", {width:width, height:height});
  this.context = this.canvas.getContext("2d")
}, draw:function(renderTarget, offset) {
  renderTarget.getContext().drawImage(this.canvas, offset.x, offset.y)
}, getImage:function() {
  return this.canvas
}, getContext:function() {
  return this.context
}});
VCanvas.Camera = new Class({x:0, y:0, width:0, height:0});
VCanvas.Image = new Class({Implements:[VCanvas.Drawable], nativeImage:null, width:0, height:0, initialize:function(htmlImageElement) {
  this.nativeImage = htmlImageElement;
  this.width = htmlImageElement.width;
  this.height = htmlImageElement.height
}, getImage:function() {
  return this.nativeImage
}, draw:function(renderTarget, offset) {
  renderTarget.getContext().drawImage(this.nativeImage, offset.x, offset.y)
}});
VCanvas.Scene = new Class({Implements:[VCanvas.RenderTarget], world:null, renderTarget:null, nodes:[], initialize:function() {
  this.world = new VCanvas.Transformation
}, addNode:function(node) {
  this.nodes.push(node);
  return this
}, renderTo:function(renderTarget) {
  this.renderTarget = renderTarget;
  return this
}, getContext:function() {
  return this.renderTarget.getContext()
}, renderFrame:function(delta) {
  this.renderTarget.getContext().clearRect(0, 0, this.renderTarget.width, this.renderTarget.height);
  for(var i = 0;i < this.nodes.length;i++) {
    this.nodes[i].update(this.world, delta);
    this.nodes[i].draw(this.world, this)
  }
}, destroy:function() {
  delete this.nodes;
  delete this.renderTarget
}});
VCanvas.Sprite = new Class({Implements:[VCanvas.Drawable], drawable:null, animations:0, frames:0, position:{x:0, y:0}, width:0, height:0, initialize:function(animations, frames, drawable) {
  this.drawable = drawable;
  this.animations = animations;
  this.frames = frames;
  this.width = drawable.width / this.animations;
  this.height = drawable.height / this.frames
}, getImage:function() {
  return this.drawable.getImage()
}, draw:function(renderTarget, offset) {
  var w = this.width;
  var h = this.height;
  var a = this.position.x;
  var f = this.position.y;
  renderTarget.getContext().drawImage(this.drawable.getImage(), a * w, h * f, w, h, offset.x, offset.y, w, h)
}});
VCanvas.Timer = new Class({intervalID:null, tasks:[], currentTime:0, lastTime:0, initialize:function() {
  var self = this;
  this.currentTime = (new Date).getTime();
  this.intervalID = setInterval(function() {
    self.lastTime = self.currentTime;
    self.currentTime = (new Date).getTime();
    var delta = self.currentTime - self.lastTime;
    for(var i = 0;i < self.tasks.length;i++) {
      self.tasks[i](delta)
    }
  }, 16)
}, addTask:function(task) {
  this.tasks.push(task)
}});
VCanvas.Transformation = new Class({translation:null, rotation:null, initialize:function() {
  this.translation = new Vector2(0, 0);
  this.rotation = 0
}, addTransformation:function(transformation) {
  this.addTranslation(transformation.getTranslation())
}, removeTransformation:function(transformation) {
  this.removeTranslation(transformation.getTranslation())
}, getTranslation:function() {
  return this.translation
}, addTranslation:function(translation) {
  this.translation.add(translation)
}, removeTranslation:function(translation) {
  this.translation.subtract(translation)
}, setTranslation:function(translation) {
  this.translation = new Vector2(translation.x, translation.y)
}});
VCanvas.Viewport = new Class({Implements:[VCanvas.RenderTarget], nativeCanvas:null, nativeContext:null, scene:[], camera:null, width:0, height:0, world:null, initialize:function(canvasDOMElement) {
  this.nativeCanvas = canvasDOMElement;
  this.nativeContext = this.nativeCanvas.getContext("2d");
  this.camera = new VCanvas.Camera;
  this.world = new VCanvas.Transformation;
  this.handleResize()
}, handleResize:function() {
  var jQueryElement = $(this.nativeCanvas);
  var width = this.width = jQueryElement.outerWidth();
  var height = this.height = jQueryElement.outerHeight();
  this.nativeContext.canvas.width = width;
  this.nativeContext.canvas.height = height;
  this.camera.width = width;
  this.camera.height = height
}, getContext:function() {
  return this.nativeContext
}, renderFrame:function(delta) {
  var scene = this.scene;
  this.getContext().clearRect(0, 0, this.width, this.height);
  for(var i = 0;i < scene.length;i++) {
    scene[i].update(this.world, delta);
    scene[i].draw(this.world, this)
  }
}});
VCanvas.BaseNode = new Class({children:[], addNode:function(node) {
  this.children.push(node)
}, removeNode:function(node) {
}, update:function(world, delta) {
  for(var i = 0;i < this.children.length;i++) {
    this.children[i].update(world, delta)
  }
}, draw:function(world, renderTarget) {
  for(var i = 0;i < this.children.length;i++) {
    this.children[i].draw(world, renderTarget)
  }
}});
VCanvas.Node.Drawable = new Class({Extends:VCanvas.BaseNode, drawable:null, initialize:function(animation) {
  this.drawable = animation
}, update:function(world, delta) {
  this.drawable.update(delta);
  this.parent(world, delta)
}, draw:function(world, renderTarget) {
  this.drawable.draw(renderTarget, world.getTranslation());
  this.parent(world, renderTarget)
}});
VCanvas.Node.Transformation = new Class({Extends:VCanvas.BaseNode, transformation:null, initialize:function() {
  this.transformation = new VCanvas.Transformation
}, update:function(world, delta) {
  world.addTransformation(this.transformation);
  this.parent(world, delta);
  world.removeTransformation(this.transformation)
}, draw:function(world, renderTarget) {
  world.addTransformation(this.transformation);
  this.parent(world, renderTarget);
  world.removeTransformation(this.transformation)
}});

