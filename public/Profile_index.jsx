import React, { Component } from 'react';

// Include Profile styles here.
/**
* Define Profile component to display profile details.
*/

class Profile extends Component {
    render() {
        const data = this.props.data;
        return (
            <div className="profile">
                <h1>{data.name}</h1>
                <img src={data.imgUrl} />
                <div><b>My Hobbies</b></div>
                <Hobbies hobbyList={data.hobbyList}/>
            </div>
        );
    }
}

const Hobbies = ({hobbyList})=>{
    // Map hobbies array to list of hobbies UI.
    return <ul>{
        hobbyList.map((hobbie, i)=>
            <li key={i}>
                {hobbie}
            </li>
        )
    }</ul>
}

export default Profile;