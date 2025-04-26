import Navbar from './Navbar'
import { Container, Header } from 'semantic-ui-react'
import { useSession, signIn } from 'next-auth/react'

export default function Layout({ children }) {
    const { data: session, status } = useSession();
    const loading = status === 'loading'

    if (loading) return <Header size="medium">Loanding...</Header>

    if (!session) signIn()

    return (
        <>
            <Navbar />
            <Container style={{ marginTop: '2em' }}>
                {children}
            </Container>
        </>
    )
}
