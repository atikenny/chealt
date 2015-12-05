EventFooter = React.createClass({
    attendance() {
        let attendanceClass = 'attendance';
        let attendance = this.props.guests.length + '';

        if (this.props.maxAttendance) {
            attendance += '/' + this.props.maxAttendance;

            if (this.props.guests.length > this.props.maxAttendance) {
                attendanceClass += ' above';
            }
        }

        if (this.props.minAttendance) {
            if (this.props.guests.length < this.props.minAttendance) {
                attendanceClass += ' below';
            }
        }

        return (
            <span className={attendanceClass}>{attendance}</span>
        );
    },
    activityListToggler() {
        if (this.props.activityList) {
            return (
                <TogglerButton
                    type='list22'
                    toggleFunction={this.props.toggleActivityList}
                    active={this.props.isActivityListShown} />
            );
        }
    },
    render() {
        return (
            <div className='footer row equal separated top'>
                <div className='figures-container'>
                    {this.attendance()}
                </div>
                <div className='controls-container'>
                    {this.activityListToggler()}
                    <TogglerButton
                        type='map'
                        toggleFunction={this.props.toggleMap}
                        active={this.props.isMapShown} />
                    <TogglerButton
                        type='bubbles4'
                        toggleFunction={this.props.toggleComments}
                        active={this.props.isCommentsShown} />
                </div>
            </div>
        );
    }
});