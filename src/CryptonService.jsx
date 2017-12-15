import React, {Component} from "react";
import {Row, Col, Button, Glyphicon, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");

class CryptonService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            encyrptedMessage: "",
            password: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.encrypt = this.encrypt.bind(this);
        this.decrypt = this.decrypt.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = event.target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        console.log(this.state);
    }

    encrypt(event) {
        this.setState({
            encryptedMessage: AES.encrypt(this.state.message, this.state.password)
        });
    }

    decrypt(event) {
        this.setState({
            message: AES.decrypt(CryptoJS.enc.Base64.parse(this.state.encyrptedMessage), this.state.password).toString(CryptoJS.enc.Utf8)
        });
    }

    render() {
        return (
            <main>
                <div>
                    <h2>Service</h2>
                    <hr/>
                </div>
                <div className="container">
                    <Row>
                        <Col sm={12}>
                            <FormGroup controlId="encryptor">
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    placeholder="Enter Password"
                                    onChange={this.handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={5}>
                            <FormGroup controlId="encryptor">
                                <ControlLabel>Plain text</ControlLabel>
                                <FormControl
                                    name="message"
                                    componentClass="textarea"
                                    value={this.state.message}
                                    placeholder="Enter message"
                                    rows="12"
                                    onChange={this.handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={2}>
                            <Button
                                bsStyle="primary"
                                bsSize="large"
                                block
                                onClick={this.encrypt}
                            >
                                <Glyphicon glyph="lock" /> Encrypt
                            </Button>
                            <Button
                                bsStyle="success"
                                bsSize="large"
                                block
                                onClick={this.decrypt}
                            >
                                <Glyphicon glyph="info-sign" /> Decrypt
                            </Button>
                        </Col>
                        <Col sm={5}>
                            <FormGroup controlId="decryptor">
                                <ControlLabel>Encrypted message</ControlLabel>
                                <FormControl
                                    name="encryptedMessage"
                                    componentClass="textarea"
                                    value={this.state.encryptedMessage}
                                    placeholder="Enter encrypted message"
                                    rows="12"
                                    onChange={this.handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
            </main>
        );
    }
}

export default CryptonService;