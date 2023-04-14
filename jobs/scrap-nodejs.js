import { ApifyClient } from 'apify-client'
import fs from 'fs'

const saveFile = async (pathFiletoSave, datas) => {
  fs.writeFile(pathFiletoSave, datas, 'utf8', (err) => {
    if (err) {
      console.log('An error occured while writing JSON Object to File.')
      return console.log(err)
    }

    console.log('JSON file has been saved.' + pathFiletoSave)
  })
}

const downloadImage = async (post, path, postNotDownloads) => {
  try {
    const response = await fetch(post.displayUrl, {
      timeout: 6000
    })
    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await fs.writeFile(path, buffer, (err) => {
      if (err) {
        console.log('An error occured while writing IMAGE File.')
        return console.log(err)
      }
    })
    return postNotDownloads
  } catch (err) {
    postNotDownloads.push(post)

    console.error('======================================')
    console.error(err)
    console.error(' url->' + post.displayUrl)
    console.error(' path->' + path)
    console.error('======================================')
    return postNotDownloads
  }
}

const client = new ApifyClient({
  token: 'apify_api_3zobDOUAyFWl5Au4oydX9YNN99ESW947einU'
})

const input = {
  directUrls: [
    'https://www.instagram.com/bloom_family_travel/'
  ],
  resultsType: 'posts',
  resultsLimit: 200,
  searchType: 'hashtag',
  searchLimit: 1,
  proxy: {
    useApifyProxy: true,
    apifyProxyGroups: [
      'RESIDENTIAL'
    ]
  },
  extendOutputFunction: async ({ data, item, helpers, page, customData, label }) => {
    return item
  },
  extendScraperFunction: async ({ page, request, label, response, helpers, requestQueue, logins, addProfile, addPost, addLocation, addHashtag, doRequest, customData, Apify }) => {
  },
  customData: {}
}
const scraper = async () => {
  const run = await client.actor('apify/instagram-scraper').call(input)
  const { items } = await client.dataset(run.defaultDatasetId).listItems()
  const postsJson = JSON.stringify(items)
  console.log(postsJson)
  await saveFile('../data/datas-instagram.json', postsJson)
  return items
}
const posts = await scraper()
let postNotDownloads = []
posts.forEach(async (post, index) => {
  postNotDownloads = await downloadImage(post, '../public/images/instagram/' + post.id + '.jpg', postNotDownloads)
})
const postNotDownloadstoSave = JSON.stringify(postNotDownloads)
console.error(postNotDownloadstoSave)
await saveFile('../data/datas-instagram-not-downloads.json', postNotDownloadstoSave)

/* download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function() {
console.log('done');
*/
