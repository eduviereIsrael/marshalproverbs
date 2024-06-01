"use client"

import React, {useCallback, useEffect, useState} from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { selectPoemForms, filterPoems, selectFilteredPoems, selectAllPoemsReducer,poemCategorySelector } from '@/lib/store/slices/poems.reducer'
import { PoemsContainer } from '@/components'
import { useSearchParams } from 'next/navigation' 


const PoemsPage = () => {

  const forms = useAppSelector(selectPoemForms)
  const filteredPoems = useAppSelector(selectFilteredPoems)
  const poems = useAppSelector(selectAllPoemsReducer)
  // const [selectedForm, setSelectedForm] = useState('All')
  const selectedForm = useAppSelector(poemCategorySelector)


  const dispatch = useAppDispatch()

  const query = useSearchParams()

  const form = query.get('form')


  const selectFormHandler = useCallback((form) => {
    // setSelectedForm(form)
    dispatch(filterPoems(form))

  }, [dispatch])

  const pickedStyle = {
    backgroundColor: '#000',
    color: '#fff'
  }

  useEffect(() => {
    // console.log(form)
    if(form){
      selectFormHandler(form)
      // console.log('this code ran')
    }
  }, [selectFormHandler, form])

  const replaceUnderscore = (str) => str.replace(/_/g, ' ')

  return (
    <div className='poems-page' >
        <div className="container">
            <h1>Poems</h1>
            
            <div className="filter">
              <span onClick={() => selectFormHandler('All')} style={selectedForm.toLowerCase() === 'All'.toLowerCase()? {...pickedStyle} : {}} >All</span>
              {
               
              
                forms.map(form => (<span key={form} style={selectedForm.toLowerCase() === form.toLowerCase()? {...pickedStyle} : {}} onClick={() => selectFormHandler(form)} >{replaceUnderscore(form)}</span>))
              }
            </div>
            { selectedForm === 'All'? <PoemsContainer poems={poems} color='black' /> :  filteredPoems.length && <PoemsContainer poems={filteredPoems} color='black' />}
        </div>
    </div>
  )

}

export default PoemsPage