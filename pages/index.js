import { Box, Container, Heading, VStack, Text, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [itemData, setItemData] = useState([])

  const getNFTs = async() => {
    const items = await fetch('https://deep-index.moralis.io/api/v2/0xaD031EeE55f595dF6Dbd61e9ef3B908FaD1B3671/nft?chain=eth&format=decimal&limit=10', {
      method: "GET",
      headers: {
        "X-API-Key": "Bp2sshSrgLB2QlKlkt0gzfTwSjdCWyyWgSF7CVtyIvtejQbNBXcrxAqlHT1W0Tyv",
        "Content-Type": "application/json"
      }
    })
    const res = await items.json()
    console.log(res)
    const meta = await res.result.map((r) => {
      const metadata = JSON.parse(r.metadata)
      return { ...r, metadata }
    })
    console.log(meta)
    setItemData(meta)
  }

  useEffect(() => {
    getNFTs()
  }, [])

  console.log(itemData)

  return (
    <Box>
      <Container maxW="container.xl" pt={16}>
        <Heading mb={8}>Moralis - NFT</Heading>
        <Heading fontSize="lg" mb={4}>Get ALL NFTs</Heading>
        {
          itemData.map((data, dataKey) => (
            <VStack key={dataKey} align="start" spacing={0} mb={4}>
              <Text>Token Id: {data.token_id}</Text>
              {
                data.metadata && (
                  <VStack align="start">
                    <Text>Name: {data.metadata.name}</Text>
                    <Image src={data.metadata.image} boxSize="50px" />
                  </VStack>  
                )
              }
            </VStack>
          ))
        }
      </Container>
    </Box>
  )
}
