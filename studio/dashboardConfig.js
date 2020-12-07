export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-blog'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5fcebce51f6de9454c50a08e',
                  title: 'Sanity Studio',
                  name: 'sanity-sapper-blog-studio-h9mcibh7',
                  apiId: '7aef6e90-f740-45cf-a224-6186b804c5f4'
                },
                {
                  buildHookId: '5fcebce5aaceab4b4bea5fed',
                  title: 'Blog Website',
                  name: 'sanity-sapper-blog-web-at9b4p72',
                  apiId: 'acbec15b-c99f-4383-977b-e66b20c5e198'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/ballmond/sanity-sapper-blog',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-sapper-blog-web-at9b4p72.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
