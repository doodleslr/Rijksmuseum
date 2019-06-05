import React from 'react'

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        text: 'Loading',
        id: 'loading'
        };
    }
    componentDidMount() {
        this.setState({ id: 'loading' })
        const stopper = this.state.text + '...';
        this.interval = window.setInterval(() => {
        this.state.text === stopper
            ? this.setState(() => ({ text: 'Loading' }))
            : this.setState((prevState) => ({ text: prevState.text + '.' }))
        }, 300)
    }
    componentWillUnmount() {
        this.setState({ id: '' })
        window.clearInterval(this.interval)
    }
    render() {
        return (
        <div id={this.state.id}>
            <p>{this.state.text}</p>
        </div>
        )
    }
}