#cursorSpy

*cursorSpy* is a [jQuery widget](https://learn.jquery.com/plugins/stateful-plugins-with-widget-factory/) that can make able every DOM object (*spyObject*) to follow the cursor by rotating around its transform origin.


##Examples

A base test:
[https://jsfiddle.net/eclectic_boy/ezLmvv8c/](https://jsfiddle.net/eclectic_boy/ezLmvv8c/).

A test with multiple spyObjects:
[https://jsfiddle.net/eclectic_boy/82m1bLw6/](https://jsfiddle.net/eclectic_boy/82m1bLw6/)

An other test with multiple spyObjects:
[https://jsfiddle.net/eclectic_boy/9bnu3eop/](https://jsfiddle.net/eclectic_boy/9bnu3eop/)


##Notes

The reference system is centered in the transform origin of the *spyObject* and the angles are measured clockwise starting from the North related to projections from the center.


##Requirements

 - [jQuery](https://jquery.com/);
 - [jQuery UI](https://jqueryui.com/).

#Usage

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/cursorSpy.js"></script>

<script type="text/javascript">
$(function() {
	$("#spy").cursorSpy(opts);
});
</script>

<div id="spy"></div>
```

#Options

An optional options object `opts` can be passed to the widget. Here follow the available options:

###`head`
The angle of the head of the *spyObject* (i.e. the part of the *spyObject* that will follow the cursor). Default to 0 (=top).

[https://jsfiddle.net/eclectic_boy/y56o0hor/](https://jsfiddle.net/eclectic_boy/y56o0hor/).

###`min`
The minimun angle (based on to the position of the cursor) below which the *spyObject* stops following the cursor. Default to `null`. `max` must be defined. Optional.

[https://jsfiddle.net/eclectic_boy/cvz3mqjy/](https://jsfiddle.net/eclectic_boy/cvz3mqjy/).

###`max`
The maximum angle (based on to the position of the cursor) above which the *spyObject* stops following the cursor. Default to `null`. `min` must be defined. Optional.

[https://jsfiddle.net/eclectic_boy/cvz3mqjy/](https://jsfiddle.net/eclectic_boy/cvz3mqjy/).

###`rotationCenterX`
The x coordinate of the rotation center for the *spyObject* relative to the object itself. It is the distance from the left border expressed in percentage of the width. Default to `50`. Optional.

[https://jsfiddle.net/eclectic_boy/76qu4o51/](https://jsfiddle.net/eclectic_boy/76qu4o51/).

###`rotationCenterY`
The y coordinate of the rotation center for the *spyObject* relative to the object itself. It is the distance from the top border expressed in percentage of the height. Default to `50`. Optional.

[https://jsfiddle.net/eclectic_boy/6euwrn5t/](https://jsfiddle.net/eclectic_boy/6euwrn5t/).

###`step(me, deg, distance)`
A function which is called at every step (i.e. every time the *spyObject* moves). Optional.

This function can change the behaviour of the widget for the current step by changing the related angle hence the movement of the *spyObject*.
It receives the following parameters:

 - `me`: the widget itsel;
 - `deg`: the angle of the current step;
 - `distance`: the distance in pixels of the cursor from the transform origin.

This function must return either a float number or `false`.
If a float number is returned it will be used as the angle for the current step.
If `false` is returned the movement for the current step is prevented.

```javascript
function step(me, deg, distance) {
	//change deg here
	return deg;
}
```
In order to obtain the same `deg` angle but started from the head (if defined) you simply have to convert it as follows:

```javascript
deg_relative = deg + me.options.head;
```

[https://jsfiddle.net/eclectic_boy/3cd6d9w0/](https://jsfiddle.net/eclectic_boy/3cd6d9w0/).


#Methods

###`start`

enables the widget.
```
$("#spy").cursorSpy("start");
```

###`stop`

disable the widget.
```
$("#spy").cursorSpy("stop");
```

#Changelog

###v1.1

 - Debug of transform origin computation;
 - Added options `rotationCenterX` and `rotationCenterY`;
 - in `step` function added `distance` argument.

###v1.0
First release
