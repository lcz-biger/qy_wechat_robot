interface breeder {
  userid: string,
  name: string,
  department: number[]
}

interface breederInfo {
  time: string,
  breeder: string
}
export const breeders: breeder[]
export const breederList: breederInfo[]