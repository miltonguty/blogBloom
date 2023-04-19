
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
const SavePostDataBase = async (post, pathSaveFilePost) => {
  const postFind = await pris.posts.findFirst({
    where: {
      mediaId: {
        equals: post.id
      }
    }
  }
  )
  let postResult = {}
  if (postFind) {
    await pris.$executeRaw`delete from images where posts_id=${ postFind.id }`
    postResult = await pris.posts.update({
      where: {
        id: postFind.id
      },
      data: {
        title: post.caption,
        imagePreview: pathSaveFilePost,
        types_id: 3, // image typeid
        published: 1,
        mediaId: String(post.id)
      }
    })
  } else {
    postResult = await pris.posts.create({
      data: {
        title: post.caption,
        imagePreview: pathSaveFilePost,
        types_id: 3, // image typeid
        published: 1,
        mediaId: String(post.id)
      }
    })
  }
  console.log('=======> ' + post.id)
  return postResult
}
const Main = async () => {
  const postNotDownloads = []
  for (const post of posts) {
    if (post.type === 'Sidecar') {
      const pathSaveFilePost = '/images/instagram/post-' + post.id + '.jpg'
      const postSabed = await SavePostDataBase(post, pathSaveFilePost)
      const downloadOk = await helper.DownloadImage(post.displayUrl, './public/' + pathSaveFilePost)
      console.log(downloadOk + ' xxxxxxxxxxxxxxx>>>' + pathSaveFilePost)
      let index = 0
      for (const imageUrl of post.images) {
        const pathSaveFile = '/images/instagram/sidecar' + post.id + '-' + index + '.jpg'
        const result = await helper.DownloadImage(imageUrl, './public/' + pathSaveFile)
        console.log(result + ' xxxxxxxxxxxxxxx>>>' + pathSaveFile)
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
