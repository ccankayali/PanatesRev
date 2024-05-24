import React from 'react';
import './profile.css';
import { AuthContext } from '../../Context/auth-context';
import { EditOutlined, CheckOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Input } from 'antd';
import { useState } from 'react';

export default function Profile() {
    const { isAuthenticated, userData, cartItemCount } = React.useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState(userData?.name || '');

    const { Meta } = Card;

    const name = userData?.name || 'Name not available';
    const email = userData?.email || 'Email not available';
    let role = userData?.role || 'Role not available';

    if (role === 1) {
        role = 'Satıcı';
    } else {
        role = 'Kullanıcı';
    }

    const handleUpdateName = async () => {
        try {
            const response = await fetch(`http://localhost:3000/auth/${userData._id}/update-providerName`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newName,
                }),
            });
            const data = await response.json();
            console.log(data);
            window.location.reload();
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={"https://pbs.twimg.com/media/Ec36zzJXsAEAL4J.jpg"} alt="Default profile" className="profile-photo" />
                <h1 className="profile-name">{name}</h1>
            </div>
            <div className="profile-info">
                <Card
                    style={{ width: "100%", marginTop: 16 }}
                    className="custom-card"
                >
                    <Meta
                        title={
                            <div className="card-title">
                                {editMode ? (
                                    <div style={{ display: 'flex', flexDirection: 'column',justifyContent:"center", width: '40%' }}>
                                        <Input
                                            size='large'
                                            placeholder="Yeni İsmi Giriniz"
                                            prefix={<UserOutlined />}
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            onPressEnter={handleUpdateName}
                                            onBlur={handleUpdateName}
                                            style={{ width: '100%' }}
                                        />
                                        <div style={{ width: "15%", marginTop: 8, }}>
                                            <button onClick={handleUpdateName} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <CheckOutlined />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div>
                                            <strong>İsim:</strong> {name}
                                            <EditOutlined
                                                key="edit"
                                                className="edit-icon"
                                                onClick={() => setEditMode(true)}
                                                style={{ marginLeft: 8 }}
                                            />
                                        </div>
                                    </div>
                                )}
                                <br />
                                <div><strong>Email:</strong> {email}</div>
                                <br />
                                <div><strong>Kullanıcı Rolü:</strong> {role}</div> 
                            </div>
                            
                        }
                        
                    />
                </Card>
            </div>
        </div>
    );
}
