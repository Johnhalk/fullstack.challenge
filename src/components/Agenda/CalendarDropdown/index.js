// @flow

import React from 'react'

import style from './style'

/**
 * Dropdown Select Component
 * Displays dropdown to select calendar display
 */
type tProps = {
    setSelectedCalendar: Function,
    sortedCalendars: array
    }

export default ({ setSelectedCalendar, sortedCalendars }: tProps) => {
  let i = 1
  return (<div className={style.header}>
    <select onChange={event => setSelectedCalendar(event.target.value)}>
      <option key={'All'} value='All'>All Calendars</option>
      {sortedCalendars.map(({ calendar }) => (
        <option key={calendar.id} value={calendar.id}>Calendar {i++}</option>
      ))}
    </select>
  </div>)
}
