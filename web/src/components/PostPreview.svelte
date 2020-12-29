
<script>
	import Post from "./Post.svelte";

    export let category;
    export let num = 3;
	export let posts;

	function getPosts(category) {
        const keys = [category];
        const res = posts.filter(function(item) {
        const thisObj = this;
            return item.categories.some(leg => {
                return thisObj[leg.title];
            });
        }, keys.reduce((acc, val) => {
            acc[val] = true;
            return acc;
        }, Object.create(null)));

        return res.slice(0, num);
    }

</script>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		grid-gap: 2rem;
	}
</style>

<div class="grid">
    {#each getPosts(category) as post}
        <Post preview=true {...post}/>
    {/each}
</div>
