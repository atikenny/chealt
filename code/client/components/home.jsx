Home = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            events: Events.find(transformFilterInput(this.props.filter)).fetch()
        };
    },
    renderEvents() {
        return this.data.events.map((event) => {
            return (
                <Event
                    key={event._id}
                    event={event}
                    isAdminMode={this.props.isAdminMode} />
            );
        });
    },
    render() {
        return (
            <div className='cards-container'>
                {this.renderEvents()}
            </div>
        );
    }
});

function transformFilterInput(input) {
    let transformedFilter = {};

    if (input) {
        const beginWithRegExp = (new RegExp(input, 'i'));

        transformedFilter = {
            $or: [
                { name: beginWithRegExp },
                { host: beginWithRegExp },
                { location: beginWithRegExp }
            ]
        };
    }

    return transformedFilter;
}