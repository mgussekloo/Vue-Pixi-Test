<template>
	<div>
		<div id="canvas"></div>
	</div>
</template>

<script setup>
	import { Application, Sprite, Container, Assets } from 'pixi.js'
	import { Viewport } from 'pixi-viewport'
	import { onMounted } from 'vue';

	import { entityManager } from '@/helpers/entityManager.js';
	import { Wizard } from '@/helpers/wizard.js';
	import { Tree } from '@/helpers/tree.js';
	import TWEEN from '@tweenjs/tween.js'

	// this.$refs.canvas.addEventListener('mousedown', this.clickCanvas, false);
	// this.$refs.canvas.addEventListener('touchstart', this.clickCanvas, false);

	const app = new Application({
	    resolution: window.devicePixelRatio || 1,
	  	autoDensity: true,
	    width: window.innerWidth,
	    height: window.innerHeight
	});

	const viewport = new Viewport({
	    screenWidth: window.innerWidth,
	    screenHeight: window.innerHeight,
	    worldWidth: 100 * 48,
	    worldHeight: 100 * 48,

		events: app.renderer.events
	})

	viewport
    .drag()
    // .clamp({ direction: 'all' })
    // .pinch()
    // .wheel()
    .decelerate();

    viewport.scaled = 0.5;

    // viewport.scale.set(0.5);

	// const sprite = Sprite.from("static/player.png");
	// sprite.position.set(100, 100);
	// viewport.addChild(sprite);

	// grass
	const grassContainer = new Container();
	viewport.addChild(grassContainer);

	let sprite;
	for (let x=0;x<99;x++) {
		for (let y=0;y<99;y++) {
				sprite = Sprite.from("static/grass.png");
				sprite.position.set(48 * x, 48 * y);
				grassContainer.addChild(sprite);
		}
	}

	const entityContainer = new Container();
	viewport.addChild(entityContainer);

	entityManager.init();
	entityManager.container = entityContainer;

	const wizard = new Wizard();
	entityManager.addEntity(wizard, { x: 0, y: 0});

	let emptyTiles = entityManager.emptyTiles(400);
	for (let tile of emptyTiles) {
		let tree = new Tree();
		entityManager.addEntity(tree, tile)
	}
	// let tree = new Tree();
	// entityManager.addEntity(tree, {x: 0, y: 0});
	// tree = new Tree();
	// entityManager.addEntity(tree, {x: 0, y: 1});
	// tree = new Tree();
	// entityManager.addEntity(tree, {x: 0, y: 2});

	app.stage.addChild(viewport);

	let currentTime = 0;
	app.ticker.add((time) => {
		// currentTime += time;
		// console.log(time);
		TWEEN.update();
		entityManager.tick();
	})

	onMounted(() => {
		document.getElementById('canvas').appendChild(app.view);
	});




</script>