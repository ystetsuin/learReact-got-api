import React, {Component} from 'react';
import '../styles/RandomChar.css';
import GotService from '../services/getResources';
import Spinner from './UI/Spinner';
import Error from './UI/Error';
export default class RandomChar extends Component {
    
    constructor() {
        super();
        this.id = setInterval(this.updateCharacter, 3000);
    }

    got = new GotService();
    state = { 
        char: {},
        loading: true,
        error: false,
    }
    
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        });
    }

    onError = (error) => {

        console.error(error);

        this.setState({
            error: true,
            loading: false,
        })
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random()*140 + 25);
        this.got.getCharacter(id)
            .then(char => this.onCharLoaded(char))
            .catch(error => this.onError(error));
    }

    componentDidMount = () => {
        this.updateCharacter();
    }

    componentWillUnmount = () => {
        clearInterval(this.id)
    }

    render() {

        const {char, loading, error} = this.state;
        
        const errorContent = (error) ? <Error/> : null
        const spinner = (loading) ? <Spinner/> : null
        const content = (!(loading || error)) ? <View char={char}/> : null;

        return (
            <div className="random-block rounded">
                {errorContent}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    );
}