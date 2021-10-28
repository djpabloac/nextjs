import { Button, Card } from 'semantic-ui-react'
import { format } from 'timeago.js'

export default function CardTask({ tasks }) {
    return (
        <div>
            <Card.Group itemsPerRow={3}>
                {
                    tasks.map((task) => (
                        <Card key={task._id}>
                            <Card.Content>
                                <Card.Header>{task.title}</Card.Header>
                                <Card.Meta>{task.createdAt === task.updatedAt ? format(task.createdAt) : `Edit - ${format(task.updatedAt)}`}</Card.Meta>
                                <Card.Description>{task.description}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button.Group>
                                        <Button color="blue" onClick={() => router.push(`/tasks/${task._id}`)}>Ver</Button>
                                        <Button.Or />
                                        <Button color="green" onClick={() => router.push(`/tasks/${task._id}/edit`)}>Editar</Button>
                                    </Button.Group>
                                </div>
                            </Card.Content>
                        </Card>
                    ))
                }
            </Card.Group>
        </div>
    )
}
