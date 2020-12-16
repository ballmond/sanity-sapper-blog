import client from "../sanityClient";
import urlBuilder from "@sanity/image-url";

export const mapsApi = process.env.GOOGLE_MAPS_API;

export const urlFor = (source) => urlBuilder(client).image(source);

export const cloudinaryUrl = function (img, params = {}) {
  const width = params.width || 1000;
  const height = params.height || 420;
  const trans = params.trans || 100;
  const effects = params.effects || [];
  const myCloudId = process.env.CLOUDINARY_ID;
  const uploadedId = urlFor(img);
  let res = `https://res.cloudinary.com/${myCloudId}/image/fetch/c_fill,w_${width},h_${height},o_${trans}`;
  effects.forEach((effect) => {
    res = `${res}/${effect}`;
  });
  res = `${res}/${uploadedId}`;
  return res;
};
