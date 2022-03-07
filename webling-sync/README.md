# Sync members from webling with administra

This script is using webling api key to fetch all members from Webling.
Every member gets pushed into firestore database

Data Fields

- Member Id
- Firstname
- Lastname
- Birthday

## Setup

1. Get Webling API Token (readonly)
2. Get firebase-sdk service account

```
pip install requests
pip install firebase-admin

export WEBLING_API_KEY=<your webling key>
export WEBLING_API_KEY=<your webling domain> e.g. jacwohlen

python webling.py
```
