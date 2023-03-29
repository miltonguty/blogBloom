const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

/* GET home page. */
router.get('/:type', async (req, res, next) => {
  const params = req.params
  const pris = new PrismaClient()
  const types = await pris.types.findMany()
  let viewRender = params.type
  let where = {}
  if (params !== null) {
    where = {
      nameType: {
        equals: viewRender
      }

    }
  }
  types.forEach(item => {
    if (item.nameType === viewRender) {
      item.selected = 1
    } else {
      item.selected = 0
    }
  })

  const postByTypes = await pris.types.findMany(
    {
      where,
      include: {
        posts: true
      }
    }
  )
  let posts = []
  if (postByTypes.length > 0) {
    posts = postByTypes[0].posts
  } else {
    viewRender = 'index'
  }
  const categorys = await pris.types.findMany()
  console.log(viewRender)
  res.render(viewRender, { title: ' Blog ', categorys, posts, types })
})

module.exports = router
