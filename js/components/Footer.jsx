import React from 'react';
import '../../css/footer.css';
class Footer extends React.Component {
  render(){
    return(
      <div>
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-4 col-lg-4">
                <p className="text-muted">StartCoding.org is a free to use place where users may bookmark, save and share
                  the best resources on the web for learning how to code.
                </p>
                <p className="text-muted">Copyright © StartCoding.org 2016</p>
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4">
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4">
                <p className="text-muted">Built by:</p>
                <ul>
                  <li><a href="http://paulrichter.co/">Paul Richter</a></li>
                  <li><a href="https://babelthuap.github.io/">Nicholas Neumann-Chun</a></li>
                  <li><a href="http://www.robertsonsamuel.com/">Samuel Robertson</a></li>
                </ul>
              </div>
            </div>

          </div>
        </footer>
      </div>
    )
  }
}

export default Footer;
