import React from 'react';

class SplashPage extends React.Component {
  render(){
    return(
      <div className="container-fluid">
        <div clasName="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="heroImage vertical-center">
              <div className="col-xs-12 col-sm-6 col-md-12 col-lg-12">
                <div className="heroText">
                  <h1 className="heroHead">Start Coding Now!</h1>
                  <h3 className="herofooter">The easiest and best way to discover and save coding resources. </h3>
                  <button className="btn btn-primary heroButton" >Get Started Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="splitSection"></div>
        <div className="techContainer">
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 resourcePanels">
                <div className="thumbnail">
                  <img className="techImage" src="https://coderdojo.com/wp-content/uploads/2015/03/Ruby.png"  height="150px" alt="..." />
                  <div className="caption">
                    <h3>Discover Ruby</h3>
                    <p>Ruby is a dynamic, reflective, object-oriented, general-purpose programming language.</p>
                    <p><a href="#" className="btn btn-primary" role="button">Learn about Ruby</a></p>
                  </div>
              </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 resourcePanels">
                <div className="thumbnail">
                  <img className="techImage" src="http://www.w3devcampus.com/wp-content/uploads/logoAndOther/logo_JavaScript.png"  height="150px" alt="..." />
                  <div className="caption">
                    <h3>Discover JavaScript</h3>
                    <p>JavaScript is a high-level, dynamic, untyped, and interpreted programming language. </p>
                    <p><a href="#" className="btn btn-primary" role="button">Learn about JavaScript </a></p>
                  </div>
              </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 resourcePanels">
                <div className="thumbnail">
                  <img className="techImage" src="http://www.html5rocks.com/static/demos/svgmobile_fundamentals/images/html5-2048x1536.png"  height="150px" alt="..." />
                  <div className="caption">
                    <h3>Discover HTML</h3>
                    <p>HyperText Markup Language, commonly referred to as HTML, is the standard language used to create web pages.</p>
                    <p><a href="#" className="btn btn-primary" role="button">Learn about HTML </a></p>
                  </div>
              </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 resourcePanels">
                <div className="thumbnail">
                  <img className="techImage" src="https://coderdojo.com/wp-content/uploads/2015/03/Ruby.png"  height="150px" alt="..." />
                  <div className="caption">
                    <h3>Discover Ruby</h3>
                    <p>Ruby is a dynamic, reflective, object-oriented, general-purpose programming language.</p>
                    <p><a href="#" className="btn btn-primary" role="button">Learn about Ruby</a></p>
                  </div>
              </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 resourcePanels">
                <div className="thumbnail">
                  <img className="techImage" src="http://www.w3devcampus.com/wp-content/uploads/logoAndOther/logo_JavaScript.png"  height="150px" alt="..." />
                  <div className="caption">
                    <h3>Discover JavaScript</h3>
                    <p>JavaScript is a high-level, dynamic, untyped, and interpreted programming language. </p>
                    <p><a href="#" className="btn btn-primary" role="button">Learn about JavaScript </a></p>
                  </div>
              </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 resourcePanels">
                <div className="thumbnail">
                  <img className="techImage" src="http://www.html5rocks.com/static/demos/svgmobile_fundamentals/images/html5-2048x1536.png"  height="150px" alt="..." />
                  <div className="caption">
                    <h3>Discover HTML</h3>
                    <p>HyperText Markup Language, commonly referred to as HTML, is the standard language used to create web pages.</p>
                    <p><a href="#" className="btn btn-primary" role="button">Learn about HTML </a></p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}



export default SplashPage;
