export let Gigs = 
[      
    {
         "id":1,
         "isCanceled":false,
         "artist":{
            "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
            "name":"Bruno Avelar"
         },
         "datetime":"2017-01-02T22:00:00",
         "venue":"NYC",
         "genre":{
            "id":3,
            "name":"Rock"
         },
         "attendances":[
            {
               "gigId":1,
               "attendeeId":"2e530ed5-f088-434f-8d31-9a59aa75c971"
            },
            {
               "gigId":1,
               "attendeeId":"94cd5e02-faac-46b4-a912-7c6ef8413b2c"
            }
         ]
      },
      {
         "id":2,
         "isCanceled":false,
         "artist":{
            "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
            "name":"Bruno Avelar"
         },
         "datetime":"2017-01-03T22:00:00",
         "venue":"Orlando",
         "genre":{
            "id":2,
            "name":"Blues"
         },
         "attendances":[
            {
               "gigId":2,
               "attendeeId":"2e530ed5-f088-434f-8d31-9a59aa75c971"
            },
            {
               "gigId":2,
               "attendeeId":"94cd5e02-faac-46b4-a912-7c6ef8413b2c"
            }
         ]
      },
      {
         "id":3,
         "isCanceled":false,
         "artist":{
            "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
            "name":"Bruno Avelar"
         },
         "datetime":"2017-01-04T12:00:00",
         "venue":"San Francisco",
         "genre":{
            "id":4,
            "name":"Country"
         },
         "attendances":[
            {
               "gigId":3,
               "attendeeId":"2e530ed5-f088-434f-8d31-9a59aa75c971"
            },
            {
               "gigId":3,
               "attendeeId":"94cd5e02-faac-46b4-a912-7c6ef8413b2c"
            }
         ]
      },
      {
         "id":4,
         "isCanceled":false,
         "artist":{
            "id":"94cd5e02-faac-46b4-a912-7c6ef8413b2c",
            "name":"User 01"
         },
         "datetime":"2017-01-01T11:30:00",
         "venue":"Teste",
         "genre":{
            "id":1,
            "name":"Jazz"
         },
         "attendances":[
            {
               "gigId":4,
               "attendeeId":"2e530ed5-f088-434f-8d31-9a59aa75c971"
            },
            {
               "gigId":4,
               "attendeeId":"94cd5e02-faac-46b4-a912-7c6ef8413b2c"
            }
         ]
      },
      {
         "id":5,
         "isCanceled":false,
         "artist":{
            "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
            "name":"Bruno Avelar"
         },
         "datetime":"2017-01-01T20:00:00",
         "venue":"Miami",
         "genre":{
            "id":1,
            "name":"Jazz"
         },
         "attendances":[
            {
               "gigId":5,
               "attendeeId":"94cd5e02-faac-46b4-a912-7c6ef8413b2c"
            }
         ]
      }
];


export let Attendances = 
[
    {
        "gigId":1,
        "gig":{
        "id":1,
        "isCanceled":false,
        "artist":{
            "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
            "name":"Bruno Avelar"
        },
        "datetime":"2017-01-02T22:00:00",
        "venue":"NYC",
        "genre":{
            "id":3,
            "name":"Rock"
        }
        },
        "attendeeId":"2e530ed5-f088-434f-8d31-9a59aa75c971",
        "attendee":{
        "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
        "name":"Bruno Avelar"
        }
    },
    {
        "gigId":1,
        "gig":{
        "id":1,
        "isCanceled":false,
        "artist":{
            "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
            "name":"Bruno Avelar"
        },
        "datetime":"2017-01-02T22:00:00",
        "venue":"NYC",
        "genre":{
            "id":3,
            "name":"Rock"
        }
        },
        "attendeeId":"94cd5e02-faac-46b4-a912-7c6ef8413b2c",
        "attendee":{
        "id":"94cd5e02-faac-46b4-a912-7c6ef8413b2c",
        "name":"User 01"
        }
    },
    {
        "gigId":2,
        "gig":{
        "id":2,
        "isCanceled":false,
        "artist":{
            "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
            "name":"Bruno Avelar"
        },
        "datetime":"2017-01-03T22:00:00",
        "venue":"Orlando",
        "genre":{
            "id":2,
            "name":"Blues"
        }
        },
        "attendeeId":"2e530ed5-f088-434f-8d31-9a59aa75c971",
        "attendee":{
        "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
        "name":"Bruno Avelar"
        }
    },
    {
        "gigId":2,
        "gig":{
        "id":2,
        "isCanceled":false,
        "artist":{
            "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
            "name":"Bruno Avelar"
        },
        "datetime":"2017-01-03T22:00:00",
        "venue":"Orlando",
        "genre":{
            "id":2,
            "name":"Blues"
        }
        },
        "attendeeId":"94cd5e02-faac-46b4-a912-7c6ef8413b2c",
        "attendee":{
        "id":"94cd5e02-faac-46b4-a912-7c6ef8413b2c",
        "name":"User 01"
        }
    },
    {
        "gigId":3,
        "gig":{
        "id":3,
        "isCanceled":false,
        "artist":{
            "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
            "name":"Bruno Avelar"
        },
        "datetime":"2017-01-04T12:00:00",
        "venue":"San Francisco",
        "genre":{
            "id":4,
            "name":"Country"
        }
        },
        "attendeeId":"2e530ed5-f088-434f-8d31-9a59aa75c971",
        "attendee":{
        "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
        "name":"Bruno Avelar"
        }
    },
    {
        "gigId":3,
        "gig":{
        "id":3,
        "isCanceled":false,
        "artist":{
            "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
            "name":"Bruno Avelar"
        },
        "datetime":"2017-01-04T12:00:00",
        "venue":"San Francisco",
        "genre":{
            "id":4,
            "name":"Country"
        }
        },
        "attendeeId":"94cd5e02-faac-46b4-a912-7c6ef8413b2c",
        "attendee":{
        "id":"94cd5e02-faac-46b4-a912-7c6ef8413b2c",
        "name":"User 01"
        }
    },
    {
        "gigId":4,
        "gig":{
        "id":4,
        "isCanceled":false,
        "artist":{
            "id":"94cd5e02-faac-46b4-a912-7c6ef8413b2c",
            "name":"User 01"
        },
        "datetime":"2017-01-01T11:30:00",
        "venue":"Teste",
        "genre":{
            "id":1,
            "name":"Jazz"
        }
        },
        "attendeeId":"2e530ed5-f088-434f-8d31-9a59aa75c971",
        "attendee":{
        "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
        "name":"Bruno Avelar"
        }
    },
    {
        "gigId":4,
        "gig":{
        "id":4,
        "isCanceled":false,
        "artist":{
            "id":"94cd5e02-faac-46b4-a912-7c6ef8413b2c",
            "name":"User 01"
        },
        "datetime":"2017-01-01T11:30:00",
        "venue":"Teste",
        "genre":{
            "id":1,
            "name":"Jazz"
        }
        },
        "attendeeId":"94cd5e02-faac-46b4-a912-7c6ef8413b2c",
        "attendee":{
        "id":"94cd5e02-faac-46b4-a912-7c6ef8413b2c",
        "name":"User 01"
        }
    },
    {
        "gigId":5,
        "gig":{
        "id":5,
        "isCanceled":false,
        "artist":{
            "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
            "name":"Bruno Avelar"
        },
        "datetime":"2017-01-01T20:00:00",
        "venue":"Miami",
        "genre":{
            "id":1,
            "name":"Jazz"
        }
        },
        "attendeeId":"94cd5e02-faac-46b4-a912-7c6ef8413b2c",
        "attendee":{
        "id":"94cd5e02-faac-46b4-a912-7c6ef8413b2c",
        "name":"User 01"
        }
    }
];


