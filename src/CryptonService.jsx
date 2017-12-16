import React, {Component} from "react";
import {Row, Col, Button, Glyphicon, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");
const passwordGenerator = require("generate-password");

class CryptonService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            encryptedMessage: "",
            password: "",
            passwordType: "password"
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
        // console.log(this.state);
    }

    showPassword() {
        if (this.state.passwordType === "password") {
            this.setState({passwordType: "text"});
        } else {
            this.setState({passwordType: "password"});
        }
    }

    generatePassword() {
        this.setState({
            password: passwordGenerator.generate({
                length: 18,
                numbers: true,
                symbols: true,
                excludeSimilarCharacters: true,
                strict: true
            })
        });
    }

    encrypt() {
        this.setState({
            encryptedMessage: AES.encrypt(this.state.message, this.state.password).toString()
        });
    }

    decrypt() {
        let decrypted = AES.decrypt(this.state.encryptedMessage, this.state.password).toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            decrypted = "Decryption failed! You're using an incorrect password.";
        }
        this.setState({
            message: decrypted
        });
    }

    render() {
        function ShowPwdBtn(props) {
            if (props.passwordType === "password") {
                return (
                    <Button bsStyle="info" onClick={props.onClick}>
                        <Glyphicon glyph="eye-open"/> Show password
                    </Button>
                );
            } else {
                return (
                    <Button bsStyle="info" onClick={props.onClick}>
                        <Glyphicon glyph="eye-close"/> Hide password
                    </Button>
                );
            }

        }
        return (
            <main>
                <div className="container">
                    <Row>
                        <Col sm={12}>
                            <FormGroup controlId="encryptor">
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    name="password"
                                    type={this.state.passwordType}
                                    value={this.state.password}
                                    placeholder="Enter Password"
                                    onChange={this.handleInputChange}
                                />
                            </FormGroup>
                            <ShowPwdBtn onClick={this.showPassword.bind(this)} passwordType={this.state.passwordType} />
                            <span style={{marginRight: "10px"}}></span>
                            <Button bsStyle="default" onClick={this.generatePassword.bind(this)}>
                                Generate password
                            </Button>
                            <div style={{marginBottom:"20px"}}></div>
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
                            <div style={{marginTop: "30px"}}></div>
                            <Button
                                bsStyle="primary"
                                bsSize="large"
                                block
                                onClick={this.encrypt}
                            >
                                <Glyphicon glyph="lock" /> Encrypt
                            </Button>
                            <hr/>
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