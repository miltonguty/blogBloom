
const helper = require('./utils/helpers')
const { PrismaClient } = require('@prisma/client')
const pris = new PrismaClient()
const posts = require('../data/datas-instagram.json')

const SaveImageDataBase = async (post) => {
  await pris.images.create({
    data: {
      name: post.caption,
      url: post.url,
      posts_id: post.postsId
    }
  })
  await pris.$disconnect()
  console.log('==============> ' + post.postsId)
}
const SavePostDataBase = async (post) => {
  const postFind = await pris.posts.findFirst({
    where: {
      mediaId: {
        equals: post.id
      }
    }
  }
  )

  console.log('=======> ' + post.id)
  let postResult = {}
  postResult = await pris.posts.upsert({
    where: {
      id: postFind.id
    },
    update: {
      title: post.caption,
      imagePreview: post.imageUrl,
      types_id: 3, // image typeid
      published: 1,
      mediaId: String(post.id)
    },
    create: {
      title: post.caption,
      imagePreview: post.imageUrl,
      types_id: 3, // image typeid
      published: 1,
      mediaId: String(post.id)
    }
  })
  await pris.$executeRaw`delete from images where posts_id=${ postFind.id }`
  return postResult
}
const Main = async () => {
  const postNotDownloads = []
  for (const post of posts) {
    if (post.type === 'Sidecar') {
      const postSabed = await SavePostDataBase(post)
      // const pathSaveFilePost = 'public/images/instagram/' + post.id + '.jpg'
      // await helper.DownloadImage(post.displayUrl, pathSaveFilePost)
      let index = 0
      for (const imageUrl of post.images) {
        const pathSaveFile = 'public/images/instagram/sidecar' + post.id + '-' + index + '.jpg'
        const result = await helper.DownloadImage(imageUrl, pathSaveFile)
        index++
        if (result) {
          await SaveImageDataBase({
            name: post.caption,
            url: pathSaveFile,
            postsId: postSabed.id
          })
        } else {
          postNotDownloads.push(post)
        }
      }
    }
  }
  // console.log(postNotDownloads)
}
Main()
