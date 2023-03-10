import { useState } from 'react'
import './App.css'
import { Button, Table, Modal, Input } from 'antd'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

function App() {

  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(false)
  const [dataSource, setDataSource] = useState([
    {
      id:1,
      name:"Amrit",
      email:'amrit@gmail.com',
      address:'Surrey , BC'
    },
    {
      id:2,
      name:"Jagga",
      email:'Jagga@gmail.com',
      address:'Salina, Punjab'
    },
    {
      id:3,
      name:"Heera",
      email:'heera@gmail.com',
      address:'Amritsar , Punjab'
    },
    {
      id:4,
      name:"Avtar",
      email:'avtar@gmail.com',
      address:'Surrey , BC'
    },
    {
      id:5,
      name:"Raju",
      email:'raju@gmail.com',
      address:'Surrey , BC'
    },
  ])
  const columns =[
    {
      key:"1",
      title:"ID",
      dataIndex:"id"
    },
    {
      key:"2",
      title:"Name",
      dataIndex:"name"
    },
    {
      key:"3",
      title:"Email",
      dataIndex:"email"
    },
    {
      key:"4",
      title:"Address",
      dataIndex:"address"
    },
    {
      key:"5",
      title:"Address",
      render:(record)=>{
        return<>
        <EditOutlined onClick={()=>{
          onEditStudent(record);
        }}/>
        <DeleteOutlined onClick={()=>{
          onDeleteStudent(record);
        }} style={{color:"seagreen", marginLeft: 12 }}/>
        </>
      }
    },
  ]

  const onAddStudent=()=>{
    const randomNumber = parseInt(Math.random()*1000)
    const newStudent = {
      id: randomNumber,
      name:"Nmae" + randomNumber,
      email: randomNumber + '@gmail.com',
      address:"Adress" + randomNumber,
    }
    setDataSource(pre=>{
      return [...pre, newStudent]
    });
  };

  const onDeleteStudent=(record)=>{
    Modal.confirm({
      title: "Are you sure, to delete the entry of this Student",
      okText:"Yes",
      okType:"danger",
      onOk:()=>{
        setDataSource((pre)=>{
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };

  const onEditStudent =(record) =>{
    setIsEditing(true);
    setEditingStudent({...record})
  };

  const resetEditing=()=>{
    setIsEditing(false);
    setEditingStudent(null);
  }

  return (
    <div className="App">
      <header className='App-header'>
        <Button onClick={onAddStudent}>Add New Student</Button>
        <Table columns={columns} dataSource={dataSource}> </Table>
        <Modal 
        title="Edit Student" 
        visible = {isEditing}
        okText="Save"
        onCancel={()=>{
          resetEditing()
        }}
        onOk ={()=>{
          setDataSource(pre=>{
            return pre.map(student =>{
              if(student.id === editingStudent.id){
                return editingStudent
              } else {
                return student;
              }
            })
          })
          resetEditing(false);
        }}
        >
          <Input value={editingStudent?.name} onChange={(e)=>{
            setEditingStudent(pre=>{
              return {...pre, name:e.target.value};
            });
          }}
          />
          <Input value={editingStudent?.email}onChange={(e)=>{
            setEditingStudent(pre=>{
              return {...pre, email:e.target.value};
            });
          }}
          />
          <Input value={editingStudent?.address}onChange={(e)=>{
            setEditingStudent(pre=>{
              return {...pre, address:e.target.value};
            });
          }}
          />
        </Modal>
      </header>
    </div>
  )
}

export default App
