import { useContext } from 'react'
import { Context } from "../context";
const Profile = () => {
    const { user } = useContext(Context);
    return (
        <div>
            Welcome back, {user.name}!
        </div>
    )
}

export default Profile