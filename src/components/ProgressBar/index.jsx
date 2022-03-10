import React from 'react'
import styled from 'styled-components'

export default function ProgressBar({ maxValue, value }) {
  console.log(typeof maxValue)
  let percent = parseInt((value / maxValue) * 100)
  console.log(percent)

  const containerStyles = {
    height: 30,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 50,
    //margin: 50,
  }

  const fillerStyles = {
    height: '100%',
    width: `${percent}%`,
    backgroundColor: '#FF8600',
    borderRadius: 'inherit',
    textAlign: 'right',
  }

  const labelStyles = {
    padding: 5,
    color: 'black',
    fontWeight: 'bold',
    fontSize: '20px',
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${percent}%`}</span>
      </div>
    </div>
  )
}
