<script>

	let container;
	let map;
	let zoom = 18;
    let center = {lat: -34.397, lng: 150.644};
    
    import { onMount } from 'svelte';
    
	onMount(async () => {
		const map = new google.maps.Map(container, {
            zoom,
			center
        });
        
        const place_id = "ChIJfdwYKJq8xokRVHzSTFbRBNU"
        const request = {
            placeId: place_id,
            fields: ["name", "formatted_address", "place_id", "geometry"],
        };

        const infowindow = new google.maps.InfoWindow();
        const service = new google.maps.places.PlacesService(map);
        service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(JSON.stringify(place, null, 2))
                const marker = new google.maps.Marker({
                    map,
                    position: place.geometry.location,
                });
                google.maps.event.addListener(marker, "click", function () {
                    infowindow.setContent(
                    "<div><strong>" +
                        place.name +
                        "</strong><br>" +
                        place.formatted_address +
                        "</div>"
                    );
                    infowindow.open(map, this);
                });
            }
            map.setCenter(place.geometry.location);
        });
    });
</script>
<style>
	.full-screen {
		/* width: 100vw; */
        /* height: 100vh; */
        height: 450px;
        width: 600px;
	}
</style>

<div class="full-screen" bind:this={container}></div>
