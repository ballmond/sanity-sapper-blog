<script context="module">
	import client from '../sanityClient';
	import groq from 'groq';

	export async function preload({ params, query }) {
		const data = await this.fetch(
      "https://dawn-tqa-staging.begin.app/mailchimp/list?name=Grace%20Baptist%20Church%20of%20Blue%20Bell"
	).then((x) => x.json());

		const filter = groq`*[_type == "post" && defined(slug.current) && publishedAt < now()]`;
		const projection = groq`{
			slug,
			title,
			excerpt,
			videoUrl,
			audioUrl,
			publishedAt,
			"categories": categories[]->{title},
			"authors": authors[]{
				author->{name}
			}
		}`;
		const order = groq`|order(publishedAt desc)`
		const groqQuery = filter + projection + order;
    	const posts = await client
			  .fetch(groqQuery)
			  .then(posts => {
				  return {posts}
			  })
			  .catch(err => this.error(500, err));

		return posts
	}
</script>

<script>
	import { getContext } from 'svelte'
	import PostPreview from "../components/PostPreview.svelte";
	import Map from '../components/Map.svelte'
	import Newsletter from '../components/Newsletter.svelte';

	const siteSettings = getContext('siteSettings')
	export let posts;
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
	}
	.content {
		max-width: 76rem;
		margin-left: auto;
		margin-right: auto;
	}
</style>

<div class="wrapper">
	<div class="container">
		<div class ="content">
			<h1>Welcome to Grace Baptist Church of Blue Bell</h1>
		</div>
	</div>
	<div class="container">
		<div class="content">
			<h2>Celebrating 45 Years in Blue Bell!</h2>
			<p>
				Because of the uptick in COVID cases in Montgomery County and the state, we are returning to virtual worship services only (no in-person). Contact us for information about how to join via Zoom. Just because we can’t meet at our church building regularly like we did before, doesn’t mean our church, and our faith, and our God isn’t alive and thriving. We are meeting regularly via Zoom for worship, praise, small groups, bible study, and fellowship. Please join us in praying for all affected by COVID-19 and racial discrimination, and those who are suffering economically during this time. If you would like to participate in any of our worship and praise activities please contact us at staff@gbcbb.org or gbcprayerwarriors@gmail.com.
			</p>
		</div>
	</div>
	<div class="container">
		<div class="content">
			<h2>Join Us</h2>
			<p>
				<strong>9:30 AM</strong> Sunday School. (At this time only Wired Word, Youth and Young Adult classes are meeting. Contact Brady Rennix or Joan Frizzell for Zoom info or staff@gbcbb.org)
			</p>
			<p>
				<strong>10:45 AM</strong> Worship Service Graceland 2nd Hour for children (K-3rd grade) during the worship service. Pre-school childcare provided.		
			</p>
		</div>
	</div>

	<div class="container">
		<div class="content">
			<h2>Find Us</h2>
			<p>
				<span>437 Skippack Pike</span><br>
				<span>P.O. Box 122</span><br>
				<span>Blue Bell, PA 19422</span><br>
				<span>215-628-2077</span>
			</p>
			<Map place_id = {siteSettings.placeId}/>
		</div>
	</div>

	<div class="container">
		<div class="content">
			<h2>Upcoming Events</h2>
			<PostPreview category="Event" {posts}/>
		</div>
	</div>

	<div class="container">
		<div class="content">
			<h2>Latest Sermons</h2>
			<PostPreview category="Sermon" {posts}/>
		</div>
	</div>
	
	<div class="container">
		<div class="content">
			<h2>Latest News</h2>
			<PostPreview category="Newsletter" {posts}/>
		</div>
	</div>

	<div class="container">
		<div class="content">
		  <h2>Newsletter</h2>
		  <Newsletter/>
		</div>
	</div>

</div>