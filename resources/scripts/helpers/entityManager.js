import { pixelsToTile, tileToPixels, range } from '@/helpers/utils.js';
import { Vector2 } from '@/helpers/vector2';



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
		entity.tile = position;
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

	occupiedTiles() {
		let occupiedTiles = [];
		this.entities.forEach((entity) => {
			occupiedTiles.push(entity.tile.x_y);
		});
		return occupiedTiles;
	}

	emptyTileInArr(arr, occupiedTiles=false) {
		if (!occupiedTiles) {
			occupiedTiles = this.occupiedTiles();
		}

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

	emptyTileInRange(x1, y1, x2, y2, occupiedTiles) {
		let arr = [];
		for (let x of range(x1, x2)) {
    		for (let y of range(y1, y2)) {
				arr.push([x, y]);
			}
		}
		return this.emptyTileInArr(arr, occupiedTiles);
	}

	emptyTiles(count) {
		let occupiedTiles = this.occupiedTiles();

		let result = [];
		for (let x in range(0, count)) {
			let freeTile = this.emptyTileInRange(0, 0, 99, 99, occupiedTiles);
			if (freeTile) {
				result.push(freeTile);
				occupiedTiles.push(freeTile.x_y);
			}
		}
		return result;
	}
}

const entityManager = new EntityManager();

export {
	entityManager
}