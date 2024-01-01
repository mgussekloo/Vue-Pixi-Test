import uniqueId from 'lodash/uniqueId';
import { pixelsToTile, tileToPixels } from '@/helpers/utils.js';

class Entity {
	id = -1;
    sprite = null;

    _entityManager = null;
    _state = null;

    constructor() {
    	this.id = uniqueId();
    }

    // set pixels(pixels) {
	// 	if (this.sprite) {
	// 		this.sprite.position.set(pixels.x, pixels.y);
	// 	}
    // }

	set tile(tile) {
		if (this.sprite) {
			let pixels = tileToPixels(tile);
			this.sprite.position.set(pixels.x, pixels.y);
		}
	}

	get tile() {
		return pixelsToTile(this.sprite.position);
	}

	set state(state) {
		let oldState = this._state;
		this._state = state;
		this.onChangeState(state,oldState);
	}

	get state() {
		return this._state;
	}

	set entityManager(entityManager) {
		this._entityManager = entityManager;
		if (entityManager.container && this.sprite) {
			entityManager.container.addChild(this.sprite);
		}
	}

	get entityManager() {
		return this._entityManager;
	}

	onChangeState(newState, oldState) {

	}

	tick() {

	}
}

export {
	Entity
}