import { FC } from 'react'

interface Props {
  value: string
  onChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<Props> = ({ value, onChangeFunction }) => {
  return (
    <div>
      <label htmlFor='body'>Text:</label>
      <input type='text' id='body' name='body' required onChange={onChangeFunction} value={value} />
    </div>
  )
}

export default Input
