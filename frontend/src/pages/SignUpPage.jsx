import { ShipWheelIcon } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import useSignUp from '../hooks/useSignUp'

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  // const queryClient = useQueryClient();
  // const { mutate: signupMutation, isPending, error } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: (data) => {
  //     toast.success('Account created successfully!');
  //     queryClient.invalidateQueries({ queryKey: ['authUser'] });
  //   },
  //   onError: (error) => {
  //     toast.error(error.response?.data?.message || 'Signup failed');
  //   }
  // });

  const {isPending, error, signupMutation} = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signUpData);
  }

  return (
    <div className='flex items-center justify-center h-screen p-4 sm:p-6 md:p-8'>
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        {/* signup form -left side */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          {/* logo */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className='size-9 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-t from-primary to-secondary tracking-wider'>Chatter</span>
          </div>

          {/* Error message if any */}
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className='w-full'>
            <form onSubmit={handleSignup}>
              <div className='space-y-4'>
                <h2 className='text-xl font-semi-bold'>Create an account</h2>
                <p className='text-sm opacity-70'>
                  Join the Chatter community today and start your language journey!
                </p>
              </div>

              {/* Name */}
              <div className='space-y-3'>
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Full Name</span>
                  </label>
                  <input type='text'
                    placeholder='John Doe'
                    className='input input-bordered w-full'
                    value={signUpData.fullName}
                    onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                    required
                  />
                </div>

                {/* Email */}
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input type='email'
                    placeholder='john.doe@example.com'
                    className='input input-bordered w-full'
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    required
                  />
                </div>

                {/* Password */}
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Password</span>
                  </label>
                  <input type='password'
                    placeholder='••••••••'
                    className='input input-bordered w-full'
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    required
                  />
                  <p className='text-xs opacity-70 mt-1'>
                    Password must be at least 6 characters long.
                  </p>
                </div>

                {/* Terms and Condition */}
                <div className='form-control w-full'>
                  <label className='label cursor-pointer justify-start gap-2'>
                    <input type='checkbox' className='checkbox checkbox-sm' required />
                    <span className='text-xs leading-tight label-text'>I agree to the {' '}
                      <span className='text-primary hover:underline'>terms of service</span> and {' '}
                      <span className='text-primary hover:underline'>privacy policy</span>
                    </span>
                  </label>
                </div>
              </div>
              {/* Submit Button */}
              <button type='submit' className='btn btn-primary w-full'>
                {isPending ? (
                  <>
                    <span className='loading loading-spinner loading-sm'></span>
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>

              <div className='text-center mt-4'>
                <p className='text-sm'>
                  Already have an account? {' '}
                  <Link to='/login' className='text-primary hover:underline'>Sign in</Link>
                </p>

              </div>
            </form>
          </div>
        </div>

        {/* signup form - right side */}
        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
          <div className='max-w-md p-8'>
            {/* Illustration */}
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img src='../../public/call.svg' alt='Illustration' className='w-full h-full' />
            </div>

            <div className='text-center space-y-3 mt-6'>
              <h2 className='text-xl font-semibold'>Connect with language partners worldwide</h2>
              <p className='opacity-70'>
                Practice conversations, make friends, and improve your language skills together.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default SignUpPage