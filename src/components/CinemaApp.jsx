import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import WidgetBot from '@widgetbot/react-embed';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Screen from './Screen.jsx';
import Schedule from './schedule/Schedule.jsx';

import CinemaConfig from '../../cinema.config.js';

class Cinema extends React.Component {
  constructor(props) {
    super(props);

    this.screen = React.createRef();
    this.schedule = React.createRef();
  }

  render () {
    const navLinks = [];
    for(let i = 0; i < CinemaConfig.nav_links.length; i++) {
      const navLink = CinemaConfig.nav_links[i];
      navLinks.push(
        <Nav.Link key={navLink.name} href={navLink.url} target="_blank">
          {navLink.name}
        </Nav.Link>
      );
    }

    return (
      <>
        <Navbar bg="dark" variant="dark" sticky="top">
          <Navbar.Brand>
            🍿 {CinemaConfig.cinema_name}
          </Navbar.Brand>
          <Nav>
            {navLinks}
          </Nav>
        </Navbar>
        <Container fluid={true} className="pt-3">
          <Row>
            <Col sm={9}>
              <Screen ref={this.screen} schedule={this.schedule} />
              <Schedule ref={this.schedule} screen={this.screen} />
            </Col>
            <Col sm={3} className="pb-2">
              <div className="cinema-sidebar-sticky">
                <WidgetBot 
                  server={CinemaConfig.discord_guild_id} 
                  channel={CinemaConfig.discord_channel_id}
                  width="100%" height="100%" 
                />
              </div>
            </Col>
          </Row>
          <footer className="m-3 text-center">Made with ❤️ by <a href="https://github.com/ketnipz" rel="noreferrer" target="_blank">Ben</a>.</footer>
        </Container>
      </>
    );
  }
}

export default Cinema;