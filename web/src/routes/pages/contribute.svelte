<script>
import Stripe from "../../components/Stripe.svelte";

</script>
<style>
	h1 {
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
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		max-width: 100%;
		margin: 1rem auto;
		padding: 1rem;
		font-size: 1.125em;
	}
	.content {
		background: var(--grey);
	}
	.content {
		max-width: 76rem;
		margin-left: auto;
		margin-right: auto;
		width: 100%;
	}
</style>

<div class="wrapper">
	<div class="content">
        <h1>Contribute</h1>
        <Stripe/>
	</div>
</div>