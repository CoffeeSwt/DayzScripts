const fs = require('fs')
const readFile = (path) => {
  const data = fs.readFileSync(path)
  const json = JSON.parse(data)
  return json.Objects
}
const filterName = (reg, arr) => {
  return arr.filter((i) => reg.test(i.name))
}
const writeFile = (filePath, file) => {
  fs.writeFileSync(filePath, JSON.stringify(file))
}
const parse = (objArr) => {
  return {
    KeycardDoor: objArr.map((item) => {
      return {
        doorClassName: item.name,
        doorPosition: item.pos,
        doorRotation: item.ypr,
        enableSwipeSound: 1,
        enableErrorSound: 1,
        enableCloseSound: 1,
        locationName: 'LOCATION NAME',
        ...customMap(item.name),
      }
    }),
  }
}
const customMap = (doorType) => {
  const autoCloseTimeMap = {}
  const itemsToOpenDoorMap = {}
  const secondsNotifyMap = {}
  const damageToKeycardMap = {}
  
  return {
    autoCloseTime: autoCloseTimeMap[doorType] ? autoCloseTimeMap[doorType] : 30,
    itemsToOpenDoor: itemsToOpenDoorMap[doorType]
      ? itemsToOpenDoorMap[doorType]
      : ['evg_keycards_All'],
    secondsNotify: secondsNotifyMap[doorType] ? secondsNotifyMap[doorType] : 30,
    damageToKeycardMap: damageToKeycardMap[doorType]
      ? damageToKeycardMap[doorType]
      : 100,
  }
}
const main = () => {
  const regex = /\bevg_\w+/g
  const path = 'DOOROVER.json'
  const res = parse(filterName(regex, readFile(path)))

  const outputPath = 'test.json'
  writeFile(outputPath, res)
}
main()
