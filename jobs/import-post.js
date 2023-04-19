
const helpers = require('./utils/helpers')
const posts = require('../data/datas-instagram.json')

const Main = async () => {
  const postNotDownloads = []
  for (const post of posts) {
    const result = await helpers.DownloadImage(post.displayUrl, './public/images/instagram/' + post.id + '.jpg')
    if (!result) {
      postNotDownloads.push(post)
      console.log('FALSE ====> post' + post.id)
    } else {
      console.log('TRUE ====> post' + post.id)
    }
  }
  const postNotDownloadstoSave = JSON.stringify(postNotDownloads)
  await helpers.SaveFile('./data/datas-instagram-not-downloads.json', postNotDownloadstoSave)

  /* download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function() {
  console.log('done');
  */
}
Main()
