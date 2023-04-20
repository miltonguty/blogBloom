
const helper = require('./utils/helpers')
const { PrismaClient } = require('@prisma/client')
const pris = new PrismaClient()
const posts = require('../data/datas-instagram.json')

const SavePostDataBase = async (post, pathSaveFilePost, pathSaveVideoFile) => {
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
        types_id: 2, // Video typeid
        mainMedia: pathSaveVideoFile,
        published: 1,
        mediaId: String(post.id)
      }
    })
  } else {
    postResult = await pris.posts.create({
      data: {
        title: post.caption,
        imagePreview: pathSaveFilePost,
        mainMedia: pathSaveVideoFile,
        types_id: 2, // Video typeid
        published: 1,
        mediaId: String(post.id)
      }
    })
  }
  console.log('=======> ' + post.id)
  return postResult
}
const Main = async () => {
  for (const post of posts) {
    if (post.type === 'Video') {
      const pathSaveFilePreviewPost = '/images/instagram/post-video-preview' + post.id + '.jpg'
      const pathSaveVideoFile = '/images/instagram/video-' + post.id + '.mp4'
      await SavePostDataBase(post, pathSaveFilePreviewPost, pathSaveVideoFile)
      await helper.DownloadImage(post.displayUrl, './public/' + pathSaveFilePreviewPost)
      await helper.DownloadImage(post.videoUrl, './public/' + pathSaveVideoFile)
    }
  }
  // console.log(postNotDownloads)
}
Main()
