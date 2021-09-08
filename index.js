const fs = require('fs')
const superagent = require('superagent')

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`)

    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then((res) => { //then expect a response.
        console.log(res.body.message)
   
        fs.writeFile('dog-image.txt', res.body.message, err => {
        console.log('random dog image to file')
    })
  }).catch(err => { //Catch will triggered if catch isnt work
      console.log(err.message)
  })
})