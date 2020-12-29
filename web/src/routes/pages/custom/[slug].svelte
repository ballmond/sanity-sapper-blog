<script context="module">
	import groq from 'groq'
	import client from '../../../sanityClient'
  
	export async function preload({ params }) {
	  const { slug } = params;
	  const filter = groq`*[_type == "page" && custom && slug.current == $slug][0]`;
	  const projection = groq`{
		title,
		"custom": coalesce(custom, false),
		map,
		content[]{
			...,
			children[]{
			...
			}
		},
		people[]{
			person->{
			name,
			role,
			image,
			bio[]{
				...,
				children[]{
				...
				}
			}
			}
		}
	  }`;
	  const query = filter + projection;
	  const post = await client
      	.fetch(query, { slug })
		.catch(err => this.error(500, err));
	  return { post };
	}
  </script>

  <script>
	import Staff from "../../../components/Staff.svelte";
	import BlockContent from "@movingbrands/svelte-portable-text";
	import serializers from "../../../components/serializers";
	import Map from "../../../components/Map.svelte";

	export let post;
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
		<h1>{post.title}</h1>
		{#if post.content}
			<BlockContent blocks={post.content} {serializers} />
		{/if}
	</div>
	{#if post.people}
		{#each post.people as person}
			<div class="content">
				<Staff {...person.person}/>
			</div>
		{/each}
	{/if}
	{#if post.map}
	  <div class="content">
		<Map place_id = {post.map.placeId}/>
	  </div>
	{/if}
</div>