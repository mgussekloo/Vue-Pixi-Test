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

function range(start, end) {
    var arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    return arr;
}

function range2d(x1, y1, x2, y2) {
	let arr = [];
	for (let x of range(x1, x2)) {
		for (let y of range(y1, y2)) {
			arr.push([x, y]);
		}
	}
	return arr;
}

function randomElements(arr, count) {
	let shuffled = [...arr].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}

export {
	tileToPixels,
	pixelsToTile,
	distanceBetween,
	range,
	range2d,
	randomElements
}