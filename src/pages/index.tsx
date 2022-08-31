import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'

import { TodoList } from '~/components/TodoList'

const Index: NextPage = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="container mx-auto p-4">
        Signed in as {session.user?.email} <br />
        <button className="p-3 bg-gray-300" onClick={() => signOut()}>
          Sign out
        </button>
        <TodoList />
      </div>
    )
  }
  return (
    <div className="container mx-auto p-4">
      Not signed in <br />
      <button className="p-3 bg-gray-300" onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  )
}

export default Index
