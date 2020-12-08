<script>
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
	article {
		max-width: 76rem;
		margin-left: auto;
		margin-right: auto;
	}
	iframe {
  		border: none;
  		width: 100%;
	}
	.container:nth-child(even) {
		background: var(--grey);
	}
</style>

<svelte:head>
	<title>Grace Baptist Church of Blue Bell</title>
</svelte:head>

<div class="wrapper">
	<div class="container">
		<article >
			<h1>Welcome to Grace Baptist Church of Blue Bell</h1>
		</article>
	</div>
	<div class="container">
		<article >
			<h2>Celebrating 45 Years in Blue Bell!</h2>
			<p>
				Because of the uptick in COVID cases in Montgomery County and the state, we are returning to virtual worship services only (no in-person). Contact us for information about how to join via Zoom. Just because we can’t meet at our church building regularly like we did before, doesn’t mean our church, and our faith, and our God isn’t alive and thriving. We are meeting regularly via Zoom for worship, praise, small groups, bible study, and fellowship. Please join us in praying for all affected by COVID-19 and racial discrimination, and those who are suffering economically during this time. If you would like to participate in any of our worship and praise activities please contact us at staff@gbcbb.org or gbcprayerwarriors@gmail.com.
			</p>
		</article>	
	</div>
	<div class="container">
		<article>
			<h2>Join Us</h2>
			<p>
				<strong>9:30 AM</strong> Sunday School. (At this time only Wired Word, Youth and Young Adult classes are meeting. Contact Brady Rennix or Joan Frizzell for Zoom info or staff@gbcbb.org)
			</p>
			<p>
				<strong>10:45 AM</strong> Worship Service Graceland 2nd Hour for children (K-3rd grade) during the worship service. Pre-school childcare provided.		
			</p>
		</article>
	</div>
	<div class="container">
		<article>
			<h2>Find Us</h2>
			<p>
				<span>437 Skippack Pike</span><br>
				<span>P.O. Box 122</span><br>
				<span>Blue Bell, PA 19422</span><br>
				<span>215-628-2077</span>
			</p>
			<iframe title="map of grace baptist church of blue bell" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.7681931536595!2d-75.25916498397085!3d40.14744697939734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6bc9a2818dc7d%3A0xd504d1564cd27c54!2sGrace%20Baptist%20Church-Blue%20Bell!5e0!3m2!1sen!2sus!4v1606764395635!5m2!1sen!2sus" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0" width="600" height="450" frameborder="0"></iframe>
		</article>
	</div>
</div>
