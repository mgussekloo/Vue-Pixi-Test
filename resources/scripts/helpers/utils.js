import { Vector2 } from '@/helpers/vector2';

function tileToPixels(v) {
	return new Vector2(v.x * 48, v.y * 48);
}

function pixelsToTile(v) {
	return new Vector2(Math.floor(v.x / 48), Math.floor(v.y / 48));
}

export { tileToPixels, pixelsToTile }