const fs = require('fs')
const DownloadImage = async (url, pathSaveFile) => {
  try {
    const response = await fetch(url, {
      timeout: 200000
    })
    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await fs.writeFileSync(pathSaveFile, buffer)
    return true
  } catch (err) {
    return false
  }
}
const SaveFile = async (pathFiletoSave, datas) => {
  fs.writeFile(pathFiletoSave, datas, 'utf8', (err) => {
    if (err) {
      console.log('An error occured while writing JSON Object to File.')
      return console.log(err)
    }

    console.log('JSON file has been saved.' + pathFiletoSave)
  })
}
module.exports = { SaveFile, DownloadImage }
