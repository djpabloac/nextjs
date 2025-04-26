import { Fragment } from 'react'
import Layout from 'components/Layout'
import EmptyTask from 'components/tasks/EmptyTask'
import CardTask from 'components/tasks/CardTask'

export default function Index({ tasks }) {
    if (tasks.length === 0)
        return <Layout><EmptyTask /></Layout>

    return (
        <Fragment>
            <Layout>
                <CardTask tasks={tasks} />
            </Layout>
        </Fragment>
    )
}

export async function getServerSideProps(context) {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`;
    let tasks = [];

    try {
        const res = await fetch(apiUrl);

        if (res.ok) {
            tasks = await res.json();
        } else {
            console.error(`Error al obtener tareas desde ${apiUrl}: Estado ${res.status}`);
        }

    } catch (error) {
        console.error(`Error de red al intentar obtener tareas desde ${apiUrl}:`, error);
    }

    return {
        props: {
            tasks
        },
    };
}

