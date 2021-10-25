import Image from 'next/image'
import { Button, Card, Grid, Header } from 'semantic-ui-react'
import { format } from 'timeago.js'
import { useRouter } from 'next/router'
import TaskDetail from './tasks/[id]'

export default function Home({ tasks }) {
  const router = useRouter()
  
  if (tasks.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns={1}
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Header>No existen tareas creadas, crea uno!!</Header>
            <Image
              src="/folder.png"
              alt="No existen tareas creadas"
              width={256}
              height={256}
            />
            <div>
              <Button primary>+ Crea una tarea</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )

  return (
    <>
      <Header as='h2'>Task</Header>
      <Card.Group itemsPerRow={3}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <Card.Meta>{task.createdAt === task.updatedAt ? format(task.createdAt) : `Edit - ${format(task.updatedAt)}`}</Card.Meta>
              <Card.Description>{task.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button.Group>
                  <Button color="blue" onClick={ () => router.push(`/tasks/${task._id}`)}>Ver</Button>
                  <Button.Or />
                  <Button color="green" onClick={ () => router.push(`/tasks/${task._id}/edit`)}>Editar</Button>
                </Button.Group>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </>
  )
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