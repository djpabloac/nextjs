import { Card } from 'semantic-ui-react'
import EmptyTask from 'components/tasks/EmptyTask'
import CardTask from 'components/tasks/CardTask'

export default function Home({ tasks }) {

  if (tasks.length === 0)
    return <EmptyTask />

  return <CardTask tasks={tasks} />
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`)
  const tasks = await res.json()

  return {
    props: {
      tasks
    },
  }
}