// Input 0
var Vector2 = function(x, y) {
  this.x = x;
  this.y = y
};
Vector2.prototype.x;
Vector2.prototype.y;
Vector2.prototype.set = function(x, y) {
  this.x = x;
  this.y = y;
  return this
};
Vector2.prototype.add = function(vector2) {
  this.x += vector2.x;
  this.y += vector2.y;
  return this
};
Vector2.prototype.subtract = function(vector2) {
  this.x -= vector2.x;
  this.y -= vector2.y;
  return this
};
Vector2.prototype.multiply = function(vector2) {
  this.x *= vector2.x;
  this.y *= vector2.y;
  return this
};
Vector2.prototype.divide = function(vector2) {
  this.x /= vector2.x;
  this.y /= vector2.y;
  return this
};
Vector2.prototype.abs = function() {
  this.x = Math.abs(this.x);
  this.y = Math.abs(this.y);
  return this
};
Vector2.prototype.getLength = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y)
};
Vector2.prototype.getLengthSquared = function() {
  return this.x * this.x + this.y * this.y
};
Vector2.prototype.getDistance = function(vector2) {
  return Math.sqrt(Math.pow(this.x - vector2.x, 2) + Math.pow(this.y - vector2.y, 2))
};
Vector2.prototype.getDistanceSquared = function(vector2) {
  return Math.pow(this.x - vector2.x, 2) + Math.pow(this.y - vector2.y, 2)
};
Vector2.prototype.normalize = function() {
  var length = this.getLength();
  this.x /= length;
  this.y /= length;
  return this
};
Vector2.prototype.dotProduct = function scalarProduct(vector2) {
  return this.x * vector2.x + this.y * vector2.y
};
Vector2.prototype.rotate = function(angle) {
  var x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
  var y = this.y * Math.cos(angle) + this.x * Math.sin(angle);
  this.x = x;
  this.y = y
};
Vector2.prototype.rotateAround = function(angle, vector2) {
  var x = (this.x - vector2.x) * Math.cos(angle) - (vector2.y - this.y) * Math.sin(angle) + vector2.x;
  var y = (vector2.y - this.y) * Math.cos(angle) + (this.x - vector2.x) * Math.sin(angle) + vector2.y;
  this.x = x;
  this.y = y
};

