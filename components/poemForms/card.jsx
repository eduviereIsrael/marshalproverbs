'use client'

import Link from 'next/link'
import React from 'react';
import { useAppDispatch } from '@/lib/store/hooks';
import { filterPoems } from '@/lib/store/slices/poems.reducer';

const PoemFormsCard = ({bg, name, url, poemsLength}) => {

  const dispatch = useAppDispatch()

  const handlePoemsFilter = () => {
    dispatch(filterPoems(name))
  }
  
  return (
    <div className='poem-form-card' style={{ background: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center center' }} >
        <div className='form-info' >
            <h5>{name}</h5>
            <p>{poemsLength} poems</p>
        </div>
        <a href={`/poems?form=${url}`} onClick={() => {
          handlePoemsFilter()
        }} >
            <div className='arrow' id='arrow' >
                <img src="/arrow-ur.svg" alt="" />
            </div>
        </a>
    </div>
  )
}

export default PoemFormsCard