"use client"

import React, {useCallback, useEffect, useState} from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { selectPoemForms, filterPoems, selectFilteredPoems, selectAllPoemsReducer } from '@/lib/store/slices/poems.reducer'
import { PoemsContainer } from '@/components'


const PoemsPage = () => {

  const forms = useAppSelector(selectPoemForms)
  const filteredPoems = useAppSelector(selectFilteredPoems)
  const poems = useAppSelector(selectAllPoemsReducer)
  const [selectedForm, setSelectedForm] = useState('All')


  const dispatch = useAppDispatch()

  const selectFormHandler = useCallback((form) => {
    setSelectedForm(form)
    dispatch(filterPoems(form))

  }, [dispatch])

  const pickedStyle = {
    backgroundColor: '#000',
    color: '#fff'
  }

  return (
    <div className='poems-page' >
        <div className="container">
            <h1>Poems</h1>
            
            <div className="filter">
              <span onClick={() => selectFormHandler('All')} style={selectedForm === 'All'? {...pickedStyle} : {}} >All</span>
              {
               
              
                forms.map(form => (<span key={form} style={selectedForm === form? {...pickedStyle} : {}} onClick={() => selectFormHandler(form)} >{form}</span>))
              }
            </div>
            { selectedForm === 'All'? <PoemsContainer poems={poems} color='black' /> :  filteredPoems.length && <PoemsContainer poems={filteredPoems} color='black' />}
        </div>
    </div>
  )

}

export default PoemsPage