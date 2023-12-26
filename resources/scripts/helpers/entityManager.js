import { pixelsToTile, tileToPixels } from '@/helpers/utils.js';
import { Vector2 } from '@/helpers/vector2';

function range(start, end) {
    var arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    return arr;
}

class EntityManager {
	entities = [];
	// occupied_cells = [];
	container = false;

	tile_min = { x: 0, y: 0 };
	tile_max = { x: 29, y: 44 };

    init() {
    	// for (let x of range(0, 29)) {
    	// 	for (let y of range(0, 44)) {
		// 		const tile = new Vector2(x, y);
		// 		// console.log(tile);
		// 		this.occupied_cells[tile.x_y] = [];
    	// 	}
    	// }
    }

    tick() {
    	this.entities.forEach((entity) => entity.tick());
    }

	getEntitiesAtTile(tile) {
		if (this.occupied_cells[tile.x_y]) {
			return this.occupied_cells[tile.x_y];
		}
		return [];
	}

	addEntity(entity, position) {
		this.entities.push(entity);
		entity.entityManager = this;
	}

	removeEntity(entity) {
		// if (this.container && entity.sprite) {
		// 	this
		// }

		// this.occupied_cells[] = [];
	}

	blockTile(tile) {

	}

	freeTile(tile) {
	}


	get emptyTile() {
		return this.emptyTileInRange(0, 0, 30, 45);
	}

	emptyTileInArr(arr) {
		let occupiedTiles = [];
		this.entities.forEach((entity) => {
			occupiedTiles.push(entity.tile.x_y);
		});

		let freeTiles = [];
		arr.forEach((item) => {
			let x = item[0], y = item[1];
			let tile = new Vector2(x, y);

			if (
				!occupiedTiles.includes(tile.x_y)
				&& x >= this.tile_min.x
				&& y >= this.tile_min.y
				&& x <= this.tile_max.x
				&& y <= this.tile_max.y
			) {
				freeTiles.push(tile);
			}
		});

		if (freeTiles.length) {
	    	return freeTiles[Math.floor(Math.random()*freeTiles.length)];
		}

		return false;
	}

	emptyTileInRange(x1, y1, x2, y2) {
		let arr = [];
		for (let x of range(x1, x2)) {
    		for (let y of range(y1, y2)) {
				arr.push([x, y]);
			}
		}
		return this.emptyTileInArr(arr);
	}
}

const entityManager = new EntityManager();

export {
	entityManager
}