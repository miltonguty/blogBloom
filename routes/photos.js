const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

/* GET home page. */
router.get('/:postId', async (req, res, next) => {
  console.log('------------')
  const pris = new PrismaClient()
  const { postId } = req.params
  const posts = await pris.posts.findFirst({
    where: {
      id: {
        equals: Number(postId)
      }
    },
    include: { images: true }
  })
  if (posts.length > 0) {
    res.render('404', {})
  }
  console.log(posts)
  res.render('photos', { posts })
})

module.exports = router
