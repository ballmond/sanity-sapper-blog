<script>
    import BlockContent from "@movingbrands/svelte-portable-text";
    import serializers from "./serializers";

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
    import { cloudinaryId } from '../utils/util'

    function getYoutubeID(url) {
        return getYouTubeID(url);
    }

    function getAuthors(authors){
        const authorList = []
        authors.map(author => {
            authorList.push(author.author.name)
        })
        return authorList.join(', ')
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

{#if preview}
<div class="wrapper">
    <a rel="prefetch" href="blog/{slug.current}">
        <div class="content">
        <article>
            <h1>{title}</h1>
            <h3><BlockContent blocks={excerpt} {serializers} /></h3>
            <p>Posted {formatDate(publishedAt)}</p>
            <p>By {getAuthors(authors)}</p>
            <div class="media">
                <ul>
                    {#if videoUrl}
                        <a href="{videoUrl}" target="_blank"><img src="https://res.cloudinary.com/{cloudinaryId}/image/youtube/w_200,h_110/{getYoutubeID(videoUrl)}.jpg" alt="image preview"/></a>
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