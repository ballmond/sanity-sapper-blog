<script>
    export let preview = false;
    export let slug = {}
    export let title;
    export let excerpt;
    export let authors = [];
    export let publishedAt;
    export let videoUrl;
    export let audioUrl;

	function formatDate(date) {
	  return new Date(date).toLocaleDateString()
    }
    
    import getYouTubeID from 'get-youtube-id';

    function getYoutubeID(url) {
        return getYouTubeID(url);
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
	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}
    ul {
        padding: 0;
        margin: 0;
    }
	li {
		display: block;
		float: left;
        padding-right: 0.5rem;
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
            <div class="media">
                <ul>
                    {#if videoUrl}
                        <li><a href="{videoUrl}" target="_blank">Watch</a></li>
                    {/if}
                    {#if audioUrl}
                        <p><a href="{audioUrl}" target="_blank">Listen</a></p>
                    {/if}
                </ul>
            </div>
        </article>
    </div>
</a>
</div>
{/if}