
const helpers = require('./utils/helpers')
const posts = require('../data/datas-instagram.json')

const Main = async () => {
  const postNotDownloads = []
  for (const post of posts) {
    const result = await helpers.DownloadImage(post, '../public/images/instagram/' + post.id + '.jpg')
    if (!result) {
      postNotDownloads.push(post)
    }
    console.log('====> post' + post.id)
  }
  const postNotDownloadstoSave = JSON.stringify(postNotDownloads)
  console.error(postNotDownloadstoSave)
  await helpers.SaveFile('./data/datas-instagram-not-downloads.json', postNotDownloadstoSave)

  /* download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function() {
  console.log('done');
  */
}
Main()
