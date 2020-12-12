export default {
  name: 'map',
  type: 'object',
  title: 'Google Map',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Place name',
    },
    {
      name: 'placeId',
      type: 'string',
      title: 'Google Place ID',
      description: 'Unique Google Place ID',
    },
    {
      name: 'lat',
      type: 'number',
      title: 'Lattitude',
    },
    {
      name: 'lon',
      type: 'number',
      title: 'Longitude',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
}
