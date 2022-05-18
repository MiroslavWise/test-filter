import React from 'react';
import { Table, Tag, Typography, Slider, Row, Col, InputNumber } from 'antd';

const {Text} = Typography
const courses = [
    { name: "Courses in England", prices: [0, 100] }, 
    { name: "Courses in Germany", prices: [512, null] }, 
    { name: "Courses in Italy", prices: [100, 200] }, 
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];
function App() {

  const [infoCurs, setInfoCurs] = React.useState(courses);
  

const columns = [
  {
    title: "Курсы",
    dataIndex: 'name',
    width: "50%"
  },
  {
    title: "Цена",
    dataIndex: 'prices',
    width: "50%",
    render: price=> {
      // if (Math.max(...price) === 0 && Math.min(...price) === 0) {return 'Нет курса'}
      return<><Text>От:</Text> <Tag color='green'>{Math.min(...price)}</Tag> до: <Tag color='red'>{Math.max(...price)}</Tag></>
    }
  }
]
  const [price, setPrice] = React.useState([Math.min(...courses.map(item=>item.prices).flat()) ,Math.max(...courses.map(item=>item.prices).flat())])
  const onChange = (value) =>{
    setInfoCurs(courses.filter(item=> item.prices[0] >= value[0] && item.prices[1] <= value[1]))
    setPrice(value)}  
  return (
    <>
    <Row style={{width: '100%', marginTop: 30}} justify='center'>
      <Col span={2  }>Стоимость курса:</Col>
      <Col span={6}><Slider 
        range 
        onChange={onChange}
        value={price}
        min={Math.min(...courses.map(item=>item.prices).flat())}
        max={Math.max(...courses.map(item=>item.prices).flat())}
        defaultValue={[Math.min(...courses.map(item=>item.prices).flat()), Math.max(...courses.map(item=>item.prices).flat())]} 
        style={{width: 400}}/></Col>
      <Col span={3}>
        Минимум:
        <InputNumber 
          value={price[0]} 
          type={'number'} 
          controls={false}
          readOnly
        >
        </InputNumber>
      </Col>
      <Col span ={4}>
        Максимум:
        <InputNumber 
          value={price[1]} 
          type={'number'}
          controls={false}
          readOnly
        >
        </InputNumber>
      </Col>
    
    </Row>
    <Table
      style={{margin: 30}}
      rowKey={record => record.name}
      dataSource={infoCurs}
      columns={columns}
    ></Table>
    </>
  );
}

export default App;
