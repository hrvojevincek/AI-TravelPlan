import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ExactLocationProps } from '@/types'

const ExactLocation = ({ address }: ExactLocationProps) => {
  const [googleMapsLink, setGoogleMapsLink] = useState('')

  useEffect(() => {
    if (address) {
      const link = generateGoogleMapsLink(address)
      setGoogleMapsLink(link)
    }
  }, [address])

  const generateGoogleMapsLink = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
  }

  return (
    <div className="text-blue-500">
      {googleMapsLink ? (
        <Link href={googleMapsLink} target="_blank">
          {address}
        </Link>
      ) : (
        <p>Invalid address</p>
      )}
    </div>
  )
}

export default ExactLocation
