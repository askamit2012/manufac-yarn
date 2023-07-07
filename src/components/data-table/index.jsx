import React, { useState } from 'react'

function index({data}) {
    const [headerData, setHeaderData] = useState(['Measure', 'class1', 'class2', 'class3']);
  return (
    <table style={{margin: "auto", marginTop: "20px"}}>
        <thead>
        <tr>
            {
                headerData?.map(item => <th key={Math.random()} style={{width: "100px", background: "pink" }}>{ item }</th>)
            }
        </tr>
        </thead>
        <tbody style={{width: '400px'}}>
            {
              data?.dataVal?.map((item, index) => <tr>
                <td style={{width: '100px', background: "#000", color: "#FFFFFF"}} > { data?.name } { Object.keys(data?.dataVal?.[index])[0] }</td>
                {Object.entries(data?.dataVal?.[index]).map(([key, value]) => (
                <>
                  <td style={{ width: '100px' , background: "#CCC", color: "white"}}>{value?.c1} </td>
                  <td style={{ width: '100px' , background: "#CCC", color: "white"}}>{value?.c2}</td>
                  <td style={{ width: '100px' , background: "#CCC", color: "white"}}>{ value?.c3 }</td>
                </>
                ))}
              </tr>)
            }
        </tbody>
        
    </table>
  )
}

export default index