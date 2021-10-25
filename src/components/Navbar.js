import Image from 'next/image'
import { Menu, Container, Button } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Navbar() {
    
    const router = useRouter()

    return (
        <Menu borderless attached inverted>
            <Container>
                <Menu.Item>
                    <Link href="/" passHref>
                        <a><Image src="/favicon.ico" alt="" width={32} height={32} /></a>
                    </Link>
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
