var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next)
{
  let categorys = [{
    name: "services",
    description: "services ",
    image: "image1.jpg",
    url: "/service"
  },
  {
    name: "february",
    description: "services ",
    image: "image1.jpg",
    url: "/service"
  },
  {
    name: "museun",
    description: "services ",
    image: "image1.jpg",
    url: "/service"
  },
  {
    name: "address",
    description: "services ",
    image: "image1.jpg",
    url: "/service"
  },
  {
    name: "apris x kids",
    description: "services ",
    image: "image1.jpg",
    url: "/service"
  },
  {
    name: "playground",
    description: "services ",
    image: "image1.jpg",
    url: "/service"
  },
  {
    name: "history notes",
    description: "services ",
    image: "image1.jpg",
    url: "/service"
  }
  ]
  let types = [
    {
      image: "image.jpg", url: "/updatelistPost"
    },
    {
      image: "image.jpg", url: "/videos"
    },
    {
      image: "image.jpg", url: "/books"
    },
    {
      image: "image.jpg", url: "/perons"
    }

  ]
  let posts = [{
    name: "services",
    contentHtml: " <h1>  contenido 1</h1>",
    mainImage: "/images/posts/blog1.png",
    image: ["image1.jpg"]
  },
  {
    name: "february",
    contentHtml: " <h1>  contenido 1</h1>",
    mainImage: "/images/posts/monalisa.png",
    image: ["image1.jpg"]
  },
  {
    name: "museun",
    contentHtml: " <h1>  contenido 1</h1>",
    mainImage: "/images/posts/blog1.png",
    image: ["image1.jpg"]
  },
  {
    name: "address",
    contentHtml: " <h1>  contenido 1</h1>",
    mainImage: "/images/posts/monalisa.png",
    image: ["image1.jpg"]
  },
  {
    name: "apris x kids",
    contentHtml: " <h1>  contenido 1</h1>",
    mainImage: "/images/posts/blog1.png",
    image: ["image1.jpg"]
  },
  {
    name: "playground",
    contentHtml: " <h1>  contenido 1</h1>",
    mainImage: "/images/posts/monalisa.png",
    image: ["image1.jpg"]
  },
  {
    name: "history notes",
    contentHtml: " <h1>  contenido 1</h1>",
    mainImage: "/images/posts/blog1.png",
    image: ["/images/posts/monalisa.png"]
  }
  ]
  res.render('index', { title: ' Blog ', categorys, posts, types });
});

module.exports = router;
