import { Menu, Container, Button, Icon } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/client"

export default function Navbar() {

    const router = useRouter()
    const [session, loading] = useSession()

    if (loading) return <></>
    
    return (
        <Menu borderless attached inverted>
            <Container>
                <Menu.Item header onClick={() => router.push('/')}>
                    <Icon name='talk' size="large" />
                    Task
                </Menu.Item>
                <Menu.Item onClick={() => (session) ? signOut() : signIn()} >
                    { (session) ? session.user.email : "Iniciar sesión" }
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button primary size="mini" onClick={() => router.push('/tasks/new')}>
                            + Nueva tarea
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    )
}
