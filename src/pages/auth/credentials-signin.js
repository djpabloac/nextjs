import { getCsrfToken } from "next-auth/client"
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

export default function SignIn({ csrfToken }) {
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='grey' textAlign='center'>
          Ingrese a su cuenta
        </Header>
        <Form size='large' method='post' action='/api/auth/callback/credentials'>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Segment stacked>
            <Form.Input name='username' fluid icon='user' iconPosition='left' placeholder='Email' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              name='password'
              placeholder='Contraseña'
              type='password'
            />

            <Button color='blue' fluid size='large'>
              Iniciar sesión
            </Button>
          </Segment>
        </Form>
        <Message>
          ¿Nuevo para nosotros? <a href='#'>Regístrate</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
