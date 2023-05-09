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


	getFreeTile() {
		return getFreeTileInRange(Vector2(0,0), Vector2(30, 45))
	}

	getFreeTileInRange(rangeStart, rangeEnd) {
		// var freeTiles = []
		// for i in occupied_cells:
		// 	if i.x >= rangeStart.x and i.y >= rangeStart.y and i.x <= rangeEnd.x and i.y <= rangeEnd.y:
		// 		if occupied_cells[i] == null:
		// 			freeTiles.append(i)

		// return freeTiles[randi() % freeTiles.size()]
		// 	}
	}
}

const entityManager = new EntityManager();

export {
	entityManager
}