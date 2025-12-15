import type { Access, CollectionConfig } from 'payload'

// This access control function demonstrates the bug:
// According to TypeScript types, user.collection should exist,
// but at runtime it is undefined
const isEditor: Access = ({ req: { user } }) => {
  console.log('--- Access Control Debug ---')
  console.log('user:', user)
  console.log('user?.collection:', user?.collection)
  console.log('----------------------------')

  // This check will always fail because user.collection is undefined
  return Boolean(
    user && (user.collection === 'users' || user.collection === 'payload-mcp-api-keys'),
  )
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: isEditor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
    },
  ],
}
