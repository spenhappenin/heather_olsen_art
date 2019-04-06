import React from "react";
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Header, } from "../../styles/shared";
import { Button, StyledContainer, } from "../../styles/shared";
import { Form, Segment, } from "semantic-ui-react";

class Login extends React.Component {
  state = { email: "", password: "", };

  handleChange = (e) => {
    const { id , value, } = e.target;
    this.setState({ [id]: value, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history, } = this.props;
    const { email, password, } = this.state;
    this.props.auth.handleLogin({ email, password, }, history);
  }

  render() {
    const { email, password, } = this.state;

    return(
      <Segment as={StyledContainer} basic>
        <Header primary>Admin Login</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Email</label>
            <input
              autoFocus
              required
              id="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              required
              id="password"
              value={password}
              placeholder="Password"
              type="password"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Segment textAlign="center" basic>
            <Button type="submit">Submit</Button>
          </Segment>
        </Form>
      </Segment>
    );
  }
}

const ConnectedLogin = (props) => (
  <AuthConsumer>
    { auth => <Login { ...props } auth={auth} /> }
  </AuthConsumer>
)

export default ConnectedLogin;
