import React                    from 'react';
import { connect }              from 'react-redux';

import CreateButton             from './create-button';
import { openEventCreator }     from '../actions/create-event';
import Event                    from './events/event.jsx';

const renderEvents = (events, canComment) => {
    return events.map((event) => (
        <Event
            key={event._id}
            event={event}
            canComment={canComment} />
    ));
};

const HomePage = ({ events, canComment, openEventCreator }) => (
    <div className='cards-container padded'>
        {renderEvents(events, canComment)}
        <CreateButton
            createMethod={openEventCreator} />
    </div>
);

const mapState = ({ events }, ownProps) => {
    const statefullEvents = ownProps.events.map((propEvent) => {
        const eventState = events.find(event => event.id === propEvent._id);
        
        return Object.assign({}, propEvent, eventState);
    });

    return {
        events: statefullEvents
    };
};

const mapDispatch = (dispatch) => {
    openEventCreator: () => {
        dispatch(openEventCreator());
    }
};

export default connect(mapState, mapDispatch)(HomePage);

HomePage.propTypes = {
    events: React.PropTypes.array
};
