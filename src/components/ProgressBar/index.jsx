import React from 'react'

export default function ProgressBar({ maxValue, value }) {
  let percent = parseInt((value / maxValue) * 100)

  const containerStyles = {
    height: '20%',
    width: '60%',
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
    padding: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: '15px',
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${percent}%`}</span>
      </div>
    </div>
  )
}
