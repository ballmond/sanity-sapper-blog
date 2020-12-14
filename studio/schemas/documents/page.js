import { MdBook } from 'react-icons/md'

export default {
  name: 'page',
  type: 'document',
  title: 'Pages',
  icon: MdBook,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the post',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Page Main Image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
    },
    {
      name: 'content',
      type: 'bodyPortableText',
      title: 'Body',
    },
    {
      name: 'custom',
      type: 'boolean',
      title: "Custom Page (Don't change unless you know what you are doing.)",
    },
    {
      name: 'map',
      type: 'map',
      title: 'Google Map',
    },
    {
      name: 'people',
      title: 'For Staff Pages',
      type: 'array',
      of: [
        {
          type: 'authorReference',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
}
