import React, { Component } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { Download, CodeSquare } from 'react-bootstrap-icons';

class PreviewModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        console.log(this.state.html);
        return (
            <Modal
                size="lg"
                //aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => this.props.closeModal()}
                show={this.props.visible}
            >
                <Modal.Header closeButton>
                    <Modal.Title >
                        Preview
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container
                        style={{ maxHeight: '100vh', overflowY: 'scroll' }}
                        className="col-12 mx-auto p-0 m-0"
                        dangerouslySetInnerHTML={{ __html: this.props.data }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ letterSpacing: 2 }} size="md" variant="outline-secondary" className="mr-3"
                    onClick={() => this.props.download()} 
                    >
                        Download {<Download className="ml-3" size={23} />}
                    </Button>
                    <Button style={{ letterSpacing: 2 }} size="md" onClick={() => this.props.closeModal()}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default PreviewModal;

