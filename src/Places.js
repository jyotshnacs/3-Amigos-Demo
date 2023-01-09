import { Card, CardGroup, Button, Container, Row, Col } from "react-bootstrap";

const Places = ({ places }) => {
  //const { features, geo } = places;
  const styles = {
    card: {
      padding: "0.5rem",
    },
    cardImage: {
      objectFit: "cover",
      borderRadius: 10,
      width: "20vw",
      height: "20vh",
    },
  };

  return (
    <Row xs={1} md={4} className="g-4">
      {places &&
        places.map(
          (place, index) =>
            place.xid &&
            place.name &&
            place.preview &&
            place.wikipedia_extracts && (
              <Col>
                <Card style={styles.card} key={index}>
                  <Card.Body>
                    <Card.Title> {place.name}</Card.Title>
                    {/* <Card.Img
                      src={place.preview.source}               
                    ></Card.Img> */}
                    <Card.Subtitle className="mb-2 text-muted">
                      {place.address.city},
                      {place.address.country_code.toUpperCase()}
                    </Card.Subtitle>

                    <Card.Img
                      variant="top"
                      src={place.preview.source}
                      style={styles.cardImage}
                    ></Card.Img>
                    {/* <Card.Text>{place.wikipedia_extracts.text}</Card.Text> */}
                    <Button
                      variant="primary"
                      target="_blank"
                      size="sm"
                      href={place.wikipedia}
                    >
                      Explore
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            )
        )}
    </Row>
  );
};

export default Places;
