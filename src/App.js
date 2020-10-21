import React, { useState } from 'react'
import InputReadOnly from './components/InputReadOnly'
import { calculateSalaryFrom } from './salary'

function App() {
  const [data, setData] = useState({
    salary: 0,
    baseINSS: 0,
    baseIRPF: 0,
    discountINSS: 0,
    discountIRPF: 0,
    netSalary: 0
  })

  const [percents, setPercents] = useState({
    inss: 0,
    irpf: 0,
    net: 0
  })

  const changeSalary = async (event) => {
    const newSalary = event.target.value
    const calculatedData = calculateSalaryFrom(isNaN(newSalary) ? 0 : newSalary)

    setData({ ...calculatedData, salary: newSalary })
    setPercents({
      inss: (calculatedData.discountINSS / newSalary * 100),
      irpf: (calculatedData.discountIRPF / newSalary * 100),
      net: (calculatedData.netSalary / newSalary * 100)
    })
  }

  return (
    <div className='app'>
      <header className='center'>
        <h1>React Salário</h1>
        <div className='form-control'>
          <label>Salário bruto</label>
          <input type='text' placeholder='Salário bruto' onChange={changeSalary} value={data.salary} />
        </div>
      </header>

      <div className='board'>
        <InputReadOnly label='Base INSS' value={data.baseINSS} />
        <InputReadOnly label='Desconto INSS' value={data.discountINSS} color='yellow' percent={percents.inss} />
        <InputReadOnly label='Base IRPF' value={data.baseIRPF} />
        <InputReadOnly label='Desconto IRPF' value={data.discountIRPF} color='red' percent={percents.irpf} />
      </div>

      <div className='bar'>
        <div className='yellow' style={{ width: '' + percents.inss + '%' }}></div>
        <div className='red' style={{ width: '' + percents.irpf + '%' }}></div>
        <div className='green' style={{ width: '' + percents.net + '%' }}></div>
      </div>

      <div className='center'>
        <InputReadOnly label='Salário líquido' value={data.netSalary} percent={percents.net} color='green' />
      </div>
    </div>
  )
}

export default App
