<script>
    import { cloudinaryUrl } from '../utils/util'

    export let image;
    export let width = 240;
    export let height = 300;

    function getImageParams() {
        return {
            width: width,
            height: height,
            effects: [
                "e_shadow:50"
            ]
        }
    }
</script>

<img src={cloudinaryUrl(image, getImageParams())} alt="{image.alt}"/>