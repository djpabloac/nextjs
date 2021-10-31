import Layout from 'components/Layout'
import EmptyTask from 'components/tasks/EmptyTask'
import CardTask from 'components/tasks/CardTask'

export default function Index({ tasks }) {
    if (tasks.length === 0)
        return <Layout><EmptyTask /></Layout>

    return <Layout><CardTask tasks={tasks} /></Layout>
}

export async function getServerSideProps(context) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`)
    if (res.status === 401)
        return {
            props: {
                tasks: []
            }
        }

    const tasks = await res.json()
    return {
        props: {
            tasks
        },
    }
}
