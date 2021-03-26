import React, { useEffect} from 'react';
import {connect} from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layouts/Preloader';
import PropTypes from 'prop-types';
import {getLogs} from '../../actions/logActions';


//destructoring logs and loading from log state and getLogs action
const Logs = ({log: {logs, loading}, getLogs}) => {

    useEffect(() => {
        getLogs();
        //eslint-disable-next-line
    }, []);

    if(loading || logs === null){
        return <Preloader />;
    }

    return (
        <ul className="collection with-header">
            <li className="collection-header">
                <h4 className="center">System Logs</h4>
            </li>
            {!loading && logs.length === 0 ?
                (<p className="center">No Logs to show..</p>) : (
                logs.map(log => <LogItem log={log} key={log.id}/>)
            )}
        </ul>
    )
}

Logs.propTypes = {
    log: PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    log: state.log
});

//getLogs is the action we're running
export default connect(mapStateToProps, {getLogs})(Logs);
 