import { useState } from 'react'

type InputChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [form, setForm] = useState<T>(initialValues)

  const handleChange = (eOrValue: InputChangeEvent | any, fieldName?: keyof T) => {
    if (fieldName !== undefined) {
      // Custom input (e.g., HeroUI Switch/Select)
      setForm((prev) => ({ ...prev, [fieldName]: eOrValue }))
      return
    }

    const e = eOrValue as InputChangeEvent
    const target = e.target
    const name = target.name as keyof T

    if (!name) return

    let value: any

    if (
      target instanceof HTMLInputElement &&
      (target.type === 'checkbox' || target.type === 'radio')
    ) {
      value = target.checked
    } else {
      value = target.value
    }

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => setForm(initialValues)

  return { form, setForm, handleChange, resetForm }
}
