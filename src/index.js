import './module'
import './scss/index.scss'
console.log('index js')

async function strart() {
  return await Promise.resolve('async working')
}

strart().then(console.log)
