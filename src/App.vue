<template>
	<aside class="menu">
		<router-link to="/">
			<img class="logo" id="menu-logo" src="./assets/logo-light.png">
		</router-link>
		<div class="items">
			<router-link to="/import">
				<div class="menu-item">
					<img src="./assets/import.png">
					<label>Importar</label>
				</div>
			</router-link> 
			<router-link to="/settings">
				<div class="menu-item">
					<img src="./assets/settings.png">
					<label>Configurações</label>
				</div>
			</router-link>
		</div>
	</aside>
	<section class="default-dashboard">
		<nav>
			<label id="active-menu">HashPass</label>
		</nav>
		<router-view />
	</section>
</template>

<style lang="scss"> 
	@import "@/style/scss/index.scss";
</style>