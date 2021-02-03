import CardList from '../components/CardList';
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundry'
import { Component } from 'react';
import './App.css'

//Any component that uses 'state' has to be a class
class App extends Component {
    constructor() {
        super();
        this.state = {
            // robots: robots,
            robots: [],
            searchfield: ''        
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots: users }));
    }

    //Always use arrow functions on events passed to other components
    //change the state field value to whatever is on the searchbox
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    render() {
        const { robots, searchfield } = this.state;

        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })

        if (!robots.length) {
            return <h1 className='tc'>Loading...</h1>
        } else {
            return(
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundary>
                    </Scroll>
                </div>
            )}
    }
}

export default App;


// const App = () => {
//     return(
//         <div className='tc'>
//             <h1>RoboFriends</h1>
//             <SearchBox />
//             <CardList robots={robots} />
//         </div>
//     );
// }