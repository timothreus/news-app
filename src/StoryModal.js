import React from 'react';
import { Modal, Button } from 'react-bootstrap'
var extractor = require('article-extractor');



class StoryModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      link: nextProps.link,
      content: nextProps.link, //TODO this is silly
      show: nextProps.show
    });
  }

  callback = (err, data) => {
    const contentHtml = <div dangerouslySetInnerHTML={{ __html: data.content }} />

    this.setState({ content: contentHtml });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {

    if (this.state.content) {
      const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
      extractor.extractData(CORS_PROXY + this.state.content, this.callback);
    }


    return (
      <div>


        <Modal bsSize="large" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Original source: <a href = {this.state.link} target="_blank">{this.state.link}</a> </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.content}

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default StoryModal;