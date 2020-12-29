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
	import Navbar from '../components/Navbar.svelte';
	import { mapsApi, cloudinaryUrl, urlFor } from '../utils/util'

	export let segment;
	export let siteSettings;

	setContext('siteSettings', siteSettings)
	function getHero(){
		const params = {
			width: 1000,
			height: 420,
			trans: 75,
			effects: ["e_art:hokusai", "e_oil_paint:75"]
		}
		return cloudinaryUrl(siteSettings.heroImage, params)
	}
</script>
<style>
	.hero {
		width: 100%; 
	}
</style>
<svelte:head>
	<link rel="icon" type="image/png" href="{urlFor(siteSettings.brandLogo)}" />
	<title>{siteSettings.title}</title>
	<script defer async
	src="https://maps.googleapis.com/maps/api/js?key={mapsApi}&libraries=places">
	</script>
</svelte:head>

{#if segment === undefined }
  <img src="{getHero()}" alt="{siteSettings.heroImage.alt}" class="hero">
{/if}

<Navbar />


<main>
	<slot></slot>
</main>