import { Vector2 } from '@/helpers/vector2';

function tileToPixels(v) {
	return new Vector2(v.x * 48, v.y * 48);
}

function pixelsToTile(v) {
	return new Vector2(Math.floor(v.x / 48), Math.floor(v.y / 48));
}

function distanceBetween(x1, y1, x2, y2) {
	var a = x1 - x2;
	var b = y1 - y2;

	var c = Math.sqrt( a*a + b*b );
	return c;
}

export {
	tileToPixels,
	pixelsToTile,
	distanceBetween
}