import { h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import { loadSessions, mergeSessions, getNextStartTimeMillis } from './api';
import { Context } from '../../context';
import { Card, CardBody, CardFooter, CardSubtitle, CardTitle } from '../../Card';
import ActivityType from '../ActivityType/ActivityType';
import MoveMinutes from '../MoveMinutes/MoveMinutes';
import Distance from '../Distance/Distance';
import HeartPoints from '../HeartPoints/HeartPoints';
import Button from '../../Button/Button';

const Sessions = () => {
  const { dateFormat, googleUser, googleSessions, setGoogleSessions, timeFormat } = useContext(Context);
  const accessToken = googleUser && googleUser.getAuthResponse(true).access_token;
  const [nextStartTimeMillis, setNextStartTimeMillis] = useState();

  useEffect(() => {
    if (accessToken) {
      (async () => {
        const sessions = await loadSessions(accessToken);

        setGoogleSessions(sessions);
      })()
    }
  }, [accessToken, setGoogleSessions]);

  useEffect(() => {
    if (googleSessions) {
      setNextStartTimeMillis(googleSessions.slice(-1)[0].startTimeMillis);
    }
  }, [googleSessions]);

  const loadNewSessions = async (accessToken, startTimeMillis) => {
    const newSessions = await loadSessions(accessToken, startTimeMillis);

    if (!newSessions.length) {
      // if there are no sessions, we adjust the load more time interval
      setNextStartTimeMillis(getNextStartTimeMillis(nextStartTimeMillis));
    } else {
      const mergedSessions = mergeSessions(googleSessions, newSessions);

      setGoogleSessions(mergedSessions);
    }
  };

  return (
    googleSessions && (
      <>
        {googleSessions.map(({ endTimeMillis, id, name, startTime, startTimeMillis, activityType }) => (
          <Card key={id}>
            <CardBody>
              <CardTitle>
                <h2>{new Intl.DateTimeFormat('default', dateFormat).format(startTime)}</h2>
                <div>{new Intl.DateTimeFormat('default', timeFormat).format(startTime)}</div>
              </CardTitle>
              <CardSubtitle>
                <div>
                  <Distance startTimeMillis={startTimeMillis} endTimeMillis={endTimeMillis} />
                  {' in '}
                  <MoveMinutes startTimeMillis={startTimeMillis} endTimeMillis={endTimeMillis} />
                </div>
                <div>
                  <HeartPoints startTimeMillis={startTimeMillis} endTimeMillis={endTimeMillis} />
                </div>
              </CardSubtitle>
              <CardFooter>
                <div>{name}</div>
                <ActivityType type={activityType} />
              </CardFooter>
            </CardBody>
          </Card>
        ))}
        <div class="centered">
          <Button size="small" onClick={() => loadNewSessions(accessToken, nextStartTimeMillis)}>
            Load more
          </Button>
        </div>
      </>
    )
  );
};

export default Sessions;
