<script>
	import BlockContent from "@movingbrands/svelte-portable-text";
	import serializers from "./serializers"
	import Headshot from "./Headshot.svelte";

	export let name;
	export let role;
	export let bio;
	export let image;
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
  		line-height: 1.5;
	}
	.wrapper {
		width: 100%;
	}
	.headshot {
		float: left;
		margin-right: 1rem;
	}
	.content {
		float: none;
	}
  </style>

<div class="wrapper">
  <h2>{name}</h2>
  <h3>{role}</h3>
  <div class="headshot">
    <Headshot {image}/>
  </div>
  <div class="content">
    <p><BlockContent blocks={bio} {serializers} /></p>
  </div>
</div>
