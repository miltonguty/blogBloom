import { ApifyClient } from 'apify-client'
import fs from 'fs'
// Initialize the ApifyClient with API token
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
};

(async () => {
  // Run the actor and wait for it to finish
  const run = await client.actor('apify/instagram-scraper').call(input)

  // Fetch and print actor results from the run's dataset (if any)
  console.log('Results from dataset')
  const { items } = await client.dataset(run.defaultDatasetId).listItems()
  const jsonContent = JSON.stringify(items)
  // items.forEach((item) => {
  //    console.dir(item);
  // });

  fs.writeFile('./data/datas-instagram.json', jsonContent, 'utf8', (err) => {
    if (err) {
      console.log('An error occured while writing JSON Object to File.')
      return console.log(err)
    }

    console.log('JSON file has been saved.')
  })
})()

const downloadImage = async (url, path, index) => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await fs.writeFileSync(path, buffer)
    console.log(index + '--------' + path)
  } catch (err) {
    console.error('======================================')
    console.error(err)
    console.error(' url->' + url)
    console.error(' path->' + path)
    console.error('======================================')
  }
}

// import posts from '../data/datas-instagram.json'
const posts = JSON.parse(fs.readFileSync('../data/datas-instagram.json'))
posts.forEach(async (post, index) => {
  await downloadImage(post.displayUrl, '../public/images/instagram/' + post.id + '.jpg', index)
})

/* download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function() {
console.log('done');
*/
