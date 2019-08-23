// @flow

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import GreetingHeader from './GreetingHeader'
import CalendarDropdown from './CalendarDropdown'
import List from './List'
import EventCell from './EventCell'

import style from './style'
import AgendaStore from './AgendaStore'

/**
 * Agenda component
 * Displays greeting (depending on time of day)
 * and list of calendar events
 */

type tProps = {
  store: AgendaStore
}

@inject('store')
@observer
class Agenda extends Component<tProps> {
  render () {
    const {
      greetingMessage,
      events,
      sortedCalendars,
      setSelectedCalendar,
    } = this.props.store
    return (
      <div className={style.outer}>
        <div className={style.container}>
          <GreetingHeader greetingMessage={greetingMessage} />
          <CalendarDropdown setSelectedCalendar={setSelectedCalendar} sortedCalendars={sortedCalendars} />
          <List>
            {events.map(({ calendar, event }) => (
              <EventCell key={event.id} calendar={calendar} event={event} />
            ))}
          </List>

        </div>
      </div>
    )
  }
}

export default Agenda
