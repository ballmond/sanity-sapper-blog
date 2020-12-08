<script>
	import Nav from '../components/Nav.svelte';
	import heroImg from 'images/gbcbb.jpg';

	export let segment;
</script>
<!-- 
<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
 -->
<style>
	* {
		box-sizing: border-box;
	}
	.hero::before{
		content: ""; 
		/* Control the gradient stops with percentages here. */
		/* background: linear-gradient(to bottom,rgba(0,0,0,0.65),rgba(0,0,0,0) 100%);  */
		background: linear-gradient(to top,rgba(0,0,0,0.55),rgba(0,0,0,0) 50%); 
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		/* I don't want this too high because I only want to darken the top. */
		height: 31.59vw; 
	}
	.hero {
		background-image: var(--heroImg);
		height: 31.59vw; 
		width: 100%; 
		background-size: auto 100%; 
		background-repeat: no-repeat; 
		background-position: center center; 
		position: relative; 
		background-size: cover; 
		box-shadow: 0 0 2px 2px;
		border-radius: 15px 15px;
	}
</style>

{#if segment === undefined }
<div class="hero" alt="hero image of grace baptist church of blue bell" style="--heroImg:url({heroImg})"></div>
{/if}

<Nav {segment}/>


<main>
	<slot></slot>
</main>