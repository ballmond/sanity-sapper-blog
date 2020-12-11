<script>
	import Map from '../../../components/Map.svelte'

	</script>
<style>
	h1,
	h2,
	p {
		font-family: system-ui, -apple-system, sans-serif;
	}
	h1 {
		font-size: 2.666666666667em;
		font-weight: 700;
		margin: 0 0 0.5em;
		text-transform: uppercase;
		margin-top: 0.5em;
  		line-height: 1.1;
	}
	h1:first-child {
  		border-bottom: 2px dotted #666;
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
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		max-width: 100%;
		margin: 1rem auto;
		padding: 1rem;
		font-size: 1.125em;
	}
	.container {
		background: var(--grey);
		/* margin-bottom: .25rem; */
	}
	.content {
		max-width: 76rem;
		margin-left: auto;
		margin-right: auto;
	}
</style>
	
	
<svelte:head>
	<script defer async
	src="https://maps.googleapis.com/maps/api/js?key=&libraries=places">
	</script>
</svelte:head>

<div class="wrapper">
	<div class="content">
		<h1>Our Location</h1>
		<Map></Map>
	</div>
</div>