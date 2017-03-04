import React, { Component } from 'react';
import Footer from '../components/common/Footer.js';
import Nav from '../components/common/Nav.js';
//import { Link } from 'react-router';
import '../style/homePage.scss';

class HomePage extends Component {

  render() {
    return (
      <div className='homePage'>
        <Nav />
        <div className='articles'>
          <section className='section'>
            <div className='columns is-gapless'>
              <div className='column is-2' />
              <div className='column is-8'>
                <article className="media">
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                        <br />
                        <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
              <div className='column is-2' />
            </div>
          </section>
          <section className='section'>
            <div className='columns is-gapless'>
              <div className='column is-2' />
              <div className='column is-8'>
                <article className="media">
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                        <br />
                        <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
              <div className='column is-2' />
            </div>
          </section>
          <section className='section'>
            <div className='columns is-gapless'>
              <div className='column is-2' />
              <div className='column is-8'>
                <article className="media">
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                        <br />
                        <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
              <div className='column is-2' />
            </div>
          </section>
        </div>

        <Footer />
      </div>
    );
  }
}

export default HomePage;