export let Users = 
[
    {
        "id":"2e530ed5-f088-434f-8d31-9a59aa75c971",
        "name":"Bruno Avelar",
        "email":"brunoavelar@gmail.com"
    },
    {
        "id":"94cd5e02-faac-46b4-a912-7c6ef8413b2c",
        "name":"User 01",
        "email":"user01@user.com"
    }
]

export let Tokens = 
[
    {
        "access_token":           "lNZGl5vsvuamFOfPN_anNNuteQ2GwUfIh1wuWKy9UGpB5_I4TcSL4XB1lVLJIfBDhsriv7hXDoCFdRjBohYn6K1ItiwLzqjgnqeVVE866IwBYmFt5Ft20ayC4P3OGL29Uapl8w273vgQxYL84d-ITv9a1jZ0FKu9mNN7_D7HTjo7sn3t5g-EC3sHAdOoiR9ZxG6X6LDZaxjBgrdH7RWGDkmWU-dqwuRazZMB-18jg0TAND73zfvCC-NtaxGsnBKkxP2F-SpQd9FvlxwNRI-iGYWA2bwBvVx0M80n-2RfJjRjQjTufr0o8Owzsreg0H7ce3otgo5KvLpAm26UbZktI9adlnQcj0WnGXgNzkWH5I4RoFbvlZW2Zlp3BLRrDD8oXoJyh306QlLVLLXykU0qwDcCYg8aHUT0V-NSl9Oo7VXnzY_ZdH1g-wAL_Q8zGCIxKDZaWoW6wM1ffVhDDbsz--EVbRewakM0H0YWzLKE8SI",
        "token_type": "bearer",
        "expires_in": 1209599,
        "userName": "user01@user.com",
        ".issued": "Sun, 03 Jul 2016 16:34:40 GMT",
        ".expires": "Sun, 17 Jul 2016 16:34:40 GMT"
    },
    {
        "access_token":           "lNZGl5vsvuamFOfPN_anNNuteQ2GwUfIh1wuWKy9UGpB5_I4TcSL4XB1lVLJIfBDhsriv7hXDoCFdRjBohYn6K1ItiwLzqjgnqeVVE866IwBYmFt5Ft20ayC4P3OGL29Uapl8w273vgQxYL84d-ITv9a1jZ0FKu9mNN7_D7HTjo7sn3t5g-EC3sHAdOoiR9ZxG6X6LDZaxjBgrdH7RWGDkmWU-dqwuRazZMB-18jg0TAND73zfvCC-NtaxGsnBKkxP2F-SpQd9FvlxwNRI-iGYWA2bwBvVx0M80n-2RfJjRjQjTufr0o8Owzsreg0H7ce3otgo5KvLpAm26UbZktI9adlnQcj0WnGXgNzkWH5I4RoFbvlZW2Zlp3BLRrDD8oXoJyh306QlLVLLXykU0qwDcCYg8aHUT0V-NSl9Oo7VXnzY_ZdH1g-wAL_Q8zGCIxKDZaWoW6wM1ffVhDDbsz--EVbRewakM0H0YWzLKE8SI",
        "token_type": "bearer",
        "expires_in": 1209599,
        "userName": "brunoavelar@gmail.com",
        ".issued": "Sun, 03 Jul 2016 16:34:40 GMT",
        ".expires": "Sun, 17 Jul 2016 16:34:40 GMT"
    }
]

export const InvalidLogin = {
    "error": "invalid_grant",
    "error_description": "The user name or password is incorrect."
}