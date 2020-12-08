<script context="module">
	// the (optional) preload function takes a
	// `{ path, params, query }` object and turns it into
	// the data we need to render the page
	export async function preload(page, session) {
		// the `slug` parameter is available because this file
		// is called [slug].svelte
		const { slug } = page.params;
        console.log(JSON.stringify(page.params))
		// `this.fetch` is a wrapper around `fetch` that allows
		// you to make credentialled requests on both
		// server and client

		return { slug };
	}
</script>

<script>
    export let preview = false;
    export let slug = {}
    export let title;
    export let excerpt;
    export let authors = [];
    export let publishedAt;

	function formatDate(date) {
	  return new Date(date).toLocaleDateString()
	}
</script>

<style>
	.wrapper {
		box-shadow: 3px 3px 8px -6px;
		margin-bottom: .25rem;
	}
    .content {
        height: 100%;
        margin-left: auto;
        margin-right: auto;
        opacity: 0.8;
        transition: 180ms opacity ease-in-out;
    }
    .content:hover {
        opacity: 1;
    }
</style>

<svelte:head>
	<title>Grace Baptist Church of Blue Bell</title>
</svelte:head>

{#if preview}
<div class="wrapper">
    <a rel="prefetch" href="blog/{slug.current}">
        <div class="content">
        <article>
            <h1>{title}</h1>
            <h3>{excerpt.text}</h3>
            <p>Posted {formatDate(publishedAt)}</p>
            <p>By {authors.join(', ')}</p>
        </article>
    </div>
</a>
</div>
{/if}