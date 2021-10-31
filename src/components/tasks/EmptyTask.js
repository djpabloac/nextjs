import { useRouter } from 'next/router'
import Image from 'next/image'
import { Grid, Button, Header } from 'semantic-ui-react'

export default function EmptyTask() {
  const router = useRouter()

  return (
    <>
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
              <Button primary onClick={() => router.push("/tasks/new")}>+ Crea una tarea</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
