function Contact() {
    return (
        <section className="hero is-primary is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="columns is-8 is-variable ">
                        <div className="column is-two-thirds has-text-left">
                            <h1 className="title is-1" style={{"color": "white"}}>Contact Us</h1>
                            <p className="subtitle is-size-5" style={{"color": "white"}}><em>Feel free to reach out using any of the following channels</em>...</p>
                            <div className="social-media">
                                <a href="https://facebook.com" style={{"marginRight": "10px"}} className="button is-light is-large"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
                                <a href="https://instagram.com" style={{"marginRight": "10px"}} className="button is-light is-large"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                                <a href="https://twitter.com" style={{"marginRight": "10px"}} className="button is-light is-large"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <div className="column is-one-third has-text-left">
                            <div className="field">
                                <label className="label" style={{"color": "white"}}>Name</label>
                                <div className="control">
                                    <input className="input is-medium" type="text"/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{"color": "white"}}>Email</label>
                                <div className="control">
                                    <input className="input is-medium" type="text"/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{"color": "white"}}>Message</label>
                                <div className="control">
                                    <textarea className="textarea is-medium"></textarea>
                                </div>
                            </div>
                            <div className="control">
                                <button type="submit" className="button is-success is-link is-fullwidth has-text-weight-medium is-medium">Send Message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
	    </section>
    );
}

export default Contact;