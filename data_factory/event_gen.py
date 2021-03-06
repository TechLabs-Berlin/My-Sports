from datetime import datetime
import random as rd
import pandas as pd

userlist = pd.read_csv('generated_userbase.csv')
sport_list = ['football', 'yoga', 'volley', 'basketball', 'rugby']
ucount = len(userlist.index)
i1, i2, i3, i4, i5, i6, i7, i8, i9, i10 = 0, 0, 0, 0, 0, 0, 0, 0,0, 0

print(str(ucount) + ' users available to generate events')

x = int(input('how many even should we generate ?'))

# host: type: String,
hosts = []
hostnames = []
while i1 < x:
    g = rd.randint(0,ucount)
    hosts.append(g)
    hostnames.append(userlist.iat[g,2])
    i1 += 1
print(hosts)
print(hostnames)

#sport: type: String,
sports=[]
while i2 < x:
    sp = rd.randint(0,4)
    sports.append(sport_list[sp])
    i2 += 1
print(sports)

# title: type: String,
event_name=[]
while i10 < x:
    event_name.append('event'+str(i10))
    i10 += 1
print(event_name)

# size: type: Number,
size=[]
while i3 < x:
    if sports[i3] == 'football' or 'rugby' or 'basket' or 'volleyball':
        sz = rd.randint(8,22)
    else:
        sz = rd.randint(2, 6)
    size.append(sz)
    i3 += 1
print(size)

#generate datetime
datetimeraw=[]
def create_random_datetime(from_date, to_date, rand_type='uniform'):
    delta = to_date - from_date
    if rand_type == 'uniform':
        rand = rd.random()
    else:
        raise NotImplementedError('Unknown random mode \'{}\''
                                  .format(rand_type))
    return from_date + rand * delta

while i6 < x:
    dtime = create_random_datetime(datetime(2021,1,1), datetime(2021,2,25))
    datetimeraw.append(dtime)
    i6 += 1
print(datetimeraw)

#time:       type: String,

# date  type: Date,
date_list=[]
while i7 < x:
    date_list.append(datetimeraw[i7].date)
    i7 += 1
print(date_list)
# location: {
location = []
while i4 < x:
    location.append(userlist.iat[i4,7])
    i4 += 1
print(location)

# teammates: type: mongoose.Schema.Types.ObjectId, required: 'Teammate is required', ref: 'User'
team_lists = []
def playerlist(pl):
    sgame = []
    sco = 0
    while sco < size[pl]:
        player= rd.randint(0,ucount)
        if sgame.count(player) == 1:
            continue
        sgame.append(player)
        sco += 1
    return sgame

while i5 < x:
    team_lists.append(playerlist(i5))
    i5 += 1
print(team_lists)

# skill: {type: Number default},
skill=[]
while i9 < x:
    skill.append(rd.randint(0,5))
    i9 += 1
print(skill)

# equipment : type: Boolean,
# active :type: Boolean,
# about:

#Unify all list in the DataFrame

df = pd.DataFrame({'hosts': hosts, 'hostnames': hostnames, 'sport':sports, 'size':size, 'date':date_list, 'teamate':team_lists,
                   'location':location, 'skill':skill, 'event_name':event_name},
                  columns=['hosts', 'hostnames', 'sport', 'size', 'date', 'teamate', 'location', 'skill', 'event_name'])
print(df.head(5))
print(df.describe)

#Export it in csv and json
df.to_csv('generated_events.csv')
df.to_json('generated_events.json')

print('SUCCESSFULLY CREATED ' + str(x) + ' EVENTS')
print('FILES SUCCESSFULLY CREATED IN CSV AND JSON FORMAT')