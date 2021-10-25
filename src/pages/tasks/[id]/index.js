import { useState } from 'react'
import Error from 'next/error'
import { Header, Grid, Button, Confirm, Icon } from 'semantic-ui-react'
import { useRouter } from 'next/router'

export default function TaskDetail({ task, error }) {
    const router = useRouter()

    const [confirm, setConfirm] = useState(false)
    const [loading, setLoading] = useState(false)

    const open = () => setConfirm(true)
    const close = () => setConfirm(false)
    const back = async () => await router.push("/")

    const handleConfirm = async () => {
        setLoading(true)
        close()
        deleteTask()
        await router.push("/")
    }

    const handleCancel = () => close()

    const deleteTask = async () => {
        const { query: { id } } = router

        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`, {
                method: 'DELETE'
            })
        } catch (err) {
            setLoading(false)
            console.error(err)
        }
    }

    if (error && error.statusCode)
        return <Error statusCode={error.statusCode} title={error.statusText} />

    return (
        <Grid
            centered
            verticalAlign="middle"
            columns={1}
            style={{ height: "80vh" }}
        >
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <Button icon labelPosition='left' onClick={back} >
                        <Icon name='arrow left' />
                        Atrás
                    </Button>
                    <Header>
                        {task.title}
                    </Header>
                    <p>
                        {task.description}
                    </p>
                    <div>
                        <Button
                            color="red"
                            loading={loading}
                            disabled={loading}
                            onClick={open}>Eliminar</Button>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Confirm
                open={confirm}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                confirmButton="Eliminar"
                cancelButton="Cancelar"
                content="¿Estás seguro de eliminar la siguiente tarea?"
            >
            </Confirm>
        </Grid>
    )
}

export async function getServerSideProps(context) {
    const { query: { id } } = context

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`)

    if (res.status === 200) {
        const task = await res.json()
        return {
            props: {
                task
            },
        }
    }

    return {
        props: {
            error: {
                statusCode: res.status,
                statusText: 'El código de la tarea es inválido'
            }
        },
    }
}