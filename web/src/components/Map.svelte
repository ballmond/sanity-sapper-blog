<script>

	let container;
	let map;
	let zoom = 16;
    let center = {lat: -34.397, lng: 150.644};
    export let place_id = "";
    
    import { onMount } from 'svelte';
    
	onMount(async () => {
		const map = new google.maps.Map(container, {
            zoom,
			center
        });
        
        const request = {
            placeId: place_id,
            fields: ["name", "formatted_address", "place_id", "geometry"],
        };

        const infowindow = new google.maps.InfoWindow();
        const service = new google.maps.places.PlacesService(map);
        service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(JSON.stringify(place, null, 2))
                const base = "https://www.google.com/maps/dir/?api=1"
                const dest = `destination=${encodeURIComponent(place.name)}`
                const destPlace = `destination_place_id=${encodeURIComponent(place.place_id)}`
                const href = encodeURI(base + "&" + dest + "&" + destPlace)
                const contentString = 
                    "<div><h5><strong>" +
                    place.name +
                    "</strong></h5>" +
                    "<h6>" +
                    place.formatted_address +
                    "</h6>" +
                    `<h6><strong><a href=${href} target=_blank>Directions</a></strong></h6>` +
                    "</div>"
                const infowindow = new google.maps.InfoWindow({
                    content: contentString,
                });
                const marker = new google.maps.Marker({
                    map,
                    position: place.geometry.location,
                });
                google.maps.event.addListener(marker, "click", function () {
                    infowindow.setContent(
                        "<div><h5><strong>" +
                    place.name +
                    "</strong></h5>" +
                    "<h6>" +
                    place.formatted_address +
                    "</h6>" +
                    `<h6><strong><a href=${href} target=_blank>Directions</a></strong></h6>` +
                    "</div>"
                    );
                    infowindow.open(map, this);
                });
                infowindow.open(map, marker);
            }
            map.setCenter(place.geometry.location);
            
        });
    });
</script>

<style>
	.full-screen {
        height: 450px;
        width: auto;
	}
</style>

<div class="full-screen" bind:this={container}></div>
