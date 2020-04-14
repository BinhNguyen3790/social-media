let db = {
  users: [
    {
      userId: 'XrJDGgiStKYzJhcBMoKPCD016vu1',
      email: 'user@gmail.com',
      handle: 'user',
      createAt: '2020-03-31T03:58:25.904Z',
      imageUrl: 'image/sdfdsf/dfd',
      bio: 'Hello, nice to meet you',
      website: 'user.com',
      location: 'London, UK'
    }
  ],
  screams: [
    {
      userHandle: 'user',
      body: 'this is a sample scream',
      createAt: '2020-03-31T03:58:25.904Z',
      likeCount: 5,
      commentCount: 3
    }
  ],
  comments: [
    {
      userHandle: 'user',
      screamId: 'ldasd93n3fn3',
      body: 'nice one mate',
      createAt: '2020-03-19T03:58:25.904Z'
    }
  ],
  notifications: [
    {
      recipient: 'user',
      sender: 'john',
      read: 'true | false',
      screamId: 'sa9af0383b8',
      type: 'like | comment',
      createAt: '2020-03-19T03:58:25.904Z'
    }
  ]
}

const userDetails = {
  // Redux data
  credentials: {
    userId: 'XrJDGgiStKYzJhcBMoKPCD016vu1',
    email: 'user@email.com',
    handle: 'user',
    createAt: '2020-03-31T03:58:25.904Z',
    imageUrl: 'image/dsfds/sdfd',
    bio: 'Hello, nice to meet you',
    website: 'user.com',
    location: 'London, UK'
  },
  likes: [
    {
      userHandle: 'user',
      screamId: 'SodFabXM2SWDw5EO0yAP',      
    },
    {
      userhandle: 'user',
      screamId: 'SodFabXM2SWDw5EO0yAP'
    }
  ]
}