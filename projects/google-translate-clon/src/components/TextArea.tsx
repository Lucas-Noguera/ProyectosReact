import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'
import React from 'react'

type Props = 
 {
    loading: boolean,
    type: SectionType,
    onChange: (value: string) => void, 
    value: string
}

const commonStyles = {border: 0, height: '200px'}

const getPlaceholder = ({type, loading}: {type: SectionType, loading: boolean}) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading) return 'Traduciendo...'
}

export const Textarea = ({ type, loading , value, onChange }: Props) => {
  const styles = type === SectionType.From 
    ? commonStyles : 
    {...commonStyles, backgroundColor: '#f5f5f5'}

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }
  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as='textarea'
      disabled={type === SectionType.To}
      placeholder={getPlaceholder({ type, loading })}
      value={value}
      style={styles}
      onChange={handleChange}
    />
  )
}