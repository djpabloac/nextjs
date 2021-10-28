import { Menu, Container, Button, Icon } from 'semantic-ui-react'
import { useRouter } from 'next/router'

export default function Navbar() {

    const router = useRouter()

    return (
        <Menu borderless attached inverted>
            <Container>
                <Menu.Item header>
                    <Icon name='talk' size="large" />
                    Task
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
