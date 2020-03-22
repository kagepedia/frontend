const defaultEyeCatch = require('~/assets/images/defaultEyeCatch.png')

export const getters = {
  setEyeCatch: () => (post: any) => {
    if (!!post.fields.image && !!post.fields.image.fields)
      return {
        url: `https:${post.fields.image.fields.file.url}`,
        title: post.fields.image.fields.title
      }
    else return { url: defaultEyeCatch, title: 'defaultImage' }
  }
}
