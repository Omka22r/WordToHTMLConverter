import React, { Component } from 'react';
import { Button, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Download, CodeSquare } from 'react-bootstrap-icons';
import PreviewModal from './PreviewModal';

const mammoth = require("mammoth");

class Converter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            html: null,
            newFile: null,
            showPreview: false,
            converting: false
        }
    }

    //Function to download converted HTML file
    download(filename, text) {
        console.log(text);
        var element = document.createElement('a');
        element.setAttribute('href', 'data: text/html, <html contenteditable>' +
            encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    //Function to convert Word file to HTML using mammoth library 
    parseWordDocxFile(files) {

        this.setState({ converting: true });
        var current = this;
        //console.log(files);
        var file = files[0];

        var reader = new FileReader();
        reader.onloadend = function (event) {
            var arrayBuffer = reader.result;

            mammoth.convertToHtml({ arrayBuffer: arrayBuffer }).then(
                function (resultObject) {
                    
                    const newDoc = document.implementation.createHTMLDocument('title');
                    newDoc.body.innerHTML = resultObject.value;
                    const converting = setTimeout(() => {
                        current.setState({ html: resultObject.value, newFile: { name: file.name, file: newDoc }, converting: false });
                    }, 2000);

                    return () => clearTimeout(converting);


                });
        };
        reader.readAsArrayBuffer(file);
    }

    render() {
        console.log(this.state.html);
        return (
            <Row style={{ maxHeight: '100vh' }} className="col-12 mt-5 m-0 p-0 d-flex flex-column">
                <Container  className="bg-light mt-4 p-5 d-flex text-dark flex-column justify-content-around col-lg-4 col-md-8">
                    <h3 className="text-warning" style={{ letterSpacing: 3 }}>Word to HTML Converter</h3>
                    <Form className="mt-4">
                        <Form.Group>
                            <Form.Control
                                type="file"
                                accept=".docx"
                                onChange={(e) => e.target.files.length > 0 ? this.parseWordDocxFile(e.target.files) : this.setState({ newFile: null })} />
                        </Form.Group>
                    </Form>


                    <Row className="justify-content-around">
                        {this.state.converting ?
                            <Spinner variant="warning" className="mx-auto" animation="border" size="lg"/>
                            :
                            <Row className="d-flex col-12 flex-row justify-content-between">
                                <Button style={{ letterSpacing: 2 }} size="md" disabled={this.state.newFile === null} variant="info" onClick={() => this.setState({ showPreview: true })} className="mt-3">
                                    Preview <CodeSquare className="ml-2" size={23} /></Button>
                                <Button style={{ letterSpacing: 2 }} size="md" disabled={this.state.newFile === null} variant="outline-secondary" className="mt-3"
                                    onClick={() => this.download(this.state.newFile.name.split('.').slice(0, -1).join('.'), this.state.html)} >
                                    Download <Download className="ml-2" size={23} /></Button>
                            </Row>}
                    </Row>
                    <PreviewModal
                        download={() => this.download(this.state.newFile.name.split('.').slice(0, -1).join('.'), this.state.html)}
                        visible={this.state.showPreview}
                        closeModal={() => this.setState({ showPreview: false })}
                        data={this.state.html}
                    />
                </Container>
            </Row>
        )
    }
}

export default Converter;