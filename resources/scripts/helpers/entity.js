import uniqueId from 'lodash/uniqueId';

class Entity {
	id = -1;
	tile = null;
    sprite = null;

    constructor() {
    	this.id = uniqueId();
    }

	setSprite(sprite) {
		this.sprite = sprite;
	}

	setTile(tile) {
		this.tile = tile;

		if (this.sprite) {
			this.sprite.position.set(48 * (tile.x), 48 * (tile.y));
		}
	}

	getTile() {
		return this.tile;
	}
}

export {
	Entity
}