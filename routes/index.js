const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const pris = new PrismaClient()
  const types = await pris.types.findMany()
  let viewRender = 'posts'
  const where = {
    nameType: {
      equals: viewRender
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
  const categorys = await pris.categories.findMany(
    {
      where: {
        deleted: { equals: 0 }
      }
    }
  )
  res.render(viewRender, { title: ' Blog ', categorys, posts, types })
})

module.exports = router
