import Reat from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { Form, Input} from 'antd';
import { useState } from 'react';

function UserForm({form}){
    const [fname,setFname]=useState("")
    const [lame,setLname]=useState("")
    const [email,setEmail]=useState("")
    const [num,setNum]=useState("")

    return(
        <div className="ps-form__content">
           
        <div className="form-group">
            <Form.Item
                label="First Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message:
                            'Please input your first name!',
                    },
                ]}>
                <Input
                    className="form-control"
                    type="text"
                    placeholder="Username or email address"
                    onChange={e=>setFname(e.target.value)}
                />
            </Form.Item>
        </div>
        <div className="form-group">
            <Form.Item
                label="Last Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message:
                            'Please input your last name!',
                    },
                ]}>
                <Input
                    className="form-control"
                    type="text"
                    placeholder="Username or email address"
                    onChange={e=>setLname(e.target.value)}
                />
            </Form.Item>
        </div>
        <div className="row">
            <div className="col-sm-12">
                <div className="form-group">
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please input your number!',
                            },
                        ]}>
                        <Input
                            className="form-control"
                            type="number"
                            placeholder="Enter your phone number"
                            onChange={e=>setNum(e.target.value)}
                        />
                    </Form.Item>
                </div>
            </div>
            <div className="col-sm-12">
                <div className="form-group">
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: false,
                                message:
                                    'Please input your username!',
                            },
                        ]}>
          
                        <Input
                            className="form-control"
                            type="text"
                            placeholder="Username or email address"
                            onChange={e=>setEmail(e.target.value)}
                          
                        />
                    </Form.Item> 
                </div> 

            </div>
        </div>
        {/* <div className="row">
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Birthday</label>
                    <DatePicker />
                </div>
            </div> */}
            {/* <div className="col-sm-6">
                <div className="form-group">
                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[
                            {
                                required: false,
                                message:
                                    'Please input your username!',
                            },
                        ]}>
                        <Radio.Group>
                            <Radio value="male">
                                Male
                            </Radio>
                            <Radio value="female">
                                Female
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
            </div> */}
        {/* </div> */}
        <div className="form-group submit">
            <button className="ps-btn">
                Update
            </button>
        </div>
        <div className="ps-form__header">
            <h3>Change Password</h3>
        </div>
        <div className="col-sm-12">
                <div className="form-group">
                    <label>*Current password :</label>
                    <input className="form-control"/>
                </div>
                <div className="form-group">
                    <label>*New password :</label>
                    <input className="form-control"/>
                </div>
                <div className="form-group">
                 <button className="ps-btn" type="button">
                Update
            </button>
        </div>
        </div>
    </div>
    )

 
}

export default UserForm