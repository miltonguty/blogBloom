const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const pris = new PrismaClient()

  const types = await pris.types.findMany()
  const postByTypes = await pris.types.findMany(
    {
      where: {
        nameType: {
          equals: 'image'
        }
      },
      include: {
        posts: true
      }
    }
  )
  console.log(types)
  let posts = []
  if (postByTypes.length > 0) {
    posts = postByTypes[0].posts
  }

  const categorys = await pris.types.findMany()
  res.render('index', { title: ' Blog ', categorys, posts, types })
})

module.exports = router
