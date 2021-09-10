const fs = require('fs')
const superagent = require('superagent')

//Creating a promise
const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) {
              reject('I coldnt read this file')
            } else {
                resolve(data)  
            }
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if(err) {
                reject('Could not write a file :(')
            } else {
                resolve('Success')
            }
        })
    })
}

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`)
        console.log(`Breed: ${data}`)
    
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        console.log(res.body.message)
    
        await writeFilePro('dog-image.txt', res.body.message)
        console.log('Random dog image saved to file')
    } catch (err) {
        console.log(err)
    }
}
console.log('will get dog pics')
getDogPic()
console.log('Done!')

// readFilePro(`${__dirname}/dog.txt`).then(data => {
//     console.log(`Breed: ${data}`)

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
// .then(res => {
//     return writeFilePro('dog-image.txt', res.body.message)

// }).then(() => {
//     console.log('Random dog image saved to file')
// })

// }).catch(err => { //Catch will triggered if catch isnt work

//     console.log(err.message)
// })