import React, { useEffect, useState } from 'react'
import "./styles/App.scss"
import axios from 'axios'
import { Row, Col, Button, Container, Jumbotron, Card } from 'react-bootstrap';

const App = () => {
  const [state, setstate] = useState(null)
  useEffect(() => {
    axios.get('http://dafonseca.freeboxos.fr:8081/api/MesApks/').then(({ data }) => {
      setstate(data)
    })
  }, [])
  return state && (
    <Container fluid >
      <Jumbotron>
        <h1>Mes Apks</h1>
      </Jumbotron>
      <Row className="justify-content-md-center">
        <Col sm={12}>
          {
            state.map(({ name, path, version, id ,description}) => {
              return (
                <Card key={id} className="text-center">
                  <Card.Header as="h5">{name} </Card.Header>
                  <Card.Body>
                    <Card.Text>{description}</Card.Text>
                    <Button variant="primary" action download href={`http://dafonseca.freeboxos.fr:8081/apks${path}`}>Télécharger l'application</Button>
                  </Card.Body>
                  <Card.Footer className="text-muted">version de l'application {version}</Card.Footer>
                </Card>
              )
            })
          }
        </Col>
      </Row>
    </Container>
  );
}

export default App;
