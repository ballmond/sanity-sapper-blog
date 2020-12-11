export default {
  name: 'authorReference',
  type: 'object',
  title: 'Person',
  fields: [
    {
      name: 'person',
      type: 'reference',
      to: [
        {
          type: 'author',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'person.name',
      media: 'person.image.asset',
    },
  },
}
