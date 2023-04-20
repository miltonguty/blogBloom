const express = require('express')
const posts = require('../data/datas-instagram.json')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const viewRender = 'instagram'
  const pris = new PrismaClient()
  const types = await pris.types.findMany()
  types.forEach(item => {
    if (item.nameType === viewRender) {
      item.selected = 1
    } else {
      item.selected = 0
    }
  })
  const categorys = await pris.categories.findMany({
    where: {
      deleted: { equals: 0 }
    }
  })
  console.log(types)
  res.render(viewRender, { title: ' Blog ', categorys, posts, types })
})

module.exports = router
