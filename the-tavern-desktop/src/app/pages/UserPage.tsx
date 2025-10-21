import BasicCard from "../components/basic-card"

const mockUsers = [
  { id: 1, name: 'Bastian', role: 'admin', dateJoined: new Date('01-01-2025') },
  { id: 2, name: 'Per Arne', role: 'regular', dateJoined: new Date('11-11-2025') },
]

export function UserPage() {
  const { id } = useParams()
  const user = mockUsers.find((i) => i.id === Number(id))

  if (!user) {
    return <p>User not found</p>
  }

  return (
    <BasicCard
      title={user.name}
      description={`Role: ${user.role}`}
    >
      <p>Date Joined: {user.dateJoined.toLocaleDateString()}</p>
    </BasicCard>
  )
}


function useParams(): { id: any } {
  return { id: 1 }
}

