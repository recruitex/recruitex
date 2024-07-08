'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { api } from '~/trpc/react';

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState('');
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName('');
    },
  });

  return (
    <div className="w-full max-w-xs">
      <p className="truncate">Your most recent post: {latestPost.name}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <Button
          variant="secondary"
          type="submit"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
