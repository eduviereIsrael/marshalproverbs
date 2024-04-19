import React from 'react'
import { Inter } from "next/font/google"
// import { LinkDiv } from './styles'
import Link from "next/link"
const inter = Inter({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
  })

const PrimaryButton = ({text, link}) => {
  return (
    <Link href={link} className='LinkDiv' >
        <button>{text}</button>
    </Link>
  )
}

export default PrimaryButton