import { FC } from 'react'

interface Props {
  value: string
  onChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
}

const Input: FC<Props> = ({ value, onChangeFunction, name }) => {
  return (
    <div>
      <label htmlFor={name}>{name}:</label>
      <input type='text' id={name} name={name} required onChange={onChangeFunction} value={value} />
    </div>
  )
}

export default Input
