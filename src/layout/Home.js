import React, { useState, useEffect } from "react";
import { Row, Container, Button, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Banner from "../components/Banner/Banner";
import HouseService from "../services/HouseService";
import "./Home.css";

const Home = () => {
  const [houses, setHouses] = useState(null);
  const [loading, setLoading] = useState(false);
  const randomPage = Math.floor(Math.random() * 10);
  const totalHouse = 6;
  const [filter, setFilter] = useState({
    size: totalHouse,
    page: randomPage,
  });

  useEffect(() => {
    setLoading(true);
    new HouseService().getHouses(filter).then((houses) => {
     if(houses ){
      setHouses(houses);
      setLoading(false);
     }
     else{
      setLoading(false);
     }
    });
  }, [filter]);

  return (
    <div>
      <Banner></Banner>
      <Container>
        <h1 className="text-header">Feature Properties</h1>
        {loading ? (
          <Loader></Loader>
        ) : (
          <Row>
            {houses &&
              houses.map((house, index) => {
                return (
                  <div className="col-md-6" key={index}>
                    <Card className="card-homepage">
                      <Link to={"/housedetail/" + String(house.id)}>
                        <Card.Img
                          className="card-homepage-img"
                          src={house.image}
                          alt="house"
                        />
                      </Link>
                      <Card.Body className="">
                        <Card.Title> {house.title}</Card.Title>
                        <Card.Text className="">
                          <Row>
                            <Col>
                              <span className="text-content">
                                {" "}
                                Price: {house.price} đ/ day
                              </span>
                            </Col>
                            <Col>
                              <span className="text-content">
                                Property size: {house.size} m &sup2;
                              </span>
                            </Col>
                          </Row>
                          <span className="text-content">
                            City: {house.city}
                          </span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </Row>
        )}
        <Row className="justify-content-md-center">
          <Link to="/listhouse">
            <Button variant="primary" className="btn-homepage" size="lg">
              View More
            </Button>
          </Link>
        </Row>
        <div className="feedback">
          <h1 className="text-header">What our clients are saying</h1>
          <div ClassName="feedback-content">
            <p>
              {" "}
              Non eu exercitation dolor consectetur anim non aliquip sunt qui.
              Esse consectetur eu sunt amet aliquip duis laborum do magna
              tempor. Occaecat cillum veniam veniam anim in. Sunt laborum ex
              dolore qui nisi ullamco. Tempor irure aliqua magna esse Lorem
              pariatur. Enim ex nisi qui consequat Lorem ex tempor aliquip
              eiusmod eu aliqua.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Home;
