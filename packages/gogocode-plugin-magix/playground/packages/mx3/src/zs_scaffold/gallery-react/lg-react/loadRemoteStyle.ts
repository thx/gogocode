/*md5:d87640fa26c15361af4313a605c6f1c0*/
const __PROMISE_MAP__ = {}

function __loadStyle__ (src: string) {
  if (__PROMISE_MAP__[src]) return __PROMISE_MAP__[src]

  const promised = new Promise((resolve, reject) => {
    const element = document.createElement('link')
    element.rel = 'stylesheet'
    element.type = 'text/css'
    element.href = src

    element.onload = () => {
      resolve(true)
    }

    element.onerror = (error) => {
      delete __PROMISE_MAP__[src]
      reject(error)
    }

    document.head.appendChild(element)
  })

  __PROMISE_MAP__[src] = promised

  return promised
}

export default async function loadRemoteStyle (remote: string) {
  await new Promise((resolve, reject) => {
    __loadStyle__(remote)
      .then(
        resolve,
        () => {
          reject(new Error(`[MF] [loadRemoteStyle] failed to load remote script: ${remote}`))
        }
      )
  })
}
