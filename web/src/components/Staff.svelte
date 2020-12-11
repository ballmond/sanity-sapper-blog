<script>
  import client from "../sanityClient";
	import BlockContent from "@movingbrands/svelte-portable-text";
	import serializers from "./serializers"
	import urlBuilder from '@sanity/image-url';

  export let name;
  export let role;
  export let bio;
  export let image;

  const urlFor = source => urlBuilder(client).image(source);
</script>

<style>

	h2,
	p {
		font-family: system-ui, -apple-system, sans-serif;
	}
	h2 {
		font-size: 2.222222222222em; /* 40px /18 */
		border-bottom: 1px solid #ddd;
		margin: 1em 0 0.25em;
		line-height: 1.1;
		text-transform: uppercase;
	}
	p {
  		/* max-width: 42em; */
  		line-height: 1.5;
	}
  img {
    margin: 0 1rem;
    width: 240px;
    height: 300px;
  }
  </style>

<div class="content">
  <h2>{name}</h2>
  <h3>{role}</h3>
  <img align="left" src={urlFor(image)} alt="altimage"/>
  <p><BlockContent blocks={bio} {serializers} /></p>
</div>
