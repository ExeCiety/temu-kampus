// src/app/register/page.tsx

'use client' // Enable client-side interactivity

import React, { useState } from 'react'
import { register } from '@/actions/register.action'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleRegister = async () => {
    try {
      setError('')
      setSuccess('')

      // Call the server action to register a new user
      await register(name, email, password)
      setSuccess('Registration successful!')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: '100%', padding: '8px', margin: '8px 0' }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '8px', margin: '8px 0' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '8px', margin: '8px 0' }}
      />
      <button
        onClick={handleRegister}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Register
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  )
}
