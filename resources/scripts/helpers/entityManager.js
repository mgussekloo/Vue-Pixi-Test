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
	occupied_cells = [];
	container = false;

    init() {
    	for (let x of range(0, 29)) {
    		for (let y of range(0, 44)) {
				const tile = new Vector2(x, y);
				// console.log(tile);
				this.occupied_cells[tile.x_y] = [];
    		}
    	}
    }

    tick() {
    	this.entities.forEach((entity) => {
				entity.tick();
		});
    }

	getEntitiesAtTile(tile) {
		if (this.occupied_cells[tile.x_y]) {
			return this.occupied_cells[tile.x_y];
		}
		return [];
	}

	addEntity(entity, position) {
		this.entities.push(entity);

		// const tile = new Vector2(position.x, position.y);
		// entity.setTile(tile);


		if (this.container && entity.sprite) {
			entity.sprite.position.set(position.x, position.y);
			this.container.addChild(entity.sprite);
		}

		// this.occupied_cells[tile.x_y].push(entity);
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
		return this.getEmptyTileInRange(new Vector2(0,0), new Vector2(30, 45));
	}

	getEmptyTileInRange(rangeStart, rangeEnd) {
		let freeTiles = [];

		for (let x_y in this.occupied_cells) {
			if (this.occupied_cells[x_y].length == 0) {
				freeTiles.push(x_y);
			}
		};

		let x_y = freeTiles[Math.floor(Math.random()*freeTiles.length)];

		let [x, y] = x_y.split('_').map(Math.trunc);

		return new Vector2(x, y);
	}
}

const entityManager = new EntityManager();

export {
	entityManager
}