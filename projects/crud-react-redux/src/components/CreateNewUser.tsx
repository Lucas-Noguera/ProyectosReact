import { Badge, Button, Card, TextInput, Title  } from '@tremor/react'
import { useUsersActions } from '../hooks/useUsersActions'
import { useState } from 'react'

export function CreateNewUser() {
  const { addUser } = useUsersActions()
  const [result, setResult] = useState<'ok' | 'ko' | null>(null)

  // eslint-disable-next-line no-undef
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setResult(null)
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    if (!name || !email || !github) {
      return  setResult('ko')
    }

    addUser({ name, email, github })
    setResult('ok')
    form.reset()
  }
  return (
    <Card style={{ marginTop: '16px' }}>
      <Title>Crear nuevo usuario</Title>
      <form onSubmit={handleSubmit} className=''>
        <TextInput name='name' placeholder='Nombre' />
        <TextInput name= 'email' placeholder='Email' />
        <TextInput name='github' placeholder='GitHub' />

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Button
            type='submit'
            style={{marginTop: '16px'}}
          >Crear usuario
          </Button>
          <span>
            {result === 'ok' && <Badge color="green" className='badge-success'>Usuario creado correctamente</Badge>}
            {result === 'ko' && <Badge color="red" className='badge-error'>Por favor, rellena todos los campos</Badge>}
          </span>
        </div>
      </form>
    </Card>
  )
}