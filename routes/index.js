const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

/* GET home page. */
router.get('/blog/:type', async (req, res, next) => {
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
        posts: {
          where: {
            published: { equals: 1 }
          }
        }
      }
    }
  )
  let posts = []
  if (postByTypes.length > 0) {
    posts = postByTypes[0].posts
  } else {
    viewRender = 'index'
  }
  const categorys = await pris.categories.findMany()
  console.log('-------------viewRender------------')
  console.log(viewRender)
  console.log('-------------postByTypes------------')
  console.log(posts)
  res.render(viewRender, { title: ' Blog ', categorys, posts, types })
})

module.exports = router
