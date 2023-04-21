/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-redeclare */
import { useEffect } from 'react'
import Select from 'react-select'

const SelectType: React.FC<{ target: any, onChange: any, options: any }> = (props) => {
  const colourStyles = {
    menuList: (styles: any) => ({
      ...styles,
      background: '#333333',
      color: '#FFF'
    }),
    option: (styles: any) => ({
      ...styles,
      backgroundColor: '#333333',
      zIndex: 1
    }),
    menu: (base: any) => ({
      ...base,
      marginLeft: '25px',
      width: '550px',
      zIndex: 100
    }),
    control: (styles: any) => ({
      ...styles,
      width: '550px',
      backgroundColor: '#333333',
      border: 'none',
      borderRadius: '4px',
      boxShadow: 'none',
      margin: '10px 0 55px 25px'
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: '#FFF'
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(()=> { }, [props.options])

  return (
    <>
      <Select
        isSearchable={true}
        onChange={(e: any) => {
          props.onChange(e.value)
        }}
        options={props.options}
        value={props.target}
        styles={colourStyles}
        placeholder={'Selecione...'}
      />
    </>
  )
}

export default SelectType
