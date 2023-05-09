import uniqueId from 'lodash/uniqueId';

class Entity {
	id = -1;
	_tile = null;
    sprite = null;

    constructor() {
    	this.id = uniqueId();
    }

	set tile(tile) {
		this._tile = tile;

		if (this.sprite) {
			this.sprite.position.set(48 * (tile.x), 48 * (tile.y));
		}
	}

	get tile() {
		return this._tile;
	}

	tick() {

	}
}

export {
	Entity
}