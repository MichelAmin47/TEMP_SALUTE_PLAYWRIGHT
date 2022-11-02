import { readdirSync, statSync, remove } from 'fs-extra'

export function deleteOldFiles(dirPath: string, seconds: number) {
  seconds = seconds * 1000
  const files = readdirSync(dirPath)

  files.forEach(function (file) {
    if (!statSync(dirPath + '/' + file).isDirectory()) {
      const curStat = statSync(dirPath + '/' + file)
      if (new Date(curStat.ctime).getTime() < new Date().getTime() - seconds) {
        remove(dirPath + '/' + file)
      }
    }
  })
}
