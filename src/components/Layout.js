import Navbar from './Navbar'
import { useSession } from "next-auth/client"
import { Container, Header } from 'semantic-ui-react'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
    const router = useRouter()
    const [session, loading] = useSession()

    if (loading) return <Header size="medium">Loanding...</Header>

    if (!session) router.push('/auth/credentials-signin')

    return (
        <>
            <Navbar />
            <Container style={{ marginTop: '2em' }}>
                {children}
            </Container>
        </>
    )
}
