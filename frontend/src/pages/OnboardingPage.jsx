import React from 'react'
import { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
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

  const [mutate:onboardingMutation, isPending] = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success('Onboarding completed successfully!');
    }
  })

  return (
    <div>OnboardingPage</div>
  )
}

export default OnboardingPage