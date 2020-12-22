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

	const siteSettings = getContext('siteSettings')
	export let posts;

	let subscribe = "Subscribe";
	let mc_success = "";
	let mc_error = "";
	let email = "";
	let fname = "";
	let lname = "";

	async function onClick(event) {
		// const baseUrl = "https://dawn-tqa-staging.begin.app/"
		const baseUrl = "http://localhost:3332/"
		let user = {
			email: email,
			fname: fname,
			lname: lname
		};
		const response = await fetch(`${baseUrl}mailchimp/addListMember/c6ace2212d`, {
			method: 'POST',
			headers: {
				'access-control-allow-origin': '*',
				'Content-Type': 'application/json;charset=utf-8'
		},
			body: JSON.stringify(user)
		}).then((x) => x.json());
		console.log(JSON.stringify(response, null, 2))
		subscribe = "Subscribed!"
		mc_success = "LOL"
	}
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
	#mc_embed_signup {
		background: #fff;
		clear: left;
		font: 14px Helvetica,Arial,sans-serif;
	}
	#mc_embed_signup form {
		display: block;
		position: relative;
		text-align: left;
		padding: 10px 0 10px 3%;
	}	
	#mc_embed_signup .mc-field-group {
		clear: left;
		position: relative;
		width: 96%;
		padding-bottom: 3%;
		min-height: 50px;
	}
	#mc_embed_signup div#mce-responses {
		float: left;
		top: -1.4em;
		padding: 0em .5em 0em .5em;
		overflow: hidden;
		width: 90%;
		margin: 0 5%;
		clear: both;
	}
	#mc_embed_signup .mc-field-group input {
		display: block;
		width: 100%;
		padding: 8px 0;
		text-indent: 2%;
	}
	#mc_embed_signup input {
		border: 1px solid #ABB0B2;
		-webkit-border-radius: 3px;
		-moz-border-radius: 3px;
		border-radius: 3px;
	}
	#mc_embed_signup .indicates-required {
		text-align: right;
		font-size: 11px;
		margin-right: 4%;
	}
	#mc_embed_signup .button {
		clear: both;
		background-color: #aaa;
		border: 0 none;
		border-radius: 4px;
		transition: all 0.23s ease-in-out 0s;
		color: #FFFFFF;
		cursor: pointer;
		display: inline-block;
		font-size: 15px;
		font-weight: normal;
		height: 32px;
		line-height: 32px;
		margin: 0 5px 10px 0;
		padding: 0 22px;
		text-align: center;
		text-decoration: none;
		vertical-align: top;
		white-space: nowrap;
		width: auto;
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
			<h2>Subscribe</h2>
			<div id="mc_embed_signup">
				<h3>Stay current with all things happening at Grace Baptist Church of Blue Bell</h3>
				<form on:click|preventDefault id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form">
					<div class="mc-field-group">
					  <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span></label>
					  <input bind:value={email} type="email" name="EMAIL" class="required email" id="mce-EMAIL">
					</div>
				    <div id="mce-responses" class="clear">
						<div class="response" id="mce-error-response" style="display:none"><span><p>{mc_error}</p></span></div>
						<div class="response" id="mce-success-response" style="display:none"><span><p>{mc_success}</p></span></div>
					</div>
					<div class="clear" {subscribe}>
						<input on:click={onClick} type="submit" bind:value={subscribe} name="subscribe" id="mc-embedded-subscribe" class="button">
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="content">
			<h2>Subscribe to our newsletter!</h2>
			<!-- Begin Mailchimp Signup Form -->
			<!--<link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">-->
			<!--
			<style type="text/css">
				#mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
				/* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
				   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
			</style>
			-->
			<div id="mc_embed_signup">
			<!--<form action="https://gmail.us7.list-manage.com/subscribe/post?u=9ba083eded6d2e2dc934dd2aa&amp;id=c6ace2212d" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>-->
			<form  on:click|preventDefault id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" novalidate>
				<div id="mc_embed_signup_scroll">
				  <h3>Stay current with all things happening at Grace Baptist Church of Blue Bell</h3>
				    <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
				    <div class="mc-field-group">
				      <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
			          </label>
				      <input bind:value={email} type="email" name="EMAIL" class="required email" id="mce-EMAIL">
			        </div>
			        <div class="mc-field-group">
				      <label for="mce-FNAME">First Name </label>
				      <input type="text" bind:value={fname} name="FNAME" class="" id="mce-FNAME">
			        </div>
			        <div class="mc-field-group">
				      <label for="mce-LNAME">Last Name </label>
				      <input type="text"  bind:value={lname} name="LNAME" class="" id="mce-LNAME">
			        </div>
				    <div id="mce-responses" class="clear">
					  <div class="response" id="mce-error-response" style="display:none"></div>
					  <div class="response" id="mce-success-response" style="display:none"></div>
				    </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
				    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_9ba083eded6d2e2dc934dd2aa_c6ace2212d" tabindex="-1" value=""></div>
				    <div class="clear"><input on:click={onClick} type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
				</div>
			</form>
			</div>
			<!--<script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);</script>-->
			<!--End mc_embed_signup-->
		</div>
	</div>
</div>