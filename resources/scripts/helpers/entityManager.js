import { pixelsToTile, tileToPixels, range, range2d, randomElements } from '@/helpers/utils.js';
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
    	this.container.sortChildren();
    	this.entities.forEach((entity) => entity.tick());
    }

	getEntitiesAtTile(tile) {
		if (this.occupied_cells[tile.x_y]) {
			return this.occupied_cells[tile.x_y];
		}
		return [];
	}

	addEntity(entity, position) {
		entity.tile = position;
		entity.entityManager = this;

		this.entities.push(entity);
		this.container.addChild(entity);
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

	// get emptyTile() {
	// 	return this.emptyTileInRange(0, 0, 30, 45);
	// }

	occupiedTiles() {
		let occupiedTiles = [];
		this.entities.forEach((entity) => {
			occupiedTiles.push(entity.tile);
		});
		return occupiedTiles;
	}

	emptyTiles(count, searchArr=false) {
		if (!searchArr) {
			searchArr = range2d(this.tile_min.x, this.tile_min.y, this.tile_max.x, this.tile_max.y);
		}

		let occupiedTiles = this.occupiedTiles();

		let freeTiles = [];
		searchArr.forEach((item) => {
			let isOccupied = occupiedTiles.some(occ => occ.x == item[0] && occ.y == item[1]);
			if (item[0] >= this.tile_min.x
				&& item[0] <= this.tile_max.x
				&& item[1] >= this.tile_min.y
				&& item[1] <= this.tile_max.y
			) {
				if (!isOccupied) {
					let tile = new Vector2(item[0], item[1]);
					freeTiles.push(tile)
				}
			}
		});

		count = (count <= 0) ? freeTiles.length : count;
		return randomElements(freeTiles, count);
	}
}

const entityManager = new EntityManager();

export {
	entityManager
}