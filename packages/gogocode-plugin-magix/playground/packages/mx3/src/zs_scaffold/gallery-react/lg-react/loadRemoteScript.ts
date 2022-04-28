/*md5:a812889093dc52e64586da610df2617c*/
const __PROMISE_MAP__ = {}

function __loadScript__ (src: string) {
  if (__PROMISE_MAP__[src]) return __PROMISE_MAP__[src]

  const promised = new Promise((resolve, reject) => {
    const element = document.createElement('script')
    element.type = 'text/javascript'
    element.async = true
    element.src = src

    element.onload = () => {
      // console.log(`MF: Dynamic Script Loaded: ${src}`)
      resolve(true)
    }

    element.onerror = (error) => {
      // console.error(`MF: Dynamic Script Error: ${src}`)
      delete __PROMISE_MAP__[src]
      reject(error)
    }

    document.head.appendChild(element)
  })

  __PROMISE_MAP__[src] = promised

  return promised
}

export default async function loadRemoteScript (remote: string) {
  await new Promise((resolve, reject) => {
    __loadScript__(remote)
      .then(
        resolve,
        () => {
          reject(new Error(`[MF] [useRemoteScript] failed to load remote script: ${remote}`))
        }
      )
  })
}
