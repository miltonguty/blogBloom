import { ApifyClient } from 'apify-client'
import { DownloadImage, SaveFile } from './utils/helpers'

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
  await SaveFile('../data/datas-instagram.json', postsJson)
  return items
}
const posts = await scraper()
let postNotDownloads = []
for (const post of posts) {
  postNotDownloads = await DownloadImage(post, '../public/images/instagram/' + post.id + '.jpg', postNotDownloads)
}
const postNotDownloadstoSave = JSON.stringify(postNotDownloads)
console.error(postNotDownloadstoSave)
await SaveFile('../data/datas-instagram-not-downloads.json', postNotDownloadstoSave)

/* download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function() {
console.log('done');
*/
