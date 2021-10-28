import Navbar from './Navbar'
import { Container } from 'semantic-ui-react'

export default function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <Container style={{ marginTop: '2em'}}>
                {children}
            </Container>
        </div>
    )
}
