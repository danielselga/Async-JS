const fs = require('fs')
const superagent = require('superagent')

//Creating a promise
const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) {
                reject('I coldnt read this file')
                resolve(data)
            }
        })
    })
}

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