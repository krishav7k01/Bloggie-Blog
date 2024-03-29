import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const OAuth = () => {

    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' }) //everthing spmeone have to login should selwect a account

        try{
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/v1/api/user/google', {
                method: 'POST',
                headers : { 'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                })
            })

            const data = await res.json()
            if(data.success === true)
            {
                dispatch(signInSuccess(data.data.user))
                navigate('/')
            }

        }
        catch(error){
            console.log("error")

        }
    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
  )
}

export default OAuth
