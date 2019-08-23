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
      agendaEventsByDepartment,
      sortedCalendars,
      setSelectedCalendar,
      sortByDepartment,
    } = this.props.store

    const orderedEventsByDepartmentList = Object.keys(agendaEventsByDepartment).map((key) => {
      const department = (key === 'undefined') ? 'No department' : key
      return (
        <div key={department} className={style.eventLists}>
          {department}
          {agendaEventsByDepartment[key].map(({ calendar, event }) => (
            <EventCell key={event.id} calendar={calendar} event={event} />
          ))}
        </div>
      )
    })

    const eventList = events.map(({ calendar, event }) => (
      <EventCell key={event.id} calendar={calendar} event={event} />
    ))

    return (
      <div className={style.outer}>
        <div className={style.container}>
          <div className={style.header}>
            <GreetingHeader greetingMessage={greetingMessage} />
            <CalendarDropdown setSelectedCalendar={setSelectedCalendar} sortedCalendars={sortedCalendars} />
          </div>

          <List>
            {sortByDepartment
              ? (orderedEventsByDepartmentList)
              : (eventList)
            }
          </List>
        </div>
      </div>
    )
  }
}

export default Agenda
