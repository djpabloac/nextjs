import { Fragment, useState } from "react";
import { getCsrfToken } from "next-auth/client"
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

export default function SignIn({ csrfToken }) {
  const [show, setVisible] = useState(true)
  const handleDismiss = () => {
    setVisible(false)
  }

  return (
    <Fragment>
      <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          {show ?
            <Message
              onDismiss={handleDismiss}
              header='Bienvenido a TaskApp!'
              content='Nota: Ingrese su nombre para iniciar.'
            /> : null
          }
          <Form size='large' method='post' action='/api/auth/callback/credentials'>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Segment stacked>
              <Form.Input name='username' fluid icon='user' iconPosition='left' placeholder='Ingrese su nombre...' focus />
              {/* <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                name='password'
                placeholder='Contraseña'
                type='password'
              /> */}

              <Button color='blue' fluid size='large'>
                Iniciar sesión
              </Button>
            </Segment>
          </Form>
          {/* <Message>
            ¿Nuevo para nosotros? <a href='#'>Regístrate</a>
          </Message> */}
        </Grid.Column>
      </Grid>
    </Fragment>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
