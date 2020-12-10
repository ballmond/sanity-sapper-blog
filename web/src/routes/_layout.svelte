<script context="module">
	import client from '../sanityClient';
	import groq from 'groq';
	export async function preload({ params, query }) {
		const filter = groq`*[_id == "siteSettings"]`;
		const projection = groq`{
			...,
			brandLogo->,
			heroImage->,
			person->
		}[0]`;
		const order = groq`|order(publishedAt desc)`
		const groqQuery = filter + projection + order;
    	const posts = await client
			  .fetch(groqQuery)
			  .then(posts => {
				//   console.log(JSON.stringify(posts, null, 2))
				  return {posts}
			  })
			  .catch(err => this.error(500, err));

		return posts
	}
</script>
<script>
	import urlBuilder from '@sanity/image-url';
	import Navbar from '../components/Navbar.svelte';

	export let segment;
	export let posts;

	const urlFor = source => urlBuilder(client).image(source);

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
		border-radius: 5px 5px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
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
		border-radius: 5px 5px;
	}
</style>

{#if segment === undefined }
<div class="hero" alt="hero image of grace baptist church of blue bell" style="--heroImg:url({urlFor(posts.heroImage)})"></div>
{/if}

<Navbar />


<main>
	<slot></slot>
</main>