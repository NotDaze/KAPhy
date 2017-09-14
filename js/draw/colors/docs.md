# Color System
## Color Objects
Color Objects are extremely simple color structures. When `Draw.getFill()` or `Draw.getStroke()` is used, they return Color Objects.

Color Objects have four self-explanatory properties: `r`, `g`, `b`, and `a`
For example, to get the current fill's blue value, you would use `Draw.getFill().b`

Note: `Draw.get()` (in the image folder), when used with two arguments, returns a Color Object.

## Draw.fill()
`Draw.fill()` is a simple concept but complex in implementation. There are six ways to use `Draw.fill()`:
 * `Draw.fill()` - When this function is used without arguments, it sets the fill color to white.
 * `Draw.fill(brightness)` - When used with one integer argument, it sets the fill to a specified shade of gray.
 * `Draw.fill(brightness, a)` - Same as above, but additionally has transparency.
 * `Draw.fill(r, g, b)` - Traditional r, g, b usage.
 * `Draw.fill(r, g, b, a)` - Traditional r, g, b, a usage.
 * `Draw.fill(colorObject)` - Sets the fill based on a color object.
## Draw.stroke()
`Draw.stroke()` is the same as `Draw.fill()` in all aspects, except for the fact that it edits the stroke color, not the fill color.
## Draw.getFill()
`Draw.getFill()` simply returns a color object that represents the current fill color.
## Draw.getStroke()
`Draw.getStroke()`, similarly to `Draw.getFill()`, returns a color object that represents the current stroke color.
## Draw.strokeWeight()
`Draw.strokeWeight` can be used in two ways:
 * Draw.strokeWeight() - Sets the stroke weight to zero
 * Draw.strokeWeight(newWeight) - Sets the stroke weight to `newWeight`
## Draw.getStrokeWeight()
`Draw.getStrokeWeight()` returns the current stroke weight as a number.
## Draw.noStroke()
`Draw.noStroke()` sets the stroke color to transparent black.
