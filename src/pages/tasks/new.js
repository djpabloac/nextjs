import Layout from 'components/Layout'
import { useState, useEffect } from 'react'
import { Form, Grid, Button, Header, Icon } from 'semantic-ui-react'
import { useRouter } from 'next/router'

export default function TaskNew() {
    const router = useRouter()
    const { id } = router.query

    const [loading, setLoading] = useState(false)
    const [newTask, setNewTask] = useState({
        title: "",
        description: ""
    })

    const dataErrors = {
        title: "",
        description: ""
    }

    const [errors, setErrors] = useState({ ...dataErrors })

    const validate = () => {
        const errorsValidate = {}
        if (!newTask.title) errorsValidate.title = "El título es requerido"
        if (!newTask.description) errorsValidate.description = "La descripción es requerido"
        return errorsValidate
    }

    const back = async () => await router.push("/")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors({ ...dataErrors })
        let errorsValidate = validate()
        if (Object.keys(errorsValidate).length) return setErrors(errorsValidate)
        if (id)
            updateTask()
        else
            createTask()
        await router.push('/')
    }

    const handleChange = (e) => setNewTask({ ...newTask, [e.target.name]: e.target.value })

    const createTask = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            })
        } catch (err) {
            setLoading(false)
            console.error(err)
        }
    }

    const updateTask = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            })
        } catch (err) {
            setLoading(false)
            console.error(err)
        }
    }

    useEffect(() => {
        if (!id) return
        let cancelled = false
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`)
            .then(res => res.json())
            .then(task => {
                if (cancelled) return
                setNewTask({ title: task.title, description: task.description })
            })
            .catch(console.error)
        return () => { cancelled = true }
    }, [id])

    return (
        <>
            <Layout>
                <Grid
                    centered
                    verticalAlign="middle"
                    columns={3}
                    style={{ height: "80vh" }}
                >
                    <Grid.Row>
                        <Grid.Column textAlign="center">
                            <Button
                                icon
                                labelPosition='left'
                                onClick={back} >
                                <Icon name='arrow left' />
                                Atrás
                            </Button>
                            <Header as="h2">
                                {id ? 'Editar tarea' : 'Crear tarea'}
                            </Header>

                            <Form onSubmit={handleSubmit}>
                                <Form.Input
                                    label="Título"
                                    placeholder="Título"
                                    autoFocus
                                    name="title"
                                    onChange={handleChange}
                                    error={
                                        errors.title
                                            ? { content: "Ingrese un título", pointing: "below" }
                                            : null
                                    }
                                    value={newTask.title}
                                />
                                <Form.TextArea
                                    label="Descripción"
                                    placeholder="Descripción"
                                    name="description"
                                    onChange={handleChange}
                                    error={
                                        errors.description
                                            ? { content: "Ingrese una descripción", pointing: "below" }
                                            : null
                                    }
                                    value={newTask.description}
                                />

                                <Button
                                    primary
                                    loading={loading}
                                    disabled={loading}>
                                    {id ? 'Editar' : 'Crear'}
                                </Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        </>
    )
}