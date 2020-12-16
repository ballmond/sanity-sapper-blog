<script context="module">
	import client from '../sanityClient';
	import groq from 'groq';
	export async function preload({ params, query }) {
		const filter = groq`*[_id == "siteSettings"][0]`;
		const projection = groq`{
			...,
			"placeId": map.placeId,
			brandLogo->,
			heroImage->,
			person->
		}`;
		const order = groq`|order(publishedAt desc)`
		const groqQuery = filter + projection + order;
		const siteSettings = await client
			  .fetch(groqQuery)
			  .then(siteSettings => {
				  return {siteSettings}
			  })
			  .catch(err => this.error(500, err));
		return siteSettings
	}
</script>
<script>
	import { setContext } from 'svelte'
	import urlBuilder from '@sanity/image-url';
	import Navbar from '../components/Navbar.svelte';

	export let segment;
	export let siteSettings;

	const urlFor = source => urlBuilder(client).image(source);
	const mapsApi = process.env.GOOGLE_MAPS_API;
	setContext('siteSettings', siteSettings)

	const cloudinaryUrl = function(img) {
		const myCloudId = process.env.CLOUDINARY_ID
		const uploadedId = urlFor(img)
		const res = `https://res.cloudinary.com/${myCloudId}/image/fetch/c_fill,w_1000,h_420,o_85/e_art:hokusai/e_oil_paint:75/${uploadedId}`;
		return res
	}

	
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
<svelte:head>
	<link rel="icon" type="image/png" href="{urlFor(siteSettings.brandLogo)}" />
	<title>Grace Baptist Church of Blue Bell</title>
	<script defer async
	src="https://maps.googleapis.com/maps/api/js?key={mapsApi}&libraries=places">
	</script>
</svelte:head>

{#if segment === undefined }
<!--<div class="hero" alt="hero image of grace baptist church of blue bell" style="--heroImg:url({urlFor(siteSettings.heroImage)})"></div>-->
<img src="{cloudinaryUrl(siteSettings.heroImage)}" alt="" class="hero">
{/if}

<Navbar />


<main>
	<slot></slot>
</main>