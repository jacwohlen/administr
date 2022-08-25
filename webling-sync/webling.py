#!/bin/python
import os
import sys

# Webling
import requests
WEBLING_API_KEY=os.environ.get('WEBLING_API_KEY')
WEBLING_DOMAIN=os.environ.get('WEBLING_DOMAIN')

if not WEBLING_DOMAIN:
  print('Please export WEBLING_DOMAIN')
  sys.exit()

if not WEBLING_API_KEY:
  print('Please export WEBLING_API_KEY')
  sys.exit()

# Firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
print("db ready")

""" Create member in firebase for every webling """
def sync_members():
  print("fetching webling")
  api_url = f"https://{WEBLING_DOMAIN}.webling.ch/api/1/member?apikey={WEBLING_API_KEY}&format=full"

  response = requests.get(api_url)

  for e in response.json():
    prop = e["properties"]
    print(f"ID: {e['id']}, Name: {prop['Name']}, Vorname: {prop['Vorname']}, Geburtstag: {prop['Geburtstag']} Mobile: {prop['Mobile']} ")
    data = {
        u"firstname": prop["Vorname"],
        u"lastname": prop["Name"],
        u"birthday": prop["Geburtstag"],
        u"mobile": prop["Mobile"]
    }
    db.collection(u'members').document(str(e["id"])).update(data)

print("sync members... ")
sync_members()
print("sync members done ")

# print("Now in Firebase: ")
# members = db.collection(u'members').stream()
# for m in members:
#   print(f'{m.id} => {m.to_dict()}')




# print("get image")
# api_url = f"https://{WEBLING_DOMAIN}.webling.ch/api/1/member/3452/image/Mitgliederbild.png?apikey={WEBLING_API_KEY}&size=thumb"

# response = requests.get(api_url)
# print (response.content)
