import { http } from "@aelea/ui-components"
import { getGatewayUrl } from "@gambitdao/gmx-middleware"
import { ITokenMetadata } from "../types"
import { gbc } from "./contract"




export async function getBerryMetadata(id: string): Promise<ITokenMetadata> {
  const uri = await gbc.tokenURI(id)
  const gwUrl = getGatewayUrl(uri)
  const metadata = await http.fetchJson(gwUrl) as any
  return metadata
}


export async function getBerryPhotoFromMetadata(metadata: any) {
  try {
    const imageUrl = getGatewayUrl(metadata.image)
    const res = await fetch(imageUrl, { method: 'GET', mode: 'cors', cache: 'default', })
    const imageBlob = await res.blob()
    const imageObjectURL = URL.createObjectURL(imageBlob)
    
    return imageObjectURL
  } catch (err) {
    
    try {
      const uri = await gbc._baseTokenURI() + BigInt(metadata.id).toString()
      const gwUrl = getGatewayUrl(uri)
      const newLocal = await http.fetchJson(gwUrl) as any
      const imageUrl = getGatewayUrl(newLocal.image)
      const imageBlob = await (await fetch(imageUrl, { method: 'GET', mode: 'cors', cache: 'default', })).blob()

      const imageObjectURL = URL.createObjectURL(imageBlob)
      return imageObjectURL
    } catch (err) {
      throw new Error('IPFS Query Failed')
    }
  }
}



export async function getBerryJpegUrl(id: string) {
  const metadata = getBerryMetadata(id)
  return getBerryPhotoFromMetadata(metadata)  
}