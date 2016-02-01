import React from 'react';

let catagories = [
  {
    name: "Ruby",
    short: "Ruby is a dynamic, reflective, object-oriented, general-purpose programming language.",
    href: "#/ruby",
    imgSrc: "https://coderdojo.com/wp-content/uploads/2015/03/Ruby.png",
  },
  {
    name: "JavaScript",
    short: "JavaScript is a high-level, dynamic, untyped, and interpreted programming language. ",
    href: "#/javascript",
    imgSrc: "http://www.w3devcampus.com/wp-content/uploads/logoAndOther/logo_JavaScript.png",
  },
  {
    name: "HTML",
    short: "HyperText Markup Language (HTML), is the language used to create web pages.",
    href: "#/html",
    imgSrc: "http://www.html5rocks.com/static/demos/svgmobile_fundamentals/images/html5-2048x1536.png",
  },
  {
    name: "Python",
    short: "Python is a widely used general-purpose, high-level programming language.",
    href: "#/python",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1024px-Python-logo-notext.svg.png",
  },
  {
    name: "Go",
    short: "Go also commonly referred to as golang, is a open source programming language developed at Google.",
    href: "#/go",
    imgSrc: "https://blog.golang.org/gopher/gopher.png",
  },
  {
    name: "Swift",
    short: "Swift is a multi-paradigm, compiled programming language created for iOS and OS X by Apple Inc.",
    href: "#/swift",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Swift_logo.svg/2000px-Swift_logo.svg.png",
  }
];

class SplashPage extends React.Component {
  getStartedClickHandler() {
    $('html,body').animate({
      scrollTop: $('.resourcePanels:first-child').offset().top
    }, 300);
  }
  render(){
    let resourcePanels = catagories.map( (category, i) => {
      return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 resourcePanels"  key={i} id={category}>
          <div className="thumbnail">
            <a href={category.href}><img className="techImage" src={category.imgSrc}  height="150px" alt="..." /></a>
            <div className="caption">
              <h3>{category.name}</h3>
              <p>{category.short}</p>
              <p><a href={category.href} className="btn btn-primary" role="button">Learn about {category.name}</a></p>
            </div>
          </div>
        </div>
      )
    })
    return(
      <div className="container-fluid">
        <div clasName="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="heroImage vertical-center">
              <div className="col-xs-12 col-sm-6 col-md-12 col-lg-12">
                <div className="heroText">
                  <h1 className="heroHead">Start Coding Now!</h1>
                  <h3 className="herofooter">The easiest and best way to discover and share coding resources. </h3>
                  <button className="btn btn-primary heroButton" onClick={this.getStartedClickHandler}>Get Started Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="splitSection"></div>
        <div id="techContainer" className="techContainer col-lg-10 col-lg-offset-1">
          {resourcePanels}
        </div>
      </div>
    )
  }
}



export default SplashPage;
