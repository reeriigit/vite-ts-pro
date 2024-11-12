import React from 'react';
import LogoReact from '@/assets/react.svg'
type Props = {}

export default function LoginPage({}: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
      LoginPage
    </h1>
    <img src={LogoReact} alt="" />

    </div>
  )
}