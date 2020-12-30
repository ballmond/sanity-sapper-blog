<script>
import Stripe from "../../components/Stripe.svelte";

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
	h2 {
		font-size: 2.222222222222em; /* 40px /18 */
		border-bottom: 1px solid #ddd;
		margin: 1em 0 0.25em;
		line-height: 1.1;
		text-transform: uppercase;
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
		<h2>Web Pay</h2>
		<a href="https://www.eservicepayments.com/cgi-bin/Vanco_ver3.vps?appver3=wWsk24ZWJSTZKsGd1RMKlg0BDvsSG3VIWQCPJNNxD8upkiY7JlDavDsozUE7KG0nFx2NSo8LdUKGuGuF396vbR-UdgzeRwEv0syt8O1i6mwiYnTg5dP4O6rpX5QvPEWlBhHDN59kLZFffwKfYERpQk81yWw4r0eFn7OjMBACFd4=&ver=3" target="_blank">Click Here</a>
		<h2>Credit Card</h2>
        <Stripe/>
	</div>
</div>