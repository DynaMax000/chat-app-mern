import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CameraIcon, ShuffleIcon, MapPinIcon, ShipWheelIcon, LoaderIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuthUser from '../hooks/useAuthUser';
import { completeOnboarding } from '../lib/api';
import { LANGUAGES } from '../constants';

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    location: authUser?.location || '',
    profilePic: authUser?.profilePic || '',
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success('Onboarding completed successfully!');
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onboardingMutation(formState);
  }

  const handleRandomAvatar = () => {
    const index = Math.floor(Math.random() * 100) + 1;
    const randomAvatarUrl = `https://avatar.iran.liara.run/public/${index}.png`;
    setFormState({ ...formState, profilePic: randomAvatarUrl });
    toast.success('Random avatar generated!');
  }

  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete Your Profile</h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Profile pic container */}
            <div className='flex flex-col items-center justify-center space-y-4'>
              {/* Image preview */}
              <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt='Profile Preview'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <CameraIcon className='size-12 text-base-content opacity-40' />
                  </div>
                )}
              </div>

              {/* Generate Random Avatar Btn */}
              <div className='flex items-center gap-2'>
                <button type='button' className='btn btn-accent' onClick={handleRandomAvatar}><ShuffleIcon className='size-4 mr-2' />Generate Random Avatar</button>
              </div>
            </div>

            {/* full name */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Full Name</span>
              </label>
              <input
                type='text'
                name='fullName'
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className='input input-bordered w-full'
                placeholder='Your full name'
              />
            </div>

            {/* bio */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Bio</span>
              </label>
              <textarea
                name='bio'
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className='textarea textarea-bordered h-24'
                placeholder='Tell others about yourself and your language learning goals.'
              />
            </div>

            {/* Native Language */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Native Language</span>
                </label>
                <select
                  name='nativeLanguage'
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className='select select-bordered w-full'
                >
                  <option value=''>Select your native language</option>
                  {LANGUAGES.map((language) => (
                    <option key={`native-${language}`} value={language.toLowerCase()}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Learning Language</span>
                </label>
                <select
                  name='learningLanguage'
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className='select select-bordered w-full'
                >
                  <option value=''>Select your learning language</option>
                  {LANGUAGES.map((language) => (
                    <option key={`learning-${language}`} value={language.toLowerCase()}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Location</span>
              </label>
              <div className='relative'>
                <MapPinIcon className='absolute top-1/2 transform -translate-y-1/2 left-3 size-5' />
                <input
                  type='text'
                  name='location'
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className='input input-bordered w-full pl-10'
                  placeholder='City, Country'
                />
              </div>
            </div>


            {/* Submit button */}
            <button className='btn btn-primary w-full' disabled={isPending} type='Submit'>
              {!isPending ? (
                <>
                  <ShipWheelIcon className='size-5 mr-2' />
                  Complete Onboarding
                </>

              ) : (
                <>
                  <LoaderIcon className='size-5 animate-spin mr-2' />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage