import Navbar from './Navbar'
import { Container } from 'semantic-ui-react'

export default function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <Container style={{ marginTop: '1em'}}>
                {children}
            </Container>
        </div>
    )
}
